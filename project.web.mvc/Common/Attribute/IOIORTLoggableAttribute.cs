using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using project.web.mvc.Common;
using System.Collections.Specialized;
using System.IO;

namespace project.web.mvc.Common.Attribute
{
    public class IOIORTLoggableAttribute : ActionFilterAttribute
    {
        private static ILogService _baseLog;
        private static JsonHelper _jsonHelper;

        private bool _isDatabaseLogEnabled;
        private DatabaseLogService _logSerivce;

        public string FunctionDescription { get; set; }
        public ActionEnum Action { get; set; }

        public IOIORTLoggableAttribute()
        {
            if (_baseLog == null)
            {
                _baseLog = new WebLogService(typeof(LoggableAttribute));
            }
            if (_jsonHelper == null)
            {
                _jsonHelper = new JsonHelper();
            }

            _logSerivce = DependencyFactory.GetService<DatabaseLogService>();

            _isDatabaseLogEnabled = false;
            bool.TryParse(ConfigurationManager.AppSettings["LogToDatabaseEnabled"], out _isDatabaseLogEnabled);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            if (filterContext.RequestContext.HttpContext.Request.HttpMethod != "GET")
            {
                _baseLog.Info(GetLogMessage(filterContext));

                if (_isDatabaseLogEnabled)
                {
                    string action = Action == ActionEnum.Undefined ?
                                            filterContext.RouteData.Values["action"].ToString() : Action.ToString();
                    string function = string.IsNullOrEmpty(FunctionDescription) ?
                                            filterContext.RouteData.Values["action"].ToString() : FunctionDescription;
                    string parameter = GetParametersString(filterContext);


                    //luu log
                    _logSerivce.WriteLog(filterContext.HttpContext.User.Identity.Name,
                                            action, function, parameter);
                }
            }

           
        }

        private string GetLogMessage(ControllerContext context)
        {

            string logMessageTemplate = "Username: {0}. Controller: {1}. Action: {2}. Params: {3}";

            string parameter = GetParametersString(context);

            var logMessage = String.Format(logMessageTemplate, context.HttpContext.User.Identity.Name,
                context.RouteData.Values["controller"], context.RouteData.Values["action"], parameter);

            return logMessage;
        }

        private string GetParametersString(ControllerContext context)
        {
            string parameter = "";
            var form = context.HttpContext.Request.Form;
            if (form.AllKeys.Count() > 0)
            {
                parameter = ReadFromForm(form);
            }
            else parameter = ReadFromStream(context.HttpContext.Request.InputStream);

            if (context.RouteData.Values.Count > 2)
            {
                var paramDictionary = new Dictionary<string, object>();
                for (int i = 2; i < context.RouteData.Values.Count; i++)
                {
                    var key = context.RouteData.Values.Keys.ToList()[i];
                    var value = context.RouteData.Values[key];

                    paramDictionary.Add(key, value);
                }
                parameter += "Route value: " + _jsonHelper.ToJson(paramDictionary);
            }

            return parameter;
        }

        private string ReadFromStream(Stream inputStream)
        {
            inputStream.Position = 0;
            StreamReader reader = new StreamReader(inputStream);
            return reader.ReadToEnd();
        }

        private string ReadFromForm(NameValueCollection form)
        {
            var keyValues = form.AllKeys.Select(key => key + " : " + form[key]);
            return String.Join(",", keyValues);
        }


        public enum MessageType
        {
            Info = 1,
            Warning = 2,
            Error = 3
        }
        public enum ActionEnum
        {
            Undefined = 0, Insert = 1, Update = 2, Delete = 3
        }
    }

   
}