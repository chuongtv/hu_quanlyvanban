

TuyenSinhApp.service('ApiCall', ['$http', function ($http) {
    var result;
    //Get
    this.GetApiCall = function (Url) {
        result = $http.get(Url)
         .success(function (data, status, headers, config) {
             result = data;
         })
         .error(function (data, status, header, config) {
             alert("có lỗi!:" + status);
         });
        return result;
    }

    //Post
    this.PostApiCall = function (Url, obj) {
        result = $http.post(Url, obj).success(function (data, status, headers, config) {
            result = data;
        }).error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({ data: data }));
        });
        return result;
    }
}
]);
