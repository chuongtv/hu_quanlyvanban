


TuyenSinhApp.controller('TuyenSinhCtrl', function ($scope, $http, ApiCall, $filter, $state, $stateParams) {
    var restultList;
    $http.get(linkapi + "Resources/json/DangKyXetTuyen.json")
        .success(function (restult) {
            restultList = restult;


            var listN = [];
            var listT = [];
            var listNgay = [];
            var today = new Date();
            var yyyy = today.getFullYear();

            listN.push({
                "Nam": "Năm",
                "NamID": ""
            });
            for (var i = yyyy; i > yyyy - 100; i--) {

                listN.push({
                    "Nam": i + "",
                    "NamID": i + ""
                });
            }

            listT.push({
                "Thang": "Tháng",
                "ThangID": ""
            });
            for (var i = 1; i <= 12; i++) {
                var dd = i;
                if (dd < 10) {
                    dd = '0' + dd
                }

                listT.push({
                    "Thang": dd,
                    "ThangID": dd
                });
            }

            listNgay.push({
                "Ngay": "Ngày",
                "NgayID": ""
            });
            for (var i = 1; i <= 31; i++) {
                var dd = i;
                if (dd < 10) {
                    dd = '0' + dd
                }

                listNgay.push({
                    "Ngay": dd,
                    "NgayID": dd
                });
            }



            $scope.dangky = {
                ListDotXetTuyen: restultList.ListDotXetTuyen,
                ListDoiTuongUuTien: restultList.ListDoiTuongUuTien,
                ListKhuVucTuyenSinh: restultList.ListKhuVucTuyenSinh,
                ListChuyenNganhToHopMon: restultList.ListChuyenNganhToHopMon,
                ListGioiTinh: restultList.ListGioiTinh,
                ListLoaiTiepNhan: restultList.ListLoaiTiepNhan,
                ListNgay: listNgay,
                ListThang: listT,
                ListNam: listN,
                ListDanhMucTruong: restultList.ListDanhMucTruong
            };


            var newTemp;
            var thisLink = $.cookie("LoaiTiepNhan");

            if (thisLink) {
                newTemp = $filter("filter")($scope.dangky.ListLoaiTiepNhan, { LoaiTiepNhanID: thisLink });
            }
            else {
                thisLink = 1;
                newTemp = $filter("filter")($scope.dangky.ListLoaiTiepNhan, { LoaiTiepNhanID: thisLink });
            }
            $scope.kq = {
                Ngay: listNgay[0],
                Thang: listT[0],
                Nam: listN[0],
                LoaiTiepNhan: newTemp[0],
                DotXetTuyen: restultList.ListDotXetTuyen[0].DotXetTuyenName,
                HoVaTen: "",
                NgaySinh: "",
                SoBaoDanh: "",
                SoChungMinh: "",
                MaDangKyXetTuyen: "",
                DienUuTien: "",
                DoiTuongUuTien: "",
                LoaiHuyChuong: "",
                MonDatGiai: "",
                DiaChiNhanGiayBaoTrungTuyen: "",
                SoDienThoai: "",
                Email: "",
                KhuVucTuyenSinh: {
                    "KhuVucTuyenSinhID": restultList.ListKhuVucTuyenSinh[0].KhuVucTuyenSinhID
                },
                DoiTuongTuyenSinh: {
                    "DoiTuongUuTienID": restultList.ListDoiTuongUuTien[0].DoiTuongUuTienID
                },
                CheDoUuTienThayDoi: false,
                MaTruong: "DKC",
                TenTruongDangKy: "Đại học Công Nghệ TP.HCM",
                NhomNganh1: {
                    "MaNganh": restultList.ListChuyenNganhToHopMon[0].MaNganh
                },

                MaNghanh1: "",
                ToHopMonThiDungDeXetTuyen1: "",
                NhomNganh2: {
                    "MaNganh": restultList.ListChuyenNganhToHopMon[0].MaNganh
                },
                MaNghanh2: "",
                ToHopMonThiDungDeXetTuyen2: "",

                CoDangKyXetTuyenVaoTruongKhac: false,
                MaTruongDaDangKy: "",
                TenTruongDaDangKy: "",
                GioiTinh: restultList.ListGioiTinh[0]
            };
        });



    function isValidDate(date) {
        var valid = true;
        date = date.replace('/-/g', '');
        var month = parseInt(date.substring(0, 2), 10);
        var day = parseInt(date.substring(2, 4), 10);
        var year = parseInt(date.substring(4, 8), 10);


        if ((month < 1) || (month > 12)) valid = false;
        else if ((day < 1) || (day > 31)) valid = false;
        else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;
        else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;
        else if ((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;
        else if ((month == 2) && (day > 28)) valid = false;

        return valid;
    }

    $scope.RedirecStep1 = function (form) {
        $state.go('step1', {
            obj: $scope.kq
        });
    }
    $scope.hasChangedTruong = function (data) {
        $scope.kq.TenTruongDaDangKy = "";
        if (data != undefined) {
            if ($filter("filter")($scope.dangky.ListDanhMucTruong, { DanhMucTruongID: data })[0] != undefined && data.length == 3)
                $scope.kq.TenTruongDaDangKy = $filter("filter")($scope.dangky.ListDanhMucTruong, { DanhMucTruongID: data })[0].DanhMucTruongName;
        }
    };

    $scope.hasChangedNganhHoc = function (index, data) {
        if (index == 0) {
            $scope.kq.MaNghanh1 = data.MaNganh;
            $scope.kq.ToHopMonThiDungDeXetTuyen1 = data.MaMonToHopXetTuyen1;
        }
        if (index == 1) {
            $scope.kq.MaNghanh2 = data.MaNganh;
            $scope.kq.ToHopMonThiDungDeXetTuyen2 = data.MaMonToHopXetTuyen2;
        }
    };
    $scope.submitDangKy = function (form) {



        if (!isValidDate($scope.kq.Thang.ThangID + $scope.kq.Ngay.NgayID + $scope.kq.Nam.NamID)) {
            alert("Ngày sinh nhập chưa đúng vui lòng kiểm tra lại!");
            return;
        }

        if ($scope.kq.MaNghanh1 == "") {
            alert("1 Xin vui lòng chọn ngành/Nhóm ngành");
            return;
        } else
            if ($scope.kq.MaNghanh2 == "") {
                alert("2 Xin vui lòng chọn ngành/Nhóm ngành");
                return;
            }
        Object.toparams = function ObjecttoParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        };
        var Tontai = "False";
        var result = ApiCall.GetApiCall(linkapi + "api/TuyenSinh/CheckExistSBD?id=" + $scope.kq.SoBaoDanh + "&thisID=").success(function (data) {
            Tontai = (JSON.parse(data));

            if (Tontai === "True") {
                alert('Số báo danh này đã đăng lý trước đó!');
            } else {
                var TontaiMDKXT = "False";
                var resultMDKXT = ApiCall.GetApiCall(linkapi + "api/TuyenSinh/CheckExistMDKXT?id=" + $scope.kq.MaDangKyXetTuyen + "&thisID=").success(function (data) {
                    TontaiMDKXT = (JSON.parse(data));
                    if (TontaiMDKXT === "True") {
                        alert('Mã đăng ký xét tuyển này đã đăng lý trước đó!');
                    } else {

                        $http({
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            method: "POST",
                            url: linkapi + "api/TuyenSinh/LuuThongTinXetTuyenHocBa",
                            data: Object.toparams({
                                'Ngay': $scope.kq.Ngay.NgayID,
                                'Thang': $scope.kq.Thang.ThangID,
                                'Nam': $scope.kq.Nam.NamID,
                                'LoaiTiepNhan': $scope.kq.LoaiTiepNhan.LoaiTiepNhanID,
                                'HoVaTen': $scope.kq.HoVaTen,
                                'SoBaoDanh': $scope.kq.SoBaoDanh,
                                'SoCMND': $scope.kq.SoChungMinh,
                                'MaDKXT': $scope.kq.MaDangKyXetTuyen,
                                'DienUuTien': $scope.kq.DienUuTien,
                                'DoiTuongUuTien': $scope.kq.DoiTuongUuTien,
                                'LoaiGiaiHuyChuong': $scope.kq.LoaiHuyChuong,
                                'MonDoatGiai': $scope.kq.MonDatGiai,
                                'DiaChiNGBTT': $scope.kq.DiaChiNhanGiayBaoTrungTuyen,
                                'SoDienThoai': $scope.kq.SoDienThoai,
                                'Email': $scope.kq.Email,
                                'KhuVucTuyenSinh': $scope.kq.KhuVucTuyenSinh.KhuVucTuyenSinhID,
                                'DoiTuongUuTienTuyenSinh': $scope.kq.DoiTuongTuyenSinh.DoiTuongUuTienID,
                                'CheDoUuTienThayDoi': $scope.kq.CheDoUuTienThayDoi,
                                'DK1MaTruong': $scope.kq.MaTruong,
                                'DK1TenTruong': $scope.kq.TenTruongDangKy,
                                'DK1Nganh1': $scope.kq.NhomNganh1.TenNganh,
                                'DK1MaNganh1': $scope.kq.MaNghanh1,
                                'DK1ToHopMon1': $scope.kq.ToHopMonThiDungDeXetTuyen1,
                                'DK1Nganh2': $scope.kq.NhomNganh2.TenNganh,
                                'DK1MaNganh2': $scope.kq.MaNghanh2,
                                'DK1ToHopMon2': $scope.kq.ToHopMonThiDungDeXetTuyen2,
                                'CoDKVaoTruongKhac': $scope.kq.CoDangKyXetTuyenVaoTruongKhac,
                                'DKMaTruong2': $scope.kq.MaTruongDaDangKy,
                                'DKTenTruong2': $scope.kq.TenTruongDaDangKy,
                                'GioiTinh': $scope.kq.GioiTinh.GioiTinhID
                            })
                        })
                            .success(function (data, status, headers, config) {

                                if (data == true) {
                                    $.cookie("LoaiTiepNhan", $scope.kq.LoaiTiepNhan.LoaiTiepNhanID, { path: window.location, expires: 7 });
                                    alert('Ghi nhận thông tin thành công');
                                    window.location = window.location;
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.debug("saved comment", $scope.comment);
                            });
                    }
                });
            }
        });
    }
});

//////////////////////////////////////////////////////////
TuyenSinhApp.controller('TuyenSinhCtrlEdit', function ($scope, $http, ApiCall, $filter, $state, $stateParams) {
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var id = getParameterByName("id");

    var restultList;
    $http.get(linkapi + "Resources/json/DangKyXetTuyen.json")
        .success(function (restult) {
            restultList = restult;
            var listN = [];
            var listT = [];
            var listNgay = [];
            var today = new Date();
            var yyyy = today.getFullYear();


            listN.push({
                "Nam": "Năm",
                "NamID": ""
            });
            for (var i = yyyy; i > yyyy - 100; i--) {

                listN.push({
                    "Nam": i + "",
                    "NamID": i + ""
                });
            }

            listT.push({
                "Thang": "Tháng",
                "ThangID": ""
            });
            for (var i = 1; i <= 12; i++) {
                var dd = i;
                if (dd < 10) {
                    dd = '0' + dd
                }

                listT.push({
                    "Thang":  dd,
                    "ThangID": dd
                });
            }

            listNgay.push({
                "Ngay": "Ngày",
                "NgayID": ""
            });
            for (var i = 1; i <= 31; i++) {
                var dd = i;
                if (dd < 10) {
                    dd = '0' + dd
                }

                listNgay.push({
                    "Ngay": dd,
                    "NgayID": dd
                });
            }


            $scope.dangky = {
                ListDotXetTuyen: restultList.ListDotXetTuyen,
                ListDoiTuongUuTien: restultList.ListDoiTuongUuTien,
                ListKhuVucTuyenSinh: restultList.ListKhuVucTuyenSinh,
                ListChuyenNganhToHopMon: restultList.ListChuyenNganhToHopMon,
                ListGioiTinh: restultList.ListGioiTinh,
                ListLoaiTiepNhan: restultList.ListLoaiTiepNhan,
                ListNgay: listNgay,
                ListThang: listT,
                ListNam: listN,
                ListDanhMucTruong: restultList.ListDanhMucTruong
            };




            if (id != "")
                LoadOneThongTinXetTuyen(id);

        });

    function isValidDate(date) {
        var valid = true;
        date = date.replace('/-/g', '');
        var month = parseInt(date.substring(0, 2), 10);
        var day = parseInt(date.substring(2, 4), 10);
        var year = parseInt(date.substring(4, 8), 10);


        if ((month < 1) || (month > 12)) valid = false;
        else if ((day < 1) || (day > 31)) valid = false;
        else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;
        else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;
        else if ((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;
        else if ((month == 2) && (day > 28)) valid = false;

        return valid;
    }
    $scope.RedirecStep1 = function (form) {
        $state.go('step1', {
            obj: $scope.kq
        });

    }
    function parseJsonDate(jsonDateString) {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }

    function LoadOneThongTinXetTuyen(id) {
        $http.get(linkapi + "api/TuyenSinh/GetOneThongTinDuTuyen?id=" + id)
       .success(function (restult) {
           var restultEdit = JSON.parse(restult);
           var date = parseJsonDate(restultEdit.NgaySinh);
           console.log($filter("filter")($scope.dangky.ListChuyenNganhToHopMon, { MaNganh: restultEdit.DK1MaNganh1 })[0]);
           console.log(restultEdit.DK1Nganh2);

           $scope.kq = {
               Ngay: $filter("filter")($scope.dangky.ListNgay, { NgayID: restultEdit.Ngay })[0],
               Thang: $filter("filter")($scope.dangky.ListThang, { ThangID: restultEdit.Thang })[0],
               Nam: $filter("filter")($scope.dangky.ListNam, { NamID: restultEdit.Nam })[0],
               ID: restultEdit.ID,
               LoaiTiepNhan: $filter("filter")($scope.dangky.ListLoaiTiepNhan, { LoaiTiepNhanID: restultEdit.LoaiTiepNhan })[0],
               DotXetTuyen: restultList.ListDotXetTuyen[0].DotXetTuyenName,
               HoVaTen: restultEdit.HoVaTen,
               NgaySinh: $filter('date')(date, 'dd/MM/yyyy'),
               SoBaoDanh: restultEdit.SoBaoDanh,
               SoChungMinh: restultEdit.SoCMND,
               MaDangKyXetTuyen: restultEdit.MaDKXT,
               DienUuTien: restultEdit.DienUuTien,
               DoiTuongUuTien: restultEdit.DoiTuongUuTien,
               LoaiHuyChuong: restultEdit.LoaiGiaiHuyChuong,
               MonDatGiai: restultEdit.MonDoatGiai,
               DiaChiNhanGiayBaoTrungTuyen: restultEdit.DiaChiNGBTT,
               SoDienThoai: restultEdit.SoDienThoai,
               Email: restultEdit.Email,
               KhuVucTuyenSinh: $filter("filter")($scope.dangky.ListKhuVucTuyenSinh, { KhuVucTuyenSinhID: restultEdit.KhuVucTuyenSinh })[0],
               DoiTuongTuyenSinh: $filter("filter")($scope.dangky.ListDoiTuongUuTien, { DoiTuongUuTienID: restultEdit.DoiTuongUuTienTuyenSinh })[0],
               CheDoUuTienThayDoi: restultEdit.CheDoUuTienThayDoi,
               MaTruong: "DKC",
               TenTruongDangKy: "Đại học Công Nghệ TP.HCM",
               NhomNganh1: $filter("filter")($scope.dangky.ListChuyenNganhToHopMon, { MaNganh: restultEdit.DK1MaNganh1 })[0],

               MaNghanh1: restultEdit.DK1MaNganh1,
               ToHopMonThiDungDeXetTuyen1: restultEdit.DK1ToHopMon1,
               NhomNganh2: $filter("filter")($scope.dangky.ListChuyenNganhToHopMon, { MaNganh: restultEdit.DK1MaNganh2 })[0],
               MaNghanh2: restultEdit.DK1MaNganh2,
               ToHopMonThiDungDeXetTuyen2: restultEdit.DK1ToHopMon2,

               CoDangKyXetTuyenVaoTruongKhac: restultEdit.CoDKVaoTruongKhac,
               MaTruongDaDangKy: restultEdit.DKMaTruong2,
               TenTruongDaDangKy: restultEdit.DKTenTruong2,
               GioiTinh: $filter("filter")($scope.dangky.ListGioiTinh, { GioiTinhID: restultEdit.GioiTinh })[0]
           };


       });
    };
    $scope.hasChangedTruong = function (data) {
        $scope.kq.TenTruongDaDangKy = "";
        if (data != undefined) {
            if ($filter("filter")($scope.dangky.ListDanhMucTruong, { DanhMucTruongID: data })[0] != undefined && data.length == 3)
                $scope.kq.TenTruongDaDangKy = $filter("filter")($scope.dangky.ListDanhMucTruong, { DanhMucTruongID: data })[0].DanhMucTruongName;
        }
    };
    $scope.hasChangedNganhHoc = function (index, data) {
        if (index == 0) {
            $scope.kq.MaNghanh1 = data.MaNganh;
            $scope.kq.ToHopMonThiDungDeXetTuyen1 = data.MaMonToHopXetTuyen1;
        }

        if (index == 1) {
            $scope.kq.MaNghanh2 = data.MaNganh;
            $scope.kq.ToHopMonThiDungDeXetTuyen2 = data.MaMonToHopXetTuyen2;
        }
    };




    $scope.submitDangKy = function (form) {

        if (!isValidDate($scope.kq.Thang.ThangID + $scope.kq.Ngay.NgayID + $scope.kq.Nam.NamID)) {
            alert("Ngày sinh nhập chưa đúng vui lòng kiểm tra lại!");
            return;
        }
        // if (form.$valid) {
        if ($scope.kq.MaNghanh1 == "") {
            alert("1 Xin vui lòng chọn ngành/Nhóm ngành");
            return;
        } else
            if ($scope.kq.MaNghanh2 == "") {
                alert("2 Xin vui lòng chọn ngành/Nhóm ngành");
                return;
            }

        Object.toparams = function ObjecttoParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        };

        var Tontai = "False";

        var result = ApiCall.GetApiCall(linkapi + "api/TuyenSinh/CheckExistSBD?id=" + $scope.kq.SoBaoDanh + "&thisID=" + $scope.kq.ID).success(function (data) {
            Tontai = (JSON.parse(data));

            if (Tontai === "True") {
                alert('Số báo danh này đã đăng lý trước đó!');
            } else {
                var TontaiMDKXT = "False";
                var resultMDKXT = ApiCall.GetApiCall(linkapi + "api/TuyenSinh/CheckExistMDKXT?id=" + $scope.kq.MaDangKyXetTuyen + "&thisID=" + $scope.kq.ID).success(function (data) {
                    TontaiMDKXT = (JSON.parse(data));
                    if (TontaiMDKXT === "True") {
                        alert('Mã đăng ký xét tuyển này đã đăng lý trước đó!');
                    } else {
                        alert($scope.kq.NhomNganh1.TenNganh);
                        $http({
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            method: "POST",
                            url: linkapi + "api/TuyenSinh/UpdateThongTinXetTuyenHocBa",
                            data: Object.toparams({
                                'Ngay': $scope.kq.Ngay.NgayID,
                                'Thang': $scope.kq.Thang.ThangID,
                                'Nam': $scope.kq.Nam.NamID,
                                'LoaiTiepNhan': $scope.kq.LoaiTiepNhan.LoaiTiepNhanID,
                                'HoVaTen': $scope.kq.HoVaTen,
                                //'NgaySinh': $scope.kq.NgaySinh,
                                'SoBaoDanh': $scope.kq.SoBaoDanh,
                                'SoCMND': $scope.kq.SoChungMinh,
                                'MaDKXT': $scope.kq.MaDangKyXetTuyen,
                                'DienUuTien': $scope.kq.DienUuTien,
                                'DoiTuongUuTien': $scope.kq.DoiTuongUuTien,
                                'LoaiGiaiHuyChuong': $scope.kq.LoaiHuyChuong,
                                'MonDoatGiai': $scope.kq.MonDatGiai,
                                'DiaChiNGBTT': $scope.kq.DiaChiNhanGiayBaoTrungTuyen,
                                'SoDienThoai': $scope.kq.SoDienThoai,
                                'Email': $scope.kq.Email,
                                'KhuVucTuyenSinh': $scope.kq.KhuVucTuyenSinh.KhuVucTuyenSinhID,
                                'DoiTuongUuTienTuyenSinh': $scope.kq.DoiTuongTuyenSinh.DoiTuongUuTienID,
                                'CheDoUuTienThayDoi': $scope.kq.CheDoUuTienThayDoi,
                                'DK1MaTruong': $scope.kq.MaTruong,
                                'DK1TenTruong': $scope.kq.TenTruongDangKy,
                                'DK1Nganh1': $scope.kq.NhomNganh1.TenNganh,
                                'DK1MaNganh1': $scope.kq.MaNghanh1,
                                'DK1ToHopMon1': $scope.kq.ToHopMonThiDungDeXetTuyen1,
                                'DK1Nganh2': $scope.kq.NhomNganh2.TenNganh,
                                'DK1MaNganh2': $scope.kq.MaNghanh2,
                                'DK1ToHopMon2': $scope.kq.ToHopMonThiDungDeXetTuyen2,
                                'CoDKVaoTruongKhac': $scope.kq.CoDangKyXetTuyenVaoTruongKhac,
                                'DKMaTruong2': $scope.kq.MaTruongDaDangKy,
                                'DKTenTruong2': $scope.kq.TenTruongDaDangKy,
                                'GioiTinh': $scope.kq.GioiTinh.GioiTinhID,
                                'ID': $scope.kq.ID
                            })
                        })
                            .success(function (data, status, headers, config) {

                                if (data == true) {
                                    $.cookie("LoaiTiepNhan", $scope.kq.LoaiTiepNhan.LoaiTiepNhanID, { path: window.location, expires: 7 });
                                    alert('Cập nhật thông tin thành công!');
                                    window.location = window.location;
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.debug("saved comment", $scope.comment);
                            });
                    }

                });

            }
        });

        // };
    }

});


