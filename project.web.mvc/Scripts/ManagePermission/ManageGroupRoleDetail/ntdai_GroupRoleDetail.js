// Author:   			ntdai
// Created: 			2015-11-25
// Last Modified: 		2015-11-25

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageGroupRoleDetail").Include("~/Scripts/ManagePermission/ManageGroupRoleDetail/ntdai_GroupRoleDetail.js"));

//Khi lưu thông tin thành công 
function ManageGroupRoleDetail_GroupRoleDetail_ReLoadAjaxPartial(itemguid) {
    BeginWaiting();
        var action = $('#callbackManageGroupRoleDetail_GroupRoleDetail').attr('data-otf-action');
    var acindex = $('#callbackManageGroupRoleDetail_GroupRoleDetail').attr('data-otf-action-exit');
    EndWaiting();
    if ($('#callbackManageGroupRoleDetail_GroupRoleDetail').attr('data-otf-save-exit'))
        window.location.href = acindex;
    else
        window.location.href = action;
}

//Sự kiện tìm kiếm
function ManageGroupRoleDetail_GroupRoleDetail_IsSearch(element) {
    $.removeCookie('pageperManageGroupRoleDetail', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+'));
}

//Gõ từ khóa tìm kiếm và enter
function ManageGroupRoleDetail_GroupRoleDetail_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

//Đánh dấu là save exit
function ManageGroupRoleDetail_GroupRoleDetail_OnSaveExit(e, v, f) {
   
    if (v == "true")
        $(e).attr('data-otf-save-exit', 'true');
    else
        $(e).removeAttr('data-otf-save-exit');
    $(f).submit();
}

//Xóa dữ liệu khi view edit
function ManageGroupRoleDetail_GroupRoleDetail_DeleteView(element) {
    $.removeCookie('pageperManageGroupRoleDetail', { path: '/' });
    var $button = $(element);
    if ($button.attr('data-otf-confirm'))
        if (!confirm($button.attr('data-otf-confirm')))
            return false;
    $.ajax({
        type: 'Post',
        cache: false,
        url: $button.attr('data-otf-action'),
        success: function (data) {
            window.location.href = $button.attr('data-otf-action-exit');
        }
    }).done(function () {
    });

    return true;
}

//Xóa nhiều hoặc xóa 1
function ManageGroupRoleDetail_GroupRoleDetail_DeleteMulti(element) {
    $.removeCookie('pageperManageGroupRoleDetailDaChon', { path: '/' });
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
//thêm 1 hoặc thêm nhiều
function ManageGroupRoleDetail_GroupRoleDetail_AddMulti(element) {
    $.removeCookie('pageperManageGroupRoleDetailChuaChon', { path: '/' });
    var $button = $(element);
    if ($button.attr('data-otf-confirm'))
        if (!confirm($button.attr('data-otf-confirm')))
            return false;

    var keysearch = "";
    if ($($button.attr('data-otf-input')).val() != undefined)
    { keysearch = $($button.attr('data-otf-input')).val(); }
    var idList = $button.attr('data-otf-target2');

    var ismultil = $button.attr('data-otf-mutil');
    if (ismultil == undefined) {
        //Trường hợp 1 item
        $.ajax({
            type: 'Post',
            cache: false,
            url: $button.attr('data-otf-action'),
            success: function (data) {
                $($button.attr('data-otf-target1')).load($button.attr('data-otf-action-target1') + keysearch);
                $($button.attr('data-otf-target2')).load($button.attr('data-otf-action-target2') + keysearch);
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
                    if (count == numberCheckboxSeleted) {
                        $($button.attr('data-otf-target1')).load($button.attr('data-otf-action-target1') + keysearch);
                        $($button.attr('data-otf-target2')).load($button.attr('data-otf-action-target2') + keysearch);
                    }
                }
            }).done(function () {
            });
        }
    });
    return false;
}



