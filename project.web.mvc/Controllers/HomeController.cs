using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ioiort.settingdata.library;
using nvn.Library.Services;
using nvn.Library.Patterns;
using project.web.mvc.Common.Attribute;

namespace project.web.mvc.Controllers
{
    [IOIORTAuthorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //return RedirectToAction("NhapHocOnline", "HoTroTuyenSinh");
           return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

    }
}
