//custom daepicker
app.directive('customSearchform', function ($timeout, $filter, AppDialog) {
    return {
        restrict: 'E',
        require: 'ngModel',
        //template: '' + $templateCache.get('customsearchform.html') + '',
        templateUrl: 'app/shared/directives/templates/customsearchform.html?nd=' + Date.now(),
        scope: {
            ngModel: '=',
            ngDatasource: '=',
            options: '=',
            //focus: '&',
            selectedrow: '&'            
        },
        link: function (scope, elem, attrs, ngModel) {
            scope.dataSource = scope.ngDatasource;
            
            if (scope.options == undefined)
            {
                scope.options = {
                    data: null,
                    id: 'CtrlSearch',
                    codewidth: '100px',
                    displayname: true,
                    columnDefs: [
                            {
                                field: "Code",
                                headerclass: "width150 text-align-center height30 border",
                                detailclass: "height30 paddingleft padingright",
                                display: "Code",
                                formatnumber: "",
                                formatdatetime: ""
                            },
                            {
                                field: "Name",
                                display: "Name",
                                headerclass: "width220 text-align-center height30",
                                detailclass: "height30 paddingleft padingright",
                                formatnumber: "",
                                formatdatetime: ""
                            }
                    ],
                };            
            };
            scope.searchformOptions = scope.options;

            scope.searchformOptions.idCode = scope.searchformOptions.id + '_Code';
            scope.searchformOptions.idName = scope.searchformOptions.id + '_Name';
            scope.searchformOptions.idModel = scope.searchformOptions.id + '_Model';
            scope.focus = attrs.focus;
            scope.style = attrs.style;
            scope.formname = attrs.formname;
            scope.name = attrs.name;
            scope.ngClass = attrs.ngError;


            scope.$watch('options', function (newValue, oldValue) {
                if (newValue.setDataMapping != oldValue.setDataMapping && newValue.setDataMapping != undefined) {
                    scope.searchformOptions.data = scope.ngDatasource;
                    var result = $filter('filter')(scope.searchformOptions.data, { ID: scope.ngModel }, true)[0];
                    if (result != undefined) {
                        document.getElementById(scope.searchformOptions.idModel).value = result.ID;
                        document.getElementById(scope.searchformOptions.idCode).value = result.Code;
                        document.getElementById(scope.searchformOptions.idName).value = result.Name;
                        ngModel.$setViewValue(document.getElementById(scope.searchformOptions.idModel).value);
                    };
                }
            }, true);
           
            $timeout(function () {
                if (scope.ngModel != null && scope.ngModel != '' && scope.ngModel != undefined) {
                    scope.searchformOptions.data = scope.ngDatasource;
                    var result = $filter('filter')(scope.searchformOptions.data, { ID: scope.ngModel }, true)[0];
                    if (result != undefined) {
                        document.getElementById(scope.searchformOptions.idModel).value = result.ID;
                        document.getElementById(scope.searchformOptions.idCode).value = result.Code;
                        document.getElementById(scope.searchformOptions.idName).value = result.Name;
                        ngModel.$setViewValue(document.getElementById(scope.searchformOptions.idModel).value);
                    };
                };
            }, 30);

            scope.ShowFormSearchBtn = function (strFilter) {
                scope.searchformOptions.data = scope.ngDatasource;

                AppDialog.FormSearchShow(strFilter, scope.searchformOptions)
                .then(function (response) {
                    if (response == 0) {
                        document.getElementById(scope.searchformOptions.idModel).value = null;
                        document.getElementById(scope.searchformOptions.idCode).value = null;
                        document.getElementById(scope.searchformOptions.idName).value = null;
                        ngModel.$setViewValue(document.getElementById(scope.searchformOptions.idModel).value);
                    }
                    else {
                        ngModel.$setViewValue(response.ID);
                        document.getElementById(scope.searchformOptions.idModel).value = response.ID;
                        document.getElementById(scope.searchformOptions.idCode).value = response.Code;
                        document.getElementById(scope.searchformOptions.idName).value = response.Name;

                        //declare event
                        scope.selectedrow({ row: response, idsearchform: scope.searchformOptions.id });
                    };
                });
            };

            scope.ShowFormSearchEnter = function (keyEvent) {
                if (keyEvent.which == 13) {
                    scope.searchformOptions.data = scope.ngDatasource;
                    var code = document.getElementById(scope.searchformOptions.idCode).value;
                    var result = $filter('filter')(scope.searchformOptions.data, { Code: code }, true)[0];
                    if (result != undefined) {
                        document.getElementById(scope.searchformOptions.idModel).value = result.ID;
                        document.getElementById(scope.searchformOptions.idCode).value = result.Code;
                        document.getElementById(scope.searchformOptions.idName).value = result.Name;

                        ngModel.$setViewValue(document.getElementById(scope.searchformOptions.idModel).value);
                        //declare event
                        scope.selectedrow({ row: result });

                        //Next focus
                    }
                    else {
                        document.getElementById(scope.searchformOptions.idCode).focus();
                        scope.ShowFormSearchBtn(document.getElementById(scope.searchformOptions.idCode).value);

                    };
                }
            };

            scope.eventLostFocus = function () {
                //Check data if code not exists then clear data
                var code = document.getElementById(scope.searchformOptions.idCode).value;

                if (code != null && code != '' && code != undefined) {
                    var result = $filter('filter')(scope.searchformOptions.data, { Code: code }, true)[0];
                    if (result != undefined) {
                        document.getElementById(scope.searchformOptions.idModel).value = result.ID;
                        document.getElementById(scope.searchformOptions.idCode).value = result.Code;
                        document.getElementById(scope.searchformOptions.idName).value = result.Name;
                        ngModel.$setViewValue(document.getElementById(scope.searchformOptions.idModel).value);

                        //declare event
                        scope.selectedrow({ row: result });
                    }
                    else {
                        document.getElementById(scope.searchformOptions.idModel).value = null;
                        document.getElementById(scope.searchformOptions.idCode).value = null;
                        document.getElementById(scope.searchformOptions.idName).value = null;
                        ngModel.$setViewValue(document.getElementById(scope.searchformOptions.idModel).value);
                    };
                }
                else {
                    document.getElementById(scope.searchformOptions.idModel).value = null;
                    document.getElementById(scope.searchformOptions.idCode).value = null;
                    document.getElementById(scope.searchformOptions.idName).value = null;
                    ngModel.$setViewValue(document.getElementById(scope.searchformOptions.idModel).value);
                };
            };                  
        },                
    };
});