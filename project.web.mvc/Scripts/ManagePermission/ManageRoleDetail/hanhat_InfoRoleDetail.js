// Author:   			hanhat
// Created: 			2015-11-18
// Last Modified: 		2015-11-18

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/ManagePermission/ManageRoleDetail/InfoRoleDetail").Include("~/Scripts/ManagePermission/ManageRoleDetail/hanhat_InfoRoleDetail.js"));

//Chép dòng này vào view
//@Scripts.Render("~/module/ManagePermission/ManageRoleDetail/InfoRoleDetail")


$(function () {
    var ajaxDropdowlistSelectchange = function () {
        var $ddlmain = $(this);
        var $ddltaget = $($ddlmain.attr("data-otf-target"));
        var actionlink = $ddlmain.attr("data-otf-action");
        $.ajax({
            cache: false,
            type: "GET",
            url: actionlink,
            data: { "value": $ddlmain.val(), "actionname": $ddlmain.attr("data-otf-actionname") },
            success: function (data) {
                $ddltaget.html('');
                $.each(data, function (id, option) {
                    $ddltaget.append($('<option></option>').val(option.ValueString).html(option.Name));
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('server bận vui lòng quay lại sau ít phút nữa');
            }
        });
    };
    // khai bao cho dropdownlist change
    $("select[data-otf-selectchange='dropdownlisttinhchange']").change(ajaxDropdowlistSelectchange);
});



function PhanQuyenRole_ChucNang_ReSubmitFormSearch(pagenumber) {
    // dua gia tri page vao trong submit
    $("#hidenpagenumber").val(pagenumber);
    // kich hoat form search submit lai
    $("#PhanQuyenRole_ChucNangbuttonsearch").click();
}

// khi click nut search thi reset lai pagenumber
//function PhanQuyenRole_ChucNang_SearchClick() {
//    $("#hidenpagenumber").val(1);
//    $("#buttonsearch").click();
//}

function QLTTNhanSu_NhanVien_EnterEvent(event, btn) {
    if (event.which == 13) {
        // dua phan trang ve trang thai ban dau
        $("#hidenpagenumber").val(1);
        //$(btn).click();
    }
}

//Load partial vào vùng content c

function ManageRoleDetail_InfoRoleDetail_GetView(element) {
    $($(element).attr("data-target") + "_c").load($(element).attr("data-otf-action"))
}

//Quay lại list 
function ManageRoleDetail_InfoRoleDetail_BakList(element) {
    $($(element).attr("data-target")).load($(element).attr("data-otf-action"))
}


function ManageRoleDetail_InfoRoleDetail_ReLoadAjaxPartial(itemguid, ms) {

    BeginWaiting();
    //Sau khi upload có 1 hàm FileUploadCallBack mặc định để gọi lại control hiên tại
    $('#btnUpload-' + itemguid.toUpperCase()).click();
}

//Sau khi upload control upload gọi lại hàm này
function FileUploadCallBack_InfoRoleDetail(ms) {
    BeginWaiting();
    var idCallbak = '#callbackManageRoleDetail_InfoRoleDetail';
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
function ManageRoleDetail_InfoRoleDetail_IsSearch(element) {
    $.removeCookie('pageperInfoRoleDetail', { path: '/' });
    var idinput = $(element).attr('data-otf-input');
    var idloadTo = $(element).attr('data-otf-target');
    var action = $(element).attr('data-otf-action');

    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+'));

}

//Gõ từ khóa tìm kiếm và enter
function ManageRoleDetail_InfoRoleDetail_EnterEvent(event, btn) {
    if (event.which == 13) {
        $(btn).click();
    }
}

//Đánh dấu là save exit
function ManageRoleDetail_InfoRoleDetail_OnSaveExit(e, v, f) {

    if (v == "true")
        $(e).attr('data-otf-save-exit', 'true');
    else
        $(e).removeAttr('data-otf-save-exit');
    $(f).submit();
}

//Xóa dữ liệu khi view edit
function ManageRoleDetail_InfoRoleDetail_DeleteView(element) {
    BeginWaiting();
    $.removeCookie('pageperInfoRoleDetail', { path: '/' });
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
function ManageRoleDetail_InfoRoleDetail_DeleteMulti(element) {
    var $button = $(element);
    if ($button.attr('data-otf-confirm'))
        if (!confirm($button.attr('data-otf-confirm')))
            return false;
    //id của list chứa check box
    var idList = $button.attr('data-otf-target');

    var numberCheckboxSeleted = $(idList + ' input.checkbox-item:checked').length;

    var tenroleforcode;
    //-----------------------------------------------------------------
    //kiểm tra thỏa điều kiện có tồn tại check ở cột trạng thái chưa. nếu tồn tại thì không thực hiện thê mà thông báo
    var var_Kiemtra = 0;



    $(idList + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {

            if ($(this).attr('data-offset-valuecheck') != 'False') {

                tenroleforcode = $(this).attr('data-offset-RoleforcodeName');
                var_Kiemtra++;

                $.ajax({
                    type: 'Post',
                    cache: false,
                    url: $button.attr('data-otf-action') + $(this).attr('data-otf-value-roleforcodeguid') + "&idRole=" + $(this).attr('data-otf-value-roleguid'),
                    success: function (data) {

                        if (var_Kiemtra > 0) {
                            if (var_Kiemtra == 1)
                                DialogAlert('Thông báo', 'Xóa thành công RoleForCode! ' + tenroleforcode + ' ra khỏi quyền này', 'info');
                            else
                                DialogAlert('Thông báo', 'Xóa thành công!', 'info');

                            PhanQuyenRole_ChucNang_SearchClick();
                        }
                        else {
                            DialogAlert('Thông báo', 'Hãy kiểm tra lại! Một trong những chức năng bạn cần xóa không tồn tại trong quyền này!', 'error');
                            PhanQuyenRole_ChucNang_SearchClick();

                            return false;
                        }


                    }
                }).done(function () {
                });
            }
            else {
                var_Kiemtra = 0;
            }
        }
    });

    if (numberCheckboxSeleted == 0) {
        return false;
    }


    return false;
}


//Thêm nhiều chức năng cho quyền
function ManageRoleDetail_InfoRoleDetail_CreateMulti(element) {
    var $button = $(element);

    //id của list chứa check box
    var idList = $button.attr('data-otf-target');

    var numberCheckboxSeleted = $(idList + ' input.checkbox-item:checked').length;
    var tenroleforcode;
    //-----------------------------------------------------------------
    //kiểm tra thỏa điều kiện có tồn tại check ở cột trạng thái chưa. nếu tồn tại thì không thực hiện thê mà thông báo
    var var_Kiemtra = 0;



    $(idList + ' input.checkbox-item').each(function (index, value) {
        if ($(this).is(':checked')) {

            if ($(this).attr('data-offset-valuecheck') != 'True') {
                tenroleforcode = $(this).attr('data-offset-RoleforcodeName');
                var_Kiemtra++;

                $.ajax({
                    type: 'Post',
                    cache: false,
                    url: $button.attr('data-otf-action') + $(this).attr('data-otf-value-roleforcodeguid') + "&idRole=" + $(this).attr('data-otf-value-roleguid'),
                    success: function (data) {

                        if (var_Kiemtra > 0) {
                            if (var_Kiemtra == 1)
                                DialogAlert('', 'Thêm thành công RoleForCode! ' + tenroleforcode, 'info');
                            else
                                DialogAlert('', 'Thêm thành công!', 'info');

                            PhanQuyenRole_ChucNang_SearchClick();
                        }
                        else {
                            DialogAlert('', 'Hãy kiểm tra lại! Một trong những chức năng bạn thêm đã tồn tại trong quyền này!', 'error');
                            PhanQuyenRole_ChucNang_SearchClick();

                            return false;
                        }
                    }
                }).done(function () {
                });
            }
            else {
                var_Kiemtra = 0;
            }
        }
    });

    if (numberCheckboxSeleted == 0)
        return false;


    return false;
}


