
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcPaging;
using nvn.Library.Patterns;
using ntdai09102015.quanlyfile.library;
using project.config.library.Utilities;

using ioiort.settingdata.library.QLSettingData;
using ioiort.settingdata.library.Models;
using ioiort.settingdata.library;
using project.web.mvc.Common.Attribute;
using nvn.Library.Helpers;
using project.config.library;
using Microsoft.AspNet.Identity;
using nvn.Library.Services;
namespace project.web.mvc.Controllers
{
    [IOIORTAuthorizeAttribute]
    public class ConfigController : Controller
    {
        #region Define constant

        private SettingDataEntities db = new SettingDataEntities();
        
        #endregion

        public ActionResult QLSettingData()
        {
            //cách lấy dữ liệu setting
            //ContentSettingData item = new ContentSettingData();
            //string value = item.GetDataSettingValue("MaxLengthNhanvienID");


            return View();
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu SettingData
        /// </summary>
        /// <returns></returns>
        public ActionResult SettingDataCreate()
        {
            CreateSettingDataView item = new CreateSettingDataView();
            item = SettingDataCreate_LoadDropDowList(item);
            item.SettingDataGuid = Guid.NewGuid().ToString();
            return View("SettingDataCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult SettingDataCreate(CreateSettingDataView item)
        {
            
            if (ModelState.IsValid)
            {
              

                int save = 0;
                db.set_SettingData.Add(item.ToSettingData(null));
                save = db.SaveChanges();
                if (save > 0)
                {  LoggingService.LogCritical("Config", User.Identity.GetUserName() + " - " + User.Identity.Name, "Thêm mới cấu hình có mã "+item.SettingDataGuid, LoggingService.InformationCategory, false);

                    //clear cache
                    CacheHelper.Clear(ConfigurationCache.CacheSettingData);

                    return JavaScript("QLSettingData_SettingData_ReLoadAjaxPartial('" + item.SettingDataGuid + "')");
                }
                else
                {
                    item = SettingDataCreate_LoadDropDowList(item);
                    return PartialView("~/Views/Config/QLSettingData/_PartialCreate.cshtml", item);
                }
            }
            item = SettingDataCreate_LoadDropDowList(item);
            return PartialView("~/Views/Config/QLSettingData/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateSettingDataView SettingDataCreate_LoadDropDowList(CreateSettingDataView item)
        {
           // item.ListLoaiSanPham_Guid = db.LoaiSanPhams.Select(x => new DropboxValue()
           // {
           //   ValueString = x.LoaiSanPhamGuid,
           //   Name = x.Name
           //}).ToList();
            return item;
        }
        #endregion

        #region Update

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi sự kiện load edit SettingData
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult SettingDataEdit(string id)
        {
            set_SettingData s = db.set_SettingData.Find(id);
            UpdateSettingDataView item = new UpdateSettingDataView(s);
            item = SettingDataUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("SettingDataEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit SettingData
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult SettingDataEdit(UpdateSettingDataView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                db.Entry(item.ToSettingData(null)).State = EntityState.Modified;
                save = db.SaveChanges();
                if (save > 0)
                {
                    LoggingService.LogCritical("Config", User.Identity.GetUserName() + " - " + User.Identity.Name, "Cập nhật cấu hình có mã " + item.SettingDataGuid, LoggingService.InformationCategory, false);


                    //clear cache
                    CacheHelper.Clear(ConfigurationCache.CacheSettingData);

                    return JavaScript("QLSettingData_SettingData_ReLoadAjaxPartial('" + item.SettingDataGuid + "')");
                }
                else
                {
                    item = SettingDataUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/Config/QLSettingData/_PartialEdit.cshtml", item);
                }
            }
            item = SettingDataUpdate_LoadDropDowList(item);
            return PartialView("~/Views/Config/QLSettingData/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateSettingDataView SettingDataUpdate_LoadDropDowList(UpdateSettingDataView item)
        {
           // item.ListLoaiSanPham_Guid = db.LoaiSanPhams.Select(x => new DropboxValue()
           // {
            //    ValueString = x.LoaiSanPhamGuid,
            //    Name = x.Name
            //}).ToList();
            return item;
        }
        #endregion


        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Xóa dữ liệu SettingData và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult SettingDataDelete(string id)
        {
            try
            {
                set_SettingData item = db.set_SettingData.Find(id);
                db.set_SettingData.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
                    LoggingService.LogCritical("Config", User.Identity.GetUserName() + " - " + User.Identity.Name, "Xóa cấu hình có mã " + item.SettingDataGuid, LoggingService.InformationCategory, false);
                    //clear cache
                    CacheHelper.Clear(ConfigurationCache.CacheSettingData);

                    IFileSystemBAL itemBAL = new FileSystemBAL();
                    if (itemBAL.DeleteByItemGuid(new Guid(id)))
                        if (System.IO.Directory.Exists(Server.MapPath("~/" + ConstantVariable.GetPathUpload("1", id))))
                            System.IO.Directory.Delete(Server.MapPath("~/" + ConstantVariable.GetPathUpload("1", id)), true);
                }
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Get list thông tin SettingData
        /// </summary>
        /// <returns></returns>
        public ActionResult SettingDataGet_List(int? page, string k)
        {
            ViewData["keysearch"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperQLSettingData"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperQLSettingData"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListSettingDataView> list = new List<ListSettingDataView>();
            list = db.Config_QLSettingData_ntdai_SelectPage(currentPageIndex, DefaultPageSize, k).Select(x => new ListSettingDataView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperQLSettingData");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/Config/QLSettingData/_PartialList.cshtml", listPaged);
        }
    }
}
