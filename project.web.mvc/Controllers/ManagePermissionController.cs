
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

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using nvn.Library.Helpers;
using System.Web.Mail;
using System.IO;
using nvn.Library.Services;
using project.web.mvc.Common.Attribute;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using Microsoft.AspNet.Cryptography.KeyDerivation;


using nvngoc29082015.permission.library.ManageApp;
using nvngoc29082015.permission.library.ManageAspNetUsers;
using nvngoc29082015.permission.library.ManageController;
using nvngoc29082015.permission.library.Models;
using nvngoc29082015.permission.library.ManageAction;
using nvngoc29082015.permission.library.ManageActionGroup;
using nvngoc29082015.permission.library.ManageModule;
using nvngoc29082015.permission.library.ManageAspNetRoles;
using nvngoc29082015.permission.library.ManageRoleForCode;
using nvngoc29082015.permission.library.ManageUserRoleDetail;
using nvngoc29082015.permission.library.ManageRoleDetail;
using nvngoc29082015.permission.library.ManageGroupRole;
using nvngoc29082015.permission.library.ManageGroupRoleDetail;
using project.web.mvc.Models;
using nvn.Library;
using System.Configuration;
using System.Text;

namespace project.web.mvc.Controllers
{
    [IOIORTAuthorizeAttribute]
    public class ManagePermissionController : System.Web.Mvc.Controller
    {
        #region Index
        public ActionResult ManagePermission()
        {
            return View();
        }
        #endregion

        #region Define constant

        private HutechPermissionEntities db = new HutechPermissionEntities();

        #endregion

        #region Quan ly controller

        public ActionResult ManageController()
        {
            return View();
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu Controller
        /// </summary>
        /// <returns></returns>
        public ActionResult ControllerCreate()
        {
            CreateControllerView item = new CreateControllerView();
            item = ControllerCreate_LoadDropDowList(item);
            item.ControllerGuid = Guid.NewGuid().ToString();
            return View("ControllerCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ControllerCreate(CreateControllerView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                db.ioiort_Controller.Add(item.ToController(null));
                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageController_Controller_ReLoadAjaxPartial('" + item.ControllerGuid + "')");
                else
                {
                    item = ControllerCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageController/_PartialCreate.cshtml", item);
                }
            }
            item = ControllerCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageController/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateControllerView ControllerCreate_LoadDropDowList(CreateControllerView item)
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
        /// Gọi sự kiện load edit Controller
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ControllerEdit(string id)
        {
            nvngoc29082015.permission.library.Models.ioiort_Controller s = db.ioiort_Controller.Find(id);
            UpdateControllerView item = new UpdateControllerView(s);
            item = ControllerUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("ControllerEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit Controller
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ControllerEdit(UpdateControllerView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;

                item.UpdatedDate = DateTime.Now;
                var entry = db.Entry(item.ToController(null));
                entry.State = EntityState.Modified;
                entry.Property(e => e.CreatedDate).IsModified = false;
                entry.Property(e => e.CreatedUser).IsModified = false;

                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageController_Controller_ReLoadAjaxPartial('" + item.ControllerGuid + "')");
                else
                {
                    item = ControllerUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageController/_PartialEdit.cshtml", item);
                }
            }
            item = ControllerUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageController/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateControllerView ControllerUpdate_LoadDropDowList(UpdateControllerView item)
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
        /// Xóa dữ liệu Controller và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ControllerDelete(string id)
        {
            try
            {
                nvngoc29082015.permission.library.Models.ioiort_Controller item = db.ioiort_Controller.Find(id);
                db.ioiort_Controller.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
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
        /// Get list thông tin Controller
        /// </summary>
        /// <returns></returns>
        public ActionResult ControllerGet_List(int? page, string k)
        {
            ViewData["keysearch"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageController"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageController"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListControllerView> list = new List<ListControllerView>();
            list = db.ManagePermission_ManageController_httHong_SelectPage(currentPageIndex, DefaultPageSize, k).Select(x => new ListControllerView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageController");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageController/_PartialList.cshtml", listPaged);
        }
        #endregion

        #region quan ly app
        public ActionResult ManageApp()
        {
            return View();
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu App
        /// </summary>
        /// <returns></returns>
        public ActionResult AppCreate()
        {
            CreateAppView item = new CreateAppView();
            item = AppCreate_LoadDropDowList(item);
            item.AppGuid = Guid.NewGuid().ToString();
            return View("AppCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult AppCreate(CreateAppView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                db.ioiort_App.Add(item.ToApp(null));
                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageApp_App_ReLoadAjaxPartial('" + item.AppGuid + "')");
                else
                {
                    item = AppCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageApp/_PartialCreate.cshtml", item);
                }
            }
            item = AppCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageApp/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateAppView AppCreate_LoadDropDowList(CreateAppView item)
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
        /// Gọi sự kiện load edit App
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult AppEdit(string id)
        {
            nvngoc29082015.permission.library.Models.ioiort_App s = db.ioiort_App.Find(id);
            UpdateAppView item = new UpdateAppView(s);
            item = AppUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("AppEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit App
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult AppEdit(UpdateAppView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;

                item.UpdatedDate = DateTime.Now;

                var entry = db.Entry(item.ToApp(null));
                entry.State = EntityState.Modified;
                entry.Property(e => e.CreatedDate).IsModified = false;
                entry.Property(e => e.CreatedUser).IsModified = false;



                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageApp_App_ReLoadAjaxPartial('" + item.AppGuid + "')");
                else
                {
                    item = AppUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageApp/_PartialEdit.cshtml", item);
                }
            }
            item = AppUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageApp/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateAppView AppUpdate_LoadDropDowList(UpdateAppView item)
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
        /// Xóa dữ liệu App và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult AppDelete(string id)
        {
            try
            {
                nvngoc29082015.permission.library.Models.ioiort_App item = db.ioiort_App.Find(id);
                db.ioiort_App.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
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
        /// Get list thông tin App
        /// </summary>
        /// <returns></returns>
        public ActionResult AppGet_List(int? page, string k)
        {
            ViewData["keysearch"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageApp"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageApp"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListAppView> list = new List<ListAppView>();
            list = db.ManagePermission_ManageApp_httHong_SelectPage(currentPageIndex, DefaultPageSize, k).Select(x => new ListAppView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageApp");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageApp/_PartialList.cshtml", listPaged);
        }
        #endregion

        #region Quan Ly ActionGroup

        public ActionResult ManageActionGroup()
        {
            ActionGroup item = new ActionGroup();
            item.ListController = db.ioiort_Controller.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ControllerGuid,
                Name = x.ControllerName
            }).ToList();
            item.ListController.Insert(0, new DropboxValue(null, 0, Guid.Empty, "-- Chọn controller --"));

            return View(item);
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu ActionGroup
        /// </summary>
        /// <returns></returns>
        public ActionResult ActionGroupCreate()
        {
            CreateActionGroupView item = new CreateActionGroupView();
            item = ActionGroupCreate_LoadDropDowList(item);
            item.ActionGroupGuid = Guid.NewGuid().ToString();

            return View("ActionGroupCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ActionGroupCreate(CreateActionGroupView item)
        {
            if (ModelState.IsValid)
            {
                item.CreatedDate = DateTime.Now;
                item.UpdatedDate = DateTime.Now;
                int save = 0;
                db.ioiort_ActionGroup.Add(item.ToActionGroup(User.Identity.GetUserId()));
                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageActionGroup_ActionGroup_ReLoadAjaxPartial('" + item.ActionGroupGuid + "')");
                else
                {
                    item = ActionGroupCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageActionGroup/_PartialCreate.cshtml", item);
                }
            }
            item = ActionGroupCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageActionGroup/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateActionGroupView ActionGroupCreate_LoadDropDowList(CreateActionGroupView item)
        {
            item.ListController = db.ioiort_Controller.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ControllerGuid,
                Name = x.ControllerName
            }).ToList();
            item.ListController.Insert(0, new DropboxValue(null, 0, Guid.Empty, "---Chọn Controller---"));
            return item;
        }
        #endregion

        #region Update

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi sự kiện load edit ActionGroup
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ActionGroupEdit(string id)
        {
            nvngoc29082015.permission.library.Models.ioiort_ActionGroup s = db.ioiort_ActionGroup.FirstOrDefault(x => x.ActionGroupGuid == id);
            UpdateActionGroupView item = new UpdateActionGroupView(s);
            item = ActionGroupUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("ActionGroupEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit ActionGroup
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ActionGroupEdit(UpdateActionGroupView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                var entry = db.Entry(item.ToActionGroup(User.Identity.GetUserId()));

                entry.State = EntityState.Modified;
                entry.Property(e => e.CreatedDate).IsModified = false;
                entry.Property(e => e.CreatedUser).IsModified = false;

                item.UpdatedDate = DateTime.Now;

                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageActionGroup_ActionGroup_ReLoadAjaxPartial('" + item.ActionGroupGuid + "')");
                else
                {
                    item = ActionGroupUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageActionGroup/_PartialEdit.cshtml", item);
                }
            }
            item = ActionGroupUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageActionGroup/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateActionGroupView ActionGroupUpdate_LoadDropDowList(UpdateActionGroupView item)
        {
            item.ListController = db.ioiort_Controller.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ControllerGuid,
                Name = x.ControllerName
            }).ToList();
            item.ListController.Insert(0, new DropboxValue(null, 0, Guid.Empty, "---Chọn Controller---"));
            return item;
        }


        #endregion


        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Xóa dữ liệu ActionGroup và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ActionGroupDelete(string id)
        {
            try
            {
                nvngoc29082015.permission.library.Models.ioiort_ActionGroup item = db.ioiort_ActionGroup.Find(id);
                db.ioiort_ActionGroup.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
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
        /// Get list thông tin ActionGroup
        /// </summary>
        /// <returns></returns>
        public ActionResult ActionGroupGet_List(int? page, string k, string id)
        {

            if (id == null)
                id = Guid.Empty.ToString();

            ViewData["keysearch"] = k;
            ViewData["id"] = id;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //xu ly lay chuoi hanh dong chuyen tham so
            string keysearch = "";
            string controlerguid = null;
            try
            {
                string[] str = k.Split('_');
                keysearch = str[0];
                controlerguid = string.IsNullOrEmpty(str[1]) ? null : str[1];
            }
            catch (Exception ex)
            {
                //LoggingService.LogError("QuanLyNhanSu", ex, LoggingService.ErrorCategory, false);
            }

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageActionGroup"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageActionGroup"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListActionGroupView> list = new List<ListActionGroupView>();

            list = db.ManagePermission_ManageActionGroup_hanhat_SelectPage(currentPageIndex, DefaultPageSize, keysearch, controlerguid).Select(x => new ListActionGroupView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageActionGroup");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageActionGroup/_PartialList.cshtml", listPaged);
        }

        #endregion

        #region Quản Lý Action

        public ActionResult ManageAction()
        {

            List<DropboxValue> listActionGroup = db.ioiort_ActionGroup.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ActionGroupGuid,
                Name = x.ActionGroupName
            }).ToList();
            listActionGroup.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn nhóm action ---"));
            ViewBag.ListGroup = listActionGroup;
            List<DropboxValue> listControlerGroup = db.ioiort_Controller.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ControllerGuid,
                Name = x.ControllerName
            }).ToList();
            listControlerGroup.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn controler ---"));
            ViewBag.ListControler = listControlerGroup;

            return View();
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu Action
        /// </summary>
        /// <returns></returns>
        public ActionResult ActionCreate()
        {
            CreateActionView item = new CreateActionView();
            item = ActionCreate_LoadDropDowList(item);
            item.ActionGuid = Guid.NewGuid().ToString();
            return View("ActionCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ActionCreate(CreateActionView item)
        {
            if (ModelState.IsValid)
            {

                ioiort_Action item1 = db.ioiort_Action.ToList().Where(x => x.ActionID.Trim().ToUpper() == item.ActionID.Trim().ToUpper()).FirstOrDefault();
                if (item1 != null)
                {
                    return JavaScript("DialogAlert('','Action đã có trong cơ sở dữ liệu!', 'error')");
                }

                int save = 0;
                db.ioiort_Action.Add(item.ToAction(User.Identity.GetUserId()));

                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageAction_Action_ReLoadAjaxPartial('" + item.ActionGuid + "')");
                else
                {
                    item = ActionCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageAction/_PartialCreate.cshtml", item);
                }
            }
            item = ActionCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageAction/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateActionView ActionCreate_LoadDropDowList(CreateActionView item)
        {
            item.ListActionGroupGuid = db.ioiort_ActionGroup.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ActionGroupGuid,
                Name = x.ActionGroupName
            }).ToList();
            item.ListActionGroupGuid.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn nhóm action ---"));
            return item;
        }
        #endregion

        #region Update

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi sự kiện load edit Action
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ActionEdit(string id)
        {
            nvngoc29082015.permission.library.Models.ioiort_Action s = db.ioiort_Action.FirstOrDefault(x => x.ActionGuid == id);
            UpdateActionView item = new UpdateActionView(s);
            item = ActionUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("ActionEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit Action
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ActionEdit(UpdateActionView item)
        {
            if (ModelState.IsValid)
            {
                int item1 = db.ManagePermission_ManageAction_hanhat_CheckTrungAction(item.ActionID, item.ActionGuid).FirstOrDefault().Value;
                if (item1 > 0)
                {
                    return JavaScript("DialogAlert('','Action đã có trong cơ sở dữ liệu!', 'error')");
                }

                int save = 0;
                var entry = db.Entry(item.ToAction(User.Identity.GetUserId()));

                entry.State = EntityState.Modified;
                entry.Property(e => e.CreatedDate).IsModified = false;
                entry.Property(e => e.CreatedUser).IsModified = false;

                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageAction_Action_ReLoadAjaxPartial('" + item.ActionGuid + "')");
                else
                {
                    item = ActionUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageAction/_PartialEdit.cshtml", item);
                }
            }
            item = ActionUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageAction/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateActionView ActionUpdate_LoadDropDowList(UpdateActionView item)
        {
            item.ListActionGroupGuid = db.ioiort_ActionGroup.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ActionGroupGuid,
                Name = x.ActionGroupName
            }).ToList();
            item.ListActionGroupGuid.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn nhóm action ---"));
            return item;
        }
        #endregion


        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Xóa dữ liệu Action và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ActionDelete(string id)
        {
            try
            {
                nvngoc29082015.permission.library.Models.ioiort_Action item = db.ioiort_Action.Find(id);
                db.ioiort_Action.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
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
        /// Get list thông tin Action
        /// </summary>
        /// <returns></returns>
        public ActionResult ActionGet_List(int? page, string k, string id)
        {

            if (id == null)
                id = Guid.Empty.ToString();
            ViewData["keysearch"] = k;
            ViewData["id"] = id;

            string keysearch = "";
            string cotrolerguid = null;
            string groupguid = null;
            try
            {
                string[] str = k.Split('_');
                keysearch = str[0];
                cotrolerguid = string.IsNullOrEmpty(str[1]) ? null : str[1];
                groupguid = string.IsNullOrEmpty(str[2]) ? null : str[2];
            }
            catch (Exception ex)
            {
                //LoggingService.LogError("QuanLyNhanSu", ex, LoggingService.ErrorCategory, false);
            }
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageAction"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageAction"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListActionView> list = new List<ListActionView>();
            list = db.ManagePermission_ManageAction_hanhat_SelectPage(currentPageIndex, DefaultPageSize, keysearch, groupguid, cotrolerguid).Select(x => new ListActionView(x)).ToList();
            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageAction");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageAction/_PartialList.cshtml", listPaged);
        }

        #endregion

        #region Quản Lý Module
        public ActionResult ManageModule()
        {

            List<DropboxValue> item = db.ioiort_App.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.AppGuid,
                Name = x.AppName
            }).ToList();
            item.Insert(0, new DropboxValue(null, 0, Guid.Empty, "---Chọn App---"));
            ViewBag.ListApp = item;
            return View();
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu Module
        /// </summary>
        /// <returns></returns>
        public ActionResult ModuleCreate()
        {
            CreateModuleView item = new CreateModuleView();
            item = ModuleCreate_LoadDropDowList(item);
            item.ModuleGuid = Guid.NewGuid().ToString();
            return View("ModuleCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ModuleCreate(CreateModuleView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                db.ioiort_Module.Add(item.ToModule(User.Identity.GetUserId()));
                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageModule_Module_ReLoadAjaxPartial('" + item.ModuleGuid + "')");
                else
                {
                    item = ModuleCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageModule/_PartialCreate.cshtml", item);
                }
            }
            item = ModuleCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageModule/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateModuleView ModuleCreate_LoadDropDowList(CreateModuleView item)
        {
            item.ListAppGuid = db.ioiort_App.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.AppGuid,
                Name = x.AppName
            }).ToList();
            item.ListAppGuid.Insert(0, new DropboxValue(null, 0, Guid.Empty, "---Chọn App---"));
            return item;
        }
        #endregion

        #region Update

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi sự kiện load edit Module
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ModuleEdit(string id)
        {
            nvngoc29082015.permission.library.Models.ioiort_Module s = db.ioiort_Module.FirstOrDefault(x => x.ModuleGuid == id);
            UpdateModuleView item = new UpdateModuleView(s);
            item = ModuleUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("ModuleEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit Module
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ModuleEdit(UpdateModuleView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                item.UpdatedDate = DateTime.Now;

                var entry = db.Entry(item.ToModule(User.Identity.GetUserId()));
                entry.State = EntityState.Modified;
                entry.Property(e => e.CreatedDate).IsModified = false;
                entry.Property(e => e.CreatedUser).IsModified = false;
                save = db.SaveChanges();
                if (save > 0)
                {
                    return JavaScript("ManageModule_Module_ReLoadAjaxPartial('" + item.ModuleGuid + "')");
                }
                else
                {
                    item = ModuleUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageModule/_PartialEdit.cshtml", item);
                }
            }
            item = ModuleUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageModule/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateModuleView ModuleUpdate_LoadDropDowList(UpdateModuleView item)
        {
            item.ListAppGuid = db.ioiort_App.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.AppGuid,
                Name = x.AppName
            }).ToList();
            item.ListAppGuid.Insert(0, new DropboxValue(null, 0, Guid.Empty, "---Chọn App---"));
            return item;
        }
        #endregion


        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Xóa dữ liệu Module và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ModuleDelete(string id)
        {
            try
            {
                nvngoc29082015.permission.library.Models.ioiort_Module item = db.ioiort_Module.Find(id);
                db.ioiort_Module.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
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
        /// Get list thông tin Module
        /// </summary>
        /// <returns></returns>
        public ActionResult ModuleGet_List(int? page, string k, string idnv)
        {
            ViewData["keysearch"] = k;
            ViewData["idnv"] = idnv;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            string keysearch = "";
            string appguid = null;
            try
            {
                string[] str = k.Split('_');
                keysearch = str[0];
                appguid = string.IsNullOrEmpty(str[1]) ? null : str[1];
            }
            catch (Exception ex)
            {
                //LoggingService.LogError("QuanLyNhanSu", ex, LoggingService.ErrorCategory, false);
            }

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageModule"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageModule"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListModuleView> list = new List<ListModuleView>();

            list = db.ManagePermission_ManageModule_hanhat_SelectPage(currentPageIndex, DefaultPageSize, keysearch, appguid).Select(x => new ListModuleView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageModule");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageModule/_PartialList.cshtml", listPaged);
        }

        #endregion


        #region Quản Lý AspNetRoles

        public ActionResult ManageAspNetRoles()
        {
            return View();
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu AspNetRoles
        /// </summary>
        /// <returns></returns>
        public ActionResult AspNetRolesCreate()
        {
            CreateAspNetRolesView item = new CreateAspNetRolesView();
            item = AspNetRolesCreate_LoadDropDowList(item);

            item.Id = Guid.NewGuid().ToString();
            return View("AspNetRolesCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult AspNetRolesCreate(CreateAspNetRolesView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                //nếu không phải admin thì isdelete = true
                if (!User.IsInRole(project.config.library.Utilities.ConstantVariable.Value_AspNetRoles_System))
                {
                    item.IsDelete = true;
                }

                db.AspNetRoles.Add(item.ToAspNetRoles(null));
                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageAspNetRoles_AspNetRoles_ReLoadAjaxPartial('" + item.Id + "')");
                else
                {
                    item = AspNetRolesCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageAspNetRoles/_PartialCreate.cshtml", item);
                }
            }
            item = AspNetRolesCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageAspNetRoles/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateAspNetRolesView AspNetRolesCreate_LoadDropDowList(CreateAspNetRolesView item)
        {
            //item.ListAspNetRoleGroupGuid = db.ioiort_GroupRole.Select(x => new DropboxValue()
            //{
            //    ValueString = x.AspNetRoleGroupGuid,
            //    Name = x.GroupAspNetRoleName
            //}).ToList();
            return item;
        }
        #endregion

        #region Update

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi sự kiện load edit AspNetRoles
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult AspNetRolesEdit(string id)
        {
            nvngoc29082015.permission.library.Models.AspNetRoles s = db.AspNetRoles.Find(id);
            UpdateAspNetRolesView item = new UpdateAspNetRolesView(s);
            item = AspNetRolesUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("AspNetRolesEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit AspNetRoles
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult AspNetRolesEdit(UpdateAspNetRolesView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;

                var entry = db.Entry(item.ToAspNetRoles(null));

                entry.State = EntityState.Modified;

                if (!User.IsInRole(project.config.library.Utilities.ConstantVariable.Value_AspNetRoles_System))

                    entry.Property(e => e.IsDelete).IsModified = false;

                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageAspNetRoles_AspNetRoles_ReLoadAjaxPartial('" + item.Id + "')");
                else
                {
                    item = AspNetRolesUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageAspNetRoles/_PartialEdit.cshtml", item);
                }
            }
            item = AspNetRolesUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageAspNetRoles/_PartialEdit.cshtml", item);
        }
        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateAspNetRolesView AspNetRolesUpdate_LoadDropDowList(UpdateAspNetRolesView item)
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
        /// Xóa dữ liệu AspNetRoles và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult AspNetRolesDelete(string id)
        {
            try
            {
                nvngoc29082015.permission.library.Models.AspNetRoles item;

                item = db.AspNetRoles.FirstOrDefault(x => x.Id == id);

                if (!User.IsInRole(project.config.library.Utilities.ConstantVariable.Value_AspNetRoles_System))
                    item = db.AspNetRoles.FirstOrDefault(x => x.IsDelete == true && x.Id == id);

                db.AspNetRoles.Remove(item);

                int flag = db.SaveChanges();

                if (flag > 0)
                {
                    IFileSystemBAL itemBAL = new FileSystemBAL();
                    if (itemBAL.DeleteByItemGuid(new Guid(id)))
                        if (System.IO.Directory.Exists(Server.MapPath("~/" + ConstantVariable.GetPathUpload("1", id))))
                            System.IO.Directory.Delete(Server.MapPath("~/" + ConstantVariable.GetPathUpload("1", id)), true);
                }
            }
            catch
            {

                //Json("error", JsonRequestBehavior.AllowGet); 
                return JavaScript("alert('Quyền hệ thống không được xóa!')");
            }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Get list thông tin AspNetRoles
        /// </summary>
        /// <returns></returns>
        public ActionResult AspNetRolesGet_List(int? page, string k, string id)
        {
            if (k == null)
                k = "";
            ViewData["keysearch"] = k;
            ViewData["id"] = id;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;
            if (id == null)
                id = Guid.Empty.ToString();
            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageAspNetRoles"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageAspNetRoles"].Value);
            else
                currentPageIndex = page.Value;


            //Load dữ liệu phân trang từ database
            List<ListAspNetRolesView> list = new List<ListAspNetRolesView>();
            list = db.ManagePermission_ManageAspNetRoles_hanhat_SelectPage(currentPageIndex, DefaultPageSize, k, User.Identity.Name).Select(x => new ListAspNetRolesView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageAspNetRoles");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageAspNetRoles/_PartialList.cshtml", listPaged);
        }
        #endregion

        //#region Quan ly role for code
        //public ActionResult DanhSachRoleForCode()
        //{
        //    DanhSachRoleForCodeViewModel model = new DanhSachRoleForCodeViewModel();
        //    //load app

        //    var a =
        //        from r in db.ioiort_App
        //        //join m in db.ioiort_Module on
        //        //    r.ModuleGuid equals m.ModuleGuid
        //        //join a in db.ioiort_App on
        //        //    m.AppGuid equals a.AppGuid
        //        orderby r.AppName
        //        select new AppEntities
        //        {
        //            AppGuid = r.AppGuid,
        //            AppName = r.AppName,
        //            Desctiption = r.Desctiption
        //        };

        //    //them app
        //    model.Apps = a.ToList();

        //    int countapp = 0;
        //    foreach (var item in model.Apps)
        //    {
        //        var aa =
        //            from r in db.ioiort_Module
        //            where r.AppGuid == item.AppGuid
        //            orderby r.ModuleName
        //            select new ModuleEntities
        //            {
        //                Desctiption = r.Desctiption,
        //                ModuleGuid = r.ModuleGuid,
        //                ModuleName = r.ModuleName,
        //            };

        //        //them module
        //        model.Apps[countapp].Modules = aa.ToList();

        //        int countroleforcode = 0;
        //        foreach (var temp in item.Modules)
        //        {
        //            var aaa =
        //            from r in db.ioiort_RoleForCode
        //            where r.ModuleGuid == temp.ModuleGuid
        //            orderby r.RoleForCodeName
        //            select new RoleForCodeEntities
        //            {
        //                CreatedTime = r.CreatedDate,
        //                UpdatedTime = r.UpdatedDate,
        //                RoleForCodeGuid = r.RoleForCodeGuid,
        //                RoleForCodeName = r.RoleForCodeName,
        //                Description = r.Description
        //            };
        //            model.Apps[countapp].Modules[countroleforcode].RoleForCodes = aaa.ToList();
        //            countroleforcode++;

        //        }
        //        countapp++;
        //    }

        //    //from u in db.AspNetUsers
        //    //where u.UserName != "admin"
        //    //join c in db.cont_Catologies on
        //    //    u.KhuVucGuid equals c.CatologyGuid
        //    //orderby c.CatologyName,u.UserName
        //    //select new UserEntities
        //    //{
        //    //    UserName = u.UserName,
        //    //    Email = u.Email,
        //    //    HoTen = u.HoTen,
        //    //    KhuVuc = c.CatologyName,
        //    //    UserId= u.Id
        //    //};
        //    return View(model);
        //}

        //[HttpGet]
        //public ActionResult SaveRoleForCode(string ida, string idm, string idr)
        //{
        //    ChinhSuaRoleForCodeViewModel model = new ChinhSuaRoleForCodeViewModel();
        //    model.AppGuid = ida;
        //    model.ModuleGuid = idm;

        //    if (idr != null)
        //    {
        //        var result = db.ioiort_RoleForCode.FirstOrDefault(m => m.RoleForCodeGuid == idr);
        //        model.Description = result.Description;
        //        model.RoleForCodeName = result.RoleForCodeName;
        //        model.RoleForCodeGuid = result.RoleForCodeGuid;
        //    }
        //    //if (mes != null)
        //    //{
        //    //    ViewBag.StatusMessage = @"<p class='alert alert-info'>Lưu thông báo thành công!</p>";
        //    //}

        //    return View(model);
        //}

        //[HttpPost]
        //public ActionResult SaveRoleForCode(ChinhSuaRoleForCodeViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var entity = model.RoleForCodeGuid.Equals(Guid.Empty.ToString()) ?
        //            db.ioiort_RoleForCode.Add(new ioiort_RoleForCode()) :
        //            db.ioiort_RoleForCode.FirstOrDefault(m => m.RoleForCodeGuid == model.RoleForCodeGuid);

        //        //sinh guild neu nhu la tao moi
        //        if (model.RoleForCodeGuid.Equals(Guid.Empty.ToString()))
        //        {
        //            entity.RoleForCodeGuid = Guid.NewGuid().ToString();//tao moi khoa
        //            entity.CreatedDate = DateTime.Now;
        //        }

        //        entity.ModuleGuid = model.ModuleGuid;
        //        entity.RoleForCodeName = model.RoleForCodeName;
        //        entity.Description = model.Description;
        //        entity.UpdatedDate = DateTime.Now;

        //        db.SaveChanges();

        //        //ViewBag.StatusMessage = @"<p class='alert alert-info'>Lưu thông báo thành công!</p>";
        //        return RedirectToAction("DanhSachRoleForCode");
        //    }

        //    // If we got this far, something failed, redisplay form
        //    return View(model);
        //}

        //public ActionResult DeleteRoleForCode(string idr)
        //{
        //    db.ManagePermission_ManageRoleForCode_nvngoc_Delete(idr);
        //    return RedirectToAction("DanhSachRoleForCode");
        //}

        //public ActionResult ConfigActionRoleForCode(string idr)
        //{
        //    ConfigActionRoleForCodeViewModel model = new ConfigActionRoleForCodeViewModel();
        //    model.RoleForCodeGuid = idr;
        //    //load ds quyen dang nam giu
        //    model.ListRoleDetailForCode = db.ManagePermission_ManageRoleForCode_nvngoc_GetAllByRoleForCodeGuid(idr).AsEnumerable();

        //    //lay len danh sach controller
        //    model.Controllers = db.ioiort_Controller.Select(x => new ControllerEntities
        //    {
        //        ControllerGuid = x.ControllerGuid,
        //        ControllerName = x.ControllerName,
        //        Description = x.Description
        //    }).ToList();


        //    //them model
        //    int countcontroller = 0;
        //    foreach (var item in model.Controllers)
        //    {
        //        model.Controllers[countcontroller].ActionGroups = db.ioiort_ActionGroup
        //            .Where(x => x.ControllerGuid == item.ControllerGuid)
        //            .Select(t => new ActionGroupEntities
        //            {
        //                ActionGroupName = t.ActionGroupName,
        //                ActionGroupGuid = t.ActionGroupGuid
        //            }).ToList();


        //        //them action
        //        int countactiongroup = 0;
        //        foreach (var temp in model.Controllers[countcontroller].ActionGroups)
        //        {
        //            model.Controllers[countcontroller].ActionGroups[countactiongroup].Actions =
        //                db.ManagePermission_ManageRoleForCode_nvngoc_GetAllByActionGroupGuidAndExsitInRoleDetailForCode(temp.ActionGroupGuid, idr).AsEnumerable();

        //            countactiongroup++;
        //        }

        //        countcontroller++;
        //    }


        //    //from u in db.AspNetUsers
        //    //where u.UserName != "admin"
        //    //join c in db.cont_Catologies on
        //    //    u.KhuVucGuid equals c.CatologyGuid
        //    //orderby c.CatologyName,u.UserName
        //    //select new UserEntities
        //    //{
        //    //    UserName = u.UserName,
        //    //    Email = u.Email,
        //    //    HoTen = u.HoTen,
        //    //    KhuVuc = c.CatologyName,
        //    //    UserId= u.Id
        //    //};

        //    return View(model);
        //}

        //public ActionResult AddConfigActionRoleForCode(string ida, string idr)
        //{
        //    db.ManagePermission_ManageRoleForCode_nvngoc_AddActionIntoRoleForCode(ida, idr);
        //    return RedirectToAction("ConfigActionRoleForCode", new { @idr = idr });
        //}

        //public ActionResult DeleteConfigActionRoleForCode(string ida, string idr)
        //{
        //    db.ManagePermission_ManageRoleForCode_nvngoc_DeleteActionIntoRoleForCode(ida, idr);
        //    return RedirectToAction("ConfigActionRoleForCode", new { @idr = idr });
        //}

        //#endregion


        #region Quan ly quyen user
        public ActionResult ManagePhanQuyenUser()
        {
            string id = "";
            if (Request["id"] != null)
                id = Request["id"].ToString();
            AspNetRoles item = db.AspNetRoles.Where(x => x.Id == id).FirstOrDefault();
            ViewBag.NhomQuyenName = item.Name + " (" + item.FullName + ")";
            return View();
        }


        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-11-12
        ///Last Modified: 		2015-11-12
        /// Gọi hàm tạo dữ liệu UserRoleDetailTemp
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost]
        public ActionResult InfoUserRoleDetailCreate(string id, string u)
        {
            CreateInfoUserRoleDetailView item = new CreateInfoUserRoleDetailView();
            if (db.ManagePermission_InfoUserRoleDetail_ntdai_Insert(id, u) > 0)
                return Json("ok", JsonRequestBehavior.AllowGet);
            else
                return Json("Error", JsonRequestBehavior.AllowGet);
        }
        #endregion
        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-11-12
        ///Last Modified: 		2015-11-12
        /// Xóa dữ liệu UserRoleDetailTemp và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult InfoUserRoleDetailDelete(string id, string u)
        {
            try
            {
                int flag = db.ManagePermission_InfoUserRoleDetail_ntdai_Delete(id, u);

            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-11-12
        ///Last Modified: 		2015-11-12
        /// Get list thông tin SanPham
        /// </summary>
        /// <returns></returns>
        public ActionResult InfoUserRoleDetailGet_List(int? page, string k, string id)
        {
            ViewData["keysearch"] = k;
            ViewData["id"] = id;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperInfoUserRoleDetail"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperInfoUserRoleDetail"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListInfoUserRoleDetailView> list = new List<ListInfoUserRoleDetailView>();
            list = db.ManagePermission_InfoUserRoleDetail_ntdai_SelectPage(currentPageIndex, DefaultPageSize, k, id).Select(x => new ListInfoUserRoleDetailView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperInfoUserRoleDetail");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageUserRoleDetail/InfoUserRoleDetail/_PartialList.cshtml", listPaged);
        }
        public ActionResult InfoUserRoleDetailGet_List_ChuaPhanQuyen(int? page, string k, string id)
        {
            ViewData["keysearch"] = k;
            ViewData["id"] = id;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperInfoUserRoleDetail"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperInfoUserRoleDetail"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListInfoUserRoleDetailView> list = new List<ListInfoUserRoleDetailView>();
            list = db.ManagePermission_InfoUserRoleDetail_ntdai_SelectPageNotForRole(currentPageIndex, DefaultPageSize, k, id).Select(x => new ListInfoUserRoleDetailView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperInfoUserRoleDetail");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageUserRoleDetail/InfoUserRoleDetail/_PartialList_ChuaPhanQuyen.cshtml", listPaged);
        }
        public ActionResult InfoUserRoleDetailGet_DanhSach(string id)
        {
            Guid guid = Guid.Empty;
            try
            {
                guid = new Guid(id);
            }
            catch { id = ""; }

            //Nếu rỗng
            if (id == "")
                return Content(@"<div class='alert alert-dismissable alert-danger'>
								<strong>Error!</strong> Dữ liệu không chính xác.
								<button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
							  </div>");
            return PartialView("~/Views/ManagePermission/ManageUserRoleDetail/InfoUserRoleDetail/_PartialDSInfoUserRoleDetail.cshtml");
        }
        public ActionResult InfoUserRoleDetailGet_DanhSach_UserChuaPhanQuyen(string id)
        {
            Guid guid = Guid.Empty;
            try
            {
                guid = new Guid(id);
            }
            catch { id = ""; }

            //Nếu rỗng
            if (id == "")
                return Content(@"<div class='alert alert-dismissable alert-danger'>
								<strong>Error!</strong> Dữ liệu không chính xác.
								<button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
							  </div>");
            return PartialView("~/Views/ManagePermission/ManageUserRoleDetail/InfoUserRoleDetail/_PartialDSInfoUserRoleDetail_ChuaPhanQuyen.cshtml");
        }


        #endregion

        #region Quan ly phan quyen chuc nang

        public ActionResult ManagePhanQuyenChucNang()
        {
            string id = "";
            if (Request["id"] != null)
                id = Request["id"].ToString();
            AspNetRoles item = db.AspNetRoles.Where(x => x.Id == id).FirstOrDefault();
            ViewBag.NhomQuyenName = item.Name + " (" + item.FullName + ")";
            return View();
        }
        public ActionResult InfoRoleDetailGet_DanhSach(string id)
        {
            ListInfoRoleDetailView item = new ListInfoRoleDetailView();
            if(User.IsInRole(ConstantVariable.Value_AspNetRoles_System))
            { 
            item.ListApp = db.ioiort_App.Select(x => new DropboxValue()
             {
                 ValueString = x.AppGuid,
                 Name = x.AppName
             }).ToList();
            }
            else
            {
                item.ListApp = db.ioiort_App.Where(x => x.AppGuid != ConstantVariable.Value_AppGuid_ManagePermission).Select(x => new DropboxValue()
                {
                    ValueString = x.AppGuid,
                    Name = x.AppName
                }).ToList();
            }
            item.ListApp.Insert(0, new DropboxValue(Guid.Empty.ToString(), 0, Guid.Empty, "-- Tất cả các app --"));

            item.ListModule = db.ioiort_Module.Where(x => x.AppGuid == item.AppGuid).Select(x => new DropboxValue()
            {
                ValueString = x.ModuleGuid,
                Name = x.ModuleName
            }).ToList();

            item.ListTrangThai = new List<DropboxValue>() { 
                new DropboxValue() 
            { ValueString = Guid.Empty.ToString(), Name = "-- Tất cả --" },
            new DropboxValue() { ValueString = "1", Name = "Kích hoạt" }, 
            new DropboxValue() { ValueString = "0", Name = "Chưa kích hoạt" } };
            Guid guid = Guid.Empty;
            try
            {
                guid = new Guid(id);
            }
            catch { id = ""; }
            item.page = 1;
            //Nếu rỗng
            if (id == "")
                return Content(@"<div class='alert alert-dismissable alert-danger'>
            							<strong>Error!</strong> Dữ liệu không chính xác.
            							<button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
            						  </div>");
            return PartialView("~/Views/ManagePermission/ManageRoleDetail/InfoRoleDetail/_PartialDSInfoRoleDetail.cshtml", item);
        }
        #region Create

        /// <summary>
        ///Author:   			hanhat
        ///Created: 			2015-11-18
        ///Last Modified: 		2015-11-18
        /// Gọi hàm tạo dữ liệu RoleDetailTemp
        /// </summary>
        /// <returns></returns>
        public ActionResult InfoRoleDetailCreate(string id)
        {
            CreateInfoRoleDetailView item = new CreateInfoRoleDetailView();
            item = InfoRoleDetailCreate_LoadDropDowList(item);
            //  item.NhanVienGuid = id;
            item.RoleForCodeGuid = Guid.NewGuid().ToString();
            return PartialView("~/Views/ManagePermission/ManageRoleDetail/InfoRoleDetail/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			hanhat
        ///Created: 			2015-11-18
        ///Last Modified: 		2015-11-18
        /// Gọi hàm tạo dữ liệu RoleDetailTemp
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult InfoRoleDetailCreate(string idRoleforcode, string idRole)
        {
            try
            {
                int save = 0;
                save = db.ManagePermission_InfoRoleDetail_hanhat_Insert(
                    idRoleforcode
                    , idRole
                     );

                if (save > 0)
                    return Json("ok", JsonRequestBehavior.AllowGet);

                else
                {
                    return Json("error", JsonRequestBehavior.AllowGet);

                }
            }
            catch
            {
                return Json("error", JsonRequestBehavior.AllowGet);
            }

        }

        /// <summary>
        ///Author:   			hanhat
        ///Created: 			2015-11-18
        ///Last Modified: 		2015-11-18
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateInfoRoleDetailView InfoRoleDetailCreate_LoadDropDowList(CreateInfoRoleDetailView item)
        {
            //.Where(x => x.IsActive == true).OrderBy(x => x.ThuTuHienThi).ThenBy(x => x.NhanThanName)



            return item;
        }
        #endregion



        public ActionResult InfoRoleDetailDelete(string idRoleforcode, string idRole)
        {
            try
            {
                int flag = db.ManagePermission_InfoRoleDetail_hanhat_Delete(idRoleforcode, idRole);
                return Json("ok", JsonRequestBehavior.AllowGet);

            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
        }


        [HttpPost]
        public ActionResult InfoRoleDetailGet_List(int? page, InfoRoleDetail modelView)
        {

            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            // xu ly du lieu tho
            page = modelView.page;
            if (string.IsNullOrEmpty(modelView.Key))
            {
                modelView.Key = "";
            }
            if (modelView.ModuleGuid == null)
            {
                modelView.ModuleGuid = Guid.Empty.ToString();
            }
            if (modelView.AppGuid == null)
            {
                modelView.AppGuid = Guid.Empty.ToString();
            }

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperInfoRoleDetail"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperInfoRoleDetail"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListInfoRoleDetailView> list = new List<ListInfoRoleDetailView>();
            // cai nay chua dua cai do tuoi vao
            if (User.IsInRole(ConstantVariable.Value_AspNetRoles_System))
            {
                list = db.ManagePermission_InfoRoleDetail_hanhat_SelectPage(
               currentPageIndex,
               DefaultPageSize,
               modelView.Key,
               modelView.AppGuid,
               modelView.ModuleGuid,
               modelView.RoleGuid,
               modelView.TrangThai
               ).Select(x => new ListInfoRoleDetailView(x)).ToList();

            }

            else { 
            list = db.ManagePermission_InfoRoleDetail_hanhat_SelectPage(
                currentPageIndex,
                DefaultPageSize,
                modelView.Key,
                modelView.AppGuid,
                modelView.ModuleGuid,
                modelView.RoleGuid,
                modelView.TrangThai
                ).Where(x => x.AppGuid != ConstantVariable.Value_AppGuid_ManagePermission).Select(x => new ListInfoRoleDetailView(x)).ToList();

}



            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();
            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperInfoRoleDetail");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageRoleDetail/InfoRoleDetail/_PartialList.cshtml", listPaged);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public ActionResult PageNumberSubmit(int? page)
        {
            int currentPageIndex = 1;
            if (page == null)
                currentPageIndex = Request.Cookies["pageperInfoRoleDetail"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperInfoRoleDetail"].Value);
            else
                currentPageIndex = page.Value;
            return JavaScript("PhanQuyenRole_ChucNang_ReSubmitFormSearch('" + currentPageIndex + "')");
        }


        [AcceptVerbs(HttpVerbs.Get)]
        [ActionName("DropdownListChange")]
        public ActionResult DropdownListChange(string value, string actionname)
        {
            if (String.IsNullOrEmpty(value))
            {
                throw new ArgumentNullException("value");
            }

            nvngoc29082015.permission.library.ManageRoleDetail.InfoRoleDetail item = new InfoRoleDetail();
            item.ListModule = db.ioiort_Module.Where(x => x.AppGuid == value).Select(x => new DropboxValue()
             {
                 ValueString = x.ModuleGuid,
                 Name = x.ModuleName
             }).ToList();




            item.ListModule.Insert(0, new DropboxValue(Guid.Empty.ToString(), 0, Guid.Empty, "-- Tất cả các module --"));
            return Json(item.ListModule, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Tạo mới user đề nghị cấp quyền
        public ActionResult Dashboards_YeuCauCapTaiKhoan(int? page)
        {
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = 1;
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListAspNetUsersView> list = new List<ListAspNetUsersView>();
            list = db.ManagePermission_AspNetUsers_ntdai_YeuCauCapTaiKhoan(currentPageIndex, DefaultPageSize, false).Select(x => new ListAspNetUsersView(x, true)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;

            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();


            return PartialView("_PartialYeuCauCapTaiKhoan", listPaged);
        }
        public ActionResult ManageCreateUser()
        { return View(); }
        public ActionResult ManageCreateUser_DanhSach()
        { return PartialView("~/Views/ManagePermission/KhoiTaoTaikhoan/_PartialTaoTaiKhoan.cshtml"); }
        public ActionResult Account_TimKiemUser(int? page, string key)
        {
            int DefaultPageSize = 20;
            int currentPageIndex = 1;

            // xu ly du lieu tho
            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperTaoTaiKhoan"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperTaoTaiKhoan"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListTimKiemTaiKhoanView> list = new List<ListTimKiemTaiKhoanView>();
            // cai nay chua dua cai do tuoi vao




            list = db.ManagePermission_AspNetUsersNhanVien_ntdai_SearchCreateAcount(
                currentPageIndex,
                DefaultPageSize,
                key
                ).Select(x => new ListTimKiemTaiKhoanView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();
            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperTaoTaiKhoan");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/KhoiTaoTaikhoan/_PartialList.cshtml", listPaged);
        }


        public ActionResult CreateUser_YeuCauTuHRM(string id, string ma)
        {
            HutechPermissionEntities dbhrm = new HutechPermissionEntities();
            ioiort_DeNghiCapTaikhoan denghi = dbhrm.ioiort_DeNghiCapTaikhoan.Where(x => x.NhanVienID == ma).FirstOrDefault();
            hrm_NhanVien_View nv = dbhrm.hrm_NhanVien_View.Where(x => x.NhanVienGuid == id).FirstOrDefault();

            if (ModelState.IsValid)
            {
                //sinh mat khau moi.
                string password = StringHelper.RandomPassword(6);

                byte[] pass = HashPasswordV2(password, _defaultRng);
                string passToDatabase = Convert.ToBase64String(pass);

                int save = db.ManagePermission_AspNetUsers_ntdai_Insert(id, denghi.NhanVienID, nv.Ho + " " + nv.TenLot + " " + nv.Ten, denghi.SoDienThoai, denghi.Email, nv.DonViGuid, passToDatabase, User.Identity.GetUserId(), nv.HinhAnhCaNhan_Link);//thay bằng giá trị settingdata guid của admin
                if (save > 0)//nếu lưu đã thành công
                {
                    try
                    {
                        var message = new MailMessage();
                        message.Subject = "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.";
                        //đọc nội dung từ 1 fiel html
                        message.Body = PopulateBody(denghi.NhanVienID, "HUTECH", password);
                        EmailService.SendMailAsync(
                             nv.EmailCaNhan,
                             ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_From],
                             "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.",
                             PopulateBody(nv.NhanVienID, "HUTECH", password),
                             null, //list file
                             null,
                             null,
                             null,
                             new EmailConfig(
                                 ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_UserName],
                                 ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Password],
                                 ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Host],
                                 Convert.ToInt16(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Port]),
                                 Convert.ToBoolean(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_EnableSSL]),
                                 true,
                                 Encoding.UTF8));

                        //cập nhật trạng thái đã send
                        db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(id, true);

                        return Json("ok", JsonRequestBehavior.AllowGet);
                    }
                    catch
                    {
                        //nếu có bất kỳ lỗi nào thì cập nhật lại là chưa send
                        db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(id, false);
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return Json("error", JsonRequestBehavior.AllowGet);
            // return View(model);
        }

        public ActionResult CreateUser_HRM(string id, string ma)
        {
            HutechPermissionEntities dbhrm = new HutechPermissionEntities();
            hrm_NhanVien_View nv = dbhrm.hrm_NhanVien_View.Where(x => x.NhanVienGuid == id).FirstOrDefault();

            if (ModelState.IsValid)
            {
                //sinh mat khau moi.
                string password = StringHelper.RandomPassword(6);

                byte[] pass = HashPasswordV2(password, _defaultRng);
                string passToDatabase = Convert.ToBase64String(pass);

                int save = db.ManagePermission_AspNetUsers_ntdai_Insert(id, nv.NhanVienID, nv.Ho + " " + nv.TenLot + " " + nv.Ten, nv.SoDienThoaiDiDong, nv.EmailCaNhan, nv.DonViGuid, passToDatabase, User.Identity.GetUserId(), nv.HinhAnhCaNhan_Link);//thay bằng giá trị settingdata guid của admin
                if (save > 0)//nếu lưu đã thành công
                {
                    try
                    {
                        var message = new MailMessage();
                        message.Subject = "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.";
                        //đọc nội dung từ 1 fiel html
                        message.Body = PopulateBody(nv.NhanVienID, "HUTECH", password);

                        EmailService.SendMailAsync(
                            nv.EmailCaNhan,
                            ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_From],
                            "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.",
                            PopulateBody(nv.NhanVienID, "HUTECH", password),
                            null, //list file
                            null,
                            null,
                            null,
                            new EmailConfig(
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_UserName],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Password],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Host],
                                Convert.ToInt16(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Port]),
                                Convert.ToBoolean(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_EnableSSL]),
                                true,
                                Encoding.UTF8));


                        //cập nhật trạng thái đã send
                        db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(id, true);

                        return Json("ok", JsonRequestBehavior.AllowGet);
                    }
                    catch
                    {
                        //nếu có bất kỳ lỗi nào thì cập nhật lại là chưa send
                        db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(id, false);
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return Json("error", JsonRequestBehavior.AllowGet);
            // return View(model);
        }

        public ActionResult UdateUserSendEmail_YeuCauTuHRM(string id, string ma)
        {
            HutechPermissionEntities dbhrm = new HutechPermissionEntities();
            ioiort_DeNghiCapTaikhoan denghi = dbhrm.ioiort_DeNghiCapTaikhoan.Where(x => x.NhanVienID == ma).FirstOrDefault();
            hrm_NhanVien_View nv = dbhrm.hrm_NhanVien_View.Where(x => x.NhanVienGuid == id).FirstOrDefault();
            if (ModelState.IsValid)
            {
                //sinh mat khau moi.
                string password = StringHelper.RandomPassword(6);

                byte[] pass = HashPasswordV2(password, _defaultRng);
                string passToDatabase = Convert.ToBase64String(pass);

                int save = db.ManagePermission_AspNetUsers_ntdai_Update(id, denghi.NhanVienID, nv.Ho + " " + nv.TenLot + " " + nv.Ten, denghi.SoDienThoai, denghi.Email, nv.DonViGuid, nv.HinhAnhCaNhan_Link);
                if (save > 0)//nếu lưu đã thành công
                {
                    try
                    {
                        var message = new MailMessage();
                        message.Subject = "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.";
                        //đọc nội dung từ 1 fiel html
                        message.Body = PopulateBody(denghi.NhanVienID, "HUTECH", password);
                        EmailService.SendMailAsync(
                            nv.EmailCaNhan,
                            ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_From],
                            "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.",
                            PopulateBody(nv.NhanVienID, "HUTECH", password),
                            null, //list file
                            null,
                            null,
                            null,
                            new EmailConfig(
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_UserName],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Password],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Host],
                                Convert.ToInt16(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Port]),
                                Convert.ToBoolean(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_EnableSSL]),
                                true,
                                Encoding.UTF8));

                        //cập nhật trạng thái đã send
                        db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(id, true);

                        return Json("ok", JsonRequestBehavior.AllowGet);
                    }
                    catch
                    {
                        //nếu có bất kỳ lỗi nào thì cập nhật lại là chưa send
                        db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(id, false);
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            //   return View(model);
            return Json("error", JsonRequestBehavior.AllowGet);
        }






        #endregion

        #region Quản lý nhóm quyền
        public ActionResult ManageGroupRole()
        {
            return View();
        }
        public ActionResult ManageGroupRoleDetail()
        {
            string id = "";
            if (Request["id"] != null)
                id = Request["id"].ToString();
            ioiort_GroupRole item = db.ioiort_GroupRole.Where(x => x.AspNetRoleGroupGuid == id).FirstOrDefault();
            ViewBag.NhomQuyenName = item.GroupAspNetRoleName + " (" + item.AspNetRoleGroupID + ")";

            return View();
        }
        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu GroupRole
        /// </summary>
        /// <returns></returns>
        public ActionResult GroupRoleCreate()
        {
            CreateGroupRoleView item = new CreateGroupRoleView();
            item = GroupRoleCreate_LoadDropDowList(item);
            item.IsActive = false;
            item.AspNetRoleGroupGuid = Guid.NewGuid().ToString();
            return View("GroupRoleCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult GroupRoleCreate(CreateGroupRoleView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                db.ioiort_GroupRole.Add(item.ToGroupRole(User.Identity.GetUserId()));
                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageGroupRole_GroupRole_ReLoadAjaxPartial('" + item.AspNetRoleGroupGuid + "')");
                else
                {
                    item = GroupRoleCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageGroupRole/_PartialCreate.cshtml", item);
                }
            }
            item = GroupRoleCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageGroupRole/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateGroupRoleView GroupRoleCreate_LoadDropDowList(CreateGroupRoleView item)
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
        /// Gọi sự kiện load edit GroupRole
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GroupRoleEdit(string id)
        {
            ioiort_GroupRole s = db.ioiort_GroupRole.Find(id);
            UpdateGroupRoleView item = new UpdateGroupRoleView(s);
            item = GroupRoleUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("GroupRoleEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit GroupRole
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult GroupRoleEdit(UpdateGroupRoleView item)
        {
            if (ModelState.IsValid)
            {

                int save = 0;
                var entry = db.Entry(item.ToGroupRole(User.Identity.GetUserId()));//.State = EntityState.Modified;


                entry.State = EntityState.Modified;
                entry.Property(e => e.CreatedDate).IsModified = false;
                entry.Property(e => e.CreatedUser).IsModified = false;


                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageGroupRole_GroupRole_ReLoadAjaxPartial('" + item.AspNetRoleGroupGuid + "')");
                else
                {
                    item = GroupRoleUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageGroupRole/_PartialEdit.cshtml", item);
                }
            }
            item = GroupRoleUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageGroupRole/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateGroupRoleView GroupRoleUpdate_LoadDropDowList(UpdateGroupRoleView item)
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
        /// Xóa dữ liệu GroupRole và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GroupRoleDelete(string id)
        {
            try
            {
                ioiort_GroupRole item = db.ioiort_GroupRole.Find(id);
                db.ioiort_GroupRole.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
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
        /// Get list thông tin GroupRole
        /// </summary>
        /// <returns></returns>
        public ActionResult GroupRoleGet_List(int? page, string k)
        {
            ViewData["keysearch"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageGroupRole"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageGroupRole"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListGroupRoleView> list = new List<ListGroupRoleView>();
            list = db.ManagePermission_ManageGroupRole_ntdai_SelectPage(currentPageIndex, DefaultPageSize, k).Select(x => new ListGroupRoleView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageGroupRole");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageGroupRole/_PartialList.cshtml", listPaged);
        }





        #endregion

        #region Quan lý chi tiết nhóm quyền

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu GroupRoleDetail
        /// </summary>
        /// <returns></returns>

        public ActionResult GroupRoleDetailAdd(string id, string gr)
        {
            CreateGroupRoleDetailView item = new CreateGroupRoleDetailView();
            item.GroupRoleDetailGuid = Guid.NewGuid().ToString();
            item.AspNetRoleGroupGuid = gr;
            item.id = id;
            item.CreatedDate = DateTime.Now;
            item.CreatedUser = "";

            if (ModelState.IsValid)
            {
                int save = 0;
                db.ioiort_GroupRoleDetail.Add(item.ToGroupRoleDetail(User.Identity.GetUserId()));
                save = db.SaveChanges();
                if (save > 0)
                    return Json("ok", JsonRequestBehavior.AllowGet);

            }
            return Json("error", JsonRequestBehavior.AllowGet);
        }

        #endregion




        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Xóa dữ liệu GroupRoleDetail và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GroupRoleDetailDelete(string id)
        {
            try
            {
                ioiort_GroupRoleDetail item = db.ioiort_GroupRoleDetail.Find(id);
                db.ioiort_GroupRoleDetail.Remove(item);
                int flag = db.SaveChanges();
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Get list thông tin GroupRoleDetail
        /// </summary>
        /// <returns></returns>
        public ActionResult GroupRoleGetDetailDaChon_List(int? page, string k, string idnv)
        {
            ViewData["keysearchdachon"] = k;
            ViewData["idnvdachon"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageGroupRoleDetailDaChon"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageGroupRoleDetailDaChon"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListGroupRoleDetailView> list = new List<ListGroupRoleDetailView>();
            list = db.ManagePermission_ManageGroupRoleDetailDaChon_ntdai_SelectPage(currentPageIndex, DefaultPageSize, k, idnv).Select(x => new ListGroupRoleDetailView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageGroupRoleDetailDaChon");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageGroupRoleDetail/_PartialListDaChon.cshtml", listPaged);
        }
        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Get list thông tin GroupRoleDetail
        /// </summary>
        /// <returns></returns>
        public ActionResult GroupRoleGetDetailChuaChon_List(int? page, string k, string idnv)
        {
            ViewData["keysearchchuachon"] = k;
            ViewData["idnvchuachon"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageGroupRoleDetailChuaChon"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageGroupRoleDetailChuaChon"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListGroupRoleDetailView> list = new List<ListGroupRoleDetailView>();
            list = db.ManagePermission_ManageGroupRoleDetailChuaChon_ntdai_SelectPage(currentPageIndex, DefaultPageSize, k, idnv,User.Identity.GetUserId()).Select(x => new ListGroupRoleDetailView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageGroupRoleDetailChuaChon");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageGroupRoleDetail/_PartialListChuaChon.cshtml", listPaged);
        }


        public ActionResult GroupRoleGetDetailChuaChon_DanhSach(string id)
        {
            Guid guid = Guid.Empty;
            try
            {
                guid = new Guid(id);
                //Kiểm tra đúng định dạng guid
                //chỗ này có thể check tồn tại item gốc thí dụ NhanVien
            }
            catch { id = ""; }

            //Nếu rỗng
            if (id == "")
                return Content(@"<div class='alert alert-dismissable alert-danger'>
								<strong>Error!</strong> Dữ liệu không chính xác.
								<button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
							  </div>");
            return PartialView("~/Views/ManagePermission/ManageGroupRole/_PartialPageDanhSachChuaChon.cshtml");
        }
        public ActionResult GroupRoleGetDetailDaChon_DanhSach(string id)
        {
            Guid guid = Guid.Empty;
            try
            {
                guid = new Guid(id);
                //Kiểm tra đúng định dạng guid
                //chỗ này có thể check tồn tại item gốc thí dụ NhanVien
            }
            catch { id = ""; }

            //Nếu rỗng
            if (id == "")
                return Content(@"<div class='alert alert-dismissable alert-danger'>
								<strong>Error!</strong> Dữ liệu không chính xác.
								<button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
							  </div>");
            return PartialView("~/Views/ManagePermission/ManageGroupRole/_PartialPageDanhSachDaChon.cshtml");
        }
        #endregion

        #region role for code tvchuong
        public ActionResult ManageRoleForCode()
        {
            List<DropboxValue> listApp = db.ioiort_App.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.AppGuid,
                Name = x.AppName
            }).ToList();
            listApp.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn App ---"));
            ViewBag.ListApp = listApp;
            List<DropboxValue> listModule = db.ioiort_Module.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ModuleGuid,
                Name = x.ModuleName
            }).ToList();
            listModule.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn Module ---"));
            ViewBag.ListModule = listModule;


            return View();
        }
        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu RoleForCode
        /// </summary>
        /// <returns></returns>
        public ActionResult RoleForCodeCreate()
        {
            CreateRoleForCodeView item = new CreateRoleForCodeView();
            item = RoleForCodeCreate_LoadDropDowList(item);
            item.RoleForCodeGuid = Guid.NewGuid().ToString();
            return View("RoleForCodeCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult RoleForCodeCreate(CreateRoleForCodeView item)
        {
            if (ModelState.IsValid)
            {
                ioiort_RoleForCode item1 = db.ioiort_RoleForCode.ToList().Where(x => x.RoleForCodeName.Trim().ToUpper() == item.RoleForCodeName.Trim().ToUpper()).FirstOrDefault();
                if (item1 != null)
                {
                    return JavaScript("DialogAlert('','Roleforcode đã có trong cơ sở dữ liệu!', 'error')");
                }
                int save = 0;
                db.ioiort_RoleForCode.Add(item.ToRoleForCode(User.Identity.GetUserId()));
                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageRoleForCode_RoleForCode_ReLoadAjaxPartial('" + item.RoleForCodeGuid + "')");
                else
                {
                    item = RoleForCodeCreate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageRoleForCode/_PartialCreate.cshtml", item);
                }
            }
            item = RoleForCodeCreate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageRoleForCode/_PartialCreate.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateRoleForCodeView RoleForCodeCreate_LoadDropDowList(CreateRoleForCodeView item)
        {
            item.ListModuleGuid = db.ioiort_Module.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ModuleGuid,
                Name = x.ModuleName
            }).ToList();
            item.ListModuleGuid.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn Module ---"));
            return item;
        }
        #endregion

        #region Update

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi sự kiện load edit RoleForCode
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult RoleForCodeEdit(string id)
        {
            ioiort_RoleForCode s = db.ioiort_RoleForCode.Find(id);
            UpdateRoleForCodeView item = new UpdateRoleForCodeView(s);
            item = RoleForCodeUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("RoleForCodeEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit RoleForCode
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult RoleForCodeEdit(UpdateRoleForCodeView item)
        {
            if (ModelState.IsValid)
            {
                int item1 = db.ManagePermission_ManageRoleForCode_tvchuong_KiemTraTonTaiRoleForCode(item.RoleForCodeGuid, item.RoleForCodeName).FirstOrDefault().Value;
                if (item1 > 0)
                {
                    return JavaScript("DialogAlert('','Roleforcode đã có trong cơ sở dữ liệu!', 'error')");
                }

                int save = 0;
                var entry = db.Entry(item.ToRoleForCode(User.Identity.GetUserId()));

                entry.State = EntityState.Modified;
                entry.Property(e => e.CreatedDate).IsModified = false;
                entry.Property(e => e.CreatedUser).IsModified = false;

                save = db.SaveChanges();
                if (save > 0)
                    return JavaScript("ManageRoleForCode_RoleForCode_ReLoadAjaxPartial('" + item.RoleForCodeGuid + "')");
                else
                {
                    item = RoleForCodeUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageRoleForCode/_PartialEdit.cshtml", item);
                }
            }
            item = RoleForCodeUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageRoleForCode/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateRoleForCodeView RoleForCodeUpdate_LoadDropDowList(UpdateRoleForCodeView item)
        {
            item.ListModuleGuid = db.ioiort_Module.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ModuleGuid,
                Name = x.ModuleName
            }).ToList();
            item.ListModuleGuid.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--- Chọn Module ---"));
            return item;
        }
        #endregion


        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Xóa dữ liệu RoleForCode và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult RoleForCodeDelete(string id)
        {
            try
            {
                ioiort_RoleForCode item = db.ioiort_RoleForCode.Find(id);
                db.ioiort_RoleForCode.Remove(item);
                int flag = db.SaveChanges();
                if (flag > 0)
                {
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
        /// Get list thông tin RoleForCode
        /// </summary>
        /// <returns></returns>
        public ActionResult RoleForCodeGet_List(int? page, string k)
        {
            ViewData["keysearch"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            string keysearch = "";
            string appguid = null;
            string moduleguid = null;
            try
            {
                string[] str = k.Split('_');
                keysearch = str[0];
                appguid = string.IsNullOrEmpty(str[1]) ? null : str[1];
                moduleguid = string.IsNullOrEmpty(str[2]) ? null : str[2];
            }
            catch (Exception ex)
            {
                //LoggingService.LogError("QuanLyNhanSu", ex, LoggingService.ErrorCategory, false);
            }

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageRoleForCode"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageRoleForCode"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListRoleForCodeView> list = new List<ListRoleForCodeView>();
            list = db.ManagePermission_ManageRoleForCode_tvchuong_SelectPage(currentPageIndex, DefaultPageSize, keysearch, appguid, moduleguid).Select(x => new ListRoleForCodeView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageRoleForCode");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageRoleForCode/_PartialList.cshtml", listPaged);
        }

        public ActionResult LoadActionByroleForCode_List(string id)
        {
            List<ListActionInRoleForCode> item = new List<ListActionInRoleForCode>();
            item = db.ManagePermission_ManageRoleForCode_tvchuong_GetListActionOfRoleForCode(id).Select(x => new ListActionInRoleForCode(x)).ToList();
            if (item == null)
                return HttpNotFound();
            ViewBag.TotalItemCount = item.Count;
            return PartialView("~/Views/ManagePermission/ManageRoleForCode/_PartialThongTinAction.cshtml", item);
        }

        #region config roleforcode
        public ActionResult ManageRoleForCodeConfigAction(string id)
        {
            List<DropboxValue> listActionGroup = db.ioiort_ActionGroup.Where(x => x.IsActive == true).OrderBy(x => x.ActionGroupName).Select(x => new DropboxValue()
            {
                ValueString = x.ActionGroupGuid,
                Name = x.ActionGroupName
            }).ToList();
            listActionGroup.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--GroupAction ---"));
            ViewBag.ListGroup = listActionGroup;
            List<DropboxValue> listControlerGroup = db.ioiort_Controller.Where(x => x.IsActive == true).Select(x => new DropboxValue()
            {
                ValueString = x.ControllerGuid,
                Name = x.ControllerName
            }).ToList();
            listControlerGroup.Insert(0, new DropboxValue(null, 0, Guid.Empty, "--Controler ---"));
            ViewBag.ListControler = listControlerGroup;
            return View();
        }
        public ActionResult RoleForCodeConfigAction_List(int? page, string id, string k)
        {
            if (id == null)
                id = Guid.Empty.ToString();
            ViewData["keysearch"] = k;
            ViewData["id"] = id;

            string keysearch = "";
            string cotrolerguid = null;
            string groupguid = null;
            int icheck = 0;
            try
            {
                string[] str = k.Split('_');
                keysearch = str[0];
                cotrolerguid = string.IsNullOrEmpty(str[1]) ? null : str[1];
                groupguid = string.IsNullOrEmpty(str[2]) ? null : str[2];
                icheck = string.IsNullOrEmpty(str[3]) ? 0 : Convert.ToInt32(str[3]);
            }
            catch (Exception ex)
            {
                //LoggingService.LogError("QuanLyNhanSu", ex, LoggingService.ErrorCategory, false);
            }
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageRoleForCodeAction"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageRoleForCodeAction"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListActionConfigRoleForCode> list = new List<ListActionConfigRoleForCode>();
            list = db.ManagePermission_ManageRoleForCode_tvchuong_ActionConfigSelectPage(currentPageIndex, DefaultPageSize, keysearch, groupguid, cotrolerguid, id, icheck).Select(x => new ListActionConfigRoleForCode(x)).ToList();
            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageRoleForCodeAction");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageRoleForCode/_PartialListAction.cshtml", listPaged);
        }

        public ActionResult RoleForCodeConfigDelete(string id, string iddelete)
        {
            try
            {
                int item = db.ManagePermission_ManageRoleForCode_tvchuong_DeleteConfigRoleForCode(id, iddelete);
                if (item > 0)
                    Json("ok", JsonRequestBehavior.AllowGet);
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
        public ActionResult RoleForCodeConfigInsert(string id, string idinsert)
        {
            try
            {
                int item = db.ManagePermission_ManageRoleForCode_tvchuong_InsertConfigRoleForCode(id, idinsert, User.Identity.GetUserId());
                if (item > 0)
                    Json("ok", JsonRequestBehavior.AllowGet);
                else
                    Json("failed", JsonRequestBehavior.AllowGet);
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
        #endregion
        #endregion

        #region Phân cấp user
        public ActionResult ManagePhanCapUser()
        {
            string id = "";
            if (Request["id"] != null)
                id = Request["id"].ToString();
            AspNetUsers_Sub item = db.AspNetUsers_Sub.Where(x => x.UserId == id).FirstOrDefault();
            ViewBag.UserDangPhanCap = item.NguoiDungName + " (" + item.NguoiDungID + ")";
            return View();
        }


        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-11-12
        ///Last Modified: 		2015-11-12
        /// Gọi hàm tạo dữ liệu UserRoleDetailTemp
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost]
        public ActionResult ManagePhanCapUserCreate(string id, string u)
        {
            CreateInfoUserRoleDetailView item = new CreateInfoUserRoleDetailView();
            if (db.ManagePermission_ManagePhanCapUser_ntdai_Insert(u, id) > 0)
                return Json("ok", JsonRequestBehavior.AllowGet);
            else
                return Json("Error", JsonRequestBehavior.AllowGet);
        }



        #endregion




        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-11-12
        ///Last Modified: 		2015-11-12
        /// Xóa dữ liệu UserRoleDetailTemp và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ManagePhanCapUserDelete(string id, string u)
        {
            try
            {
                int flag = db.ManagePermission_ManagePhanCapUser_ntdai_Delete(u, id);

            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-11-12
        ///Last Modified: 		2015-11-12
        /// Get list thông tin SanPham
        /// </summary>
        /// <returns></returns>
        public ActionResult ManagePhanCapUserGet_List(int? page, string k, string id)
        {
            ViewData["keysearch"] = k;
            ViewData["id"] = id;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManagePhanCapUser"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManagePhanCapUser"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListInfoUserRoleDetailView> list = new List<ListInfoUserRoleDetailView>();
            list = db.ManagePermission_ManagePhanCapUser_ntdai_SelectPage(currentPageIndex, DefaultPageSize, k, id).Select(x => new ListInfoUserRoleDetailView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManagePhanCapUser");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/PhanCapUser/_PartialList.cshtml", listPaged);
        }
        public ActionResult ManagePhanCapUserGet_List_ChuaPhanQuyen(int? page, string k, string id)
        {
            ViewData["keysearch"] = k;
            ViewData["id"] = id;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManagePhanCapUserChua"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManagePhanCapUserChua"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListInfoUserRoleDetailView> list = new List<ListInfoUserRoleDetailView>();
            list = db.ManagePermission_ManagePhanCapUser_ntdai_SelectPageNotForRole(currentPageIndex, DefaultPageSize, k, id).Select(x => new ListInfoUserRoleDetailView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManagePhanCapUserChua");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/PhanCapUser/_PartialList_ChuaPhanQuyen.cshtml", listPaged);
        }
        public ActionResult ManagePhanCapUserGet_DanhSach(string id)
        {
            Guid guid = Guid.Empty;
            try
            {
                guid = new Guid(id);
            }
            catch { id = ""; }

            //Nếu rỗng
            if (id == "")
                return Content(@"<div class='alert alert-dismissable alert-danger'>
								<strong>Error!</strong> Dữ liệu không chính xác.
								<button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
							  </div>");
            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/PhanCapUser/_PartialDSInfoUserRoleDetail.cshtml");
        }
        public ActionResult ManagePhanCapUserGet_DanhSach_UserChuaPhanQuyen(string id)
        {
            Guid guid = Guid.Empty;
            try
            {
                guid = new Guid(id);
            }
            catch { id = ""; }

            //Nếu rỗng
            if (id == "")
                return Content(@"<div class='alert alert-dismissable alert-danger'>
								<strong>Error!</strong> Dữ liệu không chính xác.
								<button aria-hidden='true' data-dismiss='alert' class='close' type='button'>×</button>
							  </div>");
            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/PhanCapUser/_PartialDSInfoUserRoleDetail_ChuaPhanQuyen.cshtml");
        }


        #endregion

        #region Quan Ly User
        public ActionResult ManageAspNetUsers()
        {
            return View();
        }

        #region Create

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi hàm tạo dữ liệu AspNetUsers
        /// </summary>
        /// <returns></returns>
        public ActionResult AspNetUsersCreate()
        {
            CreateAspNetUsersView item = new CreateAspNetUsersView();
            item = AspNetUsersCreate_LoadDropDowList(item);
            item.Id = Guid.NewGuid().ToString();
            return View("AspNetUsersCreate", item);
        }
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult AspNetUsersCreate(CreateAspNetUsersView item)
        {
            if (ModelState.IsValid)
            {
                // HutechPermissionEntities dbhrm = new HutechPermissionEntities();

                if (ModelState.IsValid)
                {
                    string linkhinh = "";
                    hrm_NhanVien_View nv = db.hrm_NhanVien_View.Where(x => x.NhanVienID == item.UserName.Trim()).FirstOrDefault();
                    if (nv != null)//nếu mà có nhân viên thì lấy đúng id của nhân viên đó
                    {
                        linkhinh = nv.HinhAnhCaNhan_Link;
                        item.Id = nv.NhanVienGuid;
                        item.DonViGuid = nv.DonViGuid;
                    }

                    AspNetUsers user = db.AspNetUsers.Where(x => x.UserName.Trim() == item.UserName.Trim() || x.Email.Trim() == item.Email.Trim()).FirstOrDefault();
                    if (user != null)
                    {
                        return JavaScript("DialogAlert('', 'Tên đăng nhập hoặc email đã tồn tại!', 'error');");
                    }



                    //sinh mat khau moi.
                    string password = StringHelper.RandomPassword(6);

                    byte[] pass = HashPasswordV2(password, _defaultRng);
                    string passToDatabase = Convert.ToBase64String(pass);


                    int save = db.ManagePermission_AspNetUsers_ntdai_Insert(item.Id, item.UserName, item.NguoiDungName, item.PhoneNumber, item.Email, item.DonViGuid, passToDatabase, User.Identity.GetUserId(), linkhinh);//parent goid lấy từ setttingdata
                    if (save > 0)//nếu lưu đã thành công
                    {
                        try
                        {
                            var message = new MailMessage();
                            message.Subject = "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.";
                            //đọc nội dung từ 1 fiel html
                            message.Body = PopulateBody(item.UserName, "HUTECH", password);
                            EmailService.SendMailAsync(
                            nv.EmailCaNhan,
                            ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_From],
                            "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.",
                            PopulateBody(nv.NhanVienID, "HUTECH", password),
                            null, //list file
                            null,
                            null,
                            null,
                            new EmailConfig(
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_UserName],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Password],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Host],
                                Convert.ToInt16(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Port]),
                                Convert.ToBoolean(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_EnableSSL]),
                                true,
                                Encoding.UTF8));

                            //cập nhật trạng thái đã send
                            db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(item.Id, true);

                            return JavaScript("ManageAspNetUsers_AspNetUsers_ReLoadAjaxPartial('" + item.Id + "')");
                        }
                        catch
                        {
                            //nếu có bất kỳ lỗi nào thì cập nhật lại là chưa send
                            db.ManagePermission_AspNetUsers_sub_ntdai_UpdateSendedEmail(item.Id, false);
                            return JavaScript("DialogAlert('', 'Có lỗi trong quá trình Gửi Email!', 'Error');");
                        }
                    }
                }

            }
            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/_PartialCreate.cshtml", item);
        }
        #region Các phương thức mã hóa passs

        private static bool VerifyHashedPasswordV2(byte[] hashedPassword, string password)
        {
            const KeyDerivationPrf Pbkdf2Prf = KeyDerivationPrf.HMACSHA1; // default for Rfc2898DeriveBytes
            const int Pbkdf2IterCount = 1000; // default for Rfc2898DeriveBytes
            const int Pbkdf2SubkeyLength = 256 / 8; // 256 bits
            const int SaltSize = 128 / 8; // 128 bits

            // We know ahead of time the exact length of a valid hashed password payload.
            if (hashedPassword.Length != 1 + SaltSize + Pbkdf2SubkeyLength)
            {
                return false; // bad size
            }

            byte[] salt = new byte[SaltSize];
            Buffer.BlockCopy(hashedPassword, 1, salt, 0, salt.Length);

            byte[] expectedSubkey = new byte[Pbkdf2SubkeyLength];
            Buffer.BlockCopy(hashedPassword, 1 + salt.Length, expectedSubkey, 0, expectedSubkey.Length);

            // Hash the incoming password and verify it
            byte[] actualSubkey = KeyDerivation.Pbkdf2(password, salt, Pbkdf2Prf, Pbkdf2IterCount, Pbkdf2SubkeyLength);
            return ByteArraysEqual(actualSubkey, expectedSubkey);
        }

        // Compares two byte arrays for equality. The method is specifically written so that the loop is not optimized.
        [MethodImpl(MethodImplOptions.NoInlining | MethodImplOptions.NoOptimization)]
        private static bool ByteArraysEqual(byte[] a, byte[] b)
        {
            if (a == null && b == null)
            {
                return true;
            }
            if (a == null || b == null || a.Length != b.Length)
            {
                return false;
            }
            var areSame = true;
            for (var i = 0; i < a.Length; i++)
            {
                areSame &= (a[i] == b[i]);
            }
            return areSame;
        }

        //var hash = await store.GetPasswordHashAsync(user, CancellationToken);

        private static readonly RandomNumberGenerator _defaultRng = RandomNumberGenerator.Create(); // secure PRNG
        private static byte[] HashPasswordV2(string password, RandomNumberGenerator rng)
        {
            const KeyDerivationPrf Pbkdf2Prf = KeyDerivationPrf.HMACSHA1; // default for Rfc2898DeriveBytes
            const int Pbkdf2IterCount = 1000; // default for Rfc2898DeriveBytes
            const int Pbkdf2SubkeyLength = 256 / 8; // 256 bits
            const int SaltSize = 128 / 8; // 128 bits

            // Produce a version 2 (see comment above) text hash.
            byte[] salt = new byte[SaltSize];
            rng.GetBytes(salt);
            byte[] subkey = KeyDerivation.Pbkdf2(password, salt, Pbkdf2Prf, Pbkdf2IterCount, Pbkdf2SubkeyLength);

            var outputBytes = new byte[1 + SaltSize + Pbkdf2SubkeyLength];
            outputBytes[0] = 0x00; // format marker
            Buffer.BlockCopy(salt, 0, outputBytes, 1, SaltSize);
            Buffer.BlockCopy(subkey, 0, outputBytes, 1 + SaltSize, Pbkdf2SubkeyLength);
            return outputBytes;
        }


        #endregion
        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Load các dữ liệu dropdownlist 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private CreateAspNetUsersView AspNetUsersCreate_LoadDropDowList(CreateAspNetUsersView item)
        {
            item.ListDonVi = db.cb_DonVi.Select(x => new DropboxValue()
            {
                ValueString = x.DonViGuid,
                Name = x.DonViName
            }).ToList();
            return item;
        }
        #endregion

        #region Update

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Gọi sự kiện load edit AspNetUsers
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult AspNetUsersEdit(string id)
        {
            nvngoc29082015.permission.library.Models.AspNetUsers s = db.AspNetUsers.Find(id);
            nvngoc29082015.permission.library.Models.AspNetUsers_Sub ssub = db.AspNetUsers_Sub.Find(id);
            UpdateAspNetUsersView item = new UpdateAspNetUsersView(s, ssub);
            item = AspNetUsersUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("AspNetUsersEdit", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Lưu dữ liệu edit AspNetUsers
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult AspNetUsersEdit(UpdateAspNetUsersView item)
        {
            if (ModelState.IsValid)
            {
                int save = 0;
                hrm_NhanVien_View nv = db.hrm_NhanVien_View.Where(x => x.NhanVienGuid == item.Id).FirstOrDefault();
                string link = "";
                if (nv != null)
                    link = nv.HinhAnhCaNhan_Link;

                save = db.ManagePermission_AspNetUsers_ntdai_Update(item.Id, item.UserName, item.NguoiDungName, item.PhoneNumber, item.Email, item.DonViGuid, link);
                if (save > 0)
                    return JavaScript("ManageAspNetUsers_AspNetUsers_ReLoadAjaxPartial('" + item.Id + "')");
                else
                {
                    item = AspNetUsersUpdate_LoadDropDowList(item);
                    return PartialView("~/Views/ManagePermission/ManageAspNetUsers/_PartialEdit.cshtml", item);
                }
            }
            item = AspNetUsersUpdate_LoadDropDowList(item);
            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/_PartialEdit.cshtml", item);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14
        /// Load các dropdownlist update
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private UpdateAspNetUsersView AspNetUsersUpdate_LoadDropDowList(UpdateAspNetUsersView item)
        {
            item.ListDonVi = db.cb_DonVi.Select(x => new DropboxValue()
            {
                ValueString = x.DonViGuid,
                Name = x.DonViName
            }).OrderBy(x => x.Name).ToList();
            return item;
        }
        #endregion

        #region Details
        public ActionResult AspNetUsersDetail(string id)
        {
            nvngoc29082015.permission.library.Models.AspNetUsers s = db.AspNetUsers.Find(id);
            nvngoc29082015.permission.library.Models.AspNetUsers_Sub ssub = db.AspNetUsers_Sub.Find(id);
            UpdateAspNetUsersView item = new UpdateAspNetUsersView(s, ssub);
            item = AspNetUsersUpdate_LoadDropDowList(item);
            if (item == null)
                return HttpNotFound();
            return View("AspNetUsersDetail", item);
        }
        #endregion

        #region Khôi Phục
        public ManagePermissionController()
            : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
        }

        public ManagePermissionController(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }

        public UserManager<ApplicationUser> UserManager { get; private set; }


        public ActionResult AspNetUsersDoiMatKhau(string id)
        {
            nvngoc29082015.permission.library.Models.AspNetUsers s = db.AspNetUsers.Find(id);
            nvngoc29082015.permission.library.Models.AspNetUsers_Sub ssub = db.AspNetUsers_Sub.Find(id);
            UpdateAspNetUsersView item = new UpdateAspNetUsersView(s, ssub);
            item = AspNetUsersUpdate_LoadDropDowList(item);
            item.PasswordHash = "";
            if (item == null)
                return HttpNotFound();
            return View("AspNetUsersDoiMatKhau", item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AspNetUsersDoiMatKhau(UpdateAspNetUsersView model)
        {
            string pass = model.PasswordHash;
            UserManager.RemovePassword(model.Id);
            IdentityResult result = UserManager.AddPassword(model.Id, pass);
            return JavaScript("DialogAlert('', 'Đổi mật khẩu thành công', 'success');");
        }

        public ActionResult ForgotPassword(string id, string pn, bool s)
        {

            //mật khẩu mặc định
            string pass = StringHelper.RandomPassword(6);
            if (!s)
            { pass = pn; }
            byte[] passnew = HashPasswordV2(pass, _defaultRng);
            string passToDatabase = Convert.ToBase64String(passnew);

            db.ManagePermission_AspNetUsers_ntdai_ForgotPassword(id, passToDatabase);

            if (s)
            {

                AspNetUsers u = db.AspNetUsers.Where(x => x.Id == id).FirstOrDefault();
                try
                {
                    EmailService.SendMailAsync(
                            u.Email,
                            ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_From],
                            "[HUTECH] Tài khoản đăng nhập hệ thống nội bộ.",
                            PopulateBody(u.UserName, "HUTECH", pass),
                            null, //list file
                            null,
                            null,
                            null,
                            new EmailConfig(
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_UserName],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Password],
                                ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Host],
                                Convert.ToInt16(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_Port]),
                                Convert.ToBoolean(ConfigurationManager.AppSettings[ConfigurationConstant.ResetPass_EnableSSL]),
                                true,
                                Encoding.UTF8));

                }
                catch
                {

                    return Json("Error", JsonRequestBehavior.AllowGet);

                }
            }
            //return JavaScript("DialogAlert('','Gửi Email thành công!', 'error')");
            return Json("ok", JsonRequestBehavior.AllowGet);

        }
        #endregion

        #region Cấp quyền riêng và cấm quyền - roleforcode

        public ActionResult DanhSachPhanCapAppModuleAppRoleForCode(string Id)
        {
            List<DropboxValue> listApp = new List<DropboxValue>();
            List<DropboxValue> ListModule = new List<DropboxValue>();
            List<DropboxValue> ListTrangThai = new List<DropboxValue>();

            listApp = db.ioiort_App.Select(x => new DropboxValue()
             {
                 ValueString = x.AppGuid,
                 Name = x.AppName
             }).ToList();

            listApp.Insert(0, new DropboxValue()
             {
                 ValueString = Guid.Empty.ToString(),
                 Name = "-- Tất cả app --"
             });
            ViewBag.ListApp = listApp;


            ListModule.Insert(0, new DropboxValue()
            {
                ValueString = Guid.Empty.ToString(),
                Name = "-- Tất cả module --"
            });
            ViewBag.ListModule = ListModule;
            ViewBag.UserDuocCapQuyen = "";
            AspNetUsers_Sub u = db.AspNetUsers_Sub.Where(x => x.UserId == Id).FirstOrDefault();
            ViewBag.UserDuocCapQuyen = u.NguoiDungName + " (" + u.NguoiDungID + ")";

            return View();
        }
        public ActionResult PhanQuyenUserDropdownListChange(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException("value");
            }

            List<DropboxValue> ListModule = db.ioiort_Module.Where(x => x.AppGuid == id).Select(x => new DropboxValue()
                {
                    ValueString = x.ModuleGuid,
                    Name = x.ModuleName
                }).ToList();

            ListModule.Insert(0, new DropboxValue(Guid.Empty.ToString(), 0, Guid.Empty, "-- Tất cả module --"));
            return Json(ListModule, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PhanQuyenUser_SearchAllRole(int? page, string k, string u, string a, string m, bool? de, bool? ac)
        {
            if (k == null) k = "";

            ViewData["a"] = a;
            ViewData["m"] = m;
            ViewData["u"] = u;
            ViewData["k"] = k;
            ViewData["de"] = de;
            ViewData["ac"] = ac;



            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = 1;
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListAspNetUsersView> list = new List<ListAspNetUsersView>();
            list = db.ManagePermission_PhanQuyenUser_ntdai_SearchAllRole(currentPageIndex, DefaultPageSize, u, k, a, m, ac, de).Select(x => new ListAspNetUsersView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(n => n.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();


            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/_PartialListPhanQuyenUser.cshtml", listPaged);
        }

        public ActionResult PhanQuyenUser_DeleteAllUserRoleDetail(string k, string u, string a, string m)
        {
            try
            {
                db.ManagePermission_PhanQuyenUser_ntdai_DeleteAllUserRoleDetail(u, k, a, m);
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
        public ActionResult PhanQuyenUser_DeleteOneUserRoleDetail(string u, string r)
        {
            try
            {
                db.ManagePermission_PhanQuyenUser_ntdai_DeleteOneUserRoleDenied(u, r);
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
        public ActionResult PhanQuyenUser_AddUserRoleDetail(string u, string r)
        {
            try
            {
                db.ManagePermission_PhanQuyenUser_ntdai_AddUserRoleDetail(u, r, User.Identity.GetUserId());
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
        public ActionResult PhanQuyenUser_AddUserRoleDenied(string u, string r)
        {
            try
            {
                db.ManagePermission_PhanQuyenUser_ntdai_AddUserRoleDenied(u, r, User.Identity.GetUserId());
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddGroupRoleToUser(string u, string g)
        {
            try
            {
                db.ManagePermission_PhanQuyenUser_ntdai_AddGroupRoleToUser(u, g);
            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        public ActionResult PhanQuyenUser_SelectAllGroupRoles(int? page)
        {
        
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = 1;
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListAspNetUsersView> list = new List<ListAspNetUsersView>();
            list = db.ManagePermission_PhanQuyenUser_ntdai_SelectAllGroupRolesByUser(currentPageIndex, DefaultPageSize).Select(x => new ListAspNetUsersView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(n => n.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();


            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/_PartialListChonNhomQuyen.cshtml", listPaged);
        }
        

        

        #endregion

        //
        // POST: /Account/ForgotPassword


        public string PopulateBody(string hoten, string TenHeThong, string Password)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/Resources/TemplateEmail/forgotPassword.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{hoten}", hoten);
            body = body.Replace("{tenhethong}", TenHeThong);
            body = body.Replace("{matma}", Password);
            return body;
        }
        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Xóa dữ liệu AspNetUsers và file đính kèm 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult AspNetUsersDelete(string id)
        {
            try
            {
                nvngoc29082015.permission.library.Models.AspNetUsers item = db.AspNetUsers.Find(id);
                db.AspNetUsers.Remove(item);
                int flag = db.SaveChanges();

            }
            catch { return Json("error", JsonRequestBehavior.AllowGet); }
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        ///Author:   			ntdai
        ///Created: 			2015-10-14
        ///Last Modified: 		2015-10-14 
        /// Get list thông tin AspNetUsers
        /// </summary>
        /// <returns></returns>
        public ActionResult AspNetUsersGet_List(int? page, string k)
        {
            ViewData["keysearch"] = k;
            int DefaultPageSize = 25;
            int currentPageIndex = 1;

            //Lưu phân trang cookies
            if (page == null)
                currentPageIndex = Request.Cookies["pageperManageAspNetUsers"] == null ? 1 : Convert.ToInt32(Request.Cookies["pageperManageAspNetUsers"].Value);
            else
                currentPageIndex = page.Value;

            //Load dữ liệu phân trang từ database
            List<ListAspNetUsersView> list = new List<ListAspNetUsersView>();
            list = db.ManagePermission_ManageAspNetUsers_httHong_SelectPage(currentPageIndex, DefaultPageSize, k,User.Identity.GetUserId()).Select(x => new ListAspNetUsersView(x)).ToList();

            //Chuyển đổi thành dữ liệu phân trang
            int totalRows = 0;  //Tổng số dòng dữ liệu, không phải tổng số dòng trong một trang
            if (list.Count > 0)
                totalRows = list.Select(m => m.TotalRow).FirstOrDefault().Value;
            var listPaged = list.ToPagedList(currentPageIndex, DefaultPageSize, totalRows);

            if (listPaged == null)
                return HttpNotFound();

            //Ghi cookies phân trang
            HttpCookie myCookie = new HttpCookie("pageperManageAspNetUsers");
            myCookie.Value = currentPageIndex.ToString();
            myCookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(myCookie);

            return PartialView("~/Views/ManagePermission/ManageAspNetUsers/_PartialList.cshtml", listPaged);
        }
        #endregion
    }
}
