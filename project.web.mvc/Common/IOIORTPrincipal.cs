using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using Microsoft.AspNet.Identity;
namespace project.web.mvc.Common
{
    public class IOIORTPrincipal : GenericPrincipal
    {
        Hashtable hashtable = new Hashtable();
        public IOIORTPrincipal(IIdentity identity, string[] roles)
            : base(identity, roles)
        {
            System.Data.IDataReader reader = GetAllRoleByUserGuid(new Guid(Identity.GetUserId()));
            try
            {
                while (reader.Read())
                {
                    if (!hashtable.ContainsKey(reader["ActionID"].ToString() + "_" + reader["ControllerID"].ToString()))
                    hashtable.Add(reader["ActionID"].ToString() + "_" + reader["ControllerID"].ToString(), "");
                }
            }
            finally
            {
                reader.Close();
            }

        }

        private System.Data.IDataReader GetAllRoleByUserGuid(Guid userid)
        {
            nvn.Library.Patterns.MVP.SqlParameterHelper sph = new nvn.Library.Patterns.MVP.SqlParameterHelper(project.config.library.ConnectionStringStatic.GetReadConnectionString(), "ManagePermission_AspNetUsers_ntdai_GetAllRoleByUserGuid", 1);
            sph.DefineSqlParameter("@UserId", System.Data.SqlDbType.UniqueIdentifier, System.Data.ParameterDirection.Input, userid);
            return sph.ExecuteReader();
        }

        public bool IsSystemAdmin()
        {

            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                return false;
            }

            // update authentication server to run this code
            //var permissions = AuthorizeHelper.GetPermissions(businessUnitName);
            //if (permissions == null || permissions.Count() < 1)
            //    return false;
            //return permissions.Any(x => x.Name.Equals("SystemAdmin", StringComparison.InvariantCultureIgnoreCase));

            return false;
        }
        public bool HasPermission(string controller_action)
        {

            if (hashtable.ContainsKey(controller_action))
                return true;
            return false;

        }

        public bool IsInSecurityProfile(string securityProfile, string businessUnitName)
        {
            //if (!HttpContext.Current.User.Identity.IsAuthenticated)
            //{
            //    return false;
            //}
            //List<string> securityProfiles = securityProfile.Split(',').Select(per => per.Trim()).ToList();
            //return AuthorizeHelper.IsInSecurityProfile(securityProfiles, businessUnitName);
            return true;
        }
    }
}