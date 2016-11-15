using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ioiort.settingdata.library;
using nvn.Library.Patterns;

namespace project.config.library.Utilities
{
    public static class ConstantVariable
    {
        public static string ToBinary(Int64 Decimal)
        {
            // Declare a few variables we're going to need
            Int64 BinaryHolder;
            char[] BinaryArray;
            string BinaryResult = "";

            while (Decimal > 0)
            {
                BinaryHolder = Decimal % 2;
                BinaryResult += BinaryHolder;
                Decimal = Decimal / 2;
            }

            //chi bieu dien cac so 16 bit
            //toi da den so 9999
            int count = BinaryResult.Length;
            while (count < 16)
            {
                BinaryResult += "0";
                count++;
            }


            // The algoritm gives us the binary number in reverse order (mirrored)
            // We store it in an array so that we can reverse it back to normal
            BinaryArray = BinaryResult.ToCharArray();

            Array.Reverse(BinaryArray);
            BinaryResult = new string(BinaryArray);

            return BinaryResult;
        }
        // ch them
        public static string FORMAT_DATETIME { get { return "dd/MM/yyyy"; } }

        /// <summary>
        /// Chuongtv chuyen doi kieu tien te decimal sang string
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        ///

        public static string FormatPrices(object o)
        {
            if (o == null || o.ToString() == String.Empty)
                return string.Empty;
            if (Convert.ToDecimal(o.ToString()) == 0)
            {
                return "0";
            }
            return String.Format("{0:0,0}", Convert.ToDecimal(o.ToString()));
        }

        public static string FormatDiem(object o)
        {
            if (o == null || o.ToString() == String.Empty)
                return string.Empty;
            if (Convert.ToDecimal(o.ToString()) == 0)
            {
                return "0";
            }
            return String.Format("{0:0.#}", Convert.ToDecimal(o.ToString()));
        }

        #region Method

        public static List<TowTypeParameters<string, string>> PaperNumbers()
        {
            List<TowTypeParameters<string, string>> Groups = new List<TowTypeParameters<string, string>>();

            //Groups.Add(new TowTypeParameters<string, string>("15 trang", "15"));
            //Groups.Add(new TowTypeParameters<string, string>("20 trang", "20"));
            //Groups.Add(new TowTypeParameters<string, string>("30 trang", "30"));
            //Groups.Add(new TowTypeParameters<string, string>("60 trang", "60"));
            //Groups.Add(new TowTypeParameters<string, string>("100 trang", "100"));
            //Groups.Add(new TowTypeParameters<string, string>("200 trang", "200"));

            // Groups.Add(new TowTypeParameters<string, string>("5 record", "5"));
            Groups.Add(new TowTypeParameters<string, string>("15 record", "15"));
            Groups.Add(new TowTypeParameters<string, string>("30 record", "30"));
            Groups.Add(new TowTypeParameters<string, string>("60 record", "60"));
            Groups.Add(new TowTypeParameters<string, string>("100 record", "100"));
            Groups.Add(new TowTypeParameters<string, string>("200 record", "200"));

            //Groups.Insert(0, new TowTypeParameters<Guid, string>(Guid.Empty, "------ Root ------"));
            return Groups;
        }

        /// <summary>
        /// tham so thu 2 la id. chu y ko dc sua id nay
        /// </summary>
        /// <returns></returns>
        public static List<ThreeTypeParameters<string, string, string>> TaskStatus()
        {
            List<ThreeTypeParameters<string, string, string>> Groups = new List<ThreeTypeParameters<string, string, string>>();
            Groups.Add(new ThreeTypeParameters<string, string, string>("Nomal", "4", "text-nomal"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Done", "5", "text-primary"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Late", "6", "text-warning"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("In progress", "7", "text-info"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Not responding", "8", "text-danger"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Cancel", "9", "text-cancle"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Lock", "10", "text-cancle"));
            return Groups;
        }
        public static List<ThreeTypeParameters<string, string, string>> TaskKind()
        {
            List<ThreeTypeParameters<string, string, string>> Groups = new List<ThreeTypeParameters<string, string, string>>();
            Groups.Add(new ThreeTypeParameters<string, string, string>("Other", "15", "fa-question text-warning"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Bug", "16", "fa-bug text-navy"));
            //Groups.Add(new ThreeTypeParameters<string, string, string>("BugCode", "2", "fa-bug text-danger"));
            //Groups.Add(new ThreeTypeParameters<string, string, string>("BugDB", "3", "fa-bug text-primary"));
            return Groups;
        }
        public static List<ThreeTypeParameters<string, string, string>> TaskPriority()
        {
            List<ThreeTypeParameters<string, string, string>> Groups = new List<ThreeTypeParameters<string, string, string>>();
            Groups.Add(new ThreeTypeParameters<string, string, string>("Priority 1", "11", "text-navy"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Priority 2", "12", "text-danger"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Priority 3", "13", "text-primary"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Priority 4", "14", "text-warning"));
            return Groups;
        }
        public static List<ThreeTypeParameters<string, string, string>> TaskActive()
        {
            List<ThreeTypeParameters<string, string, string>> Groups = new List<ThreeTypeParameters<string, string, string>>();
            Groups.Add(new ThreeTypeParameters<string, string, string>("Unactive", "0", "text-danger"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Active", "1", "text-navy"));
            return Groups;
        }
        public static List<ThreeTypeParameters<string, string, string>> ProjectStatus()
        {
            List<ThreeTypeParameters<string, string, string>> Groups = new List<ThreeTypeParameters<string, string, string>>();
            Groups.Add(new ThreeTypeParameters<string, string, string>("Tình trạng 1", "1", "text-navy"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Tình trạng 2", "2", "text-danger"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Tình trạng 3", "3", "text-primary"));
            Groups.Add(new ThreeTypeParameters<string, string, string>("Tình trạng 4", "4", "text-warning"));
            return Groups;
        }
        #endregion

        #region image
        public static string[] url_GetPathUploadList
        {
            get
            {
                return new string[] { GetPathUpload("1"), GetPathUpload("3"), GetPathUpload("2"), GetPathUpload("4"), GetPathUpload("5") };
            }
        }
        public static string GetPathUpload(string id)
        {
            switch (id)
            {
                case "7":
                    return "Data/UploadTest";
                case "8":
                    return "Data/GiamSatGiangDay/";

                case "1":
                    return "Data/ThongTinDoanhNghiep/Image/";
                case "2":
                    return "Data/ThongTinDoanhNghiep/Doc/";
                case "3":
                    return "Data/ThongTinDoanhNghiep/Logo/";
                case "4":
                    return "Data/ThongTinHopTac/Image/";
                case "5":
                    return "Data/ThongTinHopTac/Doc/";
                case "6":
                    return "Data/ThongTinLoi/Doc/";

                case "bug":
                    return "~/Data/bug";
                case "othertask":
                    return "~/Data/othertask";
                default:
                    return "";
            }
        }
        public static string[] url_Image = new string[] { GetPathUpload("bug") + "/" + sizeImage_W[0] + "-" + sizeImage_H[0] + "/" };
        public static int[] sizeImage_W { get { return new int[] { 100, 250, 420 }; } }
        public static int[] sizeImage_H { get { return new int[] { 122, 300, 512 }; } }
        public static int[] sizeImage_Q { get { return new int[] { 100, 100, 100 }; } }
        #endregion


        #region WebDoanhNghiep
        #region Nhom phan quyen
        public static string Value_AspNetRoles_DoanhNghiep_BanGiamHieu { get { return "DoanhNghiep_BanGiamHieu"; } }
        public static string Value_AspNetRoles_DoanhNghiep_QuanLy { get { return "DoanhNghiep_QuanLy"; } }
        public static string Value_AspNetRoles_DoanhNghiep_LanhDaoDonVi { get { return "DoanhNghiep_LanhDaoDonVi"; } }
        public static string Value_AspNetRoles_DoanhNghiep_Admin { get { return "DoanhNghiep_Admin"; } }
        public static string Value_AspNetRoles_System { get { return "System"; } }
        public static string Value_AspNetRoles_Administrator { get { return "Administrator"; } }


        #endregion

        #endregion

        #region quan ly nhan su
        public static string URL_TempImport { get { return "~/Data/HRM/TempImport/"; } }
       
        public static string GetPathUpload(string id, string sub)
        {
            if (sub == null)
                sub = "";
            switch (id)
            {
                case "1":
                    return "Data/SanPham/" + sub;
                case "2":
                    return "Data/SlideShow/" + sub;
                case "3":
                    return "Data/TinTuc/" + sub;
                case "8":
                    return "Data/GiamSatGiangDay/" + sub;
                case "10":
                    return "Data/HRM/" + sub;
                case "11":
                    return "Data/SinhVien/" + sub;
                default:
                    return "Data";

            }
        }
        #endregion

        

        #region Project permission
        public static string Value_AppGuid_ManagePermission { get { return "2CE08B2D-5456-4D69-B0AB-C06EA051F30A"; } }
        #endregion
        
        

        
        public static Guid LANGUAGES_DEFAULT { get { return new Guid("9944E7D1-E89A-428A-B497-E6657EF55E3C"); } }

        
    }
}