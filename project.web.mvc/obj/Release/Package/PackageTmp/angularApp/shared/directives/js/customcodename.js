app.directive('customCodename', function ($timeout, $filter) {
    return {
        restrict: 'E',
        require: 'ngModel',        
        templateUrl: 'app/shared/directives/templates/customcodename.html?nd=' + Date.now(),        
        scope: {
            ngModel: '=',
            ngDatasource: '=',
            options: '=',            
            selectedrow: '&'
        },
        link: function (scope, elem, attrs, ngModel) {
                        
            scope.oldValue = null;
            scope.isFocus = false;
            scope.idControl = elem[0].id;
            scope.style = attrs.style;
            scope.codenameOptions = scope.options;
            
            scope.idCode = scope.idControl + '_Code';
            scope.idName = scope.idControl + '_Name';
            scope.idModel = scope.idControl + '_Model';
            scope.idButton = scope.idControl + '_Button';
            scope.idContainer = scope.idControl + '_Container';
            scope.idboundCtrl = scope.idControl + '_boundCtrl';
            
            scope.selectedRow = 0;
            scope.dataSource = scope.ngDatasource;                        

            scope.dataFilter = angular.copy(scope.dataSource);

            var rowHeight = 34;
            scope.popupHeight = (rowHeight * scope.options.maxDropDownItems) + 1;            
            
            var posTopPopup = 0;
            var posBottonPopup = 0;
            var posCurrentRow = 0;

            scope.popupWidth = 100; //set default
            scope.popupWidth = (scope.options.showcode == true ? parseInt(scope.options.codewidth) : parseInt(0)) +
                                (scope.options.showname == true ? parseInt(scope.options.namewidth) : parseInt(0)) +
                                (scope.options.showfield3 == true ? parseInt(scope.options.field3width) : parseInt(0)) +
                                (scope.options.showfield4 == true ? parseInt(scope.options.field4width) : parseInt(0)) +
                                (scope.options.showfield5 == true ? parseInt(scope.options.field5width) : parseInt(0));
            
            scope.codewidth = parseInt(scope.codenameOptions.codewidth);
          
            //set timeout để chờ setup combobox xong hoan chỉnh mới bắt đầu điều chỉnh style sau
            $timeout(function () {
                //default width button = 35, padding total: 8
                var defaultWidth = ($('#' + scope.idCode).width() + 8) + ($('#' + scope.idName).width() + 8) + 35;                
                
                if (scope.popupWidth > defaultWidth) {
                    $('#' + scope.idContainer).css('width', scope.popupWidth + 'px');
                } else {
                    $('#' + scope.idContainer).css('width', defaultWidth + 'px');
                };
                
                $('#' + scope.idContainer).css('height', scope.popupHeight + 'px');
               
            }, 30);

            //su kien keypress tai textbox Code
            scope.idCode_onKeyPress = function (keyEvent) {
                if (keyEvent.which == 40) { //phim down
                    if (scope.selectedRow == scope.dataFilter.length - 1) {
                        return;
                    }
                    scope.selectedRow++;

                    var rows = document.getElementById(scope.idControl + '_table').rows;
                    //Event scroll 
                    var elmrow = document.querySelector("#" + scope.idControl + '_' + scope.selectedRow);
                    posCurrentRow = elmrow.getBoundingClientRect().top;
                    //console.log('row:' + posCurrentRow);

                    if (posCurrentRow >= posBottonPopup - rowHeight)
                    {
                        rows[scope.selectedRow].scrollIntoView(false);
                    };                                                            
                }
                else if (keyEvent.which == 38) { //phim up
                    //console.log(scope.selectedRow);

                    if (scope.selectedRow == 0) {
                        return;
                    }
                    scope.selectedRow--;

                    var rows = document.getElementById(scope.idControl + '_table').rows;
                                        
                    //Event scroll 
                    var elmrow = document.querySelector("#" + scope.idControl + '_' + scope.selectedRow);
                    posCurrentRow = elmrow.getBoundingClientRect().top;
                    //console.log('row:' + posCurrentRow);           
                    if (posCurrentRow <= posTopPopup + rowHeight) {
                        rows[scope.selectedRow].scrollIntoView(false);
                    };
                   
                    ////End scroll                   
                }
                else if (keyEvent.which == 13) { //phim Enter
                    //kiem tra co dang show popup hay khong
                    var cssclass = $('#' + scope.idControl + '_dropdown').attr("class");
                    
                    //đang popup
                    if (cssclass.indexOf("show") >= 0) {
                        var item = scope.dataFilter[scope.selectedRow];
                                                                    
                        SetValueControl(item);

                        //close popup & Next focus                        
                        $('#' + scope.idControl + '_dropdown').removeClass("show");

                        //declare event
                        if (scope.oldValue != item.Code) {
                            scope.selectedrow({ rowItem: item });
                            scope.oldValue = item.Code;
                        };
                    } else {    //chưa popup

                        //kiểm tra nếu chưa popup nhưng Code đã đúng rồi thì next qua control kế, ngược lại thì show popup
                        
                        var code = document.getElementById(scope.idCode).value;

                        if (code != null && code != '' && code != undefined) {
                            var result = $filter('filter')(scope.dataFilter, { Code: code }, true)[0];
                            if (result != undefined) {
                                //next focus
                            }
                            else {
                                //show popup
                                scope.ShowPopup();
                            };
                        }
                        else {
                            //show popup
                            scope.ShowPopup();
                        };                       
                    };
                };
            };

            //su kien key press button show popup
            scope.ShowPopup = function () {
                               
                scope.isFocus = true;

                var el = document.querySelector("#" + scope.idCode);
                var top = el.getBoundingClientRect().top;                
                               
                var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                
                //32 là độ cao của control
                if (height - top - 32 < parseInt(scope.popupHeight))
                {
                    $('#' + scope.idboundCtrl).addClass('dropup');
                    $('#' + scope.idboundCtrl).removeClass('dropdown');
                    //document.getElementById(scope.idboundCtrl).classList.toggle("dropup");
                }
                else
                {
                    $('#' + scope.idboundCtrl).addClass('dropdown');
                    $('#' + scope.idboundCtrl).removeClass('dropup');
                }
                                   
                var rows = document.getElementById(scope.idControl + '_table').rows;
                if (rows.length > 0) {
                    document.getElementById(scope.idControl + '_dropdown').classList.toggle("show");
                    $('#' + scope.idCode).focus();
                };

                var elpopup = document.querySelector("#" + scope.idControl + '_dropdown');
                
                posTopPopup = elpopup.getBoundingClientRect().top;
                posBottonPopup = elpopup.getBoundingClientRect().bottom;
                //console.log('top:' + posTopPopup);
                //console.log('bottom:' + posBottonPopup);                
            };
            
            //su kien click row on grid
            scope.setClickedRow = function (index) {
                scope.selectedRow = index;               
                
                var item = scope.dataFilter[index];

                $('#' + scope.idCode).focus();
                scope.isFocus = false;
                
                //set code and call event lost focus
                document.getElementById(scope.idCode).value = item.Code;
                
            }
           
            //Su kien lost focus
            scope.eventLostFocus = function () {
                scope.isFocus = false;
                //kiem tra neu 20% giay ma chua dc focus thi close popup
                $timeout(function () {
                    if (scope.isFocus == false) {
                        
                        //close popup
                        $('#' + scope.idControl + '_dropdown').removeClass("show");

                        //Check data if code not exists then clear data
                        var code = document.getElementById(scope.idCode).value;

                        if (code != null && code != '' && code != undefined) {
                            var result = $filter('filter')(scope.dataFilter, { Code: code }, true)[0];
                            if (result != undefined) {
                                
                                SetValueControl(result);

                                //declare event
                                if (scope.oldValue != result.Code) {
                                    scope.selectedrow({ rowItem: result });
                                    scope.oldValue = result.Code;
                                };
                            }
                            else {
                                
                                SetValueControl(null);

                                //declare event                                
                                if (scope.oldValue != null) {
                                    scope.selectedrow({ rowItem: null });
                                    scope.oldValue = null;
                                };
                            };

                        }
                        else {
                            
                            SetValueControl(null);
                            //declare event                                
                            if (scope.oldValue != null) {
                                scope.selectedrow({ rowItem: null });
                                scope.oldValue = null;
                            };
                        };                                                
                    };                    
                }, 120);                
            };            

            //Su kien khi text change tren textbox Code
            scope.$watch(function () {
                return scope.codeFilter;
            }, function (newvalue, oldvalue) {
                if (newvalue != undefined && newvalue != oldvalue && scope.dataSource != undefined) {
                    //kiem tra co dang show popup hay khong
                    var cssclass = $('#' + scope.idControl + '_dropdown').attr("class");
                    if (cssclass.indexOf("show") < 0) {
                        scope.ShowPopup();
                    };
                };
                if (scope.dataSource != undefined) {
                    var code = document.getElementById(scope.idCode).value;
                    scope.dataFilter = $filter('filter')(scope.dataSource, { Code: code }, false);
                    if (scope.selectedRow > scope.dataFilter.length) {
                        scope.selectedRow = 0;
                    };
                };
                
            }, true);

            //Xu ly khi change ngModel
            scope.$watch('options', function (newValue, oldValue) {
                if (newValue.setValue != oldValue.setValue && newValue.setValue != undefined && scope.dataSource != undefined) {
                    //scope.codenameOptions.data = scope.ngDatasource;
                    var result = $filter('filter')(scope.dataSource, { ID: newValue.setValue }, true)[0];
                    if (result != undefined) {
                        SetValueControl(result);
                    };
                }
            }, true);

            //Xu ly khi change ngModel
            scope.$watch('ngDatasource', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    scope.dataSource = scope.ngDatasource;
                    scope.dataFilter = angular.copy(scope.dataSource);
                }
            }, true);

            //Function Set Value
            function SetValueControl(itemSelected) {
                document.getElementById(scope.idModel).value = itemSelected == null ? null : itemSelected.ID;
                document.getElementById(scope.idCode).value = itemSelected == null ? null : itemSelected.Code;
                document.getElementById(scope.idName).value = itemSelected == null ? null : itemSelected.Name;
                ngModel.$setViewValue(document.getElementById(scope.idModel).value);
                //Set lai gia tri setValue
                scope.options.setValue = itemSelected == null ? 0 : itemSelected.ID;

                //set value to attr
                $('#' + scope.idControl).attr('aaID', itemSelected == null ? null : itemSelected.ID);
                $('#' + scope.idControl).attr('aaCode', itemSelected == null ? null : itemSelected.Code);
                $('#' + scope.idControl).attr('aaName', itemSelected == null ? null : itemSelected.Name);
                $('#' + scope.idControl).attr('aaField3', itemSelected == null ? null : itemSelected.Field3);
                $('#' + scope.idControl).attr('aaField4', itemSelected == null ? null : itemSelected.Field4);
                $('#' + scope.idControl).attr('aaField5', itemSelected == null ? null : itemSelected.Field5);
            };
        },
    };
});