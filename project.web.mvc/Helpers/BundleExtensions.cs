using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Optimization;

namespace project.web.mvc
{
    public static class BundleExtensions
    {
        /// <summary>
        /// bundles.Add(new StyleBundle("~/bundles/foo").IncludeWithCssRewriteUrlTransform(
        ///     "~/content/foo1.css",
        ///     "~/content/foo2.css",
        ///     "~/content/foo3.css"
        ///     ));
        /// Applies the CssRewriteUrlTransform to every path in the array.
        /// </summary>      
        public static Bundle IncludeWithCssRewriteUrlTransform(this Bundle bundle, params string[] virtualPaths)
        {
            //Ensure we add CssRewriteUrlTransform to turn relative paths (to images, etc.) in the CSS files into absolute paths.
            //Otherwise, you end up with 404s as the bundle paths will cause the relative paths to be off and not reach the static files.

            if ((virtualPaths != null) && (virtualPaths.Any()))
            {
                virtualPaths.ToList().ForEach(path =>
                {
                    bundle.Include(path, new CssRewriteUrlTransform());
                });
            }

            return bundle;
        }

	}
}
