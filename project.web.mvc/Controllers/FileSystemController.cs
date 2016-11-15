using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ntdai09102015.quanlyfile.library;
using nvn.Library.Helpers;
using project.config.library;
using project.config.library.Utilities;
using project.web.mvc.Views;

namespace project.web.mvc.Controllers
{
    public class FileSystemController : Controller
    {
        IFileSystemBAL itemBAL = new FileSystemBAL();


        //get list file
        [HttpGet]
        [ActionName("LoadList")]
        public ActionResult LoadList_view(string q, int? s, string d)
        {
            ViewBag.liststyle = s;
            ViewBag.isDelete = d;
            ViewBag.ListFiles = itemBAL.GetAllByItemGuid(new Guid(q));
            return PartialView("_PartialListFiles");
        }

        //get 1 file 
        [HttpGet]
        [ActionName("LoadOne")]
        public ActionResult LoadOne_view(string q, string d)
        {
            ViewBag.itemGuid = q;
            ViewBag.isDelete = d;
            ViewBag.ListFiles = itemBAL.GetAllByItemGuid(new Guid(q));
            return PartialView("_PartialOneFile");
        }

        //xóa file trên list
        public ActionResult Delete(string q)
        {
            try
            {
                Guid FileGuid = new Guid(q);
                FileSystem item = itemBAL.GetFileSystem(FileGuid);

                if (System.IO.File.Exists(Server.MapPath("~/" + item.MapPath) + "/" + item.ServerFileName))
                    //tiến hanh xóa file
                    System.IO.File.Delete(Server.MapPath("~/" + item.MapPath) + "/" + item.ServerFileName);

                for (int i = 0; i < ConstantVariable.sizeImage_W.Count(); i++)
                {


                    if (System.IO.File.Exists(Server.MapPath("~/" + item.MapPath) + "/" + ConstantVariable.sizeImage_W[i] + "-" + ConstantVariable.sizeImage_H[i] + "/" + item.ServerFileName))
                        //tiến hanh xóa file thumal
                        System.IO.File.Delete(Server.MapPath("~/" + item.MapPath) + "/" + ConstantVariable.sizeImage_W[i] + "-" + ConstantVariable.sizeImage_H[i] + "/" + item.ServerFileName);
                }

                itemBAL.Delete(FileGuid);

            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        //nhận tham số upload từ form upload
        [HttpPost]
        [ActionName("CreateFiles")]
        public ActionResult CreateFiles_add(string itemguid, string id, string path)
        {
            //paath truyền vào dạng Guid_Guid 

            Guid UserCreate = Guid.NewGuid();
            string query = @"SET XACT_ABORT ON
                            BEGIN TRANSACTION
                            ";
            foreach (string fileName in Request.Files)
            {
                HttpPostedFileBase file = Request.Files[fileName];
                int fileSizeInBytes = file.ContentLength;
                byte[] buffer = new byte[file.ContentLength];   //get buffer data image to convert
                file.InputStream.Read(buffer, 0, file.ContentLength);
                string fileExt = System.IO.Path.GetExtension(file.FileName);
                try
                {
                    if (file != null)
                    {
                        string thuMucGoc = "";
                        string pathFile = "";

                        if (path != null && !file.Equals("null"))//khi thêm đường dẫn vào
                        {
                            thuMucGoc = ConstantVariable.GetPathUpload(id, path.Replace("_", "/"));
                        }
                        else//bình thường các control cũ đang dùng
                        {
                            thuMucGoc = ConstantVariable.GetPathUpload(id, itemguid.ToString());
                        }


                        //đặt tên file
                        string fileNameServer = Guid.NewGuid().ToString() + fileExt;
                        pathFile = Server.MapPath("~/" + thuMucGoc) + "/" + fileNameServer;

                        //tạo thư mục
                        if (!System.IO.Directory.Exists(Server.MapPath("~/" + thuMucGoc)))
                            System.IO.Directory.CreateDirectory(Server.MapPath("~/" + thuMucGoc));



                        file.SaveAs(pathFile);
                        //dung ham lay ra cautruc noiluu tru dua vao id
                        //Convert thumbnail image
                        ImageHandler ImageHandler = new ImageHandler();
                        ImageHandler.SaveImage(ConstantVariable.sizeImage_W, ConstantVariable.sizeImage_H, ConstantVariable.sizeImage_Q, thuMucGoc, null, fileNameServer, buffer);

                        query += @"
                            INSERT INTO [doc_FileSystem]
                                   ([FileSystemGuid]
                                    ,FileSystemID
                                   ,[FileType]
                                   ,[FileSize]
                                   ,[ClientFileName]
                                   ,[ServerFileName]
                                   ,[UpdatedDate]
                                   ,[UpdatedUser]
                                   ,[ItemGuid]
                                   ,[TableName]
                                   ,[MapPath])
                             VALUES
                                   (newID()
                                   ,'test'
                                   ,'" + fileExt + @"'
                                   ," + fileSizeInBytes / 1024 + @"
                                   ,N'" + Path.GetFileName(file.FileName) + @"'
                                   ,'" + fileNameServer + @"'
                                   ,getdate()
                                   ,'" + UserCreate + @"'
                                   ,'" + itemguid + @"'
                                   ,'" + id + @"'
                                   ,'" + thuMucGoc + @"')

                        ";

                    }
                }
                catch (Exception ex)
                {
                    return Json(new { Message = "Error in saving file" });
                }
            }

            query += @"COMMIT TRANSACTION";
            itemBAL.SaveFiles(query);

            return Json(new { Message = "File saved" });
        }

        //gọi control khi mốn upload nhiều file
        public ActionResult LoadUploadFiles(string itemguid, string id, string auto, int? s, string d, string mo, string path)
        {
            ViewBag.path = path;
            ViewBag.liststyle = s;
            ViewBag.isDelete = d;
            ViewBag.itemGuid = itemguid;
            ViewBag.id = id;
            ViewBag.AutoUpload = auto;
            ViewBag.submodel = mo;
            return PartialView("_PartialUploadFile");
        }

        //gọi control khi mốn upload 1 file
        public ActionResult LoadUploadOne(string itemguid, string id, string auto, string isDelete, string mo, string path)
        {
            ViewBag.path = path;
            ViewBag.itemGuid = itemguid;
            ViewBag.id = id;
            ViewBag.AutoUpload = auto;
            ViewBag.isDelete = isDelete;
            ViewBag.submodel = mo;
            return PartialView("_PartialUpLoadOne");
        }



        #region V2.0

        //get 1 file 
        [HttpGet]
        [ActionName("v2_LoadOne")]
        public ActionResult v2_LoadOne_view(string q, string d)
        {
            FileModalView modal = new FileModalView();
            modal.ItemGuid = q;
            modal.IsDelete = d;
            modal.ListFilesUploaded = itemBAL.GetAllByItemGuid(new Guid(q));
            return PartialView("~/Views/FileSystem/V2.0/_PartialOneFile.cshtml", modal);
        }
        //gọi control khi mốn upload 1 file
        public ActionResult v2_LoadUploadOne(string itemguid, string id, string auto, string isDelete, string mo, string path)
        {
            FileModalView modal = new FileModalView();
            modal.AutoUpload = auto;
            modal.Path = path;
            modal.ItemGuid = itemguid;
            modal.Id = id;
            modal.AutoUpload = auto;
            modal.IsDelete = isDelete;
            modal.SubModel = mo;
            return PartialView("~/Views/FileSystem/V2.0/_PartialUpLoadOne.cshtml", modal);
            #endregion
        }

       
    }
}
