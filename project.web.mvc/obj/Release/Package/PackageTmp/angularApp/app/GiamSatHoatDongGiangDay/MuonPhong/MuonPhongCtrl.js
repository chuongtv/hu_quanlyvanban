// Kế thừa service từ BaseServices(search, new, Save, dataDetail, delete, deletelist) & viết bổ sung thêm function khác

app.factory('MuonPhongSvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);

    //extending the function parent if nescessary

    service.API_AutocompleteGV = 'api/NhanVien/GET_ListAutoComplate_NhanVien?TuKhoa=';
    service.API_PostPhieu = 'api/DuLieuNghiBu/POST_ThongTinMuonPhong';
    service.API_ListTiet = 'api/ThongTinCaiDatChung/GET_ListTietBatDau';
    service.API_GetOnePhieuBao = 'api/DuLieuNghiBu/GET_OneMuonPhong?PhieuBaoGuid=';
    service.API_ListBuoiAdd = 'api/DuLieuNghiBu/GET_ListNgayMuonPhong?PhieuBaoGuid=';
    service.API_ListCoSo = 'api/ThongTinCaiDatChung/GET_ListCoSoTatCa';
    service.API_ListLau = 'api/ThongTinCaiDatChung/GET_ListLauTheoCoSo?cosoguid=';

    service.API_DeletePhieuBu = 'api/DuLieuNghiBu/GET_DeletePhieuMuonPhong';
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

app.controller("MuonPhongCtrl", function ($scope, $rootScope, MuonPhongSvc, $http, BaseDialog, $translate, $uibModal, $filter, $http, $window) {
    $scope.listAdd = [];
    $scope.listShow = null;
    $scope.NhanVienGuid = "";
    $scope.NhanVienID = "";
    $scope.LyDo = "";
    $scope.PhieuMuonPhongGuid = "";
    $scope.TietBatDau = 'Tiết bắt đầu';
    $scope.TietKetThuc = 'Tiết kết thúc';
    $scope.TrangThai = 0;
    //$scope.UserGuid = "";

    $scope.indexlllll = 0;

    $scope.listTietBatDau = [{ name: 'Tiết bắt đầu', value: 'Tiết bắt đầu' }];
    $scope.listTietKetThuc = [{ name: 'Tiết kết thúc', value: 'Tiết kết thúc' }];
    MuonPhongSvc.GetApiCall(MuonPhongSvc.API_ListTiet)  //goi api get du lieu
          .then(function (response) {
              for (var i = 0; i < response.data.length ; i++) {
                  $scope.listTietBatDau.push({ name: "" + response.data[i].TietHocName + "", value: "" + response.data[i].TietHocID + "" });
                  $scope.listTietKetThuc.push({ name: "" + response.data[i].TietHocName + "", value: "" + response.data[i].TietHocID + "" });
              }

          }, function (error) {
              console.log('loi load Phieu');
          });

    //Load view
    $scope.idParameter = "";
    $scope.ThongTinPhieuView = [];


    $scope.idParameter = MuonPhongSvc.getParameterByName('id');
    if ($scope.idParameter != "") {
        MuonPhongSvc.GetApiCall(MuonPhongSvc.API_GetOnePhieuBao + $scope.idParameter)
       .then(function (response) {
           $scope.ThongTinPhieuView = response.data;
           $scope.NhanVienGuid = response.data.NguoiDeNghi_Guid;
           $scope.PhieuMuonPhongGuid = response.data.PhieuMuonPhongGuid;
           $scope.LyDo = response.data.LyDo;
           $scope.TrangThai = response.data.TrangThai;
       }, function (error) {
           console.log('loi load Phieu');
       });

        MuonPhongSvc.GetApiCall(MuonPhongSvc.API_ListBuoiAdd + $scope.idParameter)
       .then(function (response) {
           $scope.listAdd = response.data;
       }, function (error) {
           console.log('loi load list phieu add');
       });

    }
    //console.log(document.getElementsByName("NhanVienGuid").value);

    //$scope.checkChonNgay = function (value) {
    //    if (value != "" || value != null)
    //        return (new Date(value))
    //    return new Date(date.setTime(date.getTime() + 1 * 86400000));
    //}
    //$scope.chonTietKetThuc = function (value) {
    //    var ItemAdd = $filter('filter')($scope.listAdd, { ThoiKhoaBieuGuid: Guid }, true)[0];
    //    var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
    //    $scope.listAdd[indexOfArray].TietBatDau = value;
    //};

    // Config md-datepicker
    $scope.myDate = new Date();

    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());

    $scope.formatShow = function (value) {

        return $filter('date')(new Date(value), 'dd/MM/yyyy');

    };

    $scope.addChiTiet = function () {

        if ($scope.NgayMuonPhong == undefined) {
            alert("Chưa chọn ngày mượn phòng.");
            return;
        }
        if ($scope.TietBatDau == 'Tiết bắt đầu') {
            alert("Chưa chọn tiết bắt đầu.");
            return;
        }
        if ($scope.TietKetThuc == 'Tiết kết thúc') {
            alert("Chưa chọn tiết kết thúc.");
            return;
        }
        var valueDate = $filter('date')(new Date($scope.NgayMuonPhong), 'yyyy/MM/dd');

        var bd = parseInt($scope.TietKetThuc);
        var kt = parseInt($scope.TietBatDau);
        
        //console.log($scope.NgayMuonPhong);
        //console.log($scope.TietKetThuc);
        //console.log($scope.TietBatDau);
        if (kt >= bd) {
            alert("Tiết kết thúc phải sau tiết bắt đầu.");
            return;
        }
        var ItemAdd = {
            NgayMuonPhong: valueDate,
            TietBatDau: $scope.TietBatDau,
            TietKetThuc: $scope.TietKetThuc,
            SoTiet: $scope.TietKetThuc - $scope.TietBatDau
        }

        for (i = 0; i < $scope.listAdd.length; i++) {
            if ($scope.listAdd[i].NgayMuonPhong == ItemAdd.NgayMuonPhong && $scope.listAdd[i].TietBatDau == ItemAdd.TietBatDau && $scope.listAdd[i].TietKetThuc == ItemAdd.TietKetThuc) {
                alert("Thời gian mượn phòng này đã tồn tại.");
                return;
            }
        }

        $scope.listAdd.push(ItemAdd);
    };

    $scope.fnDeleteNgay = function (index) {
        $scope.listAdd.splice(index, 1);
    };

    $scope.savePhieu = function () {
        if ($scope.NhanVienGuid == '')
        { alert("Chưa chọn giảng viên báo mượn phòng!"); return; }

        var listSave;

        //console.log($scope.listAdd);

        var userId = $('#btnLuuPhieu').attr('data-otf-id');
        //console.log(userId);
        console.log($scope.NhanVienGuid);
        //for (var i = 0; i < $scope.listAdd.length ; i++) {
        //var message = "";
        listSave = {
            PhieuMuonPhongGuid: $scope.PhieuMuonPhongGuid,
            NguoiDeNghi_Guid: $scope.NhanVienGuid,
            NoiDung: $scope.LyDo,
            UserGuid: userId,
            ThongTin: $scope.listAdd
        }

        MuonPhongSvc.PostApiCall(listSave, MuonPhongSvc.API_PostPhieu)  //goi api get du lieu
            .then(function (response) {
                console.log(response.data);
                if (response.data == "ok")
                {
                    alert("Phiếu mượn phòng đã được gởi thành công");
                    $window.location.href = UrlDomainSite + 'GiamSatGiangDay/QuanLyDanhSachMuonPhong';
                }
                else
                    alert(response.data);

                //$scope.listAdd[i].ThongBao = response;
            }, function (error) {
            }).finally(function () {
            });

        //}
    };

    $scope.deletePhieu = function (id) {

        MuonPhongSvc.showloading();
        $scope.listShow = [];
        MuonPhongSvc.GetApiCall(MuonPhongSvc.API_DeletePhieuBu + "?PhieuGuid=" + id)
       .then(function (response) {
           alert("Phiếu đã được xóa");
           $window.location.href = UrlDomainSite + 'GiamSatGiangDay/QuanLyDanhSachMuonPhong';

       }, function (error) {
           console.log('loi xoa phieu');
       }).finally(function () {
           MuonPhongSvc.closeloading();
       });
    };

    $scope.BackPage = function () {
        $window.location.href = UrlDomainSite + 'GiamSatGiangDay/QuanLyDanhSachMuonPhong';

    };

    //phân phòng
    //$scope.fnPhanPhong = function (thoigian, tietbatdau, sotiet) {
    //    var modalInstance = $uibModal.open({
    //        animation: true,
    //        ariaLabelledBy: 'modal-title',
    //        ariaDescribedBy: 'modal-body',
    //        templateUrl: UrlDomainSite + '/angularApp/app/GiamSatHoatDongGiangDay/MuonPhong/PhanPhongPhieuMuonPhongModal.html',
    //        controller: 'MuonPhongPhanPhongModalCtrl',
    //        controllerAs: '$ctrl',
    //        size: '', //sm, lg
    //        resolve: {
    //            objs: function () {
    //                return { "thoigian": thoigian, "tietbatdau": tietbatdau, "sotiet": sotiet };//['item1', 'item2', 'item3']; //Members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property in the router.
    //            }
    //        }
    //    });

    //    modalInstance.result.then(function (selectedItem) {
    //        //$ctrl.selected = selectedItem;
    //        console.log(selectedItem);
    //        console.log('dong popup xong');
    //    }, function () {
    //        console.log('close');
    //        //$log.info('Modal dismissed at: ' + new Date());
    //    });
    //};

    //Xu ly Autocomplete
    AutocompleteNhanVienHinh('#text_GiangVienID', '#hidden_giangvienguid', "#lblName");
    function AutocompleteNhanVienHinh(element, valueset, Name) {
        var $input = $(element);
        var options = {
            requestDelay: 500,
            url: function (keyWord) {
                return UrlDomainAPI + MuonPhongSvc.API_AutocompleteGV + keyWord;
            },
            getValue: "HoTen",
            list: {
                onShowListEvent: function () {
                    //$(element).val("").trigger("change");
                    $(valueset).val("").trigger("change");
                    //$(Name).html("");
                },
                onSelectItemEvent: function () {
                    // gan lai gia tri khi chon
                    var valuename = $(element).getSelectedItemData().Ho + " " + $(element).getSelectedItemData().TenLot + " " + $(element).getSelectedItemData().Ten;
                    var lblName = valuename + " - " + $(element).getSelectedItemData().NhanVienID + " - " + $(element).getSelectedItemData().DonViName;
                    var valueguid = $(element).getSelectedItemData().NhanVienGuid;

                    $(element).val(valuename).trigger("change");
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
                    return "<img src='" + UrlDomainSiteFile + "/Data/HRM/" + item.NhanVienGuid + "/" + item.HinhAnhCaNhan_Link + "' style='width:40px; height:40px; float:left;' /><strong style='float:left; margin-left:10px;'>" + item.NhanVienID + "</strong><br/><span style='margin-left:10px;'>" + item.Ho + " " + item.TenLot + " " + item.Ten + " - " + item.DonViName + "</span><div style='clear:both;'></div>";
                }
            }
        };
        $input.easyAutocomplete(options);
    }

});


//Edit BuoiTruc by modal popup
app.controller('MuonPhongPhanPhongModalCtrl', function ($scope, $uibModalInstance, objs, MuonPhongSvc) {

    //Load dropdowlist
    MuonPhongSvc.showloading();
    $scope.filterto = objs;

    $scope.DanhSachPhong = function (objs) {
        var lau = "";
        var coso = "";
        if (objs.coso != undefined)
            coso = objs.coso.CoSoGuid;

        if (objs.lau != undefined)
            lau = objs.lau.LauGuid;
        //Load data
        MuonPhongSvc.showloading();
        MuonPhongSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_TinhTrangPhong_KiemTraListPhongRanh?coso=" + coso + "&lau=" + lau + "&thoigian=" + objs.thoigian + "&tietbatdau=" + objs.tietbatdau + "&sotiet=" + objs.sotiet)
        .then(function (response) {
            $scope.objs = response.data;
        }, function (error) {
            // $scope.messageresult = $translate.instant('CMN_MSG_ERROR');   //hien popup thong bao loi
        }).finally(function () {
            // Hide loading spinner whether our call succeeded or failed.            
            MuonPhongSvc.closeloading();
        });
        //-------end load data
    };

    $scope.LoadDDLLau = function (coso) {
        $scope.filterto.lau = null;
        MuonPhongSvc.GetApiCallCustomLink(UrlDomainAPI + MuonPhongSvc.API_ListLau + coso.CoSoGuid)
        .then(function (response) {
            $scope.listLau = response.data;
            if ($scope.listLau.length > 0)
                $scope.filterto.lau = $scope.listLau[0];
            $scope.DanhSachPhong(objs);
        });
    };


    MuonPhongSvc.GetApiCallCustomLink(UrlDomainAPI + MuonPhongSvc.API_ListCoSo)
    .then(function (response) {
        $scope.listCoSo = response.data;

        if ($scope.listCoSo.length > 0) {
            $scope.filterto.coso = $scope.listCoSo[0];
            $scope.filterto.lau = null;
            MuonPhongSvc.GetApiCallCustomLink(UrlDomainAPI + MuonPhongSvc.API_ListLau + $scope.listCoSo[0].CoSoGuid)
            .then(function (response) {
                $scope.listLau = response.data;
                if ($scope.listLau.length > 0)
                    $scope.filterto.lau = $scope.listLau[0];
                $scope.DanhSachPhong(objs);
            });
        }

    }, function (error) {
        // $scope.messageresult = $translate.instant('CMN_MSG_ERROR');   //hien popup thong bao loi
    }).finally(function () {
    });

    //-end load dropdowlist

    //Xu ly khi nhan nut ok
    $scope.ok = function (objtran) {
        //check validation
        console.log('da vao form');
        //neu sai thi return va thong bao
        //if ($scope.kq.MaNghanh1 == "") {
        //    alert("1 Xin vui lòng chọn ngành/Nhóm ngành");
        //    return;
        //} 

        //$state.go('step2', {
        //    obj: $scope.kq
        //});

        $uibModalInstance.close(objtran);   //can truyen gi qua ben kia thi xu ly o day
    };

    //xu ly khi nhan nut cancel
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };




});