//Sau nay se viet custome sau: http://www.abequar.net/posts/jquery-ui-datepicker-with-angularjs
//app.directive('customDatepicker', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {
//            element.datepicker({
//                dateFormat: 'dd/mm/yy',
//                onSelect: function (date) {
//                    scope.date = date;
//                    scope.$apply();
//                }
//            });
//        }
//    };
//});

//app.directive('customDatepicker', function () {
//    return {
//        restrict: "A",
//        link: function (scope, el, attr) {
//            el.datepicker();
//        }
//    };
//});

//custom datepicker
app.directive('customDatepicker', function () {
    return {
        restrict: 'E',
        templateUrl: UrlDomainSite + '/angularApp/shared/directives/templates/customdatepicker.html',//?nd=' + Date.now(),
        scope: {
            options: '=',
            ngModel: '=',
            change: '&'
        },
        require: 'ngModel',
        link: function (scope, elem, attrs) {

            scope.dateOptions = scope.options;
            var id = elem[0].id;

            //scope.ngModel = new Date();

            scope.ngModel = scope.ngModel == undefined ? new Date() : new Date(scope.ngModel);

            scope.dateOptions = {
                dateDisabled: scope.options == null ? '' : (scope.options.dateDisabled == true ? disabled : ''),
                formatYear: 'yyyy',
                maxDate: scope.options == null ? new Date(9999, 12, 31) : scope.options.maxDate,
                minDate: scope.options == null ? new Date(1900, 1, 1) : scope.options.minDate,
                startingDay: scope.options == null ? 1 : scope.options.startingDay
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                  mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            scope.ngclass = attrs.class;

            scope.open1 = function () {
                scope.popup1.opened = true;
            };

            scope.popup1 = {
                opened: false
            };

            scope.datepickerChange = function (scope) {
                var strDate = "1900/01/01";

                if (scope.ngModel != null) {
                    var iday = scope.ngModel.getDate();

                    var imonth = scope.ngModel.getMonth() + 1; // month in javascript start is 0
                    var iyear = scope.ngModel.getFullYear();

                    if (iday < 10)
                        iday = "0" + iday;
                    if (imonth < 10)
                        imonth = "0" + imonth;

                    strDate = iyear + '-' + imonth + '-' + iday;
                };

                scope.ngModel = new Date(strDate);

                scope.change({ valueChange: strDate });
            };

        },
    };
});

