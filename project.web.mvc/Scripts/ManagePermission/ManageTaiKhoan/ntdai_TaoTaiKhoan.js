// Author:   			ntdai
// Created: 			2015-11-12
// Last Modified: 		2015-11-12

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageTaiKhoan/TaoTaiKhoan").Include("~/Scripts/ManagePermission/ManageTaiKhoan/ntdai_TaoTaiKhoan.js"));

//Chép dòng này vào view
//@Scripts.Render("~/module/ManagePermission/ManageTaiKhoan/TaoTaiKhoan")



function ManageUserRoleDetail_InfoUserRoleDetail_CreateAcount(element) {
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    var value = "";
    if ($($(element).attr('data-otf-input')).val() != undefined)
        value=$($(element).attr('data-otf-input')).val().replace(/ /g, '+');
    $.ajax({
        type: 'Post',
        cache: false,
        url: action,
        success: function (data) {
          
            $(idloadTo).load($(element).attr('data-otf-action-target') + value, function myfunction() {
                DialogAlert('', 'Tạo tài khoản thành công!', 'info');
            });
           
        }
    }).done(function () {
    });
}

//Sự kiện tìm kiếm
function ManageUserRoleDetail_InfoUserRoleDetail_IsSearch(element) {
    $.removeCookie('pageperTaoTaiKhoan', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+'));
}

//Gõ từ khóa tìm kiếm và enter
function Account_TimKiemUser_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

