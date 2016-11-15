using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace project.web.mvc.Common.Attribute
{
    public class IOIORTLayoutAttribute : ActionFilterAttribute
    {
        #region Contructors

        public IOIORTLayoutAttribute(string masterName)
        {
            MasterName = masterName;
        }

        #endregion

        #region Protected Methods

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var result = filterContext.Result as ViewResult;

            if (result != null)
            {
                result.MasterName = MasterName;
            }

            base.OnActionExecuted(filterContext);
        }

        #endregion

        #region Properties
        public string MasterName { get; set; }

        #endregion
    }
}