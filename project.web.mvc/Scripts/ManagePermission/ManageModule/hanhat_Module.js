// Author:   			hanhat
// Created: 			2015-11-4
// Last Modified: 		2015-11-4

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageModule").Include("~/Scripts/ManagePermission/ManageModule/hanhat_Module.js"));

//Khi lưu thông tin thành công 
function ManageModule_Module_ReLoadAjaxPartial(itemguid) {
    BeginWaiting();
    var action = $('#callbackManageModule_Module').attr('data-otf-action');
    var acindex = $('#callbackManageModule_Module').attr('data-otf-action-exit');
    EndWaiting();

    if ($('#callbackManageModule_Module').attr('data-otf-save-exit'))
        window.location.href = acindex;
    else
        window.location.href = action;
}

//Sự kiện tìm kiếm
function ManageModule_Module_IsSearch(element) {
    $.removeCookie('pageperManageModule', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    var dll = $($(element).attr('data-otf-inputddl'))
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+') + "_" + dll.val());
}

//Gõ từ khóa tìm kiếm và enter
function ManageModule_Module_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

function DropdownlistChange(element, btn) {
    $(btn).click();
}

//Đánh dấu là save exit
function ManageModule_Module_OnSaveExit(e, v, f) {

    if (v == "true")
        $(e).attr('data-otf-save-exit', 'true');
    else
        $(e).removeAttr('data-otf-save-exit');
    $(f).submit();
}

//Xóa dữ liệu khi view edit
function ManageModule_Module_DeleteView(element) {
    $.removeCookie('pageperManageModule', { path: '/' });
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
function ManageModule_Module_DeleteMulti(element) {
    $.removeCookie('pageperManageModule', { path: '/' });
    var $button = $(element);
    if ($button.attr('data-otf-confirm'))
        if (!confirm($button.attr('data-otf-confirm')))
            return false;

    var keysearch = $($button.attr('data-otf-input')).val();
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



