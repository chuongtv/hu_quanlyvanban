

app.factory('TraCuuTotNghiepSvc', function ($q, $http, BaseServices) {
    var service = Object.create(BaseServices);
    service.url = 'api/TuyenSinh/';
    return service;
});


app.controller("TraCuuTotNghiepCtrl", function ($scope, $rootScope, TraCuuTotNghiepSvc) {

    $scope.msSinhVien = "";
    $scope.listResult = [];
    $scope.trangthai = "";

    $scope.fnTraCuu = function () {
        //BeginWaiting();
        $scope.trangthai = 1;
        TraCuuTotNghiepSvc.GetApiCall(TraCuuTotNghiepSvc.url + 'GetTraCuuThongTinHoSoTotNghiep' + "?id=" + $scope.msSinhVien + "&appid=tracuutuyensinh")  //goi api get du lieu
            .then(function (response) {
                $scope.listResult = response.data;
            }, function (error) {
                console.log('loi thuc thi api');
            }).finally(function () {
                //EndWaiting();
            });
    };

});

