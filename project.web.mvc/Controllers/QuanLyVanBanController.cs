using quanlyvanban151116.tvchuong.library.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PagedList;
using PagedList.Mvc;
using System.IO;
using System.Data.Entity.Infrastructure;

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


        #region Xử lí Văn bản
        public ActionResult Index(int? page)
        {
            int pageSize = 10;
            int pageNum = (page ?? 1);
            IEnumerable<VanBan> vbs = database.VanBans.OrderBy(s => s.VanBanID);
            ViewBag.VanbanMenuActive = "active";
            return View(vbs.ToPagedList(pageNum, pageSize));
        }

 
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VanBan vb = database.VanBans.Find(id);
            if (vb == null)
            {
                return HttpNotFound();
            }
            return View(vb);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create([Bind(Include = "VanBanID,TieuDe,TieuDeKhongDau,SoVanBan,TomtatNoiDung,TomTatNoiDungKhongDau,IsPublish")] VanBan vb, string[] Tendanhmuc)
        {
            //Kiểm tra trùng tên.
            int d = database.VanBans.Count(p => p.TieuDe == vb.TieuDe.Trim());
            if (d > 0) ModelState.AddModelError("TieuDe", "Tiêu đề không được trùng");
            ////Kiểm tra trùng mã.
            //int c = database.VanBans.Count(p => p.VanBanID == vb.VanBanID.Trim());
            //if (c > 0) ModelState.AddModelError("Ma", "Mã văn bản không được trùng");

            if (ModelState.IsValid)
            {
                try
                {
                    //1 - Thêm sản phẩm mới vào DbSet
                    vb.TieuDeKhongDau = XuLyDuLieu.LoaiBoDauTiengViet(vb.TieuDe);
                    database.VanBans.Add(vb);
                    //2 - Thêm các văn bản có danh mục mới vào DbSet
                    if (Tendanhmuc != null)
                    {
                        for (int i = 0; i < Tendanhmuc.Length; i++)
                        {
                            var DanhmucMoi = new DanhMuc();
                            DanhmucMoi.DanhMucID = vb.VanBanID;
                            DanhmucMoi.TenDanhMuc = Tendanhmuc[i];
                            database.DanhMucs.Add(DanhmucMoi);
                        }
                    }
                    //Lưu vào Database.
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    object cauBaoLoi = "Ghi không thành công.";
                    return View("ThongBao", cauBaoLoi);
                }
            }
            //Tạo nguồn dữ liệu cho DropDownBox chọn Trạng thái.
            var ds = new[]{
                                     new {TrangThaiID = 0, Ten = "Khóa"},
                                     new {TrangThaiID = 1, Ten = "Mở"},
                                    };
            ViewBag.IsPublish = new SelectList(ds, "TrangThaiID", "Ten", vb.IsPublish);
            //Tạo nguồn dữ liệu cho checkBox chọn danh mục.
            ViewBag.Danhmuc = database.DanhMucs.ToList();

   
            return View(vb);


        }


   
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VanBan vb = database.VanBans.Find(id);
            if (vb == null)
            {
                return HttpNotFound();
            }
            return View(vb);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "VanBanID,TieuDe,TieuDeKhongDau,SoVanBan,TomtatNoiDung,TomTatNoiDungKhongDau,IsPublish")] VanBan vb)
        {
            if (ModelState.IsValid)
            {
                db.Entry(vb).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(vb);
        }

        // GET: AdminSanPham/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VanBan vb = database.VanBans.Find(id);
            if (vb == null)
            {
                return HttpNotFound();
            }
            return View(vb);
        }

        // POST: AdminSanPham/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            VanBan vb = database.VanBans.Find(id);
            database.VanBans.Remove(vb);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        
        #endregion

    }
}
