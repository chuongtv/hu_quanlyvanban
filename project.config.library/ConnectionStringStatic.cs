using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;

namespace project.config.library
{
    public static class ConnectionStringStatic
    {
        #region database Doanh nghiep
        public static string GetReadConnectionStringTuyenSinh()
        {
            return ConfigurationManager.AppSettings["MSSQLConnectionString_TuyenSinh"];
           
        }
        public static string GetReadConnectionString()
        {
            return ConfigurationManager.AppSettings["MSSQLConnectionString"];
           
        }

        public static string GetWriteConnectionString()
        {
            if (ConfigurationManager.AppSettings["MSSQLWriteConnectionString"] != null)
            {
                return ConfigurationManager.AppSettings["MSSQLWriteConnectionString"];
            }

            return ConfigurationManager.AppSettings["MSSQLConnectionString"];
        }
        #endregion
        #region database Mien Giam Mon
        //public static string GetReadConnectionString_MienGiamMon_21052015()
        //{
        //    return ConfigurationManager.AppSettings["MSSQLConnectionString_MienGiamMon"];
        //}

        //public static string GetWriteConnectionString_MienGiamMon_21052015()
        //{
        //    if (ConfigurationManager.AppSettings["MSSQLWriteConnectionString_MienGiamMon"] != null)
        //    {
        //        return ConfigurationManager.AppSettings["MSSQLWriteConnectionString_MienGiamMon"];
        //    }

        //    return ConfigurationManager.AppSettings["MSSQLConnectionString_MienGiamMon"];
        //}
        #endregion

     

    }
}
