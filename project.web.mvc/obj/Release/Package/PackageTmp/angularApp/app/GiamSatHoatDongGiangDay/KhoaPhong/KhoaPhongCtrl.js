// Kế thừa service từ BaseServices(search, new, Save, dataDetail, delete, deletelist) & viết bổ sung thêm function khác

app.factory('KhoaPhongSvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);

    //extending the function parent if nescessary
    //service.url = 'api/BuildCodeSmith/BuoiTruc/';        //Declare API Link
    service.API_AutocompleteGV = 'api/NhanVien/GET_ListAutoComplate_NhanVien?TuKhoa=';
    service.API_ListMonShow = 'api/DuLieuNghiBu/GET_ListLopShow';

    service.API_PostPhieu = 'api/DuLieuNghiBu/POST_ThongTinKhoaPhong';
    service.API_PostCheckPhieu = 'api/DuLieuNghiBu/POST_CheckThongTinKhoaPhong';

    service.API_GetOnePhieuBao = 'api/DuLieuNghiBu/GET_OnePhieuKhoaPhong?PhieuGuid=';
    service.API_ListBuoiAdd = 'api/DuLieuNghiBu/GET_ListPhongAdd?PhieuGuid=';
    service.API_ListTiet = 'api/ThongTinCaiDatChung/GET_ListTietBatDau';
    service.API_ListNamHoc = 'api/NamHoc/GET_ListNamHoc';
    service.API_DeletePhieuBu = 'api/DuLieuNghiBu/GET_DeletePhieuKhoaPhong';
    //end extending function
    return service;
});

app.directive('confirmClick', function ($window) {
    var i = 0;
    return {
        restrict: 'A',
        priority: 1,
        compile: function (tElem, tAttrs) {
            var fn = '$$confirmClick' + i++,
                _ngClick = tAttrs.ngClick;
            tAttrs.ngClick = fn + '($event)';

            return function (scope, elem, attrs) {
                var confirmMsg = attrs.confirmClick || 'Are you sure?';

                scope[fn] = function (event) {
                    if ($window.confirm(confirmMsg)) {
                        scope.$eval(_ngClick, { $event: event });
                    }
                };
            };
        }
    };
});


app.controller("KhoaPhongCtrl", function ($scope, $rootScope, KhoaPhongSvc, $http, BaseDialog, $translate, $uibModal, $filter, $window) {
    $scope.listAdd = [];
    $scope.listShow = null;
    $scope.NhanVienGuid = "";
    $scope.NhanVienID = "";
    $scope.LyDo = "";
    $scope.GiaTriNgayThang = null;
    $scope.SearchMaMon = "";
    $scope.listNamHoc = [{ NamHocID: '0', NamHocName: 'Chọn năm học' }];
    $scope.listTiet = [{ name: 'Tiết', value: 'Tiết' }];

    $scope.listTietBatDau = [{ name: 'Tiết bắt đầu', value: '0' }];
    $scope.listTietKetThuc = [{ name: 'Tiết kết thúc', value: '0' }];
    $scope.TietBatDau = '0';
    $scope.TietKetThuc = '0';
    $scope.TuNgay = null;
    $scope.DenNgay = null;
    $scope.PhongID = '';
    $scope.Check = 0;
    $scope.showError = 0;

    $scope.NamID = KhoaPhongSvc.getNamHocHienTai(); 
    $scope.TrangThai = 0;
    $scope.checkOpen = 0;

    KhoaPhongSvc.GetApiCall(KhoaPhongSvc.API_ListTiet)
      .then(function (response) {
          for (var i = 0; i < response.data.length ; i++) {
              $scope.listTietBatDau.push({ name: "" + response.data[i].TietHocName + "", value: "" + response.data[i].TietHocID + "" });
              $scope.listTietKetThuc.push({ name: "" + response.data[i].TietHocName + "", value: "" + response.data[i].TietHocID + "" });
          }

      }, function (error) {
          console.log('loi load list tiet');
      });
    
    $scope.themPhong = function () {
        if ($scope.TietBatDau == '0')
        {
            alert('Xin vui lòng chọn tiết bắt đầu');
            return;
        }
            
        if ($scope.TietKetThuc == '0')
        {
            alert('Xin vui lòng chọn tiết kết thúc');
            return;
        }
            
        if ($scope.TuNgay == '')
        {
            alert('Xin vui lòng chọn từ ngày');
            return;
        }
            
        if ($scope.DenNgay == '')
        {
            alert('Xin vui lòng chọn đến ngày');
            return;
        }

        var bd = parseInt($scope.TietKetThuc);
        var kt = parseInt($scope.TietBatDau);
        if (kt >= bd) {
            alert("Tiết kết thúc phải sau tiết bắt đầu.");
            return;
        }

        var day1 = new Date($scope.TuNgay);
        var day2 = new Date($scope.DenNgay);
        console.log(day1);
        if (day1 > day2) {
            alert("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
            return;
        }

        //var ItemAdd = $filter('filter')($scope.listAdd, { PhongID: $scope.PhongID }, true)[0];
        //var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        //if (indexOfArray > -1)
        //    alert("Phòng " + $scope.PhongID + "đã được thêm trước đó");
        //else {
            $scope.Check = 0;
            $scope.listAdd.push({
                PhongID: $scope.PhongID,
                TuNgay: $scope.TuNgay,
                DenNgay: $scope.DenNgay,
                TietBatDau: $scope.TietBatDau,
                TietKetThuc: $scope.TietKetThuc
            });
           
        //}
       
    }
     


    // Config md-datepicker
    $scope.myDate = new Date();

    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate() + 1);

    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 12,
        $scope.myDate.getDate());

    // End md-datepicker

    //Load view

    $scope.idParameter = KhoaPhongSvc.getParameterByName('id');
    $scope.ThongTinPhieuView = [];

    if ($scope.idParameter != "") {
        KhoaPhongSvc.GetApiCall(KhoaPhongSvc.API_GetOnePhieuBao + $scope.idParameter)
       .then(function (response) {
           $scope.ThongTinPhieuView = response.data;
           console.log(response);
           $scope.LyDo = response.data.NoiDung;
           //$scope.NhanVienGuid = response.data.NhanVien_Guid;
           //$scope.TrangThai = response.data.TrangThai;
       }, function (error) {
           console.log('loi load Phieu');
       });

        KhoaPhongSvc.GetApiCall(KhoaPhongSvc.API_ListBuoiAdd + $scope.idParameter)
       .then(function (response) {
           $scope.listAdd = response.data;
       }, function (error) {
           console.log('loi load list phieu add');
       }).finally(function () {
       });


    }

    $scope.checkChonNamHoc = function (value) {
        return "" + value + "";
    }

    $scope.checkChonTietBatDau = function (value) {
        return "" + value + "";
    }

    $scope.checkChonNgay = function (value) {
        if (value != "" || value != null)
            return (new Date(value))
        return new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth(),
            $scope.myDate.getDate() + 1);
    }

    //End load view

    $scope.chonNgayBu = function (Guid, Ngay) {
        var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: Guid }, true)[0];
        var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        $scope.listAdd[indexOfArray].NgayBu = $filter('date')(new Date(Ngay), 'yyyy-MM-dd');
    };

    $scope.chonTietBatDau = function (Guid, value) {
        var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: Guid }, true)[0];
        var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        $scope.listAdd[indexOfArray].TietBatDau = value;
    };

    $scope.loadListMon = function () {
        if ($scope.NhanVienGuid.length == 0) {
            alert("Xin vui lòng chọn Giảng viên");
            return;
        }
        $scope.checkOpen = 1;

        KhoaPhongSvc.showloading();
        $scope.listShow = [];
        KhoaPhongSvc.GetApiCall(KhoaPhongSvc.API_ListMonShow + "?NhanVienGuid=" + $scope.NhanVienGuid + "&NamID=" + $scope.NamID)
       .then(function (response) {
           $scope.listShow = response.data;
       }, function (error) {
           console.log('loi load listShow');
       }).finally(function () {
           KhoaPhongSvc.closeloading();
       });
    };

    $scope.deletePhieu = function (id) {

        KhoaPhongSvc.showloading();

        var listSave;
        listSave = {
            PhieuKhoaPhongGuid: $scope.idParameter,
            NhanVien_Guid: $("#btnLuuPhieu").attr('data-otf-id'),
            NoiDung: $scope.LyDo,
            UserGuid: $("#btnLuuPhieu").attr('data-otf-id'),
            ThongTin: $scope.listAdd
        }

        KhoaPhongSvc.PostApiCall(listSave, KhoaPhongSvc.API_DeletePhieuBu)  //goi api get du lieu
            .then(function (response) {
                    alert("Phiếu đã được xóa");
                    $window.location.href = UrlDomainSite + '/GiamSatGiangDay/QuanLyPhieuKhoaPhong';

            }, function (error) {
                console.log('loi xoa phieu');
            }).finally(function () {
                KhoaPhongSvc.closeloading();
            });


       // KhoaPhongSvc.showloading();
       // $scope.listShow = [];
       // KhoaPhongSvc.GetApiCall(KhoaPhongSvc.API_DeletePhieuBu + "?PhieuGuid=" + id)
       //.then(function (response) {
       //    alert("Phiếu đã được xóa");
       //    $window.location.href = UrlDomainSite + '/GiamSatGiangDay/QuanLyPhieuKhoaPhong';

       //}, function (error) {
       //    console.log('loi xoa phieu');
       //}).finally(function () {
       //    KhoaPhongSvc.closeloading();
       //});
    };


    $scope.deleteBuoi = function (Guid, TietBatDau, TietKetThuc) {
        $scope.Check = 0;
        var ItemAdd = $filter('filter')($scope.listAdd, { PhongID: Guid, TietBatDau: TietBatDau, TietKetThuc: TietKetThuc }, true)[0];
        console.log
        var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        if (indexOfArray > -1)
            $scope.listAdd.splice(indexOfArray, 1);

    };

 

    $scope.addBuoi = function (Guid) {
        var ItemShow = $filter('filter')($scope.listShow, { LopHocGuid: Guid }, true)[0];
        var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: Guid }, true)[0];
        var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        if (indexOfArray > -1)
            $scope.listAdd.splice(indexOfArray, 1);
        else {
            var DateChon = new Date(
                        $scope.myDate.getFullYear(),
                        $scope.myDate.getMonth(),
                        $scope.myDate.getDate() + 1);
            //myDate.setDate(myDate.getDate() + 1);
            ItemShow.NgayBu = DateChon;
            $scope.listAdd.push(ItemShow);
        }

    };

    $scope.closeAddBuoi = function () {
        //for (var i = 0; i < $scope.listAdd.length ; i++) {
        //    $scope.listAdd[i].TietBatDau = "Tiết"
        //}
        $scope.checkOpen = 0;
    }

    $scope.VailCheckBox = function (Guid) {
        var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: Guid }, true)[0];
        var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        if (indexOfArray > -1)
            return true;
        else
            return false;
    }

    $scope.checkPhieu = function () {

        KhoaPhongSvc.showloading();

        var listSave;
        listSave = {
            PhieuKhoaPhongGuid: $scope.idParameter,
            NhanVien_Guid: $("#btnLuuPhieu").attr('data-otf-id'),
            NoiDung: $scope.LyDo,
            UserGuid: $("#btnLuuPhieu").attr('data-otf-id'),
            ThongTin: $scope.listAdd
        }

        KhoaPhongSvc.PostApiCall(listSave, KhoaPhongSvc.API_PostCheckPhieu)  //goi api get du lieu
            .then(function (response) {
                if (response.data != "")
                {
                    alert('Có phòng đã sử dụng');
                    $("#errorID").html(response.data);
                }                    
                else
                {
                    alert('Các phòng theo yêu cầu đang rảnh - Có thể lưu phiếu');
                    $("#errorID").html('');
                    $scope.Check = 1;
                }
                    

            }, function (error) {
                console.log('error');
            }).finally(function () {
                KhoaPhongSvc.closeloading();
            });
    };

    $scope.savePhieu = function () {
        
        KhoaPhongSvc.showloading();

        var listSave;
        listSave = {
            PhieuKhoaPhongGuid: $scope.idParameter,
            NhanVien_Guid: $("#btnLuuPhieu").attr('data-otf-id'),
            NoiDung: $scope.LyDo,
            UserGuid: $("#btnLuuPhieu").attr('data-otf-id'),
            ThongTin: $scope.listAdd
        }

        KhoaPhongSvc.PostApiCall(listSave, KhoaPhongSvc.API_PostPhieu)  //goi api get du lieu
            .then(function (response) {
                if (response.data != "")
                    alert(response.data);
                else
                {
                    alert("Phiếu đã được lưu thành công");
                    $window.location.href = UrlDomainSite + '/GiamSatGiangDay/QuanLyPhieuKhoaPhong';
                }
                   
            }, function (error) {
                console.log('error');
            }).finally(function () {
                KhoaPhongSvc.closeloading();
            });
    };

    $scope.BackPage = function () {
        $window.location.href = UrlDomainSite + '/GiamSatGiangDay/QuanLyPhieuKhoaPhong';

    };

    //Xu ly Autocomplete
    //AutocompleteNhanVienHinh('#text_GiangVienID', '#hidden_giangvienguid', "#lblName");
    //function AutocompleteNhanVienHinh(element, valueset, Name) {
    //    var $input = $(element);
    //    var options = {
    //        requestDelay: 500,
    //        url: function (keyWord) {
    //            return UrlDomainAPI + KhoaPhongSvc.API_AutocompleteGV + keyWord;
    //        },
    //        getValue: "HoTen",
    //        list: {
    //            onShowListEvent: function () {
    //                //$(element).val("").trigger("change");
    //                $(valueset).val("").trigger("change");
    //                //$(Name).html("");
    //            },
    //            onClickEvent: function () {
    //                // gan lai gia tri khi chon
    //                var valuename = $(element).getSelectedItemData().HoTen;
    //                var lblName = valuename + " - " + $(element).getSelectedItemData().NhanVienID + " - " + $(element).getSelectedItemData().DonViName;
    //                var valueguid = $(element).getSelectedItemData().NhanVienGuid;

    //                //$(element).val(valuename).trigger("change");
    //                $(valueset).val(valueguid).trigger("change");
    //                $(Name).html(lblName);
    //            },
    //            onHideListEvent: function () {
    //                //console.log($(valueset).val());
    //            },
    //            match: {
    //                enabled: false,
    //            },
    //        },
    //        template: {
    //            type: "custom",
    //            method: function (value, item) {
    //                return "<img src='" + UrlDomainSiteFile + "/Data/HRM/" + item.NhanVienGuid + "/" + item.HinhAnhCaNhan_Link + "' style='width:40px; height:40px; float:left;' /><strong style='float:left; margin-left:10px;'>" + item.NhanVienID + "</strong><br/><span style='margin-left:10px;'>" + item.HoTen + " - " + item.DonViName + "</span><div style='clear:both;'></div>";
    //            }
    //        }
    //    };
    //    $input.easyAutocomplete(options);
    //}

});