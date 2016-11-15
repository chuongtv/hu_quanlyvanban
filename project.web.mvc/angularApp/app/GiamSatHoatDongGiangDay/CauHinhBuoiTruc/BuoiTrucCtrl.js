// Kế thừa service từ BaseServices(search, new, Save, dataDetail, delete, deletelist) & viết bổ sung thêm function khác

app.factory('BuoiTrucSvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);

    //extending the function parent if nescessary
    service.url = 'api/BuildCodeSmith/BuoiTruc/';        //Declare API Link
    //end extending function
    return service;
});


app.controller("BuoiTrucCtrl", function ($scope, $rootScope, BuoiTrucSvc, $http, BaseDialog, $translate, $uibModal) {
    $scope.messageresult = '';
    //$scope.listBuoiTruc = null;
    //console.log($stateParams);
   // console.log(a);
    //console.log($stateParams.a);
    //console.log($stateParams.b);

    //ham tim kiem
    $scope.fnSearch = function () {
        BuoiTrucSvc.showloading(); //Show loading
        //console.log('Employee_fnSearch:' + $scope.Code);

        //truyen thong tin can search
        var requestData = {
            PageNumber: 1,
            PageSize: 20,
            TenGoi: $scope.TenGoi
        };

        BuoiTrucSvc.search(requestData, BuoiTrucSvc.url)  //goi api get du lieu
        .then(function (response) {
            $scope.listBuoiTruc = response.data;
        }, function (error) {
            //$scope.messageresult = $translate.instant('CMN_MSG_ERROR');//goi api get du lieu
            console.log('Employee_fnSearch:' + error.data.ExceptionMessage);
        }).finally(function () {
            // Hide loading spinner whether our call succeeded or failed.            
            BuoiTrucSvc.closeloading();    //close waiting
        });



        //su dung phuong thuc post
        //console.log(BuoiTrucSvc.url + 'POST_GetPage');
        //BuoiTrucSvc.PostApiCall(requestData, BuoiTrucSvc.url + 'POST_GetPage')  //goi api get du lieu
        //    .then(function (response) {
        //        $scope.listBuoiTruc = response.data;
        //    }, function (error) {
        //        //console.log('Employee_fnSearch:' + error.data.ExceptionMessage);
        //    }).finally(function () {
        //        // Hide loading spinner whether our call succeeded or failed.            
        //        //BuoiTrucServices.closeloading();    //close waiting
        //    });


        //su dung phuong thuc get
        //BuoiTrucSvc.GetApiCall(BuoiTrucSvc.url + 'POST_GetPage')  //goi api get du lieu
        //    .then(function (response) {
        //        $scope.listBuoiTruc = response.data;
        //    }, function (error) {
        //        //console.log('Employee_fnSearch:' + error.data.ExceptionMessage);
        //    }).finally(function () {
        //        // Hide loading spinner whether our call succeeded or failed.            
        //        //BuoiTrucServices.closeloading();    //close waiting
        //    });
    };

    //Ham xoa. Chua add cac notification lien quan
    $scope.fnDelete = function (obj) {
        BaseDialog.ShowConfirmDialog("CMN_MSG_CONFIRM_DELETE")
            .then(function (confirmvalue) {
                var requestData = {
                    BuoiTrucID: obj,
                };

                if (confirmvalue == 0) {
                    BuoiTrucSvc.delete(requestData, BuoiTrucSvc.url)    //kich hoat service delete
                    .then(function (response) {
                        var result = JSON.parse(response.data);
                        if (result.returnCode != 0) {
                            //show message thong bao & close modal                               
                            //BaseDialog.ShowMessageDialog("CMN_MSG_DELETE_SUCESSFULLY");
                            $scope.fnSearch();
                            //console.log('Xoa thanh cong');
                        }
                        else {
                            //$scope.success = false;
                            //$scope.messageresult = $translate.instant(response.data.returnMessage);
                            console.log('Xoa that bai');
                        }
                    }, function (error) {
                        //$scope.success = false;
                        //$scope.messageresult = $translate.instant('CMN_MSG_ERROR');
                    });
                };
            });
    };

    //$scope.fnDeleteList = function () {
    //    var listDel = $scope.gridOptions.ListCheckSelected;
    //    if (listDel.length <= 0) {
    //        AppDialog.ShowMessageDialog("CMN_MSG_CONFIRM_SELECT_DATA");
    //    }
    //    else {
    //        //Show confirm delete
    //        AppDialog.ShowConfirmDialog("CMN_MSG_CONFIRM_DELETE")
    //        .then(function (confirmvalue) {
    //            if (confirmvalue == 0) {
    //                EmployeeServices.deletelist(listDel, EmployeeServices.url)
    //                .then(function (response) {
    //                    var result = JSON.parse(response.data);
    //                    if (result.returnCode == 0) {
    //                        //show message thong bao & close modal                               
    //                        AppDialog.ShowMessageDialog("CMN_MSG_DELETE_SUCESSFULLY");
    //                    }
    //                    else {
    //                        $scope.success = false;
    //                        $scope.messageresult = $translate.instant(response.data.returnMessage);;
    //                    }
    //                }, function (error) {
    //                    $scope.success = false;
    //                    $scope.messageresult = $translate.instant('CMN_MSG_ERROR');
    //                    console.log('Employee_fnDeleteList:' + error.data.ExceptionMessage);
    //                });
    //            };
    //        });
    //    }
    //};

    $scope.fnOpenForEdit = function (id) {
        //$mdDialog.show({
        //    controller: BuoiTrucEditModalCtrl,
        //    templateUrl: UrlDomainSite + '/angularApp/app/GiamSatHoatDongGiangDay/CauHinhBuoiTruc/BuoiTrucEditModal.tmpl.html',
        //    parent: angular.element(document.body),
        //    targetEvent: id,
        //    clickOutsideToClose: true,
        //    locals: { dataToPass: 'du lieu chuyen qua' },
        //    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        //})
        //.then(function (answer) {
        //    $scope.status = 'You said the information was "' + answer + '".';
        //}, function () {
        //    $scope.status = 'You cancelled the dialog.';
        //});
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: UrlDomainSite + '/angularApp/app/GiamSatHoatDongGiangDay/CauHinhBuoiTruc/BuoiTrucEditModal.html',//'BuoiTrucModalContent.html',
            controller: 'BuoiTrucEditModalCtrl',
            controllerAs: '$ctrl',
            size: '', //sm, lg
            resolve: {
                objs: function () {
                    //var  //$scope.items = ['item1', 'item2', 'item3'];
                    return id;//['item1', 'item2', 'item3']; //Members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property in the router.
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            //$ctrl.selected = selectedItem;
            console.log(selectedItem);
            console.log('dong popup xong');
        }, function () {
            console.log('close');
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
});


//Edit BuoiTruc by modal popup
app.controller('BuoiTrucEditModalCtrl', function ($scope, $uibModalInstance, objs, BuoiTrucSvc) {
    //var $ctrl = this;

    //Load data
    BuoiTrucSvc.showloading();
    BuoiTrucSvc.getDetail(objs, BuoiTrucSvc.url)
    .then(function (response) {
        $scope.objs = response.data;
        $scope.objs.GiaTriNgayThang = new Date($scope.objs.GiaTriNgayThang);
    }, function (error) {
        // $scope.messageresult = $translate.instant('CMN_MSG_ERROR');   //hien popup thong bao loi
    }).finally(function () {
        // Hide loading spinner whether our call succeeded or failed.            
        BuoiTrucSvc.closeloading();
    });
    //-------end load data


    //Xu ly khi nhan nut ok
    $scope.ok = function (form) {
        //check validation
        if (form.$valid) {
            console.log('da vao form');
            //neu sai thi return va thong bao
            //if ($scope.kq.MaNghanh1 == "") {
            //    alert("1 Xin vui lòng chọn ngành/Nhóm ngành");
            //    return;
            //} 

            //$state.go('step2', {
            //    obj: $scope.kq
            //});
        }

        $uibModalInstance.close(123);   //can truyen gi qua ben kia thi xu ly o day
    };

    //xu ly khi nhan nut cancel
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});