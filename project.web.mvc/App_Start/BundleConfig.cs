using System.Web;
using System.Web.Optimization;

namespace project.web.mvc
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region default


            // CSS style (bootstrap/inspinia)
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/styles.css",
                      "~/Content/color.css",
                      "~/Content/custom-style.css",
                      "~/Content/plugins/jquery-ui/jquery-ui.min.css",
                      "~/Content/animate.css"));

            // Font Awesome icons
            bundles.Add(new StyleBundle("~/bundles/font").IncludeWithCssRewriteUrlTransform(
                    "~/fonts/glyphicons/css/glyphicons.css",
                    "~/fonts/font-awesome/css/font-awesome.css"
                ));


            // js
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.1.1.min.js",
                        "~/Content/plugins/jquery-ui/jquery-ui.min.js",
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/enquire.js",
                        "~/Scripts/jquery.cookie.js",
                        "~/Scripts/jquery.nicescroll.min.js",
                        "~/Scripts/placeholdr.js",
                        "~/Scripts/application.js",
                        "~/Scripts/jquery.unobtrusive-ajax.min.js",
                        "~/Resources/js/myjs.js"
                        ));

            //angularjs
            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                    "~/Scripts/angular.js",
                    "~/Scripts/angularUI/angular-ui-router.js",
                    "~/Scripts/angular-resource.js",
                    "~/Scripts/angular-animate.min.js",
                    "~/Scripts/angular-messages.min.js",
                    "~/Scripts/angular-aria.min.js",
                    "~/Scripts/angularUI/ui-bootstrap-tpls.min.js",
                    //translate
                    "~/Scripts/angular-translate.js",
                    "~/Scripts/angular-translate-loader-static-files.min.js",
                    "~/Scripts/angular-cookies.min.js",
                    "~/Scripts/angular-translate-storage-cookie.min.js",
                    "~/Scripts/angular-translate-storage-local.min.js",
                    // base
                    "~/angularApp/app.js",
                    "~/angularApp/BaseServices.js",
                    "~/angularApp/BaseDialog.js",
                    "~/angularApp/paging.js"
                    ));

            #endregion

            #region Module cua Quan Ly phân quyền
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageUserRoleDetail/InfoUserRoleDetail").Include("~/Scripts/ManagePermission/ManageUserRoleDetail/ntdai_InfoUserRoleDetail.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageController").Include("~/Scripts/ManagePermission/ManageController/httHong_Controller.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageApp").Include("~/Scripts/ManagePermission/ManageApp/httHong_App.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageAspNetUsers").Include("~/Scripts/ManagePermission/ManageAspNetUsers/httHong_AspNetUsers.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageActionGroup").Include("~/Scripts/ManagePermission/ManageActionGroup/hanhat_ActionGroup.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageAction").Include("~/Scripts/ManagePermission/ManageAction/hanhat_Action.js"));

            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageModule").Include("~/Scripts/ManagePermission/ManageModule/hanhat_Module.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageAspNetRoles").Include("~/Scripts/ManagePermission/ManageAspNetRoles/hanhat_AspNetRoles.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageRoleDetail/InfoRoleDetail").Include("~/Scripts/ManagePermission/ManageRoleDetail/hanhat_InfoRoleDetail.js"));
            //quản lý nhóm quyền
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageGroupRole").Include("~/Scripts/ManagePermission/ManageGroupRole/ntdai_GroupRole.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageGroupRoleDetail").Include("~/Scripts/ManagePermission/ManageGroupRoleDetail/ntdai_GroupRoleDetail.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageTaiKhoan/TaoTaiKhoan").Include("~/Scripts/ManagePermission/ManageTaiKhoan/ntdai_TaoTaiKhoan.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageRoleForCode").Include("~/Scripts/ManagePermission/ManageRoleForCode/tvchuong_RoleForCode.js"));
            bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageAspNetUsers/PhanCapUser").Include("~/Scripts/ManagePermission/ManageAspNetUsers/ntdai_PhanCapUser.js"));

            #endregion

            #region plugin

            //bootbox
            bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
                "~/Content/plugins/validate/jquery.validate.min.js"
                //"~/Content/plugins/bootbox/bootbox.min.js",
                //"~/Scripts/angularUI/ngbootbox/dist/ngBootbox.js"
                ));
		
            #region error
            // Error packet
            bundles.Add(new StyleBundle("~/error/css").Include(
                      "~/Content/plugins/error-packet/freeow.css", new CssRewriteUrlTransform()));
            // Error packet
            bundles.Add(new ScriptBundle("~/plugins/error").Include(
                        "~/Content/plugins/error-packet/jquery.freeow.js"));
            #endregion

            #region FancyBox gallery css styles
            bundles.Add(new StyleBundle("~/plugins/fancyboxStyles").Include(
                      "~/Content/plugins/fancybox/jquery.fancybox.css", new CssRewriteUrlTransform()));

            bundles.Add(new ScriptBundle("~/plugins/fancybox").Include(
                      "~/Content/plugins/fancybox/jquery.fancybox.js"));
            #endregion

            #region dataTables
            // css styles
            bundles.Add(new StyleBundle("~/plugins/dataTablesStyles").Include(
                      "~/Content/plugins/dataTables/dataTables.bootstrap.css",
                      "~/Content/plugins/dataTables/dataTables.responsive.css",
                      "~/Content/plugins/dataTables/dataTables.tableTools.min.css"));

            // dataTables 
            bundles.Add(new ScriptBundle("~/plugins/dataTables").Include(
                      "~/Content/plugins/dataTables/jquery.dataTables.js",
                      "~/Content/plugins/dataTables/dataTables.bootstrap.js",
                      "~/Content/plugins/dataTables/dataTables.responsive.js",
                      "~/Content/plugins/dataTables/dataTables.tableTools.min.js"));
            #endregion

            #region dataPicker
            // dataPicker styles
            bundles.Add(new StyleBundle("~/plugins/dataPickerStyles").Include("~/Content/plugins/datapicker/datepicker3.css"));

            // dataPicker 
            bundles.Add(new ScriptBundle("~/plugins/dataPicker").Include("~/Content/plugins/datapicker/bootstrap-datepicker.js"));
            #endregion

            #region format day from javascript
            // dataPicker styles
            bundles.Add(new StyleBundle("~/plugins/dayformat").Include("~/Content/plugins/dayformat/formatDay.js"));

            #endregion

            #region chosen
            // chosen styles
            bundles.Add(new StyleBundle("~/plugins/chosenStyles").Include(
                      "~/Content/plugins/chosen/chosen.css"));

            // chosen 
            bundles.Add(new ScriptBundle("~/plugins/chosen").Include(
                      "~/Content/plugins/chosen/chosen.jquery.js"));
            #endregion

            #region dropZone
            // dropZone styles
            bundles.Add(new StyleBundle("~/plugins/dropZoneStyles").Include(
                      "~/Content/plugins/dropzone/basic.css",
                      "~/Content/plugins/dropzone/dropzone.css"));

            // dropZone 
            bundles.Add(new ScriptBundle("~/plugins/dropZone").Include(
                      "~/Content/plugins/dropzone/dropzone.js"));
            #endregion

            #region toastr

            // toastr notification 
            bundles.Add(new ScriptBundle("~/plugins/toastr").Include(
                      "~/Content/plugins/toastr/toastr.min.js"));

            // toastr notification styles
            bundles.Add(new StyleBundle("~/plugins/toastrStyles").Include(
                      "~/Content/plugins/toastr/toastr.min.css"));
            #endregion

            #region fullcalendar
            bundles.Add(new ScriptBundle("~/plugins/fullcalendar").Include(
                        "~/Content/plugins/fullcalendar/moment.min.js",
                        "~/Content/plugins/fullcalendar/fullcalendar.js",
                        "~/Content/plugins/fullcalendar/lang-all.js"));

            bundles.Add(new ScriptBundle("~/plugins/fullcalendar-TinhTrangPhong").Include(
                        "~/Content/plugins/fullcalendar/moment.min.js",
                        "~/Content/plugins/fullcalendar/fullcalendar-TinhTrangPhong.js",
                        "~/Content/plugins/fullcalendar/lang-all.js"));

            bundles.Add(new StyleBundle("~/plugins/fullcalendarstyles").Include(
                     "~/Content/plugins/fullcalendar/fullcalendar.css"));
            #endregion

            #region datetimepicker
            bundles.Add(new ScriptBundle("~/plugins/datetimepicker").Include(
                        "~/Content/plugins/datetimepicker/js/moment.min.js",
                        "~/Content/plugins/datetimepicker/js/bootstrap-datetimepicker.min.js"));

            bundles.Add(new StyleBundle("~/plugins/datetimepickerStyles").Include(
                     "~/Content/plugins/datetimepicker/css/bootstrap-datetimepicker.min.css"));
            #endregion

            #region qtip
            bundles.Add(new ScriptBundle("~/plugins/qtip").Include(
                       "~/Content/plugins/qtip/jquery.qtip.js"));

            bundles.Add(new StyleBundle("~/plugins/qtipstyles").Include(
                     "~/Content/plugins/qtip/jquery.qtip.css",
                     "~/Content/plugins/qtip/cus_tooltip.css"));
            #endregion

            // validate 
            bundles.Add(new ScriptBundle("~/plugins/validate").Include(
                      "~/Content/plugins/validate/jquery.validate.min.js"));

            // custom style by hoadm
            bundles.Add(new StyleBundle("~/plugins/styleHoaDM").Include(
                      "~/Content/hoadm-demo.css"));

            #region jqueryUI
            // jQueryUI CSS
            bundles.Add(new StyleBundle("~/bundles/jqueryuiStyles").Include(
                        "~/Content/plugins/jquery-ui/jquery-ui.min.css", new CssRewriteUrlTransform()));

            // jQueryUI 
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Content/plugins/jquery-ui/jquery-ui.min.js"));
            #endregion

            #region datetimerangepicker
            bundles.Add(new ScriptBundle("~/plugins/datetimerangepicker").Include(
                     "~/Content/plugins/form-daterangepicker/daterangepicker.js",
                     "~/Content/plugins/form-daterangepicker/moment.min.js"));

            bundles.Add(new StyleBundle("~/plugins/datetimerangepickerStyles").Include(
                  "~/Content/plugins/form-daterangepicker/daterangepicker-bs3.css"));
            #endregion

            #endregion

            #region Quản lý văn bản


            #endregion


            //<!--zip data js and css when load website-->
            BundleTable.EnableOptimizations = false;
        }
    }
}
