//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace quanlyvanban151116.tvchuong.library.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class DanhMuc
    {
        public int DanhMucID { get; set; }
        public string TenDanhMuc { get; set; }
        public string TenDanhMucKhongDau { get; set; }
        public Nullable<int> LFT { get; set; }
        public Nullable<int> RGT { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
    }
}