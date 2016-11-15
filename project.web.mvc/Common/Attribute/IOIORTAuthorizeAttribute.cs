using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using project.web.mvc.Common;

namespace project.web.mvc.Common.Attribute
{
    public class IOIORTAuthorizeAttribute : AuthorizeAttribute
    {
        #region Properties
        private string _controller;
        private string _action;
        public string Controller { get; set; }
        public string Action { get; set; }
        #endregion

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            //kiem tra anonymous
            if (filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true)
            || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true))
            {
                return;
            }

            //Get controller name here because we get wrong result with httpContext RouteData
            if (!string.IsNullOrEmpty(Controller))
                _controller = Controller;
            else
                _controller = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;

            if (!string.IsNullOrEmpty(Action))
                _action = Action;
            else
                _action = filterContext.ActionDescriptor.ActionName;

            base.OnAuthorization(filterContext);
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null)
                throw new ArgumentNullException("httpContext");

            if (httpContext.Request.IsAuthenticated)
            {
                //check doi tuong httpContext. khoi tao quyen cho doi tuong nay
                if (httpContext.User != null && !(httpContext.User is IOIORTPrincipal))
                {
                    HttpContext.Current.User = new IOIORTPrincipal(httpContext.User.Identity, new[] { "" });
                }

                IOIORTPrincipal user = (IOIORTPrincipal)httpContext.User;
          

                if (user.IsSystemAdmin())
                    return true;

                //quyen truy cap
                if (user.HasPermission(_action + "_" + _controller))
                    return true;
            }
            return false;//AuthorizationHelper.CanDoAction(user, _controller, _action, businessUnitName);
        }



        //AuthorizeAttribute, IAuthorizationFilter - OnAuthorization(AuthorizationContext
        //public override void OnAuthorization(AuthorizationContext context)
        //{


        //    //da chung thuc
        //    //bool isAuthenticated = context.RequestContext.HttpContext.Request.IsAuthenticated;

        //    if (context.RequestContext.HttpContext.Request.IsAuthenticated)
        //    {
        //        //neu quyen admin
        //        IOIORTPrincipal user = System.Web.HttpContext.Current.User as IOIORTPrincipal;
        //        if (user.IsSystemAdmin())
        //            return;
                

        //        //thong tin controller va action
        //        var controllerFullName = context.ActionDescriptor.ControllerDescriptor.ControllerType.Name;
        //        var actionName = context.ActionDescriptor.ActionName;
        //        if (user.CheckHashRoles(controllerFullName + actionName))
        //            return;

        //        //kiem tra controller va action co quyen hay khong
        //        HandleUnauthorizedRequest(context);


        //    }

        //    // bool isoau = System.Web.HttpContext.Current.User.Identity.IsAuthenticated;

        //    // string u = System.Web.HttpContext.Current.User.Identity.Name;


        //    // if (HttpContext.Current.User.Identity.IsAuthenticated)
        //    // {
        //    //     if (HttpContext.Current.User.Identity is FormsIdentity)
        //    //     {
        //    //         FormsIdentity id = (FormsIdentity)HttpContext.Current.User.Identity;
        //    //         FormsAuthenticationTicket ticket = id.Ticket;

        //    //         // Get the stored user-data, in this case, our roles
        //    //         string userData = ticket.UserData;
        //    //         string[] roles = userData.Split(',');
        //    //         HttpContext.Current.User = new GenericPrincipal(id, roles);
        //    //     }
        //    // }



        //    //// if (accountInfo != null)
        //    // if (isoau)
        //    // {
        //    //     bool isHaveRole = Business.IsAuthorization(controllerFullName, actionName);

        //    //     //Có quyền hoặc IsAdmin
        //    //     if (isHaveRole || skipAuthorization)
        //    //     {
        //    //         return;
        //    //     }
        //    //     else
        //    //     {
        //    //         //Chỉnh lại code = 404
        //    //         HandleUnauthorizedRequest(context);
        //    //         if (!context.HttpContext.Request.IsAjaxRequest())
        //    //         {
        //    //             context.Result = new RedirectResult("~/Error/NotPermission");
        //    //         }

        //    //         //throw new Exception("Không được phép thực hiện");
        //    //     }
        //    // }
        //    // else
        //    // {
        //    //     HandleUnauthorizedRequest(context);
        //    //     //throw new Exception("Bạn chưa đăng nhập");
        //    // }

        //    //base.OnAuthorization(context);
        //    base.OnAuthorization(context);
        //}

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
          

            //neu chua chung thuc
            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                // Xử lý trường hợp nếu gọi lên bằng ajax
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.Result = new JsonResult
                    {
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                        // Format theo chuẩn 
                        Data = new
                        {
                            Errors = new
                            {
                                message = "Không được phép thực hiện chức năng này"
                            }
                        }
                    };
                }

                base.HandleUnauthorizedRequest(filterContext);
            }
            else
            {


                //neu da chung thuc nhung chua co quyen
                filterContext.Result = new RedirectToRouteResult(new
                RouteValueDictionary(new { controller = "Error", action = "AccessDenied" }));
            }


        }

    }
}