using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.IO;

[assembly: OwinStartup(typeof(project.web.mvc.Startup))]

namespace project.web.mvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }

        string getTime()
        {
            return DateTime.Now.Millisecond.ToString();
        }
    }
}
