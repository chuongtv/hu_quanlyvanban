using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace project.web.mvc
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "CauHinhQuocGia",
            //    url: "quoc-gia/{action}/{id}",
            //    defaults: new { controller = "QuanLyNhanSu", action = "CauHinhQuocGia", id = UrlParameter.Optional }
            //);

            routes.MapRoute(
               name: "danhmucsanpham",
               url: "nhom-san-pham/{cat}",
               defaults: new { controller = "ClientSanPham", action = "DanhMucSanPham", cat = UrlParameter.Optional }
           );

            routes.MapRoute(
               name: "chitiet",
               url: "san-pham/{title}-{id}",
               defaults: new { controller = "ClientSanPham", action = "SanPhamDetail", id = UrlParameter.Optional }
           );
            

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "HoTroTuyenSinh", action = "NhapHocOnline", id = UrlParameter.Optional }
            //);
            routes.MapRoute(
               name: "Default",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );
            

        }
    }
}
