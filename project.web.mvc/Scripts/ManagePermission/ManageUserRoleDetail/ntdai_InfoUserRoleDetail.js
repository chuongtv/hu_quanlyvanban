// Author:   			ntdai
// Created: 			2015-11-12
// Last Modified: 		2015-11-12

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageUserRoleDetail/InfoUserRoleDetail").Include("~/Scripts/ManagePermission/ManageUserRoleDetail/ntdai_InfoUserRoleDetail.js"));

//Chép dòng này vào view
//@Scripts.Render("~/module/ManagePermission/ManageUserRoleDetail/InfoUserRoleDetail")

function Set_PhanQuyen(element, mode) {
    //lấy vùng load data
    var iddiv1 = $(element).attr("data-otf-target1");
    var iddiv2 = $(element).attr("data-otf-target2");



    //action chính mà mình cần thực hiện
    var acton = $(element).attr("data-otf-action");


    //action nào cần làm sau khi chạy xong 
    var actg1 = $(element).attr("data-otf-action-target1");
    // var actg2 = $(elament).attr("data-otf-action-target2");
    if (mode == 'delete') {
        $.ajax({
            type: 'Post',
            cache: false,
            url: acton,
            success: function (data) {
                $(iddiv1).load(actg1);
                //$(iddiv2).load(actg2);
                $(element).remove()
                DialogAlert('', 'Xóa người dùng khỏi quyền này thành công!', 'info');
            }
        }).done(function () {
        });

    }
    else {
        $.ajax({
            type: 'Post',
            cache: false,
            url: acton,
            success: function (data) {
                $(iddiv1).load(actg1);
                //$(iddiv2).load(actg2);
                $(element).remove()
                DialogAlert('', 'Thêm quyền cho người dùng này thành công!', 'info');
            }
        }).done(function () {
        });
    }



}

//Load partial vào vùng content c
function ManageUserRoleDetail_InfoUserRoleDetail_GetView(element) {
    $($(element).attr("data-target") + "_c").load($(element).attr("data-otf-action"))
}

//Quay lại list 
function ManageUserRoleDetail_InfoUserRoleDetail_BakList(element) {
    $($(element).attr("data-target")).load($(element).attr("data-otf-action"))
}


function ManageUserRoleDetail_InfoUserRoleDetail_ReLoadAjaxPartial(itemguid, ms) {

    BeginWaiting();
    //Sau khi upload có 1 hàm FileUploadCallBack mặc định để gọi lại control hiên tại
    $('#btnUpload-' + itemguid.toUpperCase()).click();
}

//Sau khi upload control upload gọi lại hàm này
function FileUploadCallBack_InfoUserRoleDetail(ms) {
    BeginWaiting();
    var idCallbak = '#callbackManageUserRoleDetail_InfoUserRoleDetail';
    var action = $(idCallbak).attr('data-otf-action');
    var acindex = $(idCallbak).attr('data-otf-action-exit');

    if ($(idCallbak).attr('data-otf-save-exit')) {
        $($(idCallbak).attr('data-otf-target-exit')).load(acindex, function myfunction() {
            if ($(idCallbak).attr('data-otf-target') != 'null')
                $($(idCallbak).attr('data-otf-target')).modal('hide');
        });

    }
    else
        $($(idCallbak).attr('data-otf-target') + "_c").load(action);
    DialogAlert('', 'Cập nhập dữ liệu thành công', 'info');
    EndWaiting();
}



//Sự kiện tìm kiếm
function ManageUserRoleDetail_InfoUserRoleDetail_IsSearch(element) {
    $.removeCookie('pageperInfoUserRoleDetail', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+'));
}

//Gõ từ khóa tìm kiếm và enter
function ManageUserRoleDetail_InfoUserRoleDetail_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

//Đánh dấu là save exit
function ManageUserRoleDetail_InfoUserRoleDetail_OnSaveExit(e, v, f) {

    if (v == "true")
        $(e).attr('data-otf-save-exit', 'true');
    else
        $(e).removeAttr('data-otf-save-exit');
    $(f).submit();
}

//Xóa dữ liệu khi view edit
function ManageUserRoleDetail_InfoUserRoleDetail_DeleteView(element) {
    BeginWaiting();
    $.removeCookie('pageperInfoUserRoleDetail', { path: '/' });
    var $button = $(element);
    if ($button.attr('data-otf-confirm'))
        if (!confirm($button.attr('data-otf-confirm'))) {
            EndWaiting();
            return false;
        }
    $.ajax({
        type: 'Post',
        cache: false,
        url: $button.attr('data-otf-action'),
        success: function (data) {
            var action = $button.attr('data-otf-action');
            var acindex = $button.attr('data-otf-action-exit');

            $($button.attr('data-otf-target-exit')).load(acindex, function myfunction() {
                if ($button.attr('data-otf-target') != 'null')
                    $($button.attr('data-otf-target')).modal('hide');
            });

            $($button.attr('data-otf-target') + "_c").load(action);
            EndWaiting();
        }
    }).done(function () {
    });

    return true;
}

//Xóa nhiều hoặc xóa 1
function ManageUserRoleDetail_InfoUserRoleDetail_DeleteMulti(element) {
    $.removeCookie('pageperInfoUserRoleDetail', { path: '/' });
    var $button = $(element);
    if ($button.attr('data-otf-confirm'))
        if (!confirm($button.attr('data-otf-confirm')))
            return false;

    var keysearch = "";
    if ($($button.attr('data-otf-input')).val() != undefined)
    { keysearch = $($button.attr('data-otf-input')).val(); }
    var idList = $button.attr('data-otf-target');

    var ismultil = $button.attr('data-otf-mutil');
    if (ismultil == undefined) {
        //Trường hợp 1 item
        $.ajax({
            type: 'Post',
            cache: false,
            url: $button.attr('data-otf-action'),
            success: function (data) {
                $(idList).load($button.attr('data-otf-action-target') + keysearch);
            }
        }).done(function () {
        });
        return true;
    }

    //Trường hợp nhiều item    
    var numberCheckboxSeleted = $(idList + ' input.checkbox-item:checked').length;
    var count = 0;
    $(idList + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {
            $.ajax({
                type: 'Post',
                cache: false,
                url: $button.attr('data-otf-action') + $(this).attr('value'),
                success: function (data) {
                    count++;
                    if (count == numberCheckboxSeleted)
                        $(idList).load($button.attr('data-otf-action-target') + keysearch);
                }
            }).done(function () {
            });
        }
    });
    return false;
}



