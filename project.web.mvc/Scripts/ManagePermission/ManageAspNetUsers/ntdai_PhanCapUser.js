// Author:   			httHong
// Created: 			2015-10-22
// Last Modified: 		2015-10-22

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageAspNetUsers/PhanCapUser").Include("~/Scripts/ManagePermission/ManageAspNetUsers/ntdai_PhanCapUser.js"));

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



//Sự kiện tìm kiếm
function ManagePhanCapUser_IsSearch(element) {
    $.removeCookie('pageperManagePhanCapUserChua', { path: '/' });
    $.removeCookie('pageperManagePhanCapUser', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');
    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+'));
}

//Gõ từ khóa tìm kiếm và enter
function ManagePhanCapUser_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}


