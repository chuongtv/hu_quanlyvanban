using quanlyvanban151116.tvchuong.library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace project.web.mvc.Controllers
{
    public class QuanLyVanBanController : Controller
    {
        //
        // GET: /QuanLyVanBan/

        #region default
        Hutech_QuanLyVanBanEntities db = new Hutech_QuanLyVanBanEntities();
        #endregion
        QLVanBanEntities database = new QLVanBanEntities();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Danhmuc()
        {
            return View(database.DanhMucs.ToList());
        }
        [HttpGet]
        public ActionResult Delete(int id)
        {
            DanhMuc g = database.DanhMucs.SingleOrDefault(n => n.DanhMucID == id);
            ViewBag.DanhMucID = g.DanhMucID;
            if (g == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            return View(g);
        }
        [HttpPost, ActionName("Delete")]
        public ActionResult ConfirmDelete(int id)
        {
            DanhMuc g = database.DanhMucs.SingleOrDefault(n => n.DanhMucID == id);
            ViewBag.DanhMucID = g.DanhMucID;
            if (g == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            database.DanhMucs.Remove(g);
            database.SaveChanges();
            return RedirectToAction("Danhmuc");
        }
        [HttpGet]
        public ActionResult Add()
        {
            ViewBag.DanhMucID = new SelectList(database.DanhMucs.ToList().OrderBy(n => n.UpdatedDate), "DanhMucID", "TenDanhMuc");
            return View();
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Add(DanhMuc g)
        {
            database.DanhMucs.Add(g);
            database.SaveChanges();
            return RedirectToAction("Danhmuc");
        }
        [HttpGet]
        public ActionResult Edit(int id)
        {
            DanhMuc danhmuc = database.DanhMucs.SingleOrDefault(n => n.DanhMucID == id);
            if (danhmuc == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            ViewBag.DanhMucID = new SelectList(database.DanhMucs.ToList().OrderBy(n => n.UpdatedDate), "DanhMucID", "TenDanhMuc", danhmuc.DanhMucID);
            return View(danhmuc);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(DanhMuc g)
        {
            UpdateModel(g);
            database.SaveChanges();
            return RedirectToAction("Danhmuc");
        }
    }
}
