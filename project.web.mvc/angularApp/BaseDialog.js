//Service add scope then error
app.service('BaseDialog', function ($uibModal,$http, $q) {       

    this.ShowDetailFormDialog = function (objDetail) {
        var focuscontrolid = objDetail.focuscontrolid;
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: objDetail.tempUrl + '?nd' + Date.now(),
            controller: objDetail.ctrl,
            windowClass: objDetail.cssclass,
            resolve: {
                data: function () {
                    return objDetail.data;
                }
            }
        });
        modalInstance.rendered.then(function () {
            if (focuscontrolid != undefined) {
                document.getElementById(focuscontrolid).focus();
            };                                    
        });
    };



    this.ShowMessageDialog = function (msg) {
        var deferred = $q.defer();
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: UrlDomainSite + '/angularApp/shared/directives/templates/customshowmessage.html?nd=' + Date.now(),
            controller: 'ShowMessageController',
            //size: 'sm',
            windowClass: 'Modal-width400',
            resolve: {
                data: function () {
                    return msg;
                }
            }
        });

        modalInstance.result.then(function () {
            deferred.resolve();
        });
        return deferred.promise;

    };


    //ok
    this.ShowConfirmDialog = function (msg,showbtnCancel) {

        var obj = {
            msg: msg,
            showbtnCancel: showbtnCancel
        };

        var deferred = $q.defer();

        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: UrlDomainSite + '/angularApp/shared/directives/templates/customconfirmmessage.html?nd=' + Date.now(),
            controller: 'ShowConfirmController',
            //size: 'sm',
            windowClass: 'Modal-width400',
            resolve: {
                data: function () {
                    return obj;
                }
            }
        });
        modalInstance.result.then(function (confirmvalue) {
            deferred.resolve(confirmvalue);            
        });
        return deferred.promise;
    };    

    this.FormSearchShow = function (strFilter, options) {

        var deferred = $q.defer();

        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app/shared/directives/templates/customsearchformdialog.html?nd=' + Date.now(),
            controller: 'FormSearchShowController',
            windowClass: 'Modal-width800 Modal-height550',
            resolve: {
                gridOptions: function () {
                    return { options,strFilter };
                }
            }
        });
        modalInstance.result.then(function (response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
});

app.controller('ShowMessageController', function ($scope, $uibModalInstance, data) {

    $scope.message = data;       

    $scope.cancel = function () {
        $uibModalInstance.close();
    };

});

app.controller('ShowConfirmController', function ($scope, $uibModalInstance, data) {

    //Yes: 0, No : 1, Cancel: 2

    $scope.message = data.msg;
    $scope.showbtnCancel = data.showbtnCancel == undefined ? false : true;
    
    $scope.No = function () {        
        $uibModalInstance.close('1');
    };

    $scope.Yes = function () {
        $uibModalInstance.close('0');
    };

    $scope.Cancel = function () {
        $uibModalInstance.close('2');
    };
});

app.controller('FormSearchShowController', function ($scope, $uibModalInstance, $filter, $timeout, gridOptions) {
    $scope.gridOptions = angular.copy(gridOptions.options);
    $scope.searchfilter = gridOptions.strFilter;
    $scope.dataLength = $scope.gridOptions.data == undefined ? 0 : $scope.gridOptions.data.length;
    $scope.selectedRow = 0;    

    function setupform()
    {
        $timeout(function () {
            document.getElementById("searchfilter").focus();
        }, 50);        
    };

    $scope.fnCancel = function () {
        $uibModalInstance.close(0);
    };

    $scope.setClickedRow = function (index) {
        $scope.selectedRow = index;
    }

    $scope.$watch('selectedRow', function () {
        $scope.filteredData = $filter("filter")($scope.gridOptions.data, $scope.searchfilter);
        $scope.dataLength = $scope.filteredData.length;
        if ($scope.selectedRow >= $scope.dataLength) {
            $scope.selectedRow = 0;
        };        
    });

    setupform();

    $scope.SelectedObject = function () {
        $scope.filteredData = $filter("filter")($scope.gridOptions.data, $scope.searchfilter);
        var response = $scope.filteredData[$scope.selectedRow];
        $uibModalInstance.close(response);        
    };

    $scope.EnterSelectedObject = function(keyEvent)
    {
        if (keyEvent.which == 13) {
            $scope.SelectedObject();
        };
    };

});