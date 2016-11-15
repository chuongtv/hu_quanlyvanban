//Base function 
app.factory('BaseServices', ['$q', '$http', '$log', '$httpParamSerializer','$httpParamSerializerJQLike', function ($q, $http, $log, $httpParamSerializer, $httpParamSerializerJQLike) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";  //set mac dinh http://stackoverflow.com/questions/19254029/angularjs-http-post-does-not-send-data

    var dataService = {};
    dataService.data = [];
    dataService.currentData = {};
 
    // Get Nam hoc hien tai
    dataService.getNamHocHienTai = function () {
        var myDate = new Date();
        if (myDate.getMonth() < 8)
            return myDate.getFullYear() - 1;
        else
            return myDate.getFullYear();
    }

    // Get Parameter Query string
    dataService.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // Search data ok
    dataService.search = function (requestData, ServiceUrl) {
        var deferred = $q.defer();  //create a deferred operation
        return $http({
            url: UrlDomainAPI + ServiceUrl + 'POST_GetPage',   //khai bao mac dinh ten phuong thuc search
            method: 'POST',     //yeu cau goi len theo dang post
            data: $httpParamSerializer(requestData),  //data la mot object, ko phai querystring, phai dung de convert ve dang json http://stackoverflow.com/questions/24545072/angularjs-http-post-send-data-as-json
            //headers: {
            //    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //},
            xhrFields: { withCredentials: true },   //?
            cache: true
        }).success(function (data) {
            deferred.resolve(dataService.Results = data);
        }).error(function (error) {
            $log.error('call api error: ' + UrlDomainAPI + ServiceUrl + 'POST_GetPage');
            deferred.reject(error);
        })
        return deferred.promise;
    }

    // data detail by id ok
    dataService.getDetail = function (id, ServiceUrl) {
        var deferred = $q.defer();
        return $http.get(UrlDomainAPI + ServiceUrl + "GET_Detail/" + id)
            .success(function (data) {
                deferred.resolve(
                    dataService.currentData = data);
            })
        .error(function (error) {
            $log.error('call api error: ' + UrlDomainAPI + ServiceUrl + "GET_Detail/" + id);
            deferred.reject(error);
        })
        return deferred.promise;
    }
    


    //// Get data Code Name
    dataService.GetDataCodeName = function (type, requestData, ServiceUrl,isSaveLocal,strKey) {
        var url = UrlDomainAPI + ServiceUrl + type + "/";
        var deferred = $q.defer();

        if (isSaveLocal == true || isSaveLocal == 1)
        {
            //kiem tra neu da luu localStorage thi return du lieu tra ve, nguoc lai thi lay du lieu tu server
            if (localStorage.getItem(strKey) != undefined) {
                var response = { status :200, statusText : 'OK', data : JSON.parse(localStorage.getItem(strKey)) };
                deferred.resolve(dataService.Results = response);
                return deferred.promise;
            };
        }

        return $http({
            url: UrlDomainAPI,
            method: 'post',
            data: requestData,
            xhrFields: { withCredentials: true },
            cache: true
        }).success(function (data) {
            //Kiem tra neu co luu localStorage khong
            if (isSaveLocal == true || isSaveLocal == 1) {
                localStorage.setItem(strKey, JSON.stringify(data));
            };
            deferred.resolve(dataService.Results = data);
        }).error(function (error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }

    // New data
    dataService.new = function (ServiceUrl) {
        var deferred = $q.defer();
        return $http.get(UrlDomainAPI + ServiceUrl + "new")
            .success(function (data) {
                deferred.resolve(dataService.Results = data);
            })
        .error(function (error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }

    // Reset Password
    dataService.reset = function (requestData, ServiceUrl) {
        var deferred = $q.defer();
        return $http.post(UrlDomainAPI + ServiceUrl + "Reset", requestData)
            .success(function (data) {
                deferred.resolve(dataService.Results = data);
            })
            .error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    // Save data
    dataService.Save = function (requestData, ServiceUrl) {
        var deferred = $q.defer();
        return $http.post(UrlDomainAPI + ServiceUrl + "Save", requestData)
        .success(function (data) {
            deferred.resolve(dataService.Results = data);
        })
        .error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }


    // delete data
    dataService.delete = function (requestData, ServiceUrl) {
        var deferred = $q.defer();  //create a deferred operation
        return $http({
            url: UrlDomainAPI + ServiceUrl + "POST_Delete",   //khai bao mac dinh ten phuong thuc search
            method: 'POST',     //yeu cau goi len theo dang post
            data: $httpParamSerializer(requestData),  //data la mot object, ko phai querystring
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            xhrFields: { withCredentials: true },   //?
            cache: true
        }).success(function (data) {
            //$log.info('call api delete: ' + UrlDomainAPI + ServiceUrl);
            deferred.resolve(dataService.Results = data);
        }).error(function (error) {
            $log.error('call api error: ' + UrlDomainAPI + ServiceUrl);
            deferred.reject(error);
        })
        return deferred.promise;
    }

    // delete list data
    dataService.deletelist = function (requestData, ServiceUrl) {
        var deferred = $q.defer();
        return $http.post(UrlDomainAPI + ServiceUrl + "deletelist/", requestData)
            .success(function (data) {
                deferred.resolve(dataService.Results = data);
            })
        .error(function (error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }

    //Show loading spinner ok
    dataService.showloading = function () {

        var height = $(window).height();   // returns height of browser viewport
        var width = $(window).width();   // returns width of browser viewport

        var top = parseInt((parseInt(height) - 120) / 2);    // 120 la kich thuoc cua image

        var right = parseInt((parseInt(width) - 120) / 2);

        $('#spinnerLoadingImg').css("top", top);
        $('#spinnerLoadingImg').css("right", right);

        document.getElementById("spinnerLoadingImg").style.display = "block";
        document.getElementById("spinnerLoadingLockScreen").style.display = "block";
    };

    //Close loading spinner ok
    dataService.closeloading = function () {
        document.getElementById("spinnerLoadingImg").style.display = "none";
        document.getElementById("spinnerLoadingLockScreen").style.display = "none";
    };


    //Get ok
    dataService.GetApiCall = function (ServiceUrl) {
        var deferred = $q.defer();
        return $http.get(UrlDomainAPI + ServiceUrl)
        .success(function (data) {
            deferred.resolve(dataService.Results = data);
        })
        .error(function (error) {
            $log.error('call api error: ' + UrlDomainAPI + ServiceUrl);
            deferred.reject(error);
        });
        return deferred.promise;
    }

    //Get ok
    dataService.GetApiCallCustomLink = function (ServiceUrl) {
        var deferred = $q.defer();
        return $http.get(ServiceUrl)
        .success(function (data) {
            deferred.resolve(dataService.Results = data);
        })
        .error(function (error) {
            $log.error('call api error: ' +ServiceUrl);
            deferred.reject(error);
        });
        return deferred.promise;
    }

    //Post ok
    dataService.PostApiCall = function (requestData, ServiceUrl) {
        var deferred = $q.defer();  //create a deferred operation
        return $http({
            url: UrlDomainAPI + ServiceUrl,   //khai bao mac dinh ten phuong thuc search
            method: 'POST',     //yeu cau goi len theo dang post
            data: $httpParamSerializerJQLike(requestData),  //data la mot object, ko phai querystring
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            xhrFields: { withCredentials: true },   //?
            cache: true
        }).success(function (data) {
            deferred.resolve(dataService.Results = data);
        }).error(function (error) {
            $log.error('call api error: ' + UrlDomainAPI + ServiceUrl);
            deferred.reject(error);
        })
        return deferred.promise;
    }

    return dataService;


    //cac loai log
    //<button ng-click="$log.log(message)">log</button>
    //<button ng-click="$log.warn(message)">warn</button>
    //<button ng-click="$log.info(message)">info</button>
    //<button ng-click="$log.error(message)">error</button>
    //<button ng-click="$log.debug(message)">debug</button>
    //https://material.angularjs.org/latest/demo/whiteframe
}]);
