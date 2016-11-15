using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quanlyvanban151116.tvchuong.library.QuanLyDanhMuc
{
    public class QuanLyDanhMuc
    {
        public string DanhMucName { get; set; }
        public string DanhMucID { get; set; }
    }
    public class ListQuanLyDanhMucView: QuanLyDanhMuc
    {
        public int TotalRow { get; set; }

        public ListQuanLyDanhMucView() { }
        //public ListQuanLyDanhMucView(GiamSatGiangDay_ThoiKhoaBieu_tvchuong_DongBoGetAllTheoNamHocGuid_Result item)
        //{
        //    if (item == null) return;
        //    this.Thu = item.Thu;
        //    this.TietBatDau = item.TietBatDau;
        //    this.MonHocID = item.MonHocID;
        //    this.GiangVienID = item.NhanVienID;
        //    this.PhongID = item.PhongID;
        //    this.NhomHoc = item.NhomHoc;
        //    this.ToHopNhom = item.ToHopNhom;
        //    this.NhomThucHanh = item.NhomThucHanh;
        //    this.ThoiGianBatDau = item.ThoiGianBatDau;
        //    this.ThoiGianKetThuc = item.ThoiGianKetThuc;
        //    this.SiSoLopHoc = item.SiSoLopHoc;
        //    this.LopHoc = item.LopHoc;
        //    this.LopThucTeGhep = item.LopThucTeGhep;
        //    this.SoTiet = item.SoTiet;
        //    this.TinChi = item.TinChi;
        //    this.MonHocName = item.MonHocName;
        //    this.PhanHeDaoTao = item.MaPhanHeID;
        //    this.LoaiGiangDayDacBiet = item.LoaiGiangDayDacBiet;
        //    this.MonHocDocHai = item.MonHocDocHai == null ? false : item.MonHocDocHai.Value;
        //    this.LopHocKeyID = item.LopHocKeyID;
        //}
    }

    public class CreateQuanLyDanhMucView : QuanLyDanhMuc
    {

    }

    public class EditQuanLyDanhMucView : QuanLyDanhMuc
    {

    }
}
