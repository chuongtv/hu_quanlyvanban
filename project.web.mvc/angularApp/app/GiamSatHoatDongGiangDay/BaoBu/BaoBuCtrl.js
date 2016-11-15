// Kế thừa service từ BaseServices(search, new, Save, dataDetail, delete, deletelist) & viết bổ sung thêm function khác

app.factory('BaoBuSvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);

    //extending the function parent if nescessary
    service.url = 'api/BuildCodeSmith/BuoiTruc/';        //Declare API Link
    service.API_PostXacNhanCapPhong = 'api/DuLieuNghiBu/POST_XacNhanCapPhongBaoBu';
    service.API_PostXacNhanCapPhong_Sendmail = 'api/DuLieuNghiBu/POST_SenEmailThongTinBu?item=';

    //end extending function
    return service;
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

app.controller("BaoBuCtrl", function ($scope, $rootScope, BaoBuSvc, $http, BaseDialog, $translate, $uibModal, $window) {


    $scope.fnPhanPhong = function (LopGuid, thoigian, tietbatdau, sotiet, phongid) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: UrlDomainSite + '/angularApp/app/GiamSatHoatDongGiangDay/BaoBu/BaoBuPhanPhongModal.html',
            controller: 'BaoBuPhanPhongModalCtrl',
            controllerAs: '$ctrl',
          //  windowClass: 'Modal-width800',
            size: 'lg', //sm, 
            resolve: {
                objs: function () {
                    return { "LopGuid": LopGuid, "listAdd": $scope.listAdd, "phongid": phongid, "tkbguid": "", "thoigian": thoigian, "tietbatdau": tietbatdau, "sotiet": sotiet };//['item1', 'item2', 'item3']; //Members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property in the router.
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
           

            for (var i = 0; i < $scope.listAdd.length; i++) {

                if ($scope.listAdd[i].LopHocGuid == LopGuid
                    && $scope.listAdd[i].TietBatDau == tietbatdau
                    &&$scope.listAdd[i].NgayBu==thoigian
                    ) {
                    $scope.listAdd[i].PhongGuid = selectedItem.PhongGuid;
                    $scope.listAdd[i].PhongIDMoi = selectedItem.PhongID;
                    $scope.listAdd[i].TietBatDau = tietbatdau;
                    $scope.listAdd[i].NgayBu = thoigian;
                    $scope.listAdd[i].SoTiet = sotiet;
                }
            }

            console.log('dong popup xong');
        }, function () {
            console.log('close');
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };






    $scope.idParameter = BaoBuSvc.getParameterByName('id');

    if ($scope.idParameter != "") {
        var idPhieuBaoBu = $scope.idParameter;
        LoadPhieuBaoBu(idPhieuBaoBu);
    }

    function LoadPhieuBaoBu(phieubaobuguid) {

        BaoBuSvc.GetApiCallCustomLink(UrlDomainAPI + "api/DuLieuNghiBu/GET_OnePhieuBao?PhieuBaoGuid=" + phieubaobuguid)
        .then(function (response) {
            $scope.phieubaobu = response.data;
        });

        BaoBuSvc.GetApiCallCustomLink(UrlDomainAPI + "api/DuLieuNghiBu/GET_ListLopBaoBuTruoc?PhieuBaoGuid=" + phieubaobuguid)
        .then(function (response) {
            $scope.listAdd = response.data;
            //console.log($scope.listAdd);
        });
    };

    $scope.XacNhanCapPhong = function (user) {
        var listSave;

        for (var i = 0; i < $scope.listAdd.length ; i++) {
            if ($scope.listAdd[i].PhongGuid == null) {
                alert("Phải cấp phòng hết mới được xác nhận!");
                return false;
            }
        }
        //var message = "";
     
        listSave = {
            NhanVienGuid: user,
            PhieuBaoBuGuid: idPhieuBaoBu,
            LoaiPhieu: "BaoBu",
            ThongTin: $scope.listAdd
        }

        BaoBuSvc.PostApiCall(listSave, BaoBuSvc.API_PostXacNhanCapPhong)  //goi api get du lieu
            .then(function (response) {
                BaoBuSvc.PostApiCall(listSave, BaoBuSvc.API_PostXacNhanCapPhong_Sendmail + idPhieuBaoBu)  //goi api get du lieu
                .then(function (response) {
                    alert("Phiếu báo bù đã được cấp phòng thành công");
                    $window.location.href = UrlDomainSite + '/GiamSatGiangDay/YeuCauNghiBuMuonPhong';
                }, function (error) {
                    console.log('loi gui mail');
                }).finally(function () {
                    //$window.location.href = UrlDomainSite + '/GiamSatGiangDay/YeuCauNghiBuMuonPhong';
                });
                //$scope.listAdd[i].ThongBao = response;


            }, function (error) {
            }).finally(function () {
            });
    };


});


//Edit BuoiTruc by modal popup
app.controller('BaoBuPhanPhongModalCtrl', function ($scope, $uibModalInstance, objs, BaoBuSvc, $filter) {
    //Load dropdowlist
    BaoBuSvc.showloading();
    $scope.filterto = objs;

    //ngày duyệt phòng ít nhất trước 1 ngày
    var dat = new Date();
    dat.setDate(dat.getDate() + 1);


    //if ($filter('date')(new Date(objs.thoigian), 'yyyy-MM-dd') < $filter('date')(dat, 'yyyy-MM-dd'))
    //    alert("Cần cấp phòng trước ngày báo bù ít nhất một ngày, vui lòng kiểm tra lại!");

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
        BaoBuSvc.showloading();
        BaoBuSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_TinhTrangPhong_GetListPhongTrong?coso=" + coso + "&lau=" + lau + "&thoigian=" + objs.thoigian + "&tietbatdau=" + objs.tietbatdau + "&sotiet=" + objs.sotiet + "&phongid=" + objs.phongid + "&tinhchat=" + objs.tinhchat.ValueString)
        .then(function (response) {
            $scope.objs = response.data;
            var soluong = 0;
            var soluongxoa = 0;
            //loại trừ dữ liệu đã chọn tạm
            for (var i = 0; i < $scope.objs.length; i++) {
                for (var j = 0; j < objs.listAdd.length; j++) {
                    if ($scope.objs[i] != undefined)
                        if (objs.listAdd[j].PhongGuid == $scope.objs[i].PhongGuid
                            && objs.thoigian == objs.listAdd[j].NgayBu
                            && objs.listAdd[j].TietBatDau != undefined
                            && objs.listAdd[j].SoTiet != undefined
                            )
                        {
                            if (( parseInt(objs.tietbatdau) >= parseInt(objs.listAdd[j].TietBatDau)
                            && parseInt(objs.tietbatdau) <= parseInt(objs.listAdd[j].TietBatDau) + parseInt(objs.listAdd[j].SoTiet) - 1
                            && parseInt(objs.tietbatdau) + parseInt(objs.sotiet)-1 >= parseInt(objs.listAdd[j].TietBatDau)
                            && parseInt(objs.tietbatdau) + parseInt(objs.sotiet) - 1 <= parseInt(objs.listAdd[j].TietBatDau) + parseInt(objs.listAdd[j].SoTiet) - 1)
                            ||
                            ( parseInt(objs.tietbatdau) < parseInt(objs.listAdd[j].TietBatDau)
                            && parseInt(objs.tietbatdau) + parseInt(objs.sotiet) - 1 >= parseInt(objs.listAdd[j].TietBatDau)
                            && parseInt(objs.tietbatdau) + parseInt(objs.sotiet) - 1 <= parseInt(objs.listAdd[j].TietBatDau) + parseInt(objs.listAdd[j].SoTiet) - 1)
                            ||
                            (parseInt(objs.tietbatdau) >= parseInt(objs.listAdd[j].TietBatDau)
                            && parseInt(objs.tietbatdau) <= parseInt(objs.listAdd[j].TietBatDau) + parseInt(objs.listAdd[j].SoTiet) - 1
                            && parseInt(objs.tietbatdau) + parseInt(objs.sotiet) - 1 > parseInt(objs.listAdd[j].TietBatDau) + parseInt(objs.listAdd[j].SoTiet) - 1)
                            ||
                            ( parseInt(objs.tietbatdau) < parseInt(objs.listAdd[j].TietBatDau)
                            && parseInt(objs.tietbatdau) + parseInt(objs.sotiet) - 1 > parseInt(objs.listAdd[j].TietBatDau) + parseInt(objs.listAdd[j].SoTiet) - 1)

                            ) {
                            $scope.objs.splice(i, 1);
                            soluongxoa++;
                            }
                        }
                }
                if ($scope.objs[i] != undefined)
                    soluong = parseInt($scope.objs[i].TotalRow);
                else
                    soluong = 0;
            }

            $scope.TongSoPhongTrong = parseInt(soluong) - parseInt(soluongxoa);

        }, function (error) {
            // $scope.messageresult = $translate.instant('CMN_MSG_ERROR');   //hien popup thong bao loi
        }).finally(function () {
            // Hide loading spinner whether our call succeeded or failed.            
            BaoBuSvc.closeloading();
        });
        //-------end load data
    };

    $scope.LoadDDLLau = function (coso) {
        $scope.filterto.lau = null;
        BaoBuSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_ListLauTheoCoSo?cosoguid=" + coso.CoSoGuid)
        .then(function (response) {
            $scope.listLau = [{
                "LauGuid": "",
                "LauID": "",
                "LauName": "--Chọn lầu--"
            }];
            var ListLau = response.data;
            for (var i = 0; i < ListLau.length; i++) {
                $scope.listLau.push({
                    "LauGuid": ListLau[i].LauGuid,
                    "LauID": ListLau[i].LauID,
                    "LauName": ListLau[i].LauName
                });
            }


            if ($scope.listLau.length > 0)
                $scope.filterto.lau = $scope.listLau[0];
            $scope.DanhSachPhong(objs);
        });
    };


    BaoBuSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_ListCoSoTatCa")
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

        if ($scope.listCoSo.length > 0) {
            $scope.filterto.coso = $scope.listCoSo[0];



            $scope.filterto.lau = null;
            BaoBuSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_ListLauTheoCoSo?cosoguid=" + $scope.listCoSo[0].CoSoGuid)
            .then(function (response) {

                $scope.listLau = [{
                    "LauGuid": "",
                    "LauID": "",
                    "LauName": "--Chọn lầu--"
                }];
                var ListLau = response.data;
                for (var i = 0; i < ListLau.length; i++) {
                    $scope.listLau.push({
                        "LauGuid": ListLau[i].LauGuid,
                        "LauID": ListLau[i].LauID,
                        "LauName": ListLau[i].LauName
                    });
                }

                if ($scope.listLau.length > 0)
                    $scope.filterto.lau = $scope.listLau[0];



                BaoBuSvc.GetApiCallCustomLink(UrlDomainAPI + "api/ThongTinCaiDatChung/GET_TinhTrangPhong_GetListTinhChatPhong")
                .then(function (response) {

                    $scope.listTinhChat = [{
                        "ValueString": "",
                        "Name": "--Chọn tính chất phòng--"
                    }];
                    var ListTinhChat = response.data;
                    for (var i = 0; i < ListTinhChat.length; i++) {
                        $scope.listTinhChat.push({
                            "ValueString": ListTinhChat[i].TinhChat,
                            "Name": ListTinhChat[i].Phongname
                        });
                    }
                    if ($scope.listTinhChat.length > 0)
                        $scope.filterto.tinhchat = $scope.listTinhChat[0];
                   

                    $scope.DanhSachPhong(objs);
                });

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