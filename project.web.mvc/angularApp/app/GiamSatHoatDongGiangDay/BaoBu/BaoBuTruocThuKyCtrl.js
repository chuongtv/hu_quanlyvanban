// Kế thừa service từ BaseServices(search, new, Save, dataDetail, delete, deletelist) & viết bổ sung thêm function khác

app.factory('BaoBuTruocThuKySvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);

    //extending the function parent if nescessary
    //service.url = 'api/BuildCodeSmith/BuoiTruc/';        //Declare API Link
    service.API_AutocompleteGV = 'api/NhanVien/GET_ListAutoComplate_NhanVien?TuKhoa=';
    service.API_ListMonShow = 'api/DuLieuNghiBu/GET_ListLopShow';
    service.API_PostPhieu = 'api/DuLieuNghiBu/POST_ThongTinBaoBuTruoc';
    service.API_GetOnePhieuBao = 'api/DuLieuNghiBu/GET_OnePhieuBao?PhieuBaoGuid=';
    service.API_ListBuoiAdd = 'api/DuLieuNghiBu/GET_ListLopBaoBuTruoc?PhieuBaoGuid=';
    service.API_ListTiet = 'api/ThongTinCaiDatChung/GET_ListTietBatDau';
    service.API_ListNamHoc = 'api/NamHoc/GET_ListNamHoc';

    service.API_DeletePhieuBu = 'api/DuLieuNghiBu/GET_DeletePhieuBu';

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
app.filter('dayOfWeekAsInteger', function () {
    return function (input) {
        var value = '';
        var index = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(input);

        if (index == 0)
            value = 'CN';
        else
            value = index + 1;
        return value;
    };
});


app.controller("BaoBuTruocThuKyCtrl", function ($scope, $rootScope, BaoBuTruocThuKySvc, $http, BaseDialog, $translate, $uibModal, $filter, $window) {
    $scope.listAdd = [];
    $scope.listShow = null;
    $scope.NhanVienGuid = "";
    $scope.NhanVienID = "";
    $scope.LyDo = "";
    $scope.GiaTriNgayThang = null;
    $scope.SearchMaMon = "";
    $scope.listNamHoc = [{ NamHocID: '0', NamHocName: 'Chọn năm học' }];
    $scope.listTiet = [{ name: 'Tiết', value: 'Tiết' }];
    $scope.NamID = BaoBuTruocThuKySvc.getNamHocHienTai();
    $scope.TietBatDau = 'Tiết';
    $scope.TrangThai = 0;
    $scope.checkOpen = 0;

    BaoBuTruocThuKySvc.GetApiCall(BaoBuTruocThuKySvc.API_ListTiet)
      .then(function (response) {
          for (var i = 0; i < response.data.length ; i++) {
              $scope.listTiet.push({ name: "" + response.data[i].TietHocName + "", value: "" + response.data[i].TietHocID + "" });
          }

      }, function (error) {
          console.log('loi load list tiet');
      });

    BaoBuTruocThuKySvc.GetApiCall(BaoBuTruocThuKySvc.API_ListNamHoc)
      .then(function (response) {
          for (var i = 0; i < response.data.length ; i++) {
              $scope.listNamHoc.push({ NamHocID: "" + response.data[i].NamHocID + "", NamHocName: "" + response.data[i].NamHocName + "" });
          }

      }, function (error) {
          console.log('loi load list nam hoc');
      });


    // Config md-datepicker
    $scope.myDate = new Date();

    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());

    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 12,
        $scope.myDate.getDate());

    // End md-datepicker

    //Load view

    $scope.idParameter = BaoBuTruocThuKySvc.getParameterByName('id');
    $scope.ThongTinPhieuView = [];

    if ($scope.idParameter != "") {
        BaoBuTruocThuKySvc.GetApiCall(BaoBuTruocThuKySvc.API_GetOnePhieuBao + $scope.idParameter)
       .then(function (response) {
           $scope.ThongTinPhieuView = response.data;
           $scope.LyDo = response.data.NoiDung;
           $scope.NhanVienGuid = response.data.NhanVien_Guid;
           $scope.TrangThai = response.data.TrangThai;
       }, function (error) {
           console.log('loi load Phieu');
       });

        BaoBuTruocThuKySvc.GetApiCall(BaoBuTruocThuKySvc.API_ListBuoiAdd + $scope.idParameter)
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

    $scope.chonNgayBu = function (value, index) {
        //var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: Guid }, true)[0];
        //var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        $scope.listAdd[index].NgayBu = $filter('date')(new Date(value), 'yyyy-MM-dd');
    };

    $scope.chonTietBatDau = function (Guid, value, TietBatDau, NgayBu, index) {
        //var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: Guid, TietBatDau: TietBatDau, NgayBu: NgayBu }, true)[0];
        //var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        $scope.listAdd[index].TietBatDau = value;

    };


    $scope.loadListMon = function () {
        if ($scope.NhanVienGuid.length == 0) {
            alert("Xin vui lòng chọn Giảng viên");
            return;
        }
        $scope.checkOpen = 1;

        BaoBuTruocThuKySvc.showloading();
        $scope.listShow = [];
        BaoBuTruocThuKySvc.GetApiCall(BaoBuTruocThuKySvc.API_ListMonShow + "?NhanVienGuid=" + $scope.NhanVienGuid + "&NamID=" + $scope.NamID)
       .then(function (response) {
           $scope.listShow = response.data;
       }, function (error) {
           console.log('loi load listShow');
       }).finally(function () {
           BaoBuTruocThuKySvc.closeloading();
       });
    };

    $scope.deletePhieu = function (id) {

        BaoBuTruocThuKySvc.showloading();
        $scope.listShow = [];
        BaoBuTruocThuKySvc.GetApiCall(BaoBuTruocThuKySvc.API_DeletePhieuBu + "?PhieuGuid=" + id)
       .then(function (response) {
           alert("Phiếu đã được xóa");
           $window.location.href = UrlDomainSite + 'GiamSatGiangDay/QuanLyDanhSachNghiBu';

       }, function (error) {
           console.log('loi xoa phieu');
       }).finally(function () {
           BaoBuTruocThuKySvc.closeloading();
       });
    };


    $scope.deleteBuoi = function (index) {
        $scope.listAdd.splice(index, 1);

    };

    $scope.addBuoi = function (Guid) {
        var listSave;
        var ItemShow = $filter('filter')($scope.listShow, { LopHocGuid: Guid }, true)[0];

        var random = Math.floor((Math.random() * 1000) + 1);
        var DateChon = new Date(
                        $scope.myDate.getFullYear(),
                        $scope.myDate.getMonth(),
                        $scope.myDate.getDate() + 1);

        listSave = {
            LopHocGuid: ItemShow.LopHocGuid,
            LopThucTeGhep: ItemShow.LopThucTeGhep,
            MonHocName: ItemShow.MonHocName,
            NgayBu: DateChon,
            NhanVien_Guid: ItemShow.NhanVien_Guid,
            NhomHoc: ItemShow.NhomHoc,
            NhomThucHanh: ItemShow.NhomThucHanh,
            PhongGuid: ItemShow.PhongGuid,
            PhongID: ItemShow.PhongID,
            SiSoLopHoc: ItemShow.SiSoLopHoc,
            SoTiet: ItemShow.SoTiet,
            ThoiGianBatDau: ItemShow.ThoiGianBatDau,
            ThoiGianKetThuc: ItemShow.ThoiGianKetThuc,
            Thu: ItemShow.Thu,
            TietBatDau: ItemShow.TietBatDau,
            row: random
        }
        $scope.listAdd.push(listSave);

        //var ItemShow = $filter('filter')($scope.listShow, { LopHocGuid: Guid }, true)[0];
        //var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: Guid }, true)[0];
        //var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        //if (indexOfArray > -1)
        //    $scope.listAdd.splice(indexOfArray, 1);
        //else {
        //    var DateChon = new Date(
        //                $scope.myDate.getFullYear(),
        //                $scope.myDate.getMonth(),
        //                $scope.myDate.getDate() + 1);
        //    //myDate.setDate(myDate.getDate() + 1);
        //    ItemShow.NgayBu = DateChon;
        //    $scope.listAdd.push(ItemShow);
        //}

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

    $scope.savePhieu = function () {
        BaoBuTruocThuKySvc.showloading();
        for (var i = 0; i < $scope.listAdd.length ; i++) {
            if ($scope.listAdd[i].NgayBu == null || $scope.listAdd[i].NgayBu == "") {
                alert("Xin vui lòng chọn ngày bù");
                BaoBuTruocThuKySvc.closeloading();
                return;
            }

            if ($scope.listAdd[i].TietBatDau == "Tiết" || $scope.listAdd[i].TietBatDau == "") {
                alert("Xin vui lòng chọn Tiết bắt đầu");
                BaoBuTruocThuKySvc.closeloading();
                return;
            }

            if ((parseInt($scope.listAdd[i].TietBatDau) + parseInt($scope.listAdd[i].SoTiet)) > 15) {
                alert("Tiết kết thúc không được quá tiết 15 - Xin vui lòng xem lại tiết bắt đầu và số tiết");
                BaoBuTruocThuKySvc.closeloading();
                return;
            }

            var ItemAdd = $filter('filter')($scope.listAdd, { LopHocGuid: $scope.listAdd[i].LopHocGuid, TietBatDau: $scope.listAdd[i].TietBatDau, NgayBu: $scope.listAdd[i].NgayBu }, true);
            if (ItemAdd.length > 1) {
                alert('Lỗi trùng: Lớp ' + $scope.listAdd[i].LopThucTeGhep + ', tiết bắt đầu là ' + $scope.listAdd[i].TietBatDau + ', ngày bù: ' + $filter('date')(new Date($scope.listAdd[i].NgayBu), 'dd-MM-yyyy'));
                BaoBuTruocThuKySvc.closeloading();
                return;
            }
        }
        var listSave;

        listSave = {
            PhieuBaoGuid: $scope.idParameter,
            NhanVien_Guid: $scope.NhanVienGuid,
            NoiDung: $scope.LyDo,
            UserGuid: $("#btnLuuPhieu").attr('data-otf-id'),
            TrangThai: $scope.TrangThai,
            ThongTin: $scope.listAdd
        }

        BaoBuTruocThuKySvc.PostApiCall(listSave, BaoBuTruocThuKySvc.API_PostPhieu)  //goi api get du lieu
            .then(function (response) {
                //console.log(response);
                if (response.data != "")
                    alert(response.data);
                else {
                    alert("Phiếu báo bù đã được gởi thành công");
                    $window.location.href = UrlDomainSite + 'GiamSatGiangDay/QuanLyDanhSachNghiBu';
                }

            }, function (error) {
            }).finally(function () {
                BaoBuTruocThuKySvc.closeloading();
            });
    };

    $scope.BackPage = function () {
        $window.location.href = UrlDomainSite + 'GiamSatGiangDay/QuanLyDanhSachNghiBu';

    };

    $scope.inPhieu = function (element) {
        BaoBuTruocThuKySvc.showloading();
        var id = $(element).attr('data-otf-id');
        //var idList = $(element).attr('data-otf-idlist');
        var idloadTo = $(element).attr('data-otf-target');
        var action = $(element).attr('data-otf-action');
        var actionPrint = $(element).attr('data-otf-action-print');
        var actionDownload = $(element).attr('data-otf-action-download');
        var actionDetele = $(element).attr('data-otf-action-delete');
        var contentHTML = "";

        //var numberCheckboxSeleted = $(idList + ' input.checkbox-item:checked').length;
        var count = 0;
        //$(idList + ' input.checkbox-item').each(function (index, value) {

        //    if ($(this).is(':checked')) {
        var value = $(element).attr('data-otf-value');
        $.ajax({
            url: action,
            type: 'POST',
            data: {
                id: value
            },
            success: function (data, textStatus, xhr) {
                contentHTML = contentHTML + data;
                count++;
                //if (count == numberCheckboxSeleted) {
                $.ajax({
                    url: actionPrint,
                    type: 'POST',
                    data: {
                        html: contentHTML,
                        id: value,
                        all: 1
                    },
                    success: function (data, textStatus, xhr) {
                        window.open(actionDownload + "?id=" + value + "&all=1", '_blank');
                        //$(idloadTo).load(actionDetele);
                        BaoBuTruocThuKySvc.closeloading();
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(textStatus);
                        BaoBuTruocThuKySvc.closeloading();
                    }
                });
                //}
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(textStatus);
                BaoBuTruocThuKySvc.closeloading();
            }
        });

    }


    //Xu ly Autocomplete
    AutocompleteNhanVienHinh('#text_GiangVienID', '#hidden_giangvienguid', "#lblName");
    function AutocompleteNhanVienHinh(element, valueset, Name) {
        var $input = $(element);
        var options = {
            requestDelay: 500,
            url: function (keyWord) {
                return UrlDomainAPI + BaoBuTruocThuKySvc.API_AutocompleteGV + keyWord;
            },
            getValue: "HoTen",
            list: {
                onShowListEvent: function () {
                    //$(element).val("").trigger("change");
                    $(valueset).val("").trigger("change");
                    //$(Name).html("");
                },
                onClickEvent: function () {
                    // gan lai gia tri khi chon
                    var valuename = $(element).getSelectedItemData().HoTen;
                    var lblName = valuename + " - " + $(element).getSelectedItemData().NhanVienID + " - " + $(element).getSelectedItemData().DonViName;
                    var valueguid = $(element).getSelectedItemData().NhanVienGuid;

                    //$(element).val(valuename).trigger("change");
                    $(valueset).val(valueguid).trigger("change");
                    $(Name).html(lblName);
                },
                onHideListEvent: function () {
                    //console.log($(valueset).val());
                },
                match: {
                    enabled: false,
                },
            },
            template: {
                type: "custom",
                method: function (value, item) {
                    return "<img src='" + UrlDomainSiteFile + "/Data/HRM/" + item.NhanVienGuid + "/" + item.HinhAnhCaNhan_Link + "' style='width:40px; height:40px; float:left;' /><strong style='float:left; margin-left:10px;'>" + item.NhanVienID + "</strong><br/><span style='margin-left:10px;'>" + item.HoTen + " - " + item.DonViName + "</span><div style='clear:both;'></div>";
                }
            }
        };
        $input.easyAutocomplete(options);
    }
});