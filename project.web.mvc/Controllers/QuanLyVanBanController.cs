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

        public ActionResult Index()
        {
            return View();

        }

    }
}
