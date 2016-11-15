//************************************************** Dialog Jquery ui ***********************************************//
function DialogAlert(Title, Messages, type) { //type : '',error,info,question,warning
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "200",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.success(Messages, Title);
}
//confirm delete dialog :
function ConfirmDelete(MaHocPhan) {
    $.messager.confirm("Lưu ý ", "Bạn có muốn xóa học phần '" + MaHocPhan + "' không ?", function (r) {
        if (r) {
            XoaHocPhan(MaHocPhan);
        }
        else {
            //false
        }
    });
}
function ConfirmAlert(thongbao) {
    $.messager.confirm("Lưu ý ", thongbao, function (r) {
        if (r) {
            return true;
        }
        else {
            return false
        }
    });
}
//Show progresss , show screen right-botton

function Slide(Title_, Messages, time) {//Hien thị goc phai bên duoi man minh trong time giay .
    $.messager.show({
        title: Title_,
        msg: Messages,
        timeout: time,
        showType: 'slide'
    });
}
function Fade(Title_, Messages) { //Hien thi như slide nhưng ko tự động close
    $.messager.show({
        title: Title_,
        msg: Messages,
        timeout: 0,
        showType: 'fade'
    });
}
function ProgressShow() {
    var win = $.messager.progress({
        title: 'Please waiting...',
        msg: 'Đang xử lý . vui lòng đợi ...',
        interval: 4000
    });
}
function ProgressHide() {
    $.messager.progress('close');
}
//************************************************** End Dialog Jquery ui ***********************************************//


//************************************************** Function common ***********************************************//
function BeginWaiting() {
    $.blockUI({
        message: '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'
                , allowBodyStretch: false
    });
}
function EndWaiting() {
    $.unblockUI();
}


//Check all trên list
function checkAlllist(idList, obj) {
    var c = new Array();
    c = $(idList + " input.checkbox-item");

    for (var i = 0; i < c.length; i++) {

        if (c[i].type == 'checkbox' && c[i].className == "checkbox-item") {
            c[i].checked = obj.checked;
        }
    }
}

//Selected dòng trên table list
function loadSelect(module, sub) {
    if (sub == undefined)
        sub = "";

    $('.showhim').click(function () {
        //select dòng
        var bb = $(this).attr("data" + sub);
        $.cookie("select" + module, bb, { path: window.location, expires: 7 });
        var a = $('tr[data' + sub+']');

        $(a).removeClass('active');

        if (bb) {
            var a = $('tr[data' + sub + '="' + bb + '"]');
            $(a).addClass('active');
        }
    });

    var thisLink = $.cookie("select" + module);
    if (thisLink) {
        var a = $('tr[data' + sub + '="' + thisLink + '"]');
        $(a).addClass('active');
    }
}

//************************************************** End Function common ***********************************************//









$(function () {
    var ajaxFormSubmit = function () {
        var $form = $(this);


        var $form = $(this);
        var _attr = $form.attr("data-otf-groupaction");

        if (_attr == 'QuanLy_Task') {
            XayDungChuoiGiaTriSearch();
            return false;
        }


        var options = {
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: $form.serialize()
        };

        $.ajax(options).done(function (data) {
            var $target = $($form.attr("data-otf-target"));
            var $newHtml = $(data);
            //alert(data);
            //alert($target.attr("id"));
            $target.html($newHtml);
            $newHtml.effect({
                effect: "highlight",
                duration: 2000
            });
        });

        return false;
    };

    var submitAutocompleteForm = function (event, ui) {

        var $input = $(this);
        $input.val(ui.item.label);

        var $form = $input.parents("form:first");
        $form.submit();

        XayDungChuoiGiaTriSearch();
    };

    var createAutocomplete = function () {
        var $input = $(this);

        var options = {
            minLength: 2,
            source: $input.attr("data-otf-autocomplete"),
            select: submitAutocompleteForm
        };

        $input.autocomplete(options);
    };


    //data-otf-target: dia chi update data
    //data-otf-action: action se chay voi tung dong du lieu
    //data-otf-action-target: action se chay khi ket thuc tat ca 
    //data-otf-mutil[true]: tac vu tuong tac de mot list doi tuong
    //data-otf-ajax="true": tac vu su dung su kien ajax
    //data-otf-confirm" noi dung conform
    var ajaxButtonSubmit = function () {
        var $button = $(this);


        if ($button.attr("data-otf-confirm"))
            if (!confirm($button.attr("data-otf-confirm")))
                return false;


        var idList = $button.attr("data-otf-target");
        //chua kiem tra data-otf-mutil
        var ismultil = $button.attr("data-otf-mutil");
        if (!ismultil) {
            //trường họp 1 item 
            $.ajax({
                type: 'Post',
                cache: false,
                url: $button.attr("data-otf-action") + $(this).attr("value"),
                //data: { selectedIds: selectedIds },
                //dataType: "json",
                success: function (data) {
                    count++;
                    if (count == numberCheckboxSeleted)
                        $(idList).load($button.attr("data-otf-action-target"));
                }
            }).done(function () {
            });
            return true;
        }

        //trường họp nhiều item    
        var numberCheckboxSeleted = $(idList + " input.checkbox-item:checked").length;
        var count = 0;
        $(idList + " input.checkbox-item").each(function (index, value) {
            if ($(this).is(':checked')) {
                $.ajax({
                    type: 'Post',
                    cache: false,
                    url: $button.attr("data-otf-action") + $(this).attr("value"),
                    //data: { selectedIds: selectedIds },
                    //dataType: "json",
                    success: function (data) {
                        count++;
                        if (count == numberCheckboxSeleted)
                            $(idList).load($button.attr("data-otf-action-target"));
                    }
                }).done(function () {
                });
            }
        });
        return false;
    };
    //HoaDM added
    //thao tác cập nhật dòng checkbox trong list với textbox
    //val: textbox value
    //id: taskguid
    var ajaxUpdateSubmitTextbox = function () {

        var $button = $(this);
        var idList = $button.attr("data-otf-updatetxt");
        var valTextbox = $("#TextboxValue").val();

        var numberCheckboxSeleted = $("#" + idList + " input:checked").length;
        var count = 0;
        $("#" + idList + " input").each(function (index, value) {
            if ($(this).is(':checked')) {
                //alert($button.attr("data-otf-action") + "&id=" + $(this).attr("value"));
                $.ajax({
                    type: 'Post',
                    cache: false,
                    url: $button.attr("data-otf-action") + "&val=" + valTextbox + "&id=" + $(this).attr("value"),
                    //data: { selectedIds: selectedIds },
                    //dataType: "json",
                    success: function (data) {
                        count++;
                        if (count == numberCheckboxSeleted)
                            $("#" + idList).load($button.attr("data-otf-update-action") + "?q=&pid=" + $("#hiddenprojectid").val());
                    }
                }).done(function () {
                });
            }
        });
    };
    //thao tác thêm mới : bug và task
    //q: query nếu có
    //v: textbox value
    //id: projectguid
    var ajaxBugCreateSubmit = function () {

        var $button = $(this);
        var idList = $button.attr("data-otf-targetbug");
        var valTextbox = $("#TextboxContent").val();

        $.ajax({
            type: 'Post',
            cache: false,
            url: $button.attr("data-otf-action") + "&v=" + valTextbox + "&pid=" + $("#hiddenprojectid").val(),
            //data: { selectedIds: selectedIds },
            //dataType: "json",
            success: function (data) {
                $("#" + idList).load($button.attr("data-otf-action-target") + "?q=&pid=" + $("#hiddenprojectid").val());
            }
        }).done(function () {
        });
    };


    //thanhdai
    var ajaxActionLinkClick = function () {
        var $button = $(this);

        if ($button.attr("data-otf-confirm"))
            if (!confirm($button.attr("data-otf-confirm")))
                return false;

        var idList = $button.attr("data-otf-target");
        $(idList).load($button.attr("data-otf-action"));
        return true;
    }

    var ajaxDropdowlist = function () {
        var $ddl = $(this);
        var idList = $ddl.attr("data-otf-target");
        $(idList).load($ddl.attr("data-otf-action") + $ddl.val());
    }

    //end thanhdai


    //$("button[data-otf-targetbug]").click(ajaxBugCreateSubmit); //cái này lách luật vì không biết lấy value textbox trên view gán cho query string
    //$("button[data-otf-updatetxt]").click(ajaxUpdateSubmitTextbox); //cái này lách luật vì không biết lấy value textbox trên view gán cho query string

    $("button[data-otf-ajax='true']").click(ajaxButtonSubmit);
    $("input[data-otf-autocomplete]").each(createAutocomplete);
    $("form[data-otf-ajax='true']").submit(ajaxFormSubmit);
    $("select[data-otf-ajax='true']").change(ajaxDropdowlist);
    $("a[data-otf-ajax='true']").click(ajaxActionLinkClick);

});

//https://searchcode.com/codesearch/view/27871787/
//249

//ham click chung cho cac acton
//element: doi tuong thao tac
//type: 1: controller tra ve partial; 2: controller tra ve javascript
function tsClick(element, type) {
    var $button = $(element);

    if ($button.attr("data-otf-confirm"))
        if (!confirm($button.attr("data-otf-confirm")))
            return false;
    if (type == 1) {
        var idList = $button.attr("data-otf-target");
        $(idList).load($button.attr("data-otf-action"));
        return true;
    }


    //truong hop return javascript
    $.ajax({
        type: 'Post',
        cache: false,
        url: $button.attr("data-otf-action"),
        //data: { selectedIds: selectedIds },
        //dataType: "json",
        success: function (data) {
            //count++;
            //if (count == numberCheckboxSeleted)
            //    $(idList).load($button.attr("data-otf-action-target"));
        }
    }).done(function () {
    });
    return true;
    
}

function tsOpenPopup(element) {
    var $button = $(element);
    var idList = $button.attr("data-otf-target");

 
    $(idList).load($button.attr("data-otf-action"), function () {

        //kiem tra de loai tru cai nay
        var config = {
            '.chosen-select': {},
            '.chosen-select-deselect': { allow_single_deselect: true },
            '.chosen-select-no-single': { disable_search_threshold: 10 },
            '.chosen-select-no-results': { no_results_text: 'Lỗi! Vui lòng chọn ít nhất 1 mục.' },
            '.chosen-select-width': { width: "95%" }
        }
        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }

    });
    return true;
}

function tsDropDownListChange(id, element) {
    var $button = $(element);
    $(id).val($button.find('option:selected').text())
}


function CheckBoxClick(value, kind, groupaction) {
    //su dung $ de nhan biet day chinh la mot doi tuong selector
    // value: gia tri cua checkbox
    // kind: loai nhom checkbox
    // groupaction: chuc nang xu ly
    if (groupaction == 'QuanLy_Task') {
        XayDungChuoiGiaTriSearch();
        return;
    }

}
//chuongtv funcion phat sinh su kien khi textbox datetime co du lieu
function ondatachange() {
    XayDungChuoiGiaTriSearch();
}
//chuongtv function truyen vao index nhan biet khoang thoi gian muon lay
function GetDateForQuery(index) {
    var chuoisearch = "";
    var fd = " ", td = " ";
    var today = new Date();
    switch (index) {
        case 0:
            fd = td = (today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear());
            chuoisearch = "_" + fd + "_" + td + "_false";
            return chuoisearch;
        case 1:
            fd = (today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear());
            today.setDate(today.getDate() + 1)
            td = (today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear());
            chuoisearch = "_" + fd + "_" + td + "_false";
            return chuoisearch;
        case 2:
            var dayOfWeekStartingSundayZeroIndexBased = today.getDay(); // 0 : Sunday ,1 : Monday,2,3,4,5,6 : Saturday
            var mondayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
            var sundayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
            fd = (mondayOfWeek.getDate() + '/' + (mondayOfWeek.getMonth() + 1) + '/' + mondayOfWeek.getFullYear());
            td = (sundayOfWeek.getDate() + '/' + (sundayOfWeek.getMonth() + 1) + '/' + sundayOfWeek.getFullYear());
            chuoisearch = "_" + fd + "_" + td + "_false";
            return chuoisearch;
        default:
            chuoisearch = "_" + fd + "_" + td + "_false";
            return chuoisearch;
    }
}
// chuongtv function() lay tat ca dieu kien loc
// quy dinh thu tu
// textsearch: 0; Ngay: 1-3; status: 4 - 9; priority 10 - 13; bug: 14 15;
function XayDungChuoiGiaTriSearch() {
    var chuoiSearch = "";
    chuoiSearch = $("#textboxsearch").val().trim().replace("_", "");
    $("#groupbuttondate button").each(function (index) {
        if ($(this).hasClass("btn-primary")) {
            var fd = "", td = "";
            if ($(this).attr("name") == "other") {
                fd = $("#startdate").val();
                td = $("#enddate").val();
                if (fd == "" || td == "") {
                    var today = new Date();
                    fd = td = (today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear());
                }
                chuoiSearch += "_" + fd + "_" + td + "_false";
            }
            else {
                chuoiSearch += GetDateForQuery(index);
            }
        }
    });

    $("#checkliststatus input[type='checkbox']").each(function (index) {
        chuoiSearch += "_" + this.checked;
    });
    $("#checklistpriority input[type='checkbox']").each(function (index) {
        chuoiSearch += "_" + this.checked;
    });
    $("#checklistbug input[type='checkbox']").each(function (index) {
        chuoiSearch += "_" + this.checked;
    });
    $("#ListSearchForTask").load($("#buttonsearch").attr("data-button-search") + "?q=" + chuoiSearch + "&pid=" + $("#hiddenprojectid").val() + "&page=");
}

// chuongtv function kich hoat lay query buttonclick
function buttonNgayClick(emplement) {
    var $tem = $(emplement);
    $("#groupbuttondate button").each(function (index) {
        $(this).removeClass('btn-primary');
        $(this).addClass('btn-white');
    });
    $tem.removeClass('btn-white');
    $tem.addClass('btn-primary');
    if ($tem.attr("name") == "other") {
        $("#data_5").css("display", "block");
    }
    else
        $("#data_5").css("display", "none");
    //data_5
    // goi load lai form
    XayDungChuoiGiaTriSearch();
}

// chuongtv function click show hinh anh tu zen
function fancyboxshowhinhclick(guidItem, emplement) {
    var $tema = $(emplement);
    //alert(guidItem);
    $.ajax({
        type: "POST",
        cache: false,
        url: $tema.attr("data-oft-href") + "?guid=" + guidItem,
        datatype: "json",
        success: function (data) {
            //alert(data[1].href);
            var opts = {
                prevEffect: 'none',
                nextEffect: 'none',
                openEffect: 'elastic',
                closeEffect: 'elastic',
                helpers: {
                    thumbs: {
                        width: 75,
                        height: 50
                    }
                }
            };
            $.fancybox(data, opts);
        } // success
    }); // ajax
}

// chuongtv function thay doi trang thai task
function clickthaydoitrangthaitask(element) {
    var $button = $(element);
    var idList = $button.attr("data-otf-target");
    var valTextbox = $("#TextboxValue").val();

    var numberCheckboxSeleted = $(idList + " input.checkbox-item:checked").length;
    var count = 0;
    $(idList + " input.checkbox-item").each(function (index, value) {
        if ($(this).is(':checked')) {
            $.ajax({
                type: 'Post',
                cache: false,
                url: $button.attr("data-otf-action") + "&val=" + valTextbox + "&id=" + $(this).attr("value"),
                //data: { selectedIds: selectedIds },
                //dataType: "json",
                success: function (data) {
                    count++;
                    if (count == numberCheckboxSeleted)
                        XayDungChuoiGiaTriSearch();
                    //alert("delete success");
                }
            }).done(function () {
                //alert("delete success done");
            });
        }
    });

    return false;
}

//chuongtv funcion load du lieu popup
function showdetailstask(itemGuid, element) {
    var $thea = $(element);
    var $idlist = $($thea.attr("data-otf-target"))
    $idlist.load($thea.attr("data-otf-action") + "?itemguid=" + itemGuid)
}
// chuongtv funcion click save du lieu
function summernotclick(guidTask, element, tacvu) {
    var $button = $(element);
    if (tacvu == "edit") {
        $('.click2edit').summernote({ focus: true });
        return;
    }
    if (tacvu == "save") {
        var aHTML = $('.click2edit').code();
        var url = $("#fromdatasummnote").attr("action") + "?TaskGuid=" + guidTask;
        $.ajax({
            type: "POST",
            url: url,
            data: aHTML,
            datatype: "html",
            success: function (data) {
                if (data == "false")
                    return "không thể lưu được!";
                else
                    $('.click2edit').destroy();
            }
        });

    }
}

//chuongtv funcion click chack all, cai cua hoa lay check box chua co con loc nen khong xai
//HoaDM sử dụng ở list trong CreateBug và CreateTaskNew
function seclectallcheckboxlist(obj) {
    var c = new Array();
    c = document.getElementsByTagName('input');
    for (var i = 0; i < c.length; i++) {
        if (c[i].type == 'checkbox' && c[i].className == "checkbox-item") {
            c[i].checked = obj.checked;
        }
    }
}
//thanhdai added
function checkAlllist(idList, obj) {
    var c = new Array();
    c = $(idList + " input.checkbox-item");

    for (var i = 0; i < c.length; i++) {

        if (c[i].type == 'checkbox' && c[i].className == "checkbox-item") {
            c[i].checked = obj.checked;
        }
    }
}


function ClosePopupAndLoadData(idPopup, idActionLoadList,errormessage) {
    
    if (idPopup != 'null')
        $(idPopup).modal('hide');
    
    if (idActionLoadList != 'null') {
        var idList = $(idActionLoadList).attr("data-otf-target");
        $(idList).load($(idActionLoadList).attr("data-otf-action"));
    }

    DialogAlert("", errormessage, 1);    
}
