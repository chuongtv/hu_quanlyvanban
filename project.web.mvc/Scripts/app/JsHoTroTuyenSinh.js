//angular.module('app', [])
//    .controller('TuyenSinhCtrl', ['$scope', function ($scope) {

//        $scope.name = 'World';

//    }])
//.controller('AJSController', ['$scope', function ($scope) {
//    //$scope.firstName = "Harry";
//    //$scope.lastName = "Porter";
//}])
//.controller('clickController', ['$scope', function ($scope) {
//    $scope.count = 0
//}])
//.controller('personController', ['$scope', function ($scope) {
//    $scope.quantity = 10;
//    $scope.price = 1;
//}])

//.controller('studentController', ['$scope', function ($scope) {
//    $scope.student = {
//        subjects: [
//           { name: 'Physics', marks: 60 },
//           { name: 'Chemistry', marks: 70 },
//           { name: 'Math', marks: 65 },
//           { name: 'English', marks: 62 },
//           { name: 'Hindi', marks: 67 }
//        ],

//    };
//}])
//;


var AngulerModule = angular.module('app', []);

AngulerModule.service('ApiCall', ['$http', function ($http) {
    var result;

    //Get
    this.GetApiCall = function (controlerName, methodName) {
        result = $http.get('api/' + controlerName + '/' + methodName).success(function (data, status) { result = (data); }).Error(function (e) { alert("có lỗi!:" + e); })
        return result;
    }

    //Post
    this.PostApiCall = function (controlerName, methodName,obj) {
        result = $http.post('api/' + controlerName + '/' + methodName,obj).success(function (data, status) { result = (data); }).Error(function (e) { alert("có lỗi!:" + e); })
        return result;
    }
    
}
]);




