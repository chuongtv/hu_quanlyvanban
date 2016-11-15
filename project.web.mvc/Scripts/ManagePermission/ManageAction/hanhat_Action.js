// Author:   			hanhat
// Created: 			2015-10-22
// Last Modified: 		2015-10-22

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageAction").Include("~/Scripts/ManagePermission/ManageAction/hanhat_Action.js"));

//Khi lưu thông tin thành công 
function ManageAction_Action_ReLoadAjaxPartial(itemguid) {
    BeginWaiting();
    var action = $('#callbackManageAction_Action').attr('data-otf-action');
    var acindex = $('#callbackManageAction_Action').attr('data-otf-action-exit');
    EndWaiting();
    if ($('#callbackManageAction_Action').attr('data-otf-save-exit'))
        window.location.href = acindex;
    else
        window.location.href = action;
}

//Sự kiện tìm kiếm
function ManageAction_Action_IsSearch(element) {
    $.removeCookie('pageperManageAction', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    var idinput1 = $($(element).attr('data-otf-input1')).val();
    var idinput2 = $($(element).attr('data-otf-input2')).val();
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+') + "_" + idinput1 + "_" + idinput2);
}

//Gõ từ khóa tìm kiếm và enter
function ManageAction_Action_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

//Đánh dấu là save exit
function ManageAction_Action_OnSaveExit(e, v, f) {

    $("#text_Description").val(CKEDITOR.instances["text_Description"].getData());//Nội dung nào dung editer thì phải load và trước 
    if (v == "true")
        $(e).attr('data-otf-save-exit', 'true');
    else
        $(e).removeAttr('data-otf-save-exit');
    $(f).submit();
}

//Xóa dữ liệu khi view edit
function ManageAction_Action_DeleteView(element) {
    $.removeCookie('pageperManageAction', { path: '/' });
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
function ManageAction_Action_DeleteMulti(element) {
    $.removeCookie('pageperManageAction', { path: '/' });
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

function DropdownlistChange(element, id) {
    $(id).click();

}



