// Author:   			tvchuong
// Created: 			2015-12-3
// Last Modified: 		2015-12-3

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageRoleForCode").Include("~/Scripts/ManagePermission/ManageRoleForCode/tvchuong_RoleForCode.js"));

//Khi lưu thông tin thành công 
function ManageRoleForCode_RoleForCode_ReLoadAjaxPartial(itemguid) {
    BeginWaiting();
    var action = $('#callbackManageRoleForCode_RoleForCode').attr('data-otf-action');
    var acindex = $('#callbackManageRoleForCode_RoleForCode').attr('data-otf-action-exit');
    EndWaiting();
    if ($('#callbackManageRoleForCode_RoleForCode').attr('data-otf-save-exit'))
        window.location.href = acindex;
    else
        window.location.href = action;
}

//Sự kiện tìm kiếm
function ManageRoleForCode_RoleForCode_IsSearch(element) {
    $.removeCookie('pageperManageRoleForCode', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    var idinput1 = $($(element).attr('data-otf-input1')).val();
    var idinput2 = $($(element).attr('data-otf-input2')).val();
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+') + "_" + idinput1 + "_" + idinput2);
}

//Gõ từ khóa tìm kiếm và enter
function ManageRoleForCode_RoleForCode_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

//Đánh dấu là save exit
function ManageRoleForCode_RoleForCode_OnSaveExit(e, v, f) {

    $("#text_Description").val(CKEDITOR.instances["text_Description"].getData());//Nội dung nào dung editer thì phải load và trước 
    if (v == "true")
        $(e).attr('data-otf-save-exit', 'true');
    else
        $(e).removeAttr('data-otf-save-exit');
    $(f).submit();
}

//Xóa dữ liệu khi view edit
function ManageRoleForCode_RoleForCode_DeleteView(element) {
    $.removeCookie('pageperManageRoleForCode', { path: '/' });
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
function ManageRoleForCode_RoleForCode_DeleteMulti(element) {
    $.removeCookie('pageperManageRoleForCode', { path: '/' });
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

function DropdownlistChange(element, id) {
    $(id).click();

}

function ManagePermission_RoleForCode_GetView(element) {
    BeginWaiting();
    $($(element).attr("data-target") + "_c").load($(element).attr("data-otf-action"), function (response, status, xhr) {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            $("#error").html(msg + xhr.status + " " + xhr.statusText);
        } else {
            EndWaiting();
        }
    });
}

/* Scrip danh cho phan cau hinh action role for code*/
//Sự kiện tìm kiếm
function ManageRoleForCode_ActionRoleForCode_IsSearch(element) {
    $.removeCookie('pageperManageRoleForCodeAction', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    var idinput1 = $($(element).attr('data-otf-input1')).val();
    var idinput2 = $($(element).attr('data-otf-input2')).val();
    var idinput3 = $($(element).attr('data-otf-input3')).is(':checked') ? 1 : 0;
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+') + "_" + idinput1 + "_" + idinput2 + "_" + idinput3);
}

// xoa config
function ManageRoleForCode_RoleForCode_DeleteConfigMulti(element) {
    $.removeCookie('pageperManageRoleForCode', { path: '/' });
    var $button = $(element);
    if ($button.attr('data-otf-confirm'))
        if (!confirm($button.attr('data-otf-confirm')))
            return false;

    var btn = $button.attr('data-otf-input');
    var idList = $button.attr('data-otf-target');
    var ismultil = $button.attr('data-otf-mutil');
    //Trường hợp nhiều item    
    var numberCheckboxSeleted = $(idList + ' input.checkbox-item:checked').length;
    var count = 0;
    var countsuccess = 0;
    $(idList + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {
            $.ajax({
                type: 'Post',
                cache: false,
                url: $button.attr('data-otf-action') + $(this).attr('value'),
                success: function (data) {
                    count++;
                    if (data == 'ok')
                        countsuccess++;
                    if (count == numberCheckboxSeleted) {
                        $(btn).click();
                        DialogAlert('', 'Cập nhập dữ liệu thành công ' + countsuccess + '/' + count, 'info');
                        //countsuccess
                    }
                }
            }).done(function () {
            });
        }
    });
    return false;
}

function ManageRoleForCode_RoleForCode_InsertConfigMulti(element) {
    $.removeCookie('pageperManageRoleForCode', { path: '/' });
    var $button = $(element);

    var btn = $button.attr('data-otf-input');
    var idList = $button.attr('data-otf-target');
    var ismultil = $button.attr('data-otf-mutil');

    //Trường hợp nhiều item    
    var numberCheckboxSeleted = $(idList + ' input.checkbox-item:checked').length;
    var count = 0;
    var countsuccess = 0;
    $(idList + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {
            $.ajax({
                type: 'Post',
                cache: false,
                url: $button.attr('data-otf-action') + $(this).attr('value'),
                success: function (data) {
                    count++;
                    if (data == 'ok')
                        countsuccess++;
                    if (count == numberCheckboxSeleted) {
                        $(btn).click();
                        //countsuccess
                        DialogAlert('', 'Cập nhập dữ liệu thành công ' + countsuccess + '/' + count, 'info');
                    }

                }
            }).done(function () {
            });
        }
    });
    return false;
}