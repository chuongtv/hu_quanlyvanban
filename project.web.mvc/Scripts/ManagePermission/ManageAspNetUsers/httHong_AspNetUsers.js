// Author:   			httHong
// Created: 			2015-10-22
// Last Modified: 		2015-10-22

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageAspNetUsers").Include("~/Scripts/ManagePermission/ManageAspNetUsers/httHong_AspNetUsers.js"));
function PhanQuyenUser_ChonNhomQuyen(element) {
    
    var idList = $(element).attr("data-otf-list");
    var action = $(element).attr("data-otf-action");
    BeginWaiting();
    $(idList + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {
            $.ajax({
                type: 'Post',
                cache: false,
                url: action + $(this).attr('value'),
                success: function (data) {
                    DialogAlert('', 'Áp dụng vào nhóm thành công!', 'info');
                    EndWaiting();
                }
            }).done(function () {
            });
        }
    });

   
}


function PhanQuyenUser_SelectAllGroupRoles(element) {
    var action = $(element).attr("data-otf-action");
    var target = $(element).attr("data-target") + "_c";
    BeginWaiting();
    $(target).load(action, function myfunction() {
        EndWaiting();
    });
}

function PhanQuyenUserLoadModule(element) {
    var action = $(element).attr("data-otf-action");
    var target = $(element).attr("data-otf-target");

    $.ajax({
        cache: false,
        type: "GET",
        url: action  ,
        data: { "id": $(element).val() },//parametter 
        success: function (data) {
            $(target).html('');
            $.each(data, function (id, option) {
                $(target).append($('<option></option>').val(option.ValueString).html(option.Name));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('server bận vui lòng quay lại sau ít phút nữa');
        }
    });

}

function PhanQuyenUser_EnterEven(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

function PhanQuyenUser_SearchClick(element) {

    
    var input = $(element).attr('data-otf-input');
    var app = $(element).attr('data-otf-app');
    var module = $(element).attr('data-otf-module');
    var denine = $(element).attr('data-otf-denine');
    var active = $(element).attr('data-otf-active');

    var action = $(element).attr("data-otf-action");
    var target = $(element).attr("data-otf-target");
    BeginWaiting();

    $(target).load(action + $(input).val() + "&a=" + $(app).val() + "&m=" + $(module).val() + "&ac=" + $(active).prop('checked') + "&de=" + $(denine).prop('checked'), function myfunction() {
        EndWaiting();

    })

}



function PhanQuyenUser_DeleteAllUserRoleDetail(element) {
    var action = $(element).attr("data-otf-action");
    var btn = $(element).attr("data-otf-btnsearch");
    var app = $(element).attr("data-otf-app");
    var module = $(element).attr("data-otf-module");
    var input = $(element).attr("data-otf-input");
    BeginWaiting();
    $.ajax({
        type: 'Post',
        cache: false,
        url: action + $(input).val() + "&a=" + $(app).val() + "&m=" + $(module).val(),
        success: function (data) {
            $(btn).click();
            EndWaiting();
        }
    }).done(function () {

    });
}
function PhanQuyenUser_DeleteOneUserRoleDetail(element) {
    var action = $(element).attr("data-otf-action");
    var btn = $(element).attr("data-otf-btnsearch");
    var list = $(element).attr("data-otf-list");

    $(list + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {
            BeginWaiting();
            $.ajax({
                type: 'Post',
                cache: false,
                url: action + $(this).attr('value'),
                success: function (data) {
                    $(btn).click();
                    EndWaiting();
                }
            }).done(function () {

            });
        }
    });
}
function PhanQuyenUser_AddUserRoleDetail(element) {
    var action = $(element).attr("data-otf-action");
    var btn = $(element).attr("data-otf-btnsearch");
    var list = $(element).attr("data-otf-list");

    $(list + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {
            BeginWaiting();
            $.ajax({
                type: 'Post',
                cache: false,
                url: action + $(this).attr('value'),
                success: function (data) {
                    $(btn).click();
                    EndWaiting();
                }
            }).done(function () {

            });
        }
    });
}
function PhanQuyenUser_AddUserRoleDenied(element) {
    var action = $(element).attr("data-otf-action");
    var btn = $(element).attr("data-otf-btnsearch");
    var list = $(element).attr("data-otf-list");
    
    $(list + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {
            BeginWaiting();
            $.ajax({
                type: 'Post',
                cache: false,
                url: action + $(this).attr('value'),
                success: function (data) {
                    $(btn).click();
                    EndWaiting();
                }
            }).done(function () {

            });
        }
    });
}





function DanhSachQuyen_User_SearchClick(elment) {

    var acton = $(elment).attr('data-offset-action');
    var ddl = $(elment).attr('data-offset-selectid');
    var vungload = $(elment).attr('data_otf_target');
    BeginWaiting();

    $(vungload).load(acton + $(ddl).val(), function myfunction() {
        EndWaiting();

    })

}

function CapNhatPassWord(element) {
    var acton = $(element).attr("data-otf-action");
    var input = $(element).attr("data-otf-input");
    $.ajax({
        type: 'Post',
        cache: false,
        url: acton + $(input).val(),
        success: function (data) {

            DialogAlert('', 'Đổi mật khẩu thành công!', 'info');
        }
    }).done(function () {
    });
}


function Set_GuiEmail(element) {
    //lấy vùng load data

    //action chính mà mình cần thực hiện
    var acton = $(element).attr("data-otf-action");

    $.ajax({
        type: 'Post',
        cache: false,
        url: acton,
        success: function (data) {
            //$(iddiv1).load(actg1);
            //$(iddiv2).load(actg2);
            //$(element).remove()
            DialogAlert('', 'Gửi Email thành công!', 'info');
        }
    }).done(function () {
    });


}





//Khi lưu thông tin thành công 
function ManageAspNetUsers_AspNetUsers_ReLoadAjaxPartial(itemguid) {
    BeginWaiting();

    var action = $('#callback').attr('data-otf-action');
    var acindex = $('#callback').attr('data-otf-action-exit');
    EndWaiting();
    if ($('#callback').attr('data-otf-save-exit'))
        window.location.href = acindex;
    else
        window.location.href = action;

}



//Sự kiện tìm kiếm
function ManageAspNetUsers_AspNetUsers_IsSearch(element) {
    $.removeCookie('pageperManageAspNetUsers', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+'));
}

//Gõ từ khóa tìm kiếm và enter
function ManageAspNetUsers_AspNetUsers_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

//Đánh dấu là save exit
function ManageAspNetUsers_AspNetUsers_OnSaveExit(e, v, f) {
    if (v == "true")
        $(e).attr('data-otf-save-exit', 'true');
    else
        $(e).removeAttr('data-otf-save-exit');

    $(f).submit();
}

//Xóa dữ liệu khi view edit
function ManageAspNetUsers_AspNetUsers_DeleteView(element) {
    $.removeCookie('pageperManageAspNetUsers', { path: '/' });
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
function ManageAspNetUsers_AspNetUsers_DeleteMulti(element) {
    $.removeCookie('pageperManageAspNetUsers', { path: '/' });
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

