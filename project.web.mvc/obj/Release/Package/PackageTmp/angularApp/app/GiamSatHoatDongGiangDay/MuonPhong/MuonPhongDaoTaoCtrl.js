// Kế thừa service từ BaseServices(search, new, Save, dataDetail, delete, deletelist) & viết bổ sung thêm function khác

app.factory('MuonPhongDaoTaoSvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);

    //extending the function parent if nescessary
    service.API_PostXacNhanCapPhong = 'api/DuLieuNghiBu/POST_XacNhanCapPhongMuonPhong';
    service.API_PostXacNhanCapPhong_Sendmail = 'api/DuLieuNghiBu/POST_SenEmailThongMuonPhong?item=';
    service.API_PostXacNhanCapPhong_DeleteCTPhieuMuonPhong = 'api/DuLieuNghiBu/POST_DeletePhongPhieuMuonPhong?ctphieu=';
    //end extending function
    return service;
});


app.controller("MuonPhongDaoTaoCtrl", function ($scope, $rootScope, MuonPhongDaoTaoSvc, $http, BaseDialog, $translate, $uibModal, $window) {

    $scope.formatShow = function (value) {

        return $filter('date')(new Date(value), 'dd/MM/yyyy');

    };

    $scope.fnPhanPhong = function (chitietguid, thoigian, tietbatdau, sotiet, phongid, phongguid) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: UrlDomainSite + '/angularApp/app/GiamSatHoatDongGiangDay/MuonPhong/PhanPhongPhieuMuonPhongModal.html',
            controller: 'MuonPhongPhanPhongModalCtrl',
            controllerAs: '$ctrl',
            size: '', //sm, lg
            resolve: {
                objs: function () {
                    return { "listAdd": $scope.listAdd, "phongguid": phongguid, "phongid": phongid, "chitietguid": chitietguid, "thoigian": thoigian, "tietbatdau": tietbatdau, "sotiet": sotiet };//['item1', 'item2', 'item3']; //Members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property in the router.
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            //$ctrl.selected = selectedItem;
            console.log(selectedItem);
            for (var i = 0; i < $scope.listAdd.length; i++) {
                if ($scope.listAdd[i].ChiTietPhieuMuonPhongGuid == chitietguid) {
                    $scope.listAdd[i].PhongGuid = selectedItem.PhongGuid;
                    $scope.listAdd[i].PhongIDMoi = selectedItem.PhongID;
                    $scope.listAdd[i].PhongID = selectedItem.PhongID;

                }
            }
            console.log($scope.listAdd);

            console.log('dong popup xong');
        }, function () {
            console.log('close');
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
 $scope.idParameter = MuonPhongDaoTaoSvc.getParameterByName('id');

    if ($scope.idParameter != "") {
        var idPhieuMuonPhong = $scope.idParameter;

    $scope.fnDelete = function (ctPhieuMuonGuid) {
        MuonPhongDaoTaoSvc.PostApiCall(null, MuonPhongDaoTaoSvc.API_PostXacNhanCapPhong_DeleteCTPhieuMuonPhong + ctPhieuMuonGuid)  //goi api get du lieu
               .then(function (response) {
                   if (response.data == "ok") {
                       MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/DuLieuNghiBu/GET_OneMuonPhong?PhieuBaoGuid=" + idPhieuMuonPhong)
                       .then(function (response) {
                           $scope.phieumuonphong = response.data;
                       });
                       MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/DuLieuNghiBu/GET_ListNgayMuonPhong?PhieuBaoGuid=" + idPhieuMuonPhong)
                         .then(function (response) {
                             $scope.listAdd = response.data;
                         });
                   }
                   else
                   {
                       alert("Có lỗi sinh ra trong quá trình xóa phòng!");
                   }
               }, function (error) {
                   console.log('loi gui mail');
               }).finally(function () {
                   //$window.location.href = UrlDomainSite + '/GiamSatGiangDay/YeuCauNghiBuMuonPhong';
               });
    };


   
        LoadPhieuMuonPhong(idPhieuMuonPhong);
    }
    function LoadPhieuMuonPhong(phieumuonphongguid) {
        MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/DuLieuNghiBu/GET_OneMuonPhong?PhieuBaoGuid=" + phieumuonphongguid)
        .then(function (response) {
            $scope.phieumuonphong = response.data;
        });

        MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/DuLieuNghiBu/GET_ListNgayMuonPhong?PhieuBaoGuid=" + phieumuonphongguid)
        .then(function (response) {
            $scope.listAdd = response.data;
        });
    };

    $scope.XacNhanCapPhongMuonPhong = function () {
        var listSave;
        for (var i = 0; i < $scope.listAdd.length ; i++) { if ($scope.listAdd[i].PhongGuid == null) { alert("Phải cấp phòng hết mới được xác nhận!"); return false; } }
        //var message = "";

        listSave = {
            PhieuMuonPhongGuid: idPhieuMuonPhong,
            ThongTin: $scope.listAdd
        }

        MuonPhongDaoTaoSvc.PostApiCall(listSave, MuonPhongDaoTaoSvc.API_PostXacNhanCapPhong)  //goi api get du lieu
            .then(function (response) {

                if (response.data == "ok") {
                    MuonPhongDaoTaoSvc.PostApiCall(listSave, MuonPhongDaoTaoSvc.API_PostXacNhanCapPhong_Sendmail + idPhieuMuonPhong)  //goi api get du lieu
                               .then(function (response) {
                                   $window.location.href = UrlDomainSite + 'GiamSatGiangDay/YeuCauNghiBuMuonPhong';
                               }, function (error) {
                                   console.log('loi gui mail');
                               }).finally(function () {
                                   //$window.location.href = UrlDomainSite + 'GiamSatGiangDay/YeuCauNghiBuMuonPhong';
                               });


                    alert("Phiếu mượn phòng đã được cấp phòng thành công");
                    $window.location.href = UrlDomainSite + 'GiamSatGiangDay/YeuCauNghiBuMuonPhong';
                }
                else
                    alert(response.data);

            }, function (error) {
            }).finally(function () {
            });

        //}
    };


});


//Edit BuoiTruc by modal popup
app.controller('MuonPhongPhanPhongModalCtrl', function ($scope, $uibModalInstance, $filter, objs, MuonPhongDaoTaoSvc) {
    console.log(objs);
    //Load dropdowlist
    MuonPhongDaoTaoSvc.showloading();
    $scope.filterto = objs;
    $scope.filterto.phongid = '';

    var dat = new Date();
    dat.setDate(dat.getDate() + 1);


    if ($filter('date')(new Date(objs.thoigian), 'yyyy-MM-dd') < $filter('date')(dat, 'yyyy-MM-dd'))
        alert("Cần cấp phòng trước ngày báo bù ít nhất một ngày. Vui lòng kiểm tra lại!");

    $scope.EnterToFilter = function (objs, keyEvent) {
        if (keyEvent.which === 13)
        { $scope.DanhSachPhong(objs); }
    }

    $scope.DanhSachPhong = function (objs) {
        var lau = "";
        var coso = "";
        if (objs.coso != undefined)
            coso = objs.coso.CoSoGuid;

        if (objs.lau != undefined)
            lau = objs.lau.LauGuid;
        //Load data
        MuonPhongDaoTaoSvc.showloading();

        var valueDate = $filter('date')(new Date(objs.thoigian), 'MM/dd/yyyy');
        //console.log(valuePhong);
        MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_TinhTrangPhong_KiemTraListPhongRanh?coso=" + coso + "&lau=" + lau + "&thoigian=" + valueDate + "&tietbatdau=" + objs.tietbatdau + "&sotiet=" + objs.sotiet + "&phongid=" + objs.phongid)
        .then(function (response) {
            $scope.objs = response.data;
            var soluong = 0;
            var soluongxoa = 0;
            //loại trừ dữ liệu đã chọn tạm
            for (var i = 0; i < $scope.objs.length; i++) {
                for (var j = 0; j < objs.listAdd.length; j++) {
                    if ($scope.objs[i] != undefined)
                        if (objs.listAdd[j].PhongGuid == $scope.objs[i].PhongGuid) {
                            $scope.objs.splice(i, 1);
                            soluongxoa++;
                        }
                }
                soluong = parseInt($scope.objs[i].TotalRow);
            }
            //console.log($scope.objs);
            $scope.TongSoPhongTrong = parseInt(soluong) - parseInt(soluongxoa);
            //console.log(parseInt(soluong));
            //console.log(soluong);
        }, function (error) {
            // $scope.messageresult = $translate.instant('CMN_MSG_ERROR');   //hien popup thong bao loi
        }).finally(function () {
            // Hide loading spinner whether our call succeeded or failed.            
            MuonPhongDaoTaoSvc.closeloading();
        });
        //-------end load data
    };

    $scope.LoadDDLLau = function (coso) {
        $scope.filterto.lau = null;
        MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_ListLauTheoCoSo?cosoguid=" + coso.CoSoGuid)
        .then(function (response) {
            //$scope.listLau = response.data;
            $scope.listLau = [{
                "LauGuid": "",
                "LauID": "",
                "LauName": "--Chọn lầu--"
            }];
            //console.log(response.data);
            var ListLau = response.data;
            console.log(response.data);
            for (var i = 0; i < ListLau.length; i++) {
                $scope.listLau.push({
                    "LauGuid": ListLau[i].LauGuid,
                    "LauID": ListLau[i].LauID,
                    "LauName": ListLau[i].LauName
                });
            }
            console.log($scope.listLau);
            if ($scope.listLau.length > 0)
                $scope.filterto.lau = $scope.listLau[0];
            $scope.DanhSachPhong(objs);
        });
    };


    MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_ListCoSoTatCa")
   .then(function (response) {
       // $scope.listCoSo = response.data;
       var ListLauTheoCoSo;
       $scope.listCoSo = [{
           "CoSoGuid": "",
           "CoSoID": "",
           "CoSoName": "--Cơ sở--",
           "DiaChi": "",
           "DienTichCoSo": "",
           "SoPhongHoc": ""
       }];


       ListCoSo = response.data;
       for (var i = 0; i < ListCoSo.length; i++) {
           $scope.listCoSo.push({
               "CoSoGuid": ListCoSo[i].CoSoGuid,
               "CoSoID": ListCoSo[i].CoSoID,
               "CoSoName": ListCoSo[i].CoSoName,
               "DiaChi": ListCoSo[i].DiaChi,
               "DienTichCoSo": ListCoSo[i].DienTichCoSo,
               "SoPhongHoc": ListCoSo[i].SoPhongHoc
           });
       }

       //console.log($scope.listCoSo);
       if ($scope.listCoSo.length > 0) {
           $scope.filterto.coso = $scope.listCoSo[0];
           $scope.filterto.lau = null;
           MuonPhongDaoTaoSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_ListLauTheoCoSo?cosoguid=" + $scope.listCoSo[0].CoSoGuid)
           .then(function (response) {

               $scope.listLau = [{
                   "LauGuid": "",
                   "LauID": "",
                   "LauName": "--Chọn lầu--"
               }];
               //console.log(response.data);
               var ListLau = response.data;
               console.log(response.data);
               for (var i = 0; i < ListLau.length; i++) {
                   $scope.listLau.push({
                       "LauGuid": ListLau[i].LauGuid,
                       "LauID": ListLau[i].LauID,
                       "LauName": ListLau[i].LauName
                   });
               }
               console.log($scope.listLau);
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