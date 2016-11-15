app.directive('customPaging', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/directives/templates/custompaging.html?nd=' + Date.now(),
        scope: {
            options: '='
        },
        link: function (scope, elem, attrs) {
            
            scope.pagingOptions = scope.$parent.gridOptions;
            scope.pagingOptionsCopydata = angular.copy(scope.$parent.gridOptionscopy);
            scope.currentPage = 1;
            scope.itemsPerPage = 15;
            scope.maxSize = 3;
            scope.listPageSize = [15,30,50,100,200];
            
            scope.filterdataToDisplay = function () {
                var begin = ((scope.currentPage - 1) * scope.itemsPerPage);
                var end = parseInt(begin) + parseInt(scope.itemsPerPage);
                scope.$parent.gridOptions.data = scope.pagingOptionsCopydata.slice(begin, end);
            };

            scope.filterdataToDisplay();

            scope.pageChanged = function () {
                scope.filterdataToDisplay();
                $('#' + scope.pagingOptions.id + '_SelectAll').prop('checked', false);
            };

            scope.itemsPerPageChanged = function () {
                scope.currentPage = 1;
                scope.filterdataToDisplay();
            };

            scope.$on('putdataChange', function (event, changeData) {
                scope.pagingOptions = changeData.gridOptions;
                scope.pagingOptionsCopydata = angular.copy(changeData.gridOptionscopy);

                scope.currentPage = 1;
                var begin = ((scope.currentPage - 1) * scope.itemsPerPage);
                var end = parseInt(begin) + parseInt(scope.itemsPerPage);
                scope.$parent.gridOptions.data = scope.pagingOptionsCopydata.slice(begin, end);
            });

        },
    };
});

app.directive('customGrid', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/directives/templates/customgrid.html?nd=' + Date.now(),
        scope: {
            options: '=',
            edit: '&',
            remove: '&',
            chkevent: '&',
            search: '&'
        },

        link: function (scope, elem, attrs) {
            
            scope.gridOptions = scope.options;
            scope.gridOptionscopy = angular.copy(scope.options.data);

            if (scope.gridOptions.showpaging == true) {
                scope.gridOptions.data = scope.gridOptionscopy.slice(0, 0);
            };

            //Event change parameter
            scope.$watch('options', function (newValue, oldValue) {
                if (newValue !== oldValue && scope.gridOptions.reloaddata == 1) {
                    scope.gridOptions = newValue;
                    scope.gridOptionscopy = angular.copy(newValue.data);
                    scope.gridOptions.reloaddata = 0;
                    scope.$broadcast('putdataChange', scope);
                }
            }, true);

            //Select all            								
            scope.selectAll = function () {
                var newValue = !scope.checkIsSelectAll();
                angular.forEach(scope.gridOptions.data, function (obj, index) {
                    $("#" + scope.gridOptions.id + "_" + index).prop('checked', newValue);
                });
            };

            scope.checkIsSelectAll = function () {
                var checkList = [];
                angular.forEach(scope.gridOptions.data, function (obj, index) {
                    if ($("#" + scope.gridOptions.id + "_" + index).prop('checked') == true)
                        checkList.push(obj);
                });
                scope.options.ListCheckSelected = checkList;
                return (checkList.length === scope.gridOptions.data.length);
            };
            //End Select all

            //Event button
            scope.buttonevent = function (obj, value) {
                if (obj == 'Edit')
                    scope.edit({ valueEdit: value });
                else if (obj == 'Del')
                    scope.remove({ valueDel: value });
            };
            //End Event button

            scope.checkboxevent = function (obj) {
                scope.chkevent({ value : obj});
            };

            //Allow arrow-selector
            var elemFocus = false;
            elem.on('mouseenter', function () {
                elemFocus = true;
                //console.log(elemFocus);
            });
            elem.on('mouseleave', function () {
                elemFocus = false;
                //console.log(elemFocus);
            });
            $document.bind('keydown', function (e) {
                if (elemFocus) {
                    if (e.keyCode == 38) {
                        console.log(scope.selectedRow);

                        if (scope.selectedRow == 0) {
                            return;
                        }
                        scope.selectedRow--;
                        scope.$apply();
                        e.preventDefault();
                    }
                    if (e.keyCode == 40) {
                        if (scope.selectedRow == scope.options.data.length - 1) {
                            return;
                        }
                        scope.selectedRow++;

                        scope.$apply();
                        e.preventDefault();
                    }
                }
            });

            scope.selectedRow = 0;

            scope.setClickedRow = function (index) {
                scope.selectedRow = index;
            };

            //End Allow arrow-selector
        },
    };
}]);


//Code format date to json in c#	
//public void WriteJsonDates()
//{
//LogEntry entry = new LogEntry
//{
//    LogDate = new DateTime(2009, 2, 15, 0, 0, 0, DateTimeKind.Utc),
//    Details = "Application started."
//};

// default as of Json.NET 4.5
//string isoJson = JsonConvert.SerializeObject(entry);
// {"Details":"Application started.","LogDate":"2009-02-15T00:00:00Z"}

//JsonSerializerSettings microsoftDateFormatSettings = new JsonSerializerSettings
//{
//    DateFormatHandling = DateFormatHandling.MicrosoftDateFormat
//};
//string microsoftJson = JsonConvert.SerializeObject(entry, microsoftDateFormatSettings);
// {"Details":"Application started.","LogDate":"\/Date(1234656000000)\/"}

//string javascriptJson = JsonConvert.SerializeObject(entry, new JavaScriptDateTimeConverter());
// {"Details":"Application started.","LogDate":new Date(1234656000000)}
//}