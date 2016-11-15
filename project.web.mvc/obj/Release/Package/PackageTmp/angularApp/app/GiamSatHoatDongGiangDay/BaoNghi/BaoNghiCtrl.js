// Kế thừa service từ BaseServices(search, new, Save, dataDetail, delete, deletelist) & viết bổ sung thêm function khác

app.factory('BaoNghiSvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);

    //extending the function parent if nescessary
    service.API_AutocompleteGV = 'api/NhanVien/GET_ListAutoComplate_NhanVien?TuKhoa=';
    service.API_ListBuoiShow = 'api/DuLieuNghiBu/GET_ListBuoiShow';
    service.API_PostPhieu = 'api/DuLieuNghiBu/POST_ThongTinBaoNghi';
    service.API_GetOnePhieuBao = 'api/DuLieuNghiBu/GET_OnePhieuBao?PhieuBaoGuid=';
    service.API_ListBuoiAdd = 'api/DuLieuNghiBu/GET_ListBuoiBaoNghi?PhieuBaoGuid=';
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

app.controller("BaoNghiCtrl", function ($scope, $rootScope, BaoNghiSvc, $http, BaseDialog, $translate, $uibModal, $filter, $window) {
    $scope.listAdd = [];
    $scope.listShow = null;
    $scope.NhanVienGuid = "";
    $scope.NhanVienID = "";
    $scope.LyDo = "";
    $scope.GiaTriNgayThang = null;
    $scope.TrangThai = 0;
    $scope.checkOpen = 0;

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
    $scope.idParameter = "";
    $scope.ThongTinPhieuView = [];


    $scope.idParameter = BaoNghiSvc.getParameterByName('id');
    if ($scope.idParameter != "")
    {
        BaoNghiSvc.GetApiCall(BaoNghiSvc.API_GetOnePhieuBao + $scope.idParameter)
       .then(function (response) {           
           $scope.ThongTinPhieuView = response.data;
           $scope.TrangThai = response.data.TrangThai;
       }, function (error) {
           console.log('loi load Phieu');
       });

        BaoNghiSvc.GetApiCall(BaoNghiSvc.API_ListBuoiAdd + $scope.idParameter)
       .then(function (response) {
           $scope.listAdd = response.data;
       }, function (error) {
           console.log('loi load list phieu add');
       });


    }


    $scope.searhTheoNgay = function () {
        BaoNghiSvc.GetApiCall(BaoNghiSvc.API_ListBuoiShow + "?NhanVienGuid=" + $scope.NhanVienGuid + "&Ngay=" + $filter('date')(new Date($scope.GiaTriNgayThang), 'dd-MM-yyyy'))
       .then(function (response) {
           $scope.listShow = response.data;
       }, function (error) {
           console.log('loi load listShow');
       })
    };

    $scope.openPopup = function () {
        $scope.checkOpen = 1;
    }

    $scope.closePopup = function () {
        $scope.checkOpen = 0;
    }

    $scope.addBuoi = function (Guid) {
        var ItemShow = $filter('filter')($scope.listShow, { ThoiKhoaBieuGuid: Guid }, true)[0];
        var ItemAdd = $filter('filter')($scope.listAdd, { ThoiKhoaBieuGuid: Guid }, true)[0];
        var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        if (indexOfArray > -1)
            $scope.listAdd.splice(indexOfArray, 1);
        else
            $scope.listAdd.push(ItemShow);
    };

    $scope.VailCheckBox = function (Guid) {
        var ItemAdd = $filter('filter')($scope.listAdd, { ThoiKhoaBieuGuid: Guid }, true)[0];
        var indexOfArray = $scope.listAdd.indexOf(ItemAdd);
        if (indexOfArray > -1)
            return true;
        else
            return false;
    }

    $scope.savePhieu = function () {

        var listSave ;

        //for (var i = 0; i < $scope.listAdd.length ; i++) {
            //var message = "";
            listSave = {
                NhanVien_Guid: $scope.NhanVienGuid,
                NoiDung: $scope.LyDo,
                ThongTin: $scope.listAdd,
                UserGuid: $("#btnLuuPhieu").attr('data-otf-id')
            }

            BaoNghiSvc.PostApiCall(listSave, BaoNghiSvc.API_PostPhieu)  //goi api get du lieu
                .then(function (response) {
                    //console.log(response);
                    if (response.data != "")
                        alert(response.data);
                    else
                    {
                        alert("Phiếu báo nghỉ đã được gởi thành công");
                        $window.location.href = UrlDomainSite + '/GiamSatGiangDay/QuanLyDanhSachNghiBu';
                    }
                       
                }, function (error) {
                }).finally(function () {
                   
                });

        //}
    };

    $scope.BackPage = function () {
        $window.location.href = UrlDomainSite + '/GiamSatGiangDay/QuanLyDanhSachNghiBu';

    };



    //Xu ly Autocomplete
    AutocompleteNhanVienHinh('#text_GiangVienID', '#hidden_giangvienguid', "#lblName");

    function AutocompleteNhanVienHinh(element, valueset, Name) {
        var $input = $(element);
        var options = {
            requestDelay: 500,
            url: function (keyWord) {
                return UrlDomainAPI + BaoNghiSvc.API_AutocompleteGV + keyWord;;
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
                    var lblName = valuename + " - " + $(element).getSelectedItemData().NhanVienID + " - " +$(element).getSelectedItemData().DonViName;
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

