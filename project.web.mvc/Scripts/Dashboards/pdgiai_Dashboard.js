// Author:   			ntdai
// Created: 			2015-11-2
// Last Modified: 		2015-11-2

//chép dòng này vào ~/App_Start/BundleConfig.cs mục Module
//bundles.Add(new ScriptBundle("~/module/Dashboards/QuanLyNhanSu").Include("~/Scripts/Dashboards/pdgiai_Dashboard.js"));

//Chép dòng này vào view
//@Scripts.Render("~/module/Dashboards/QuanLyNhanSu")

//Load partial vào vùng content c
function Dashboards_NhanSuMoiChinhSua_GetView(element) {
    $($(element).attr("data-target") + "_c").load($(element).attr("data-otf-action"))
}

////Quay lại list 
//function QLTTNhanSu_CongTrinhKhoaHoc_BakList(element) {
//    $($(element).attr("data-target")).load($(element).attr("data-otf-action"))
//}


//function QLTTNhanSu_CongTrinhKhoaHoc_ReLoadAjaxPartial(itemguid,ms) {
//  BeginWaiting();
//    var idCallbak = '#callbackQLTTNhanSu_CongTrinhKhoaHoc';
//    var action = $(idCallbak).attr('data-otf-action');
//    var acindex = $(idCallbak).attr('data-otf-action-exit');

//    if ($(idCallbak).attr('data-otf-save-exit')) {
//        $($(idCallbak).attr('data-otf-target-exit')).load(acindex, function myfunction() {
//            if ($(idCallbak).attr('data-otf-target') != 'null')
//                $($(idCallbak).attr('data-otf-target')).modal('hide');
//        });

//    }
//    else
//        $($(idCallbak).attr('data-otf-target') + "_c").load(action);
//    DialogAlert('', 'Cập nhập dữ liệu thành công', 'info');
//    EndWaiting();
//}

////Sau khi upload control upload gọi lại hàm này



////Sự kiện tìm kiếm
//function QLTTNhanSu_CongTrinhKhoaHoc_IsSearch(element) {
//    $.removeCookie('pageperCongTrinhKhoaHoc', { path: '/' });
//    var idinput = $(element).attr('data-otf-input');
//    var idloadTo = $(element).attr('data-otf-target');
//    var action = $(element).attr('data-otf-action');
//    $(idloadTo).load(action + $(idinput).val().replace(/ /g, '+'));
//}

////Gõ từ khóa tìm kiếm và enter
//function QLTTNhanSu_CongTrinhKhoaHoc_EnterEvent(event, btn) {
//    if (event.which == 13) {
//        $(btn).click();
//    }
//}

////Đánh dấu là save exit
//function QLTTNhanSu_CongTrinhKhoaHoc_OnSaveExit(e, v, f) {
//    if (v == "true")
//        $(e).attr('data-otf-save-exit', 'true');
//    else
//        $(e).removeAttr('data-otf-save-exit');
//    $(f).submit();
//}

////Xóa dữ liệu khi view edit
//function QLTTNhanSu_CongTrinhKhoaHoc_DeleteView(element) {
//    BeginWaiting();
//    $.removeCookie('pageperCongTrinhKhoaHoc', { path: '/' });
//    var $button = $(element);
//    if ($button.attr('data-otf-confirm'))
//        if (!confirm($button.attr('data-otf-confirm')))
//        {
//            EndWaiting();
//            return false;
//        }
//    $.ajax({
//        type: 'Post',
//        cache: false,
//        url: $button.attr('data-otf-action'),
//        success: function (data) {
//            var action = $button.attr('data-otf-action');
//            var acindex = $button.attr('data-otf-action-exit');

//                $($button.attr('data-otf-target-exit')).load(acindex, function myfunction() {
//                    if ($button.attr('data-otf-target') != 'null')
//                        $($button.attr('data-otf-target')).modal('hide');
//                });
           
//                $($button.attr('data-otf-target') + "_c").load(action);
//            EndWaiting();
//        }
//    }).done(function () {
//    });
    
//    return true;
//}

////Xóa nhiều hoặc xóa 1
//function QLTTNhanSu_CongTrinhKhoaHoc_DeleteMulti(element) {
//    $.removeCookie('pageperCongTrinhKhoaHoc', { path: '/' });
//    var $button = $(element);
//    if ($button.attr('data-otf-confirm'))
//        if (!confirm($button.attr('data-otf-confirm')))
//            return false;

//    var keysearch = "";
//    if ($($button.attr('data-otf-input')).val() != undefined)
//    { keysearch = $($button.attr('data-otf-input')).val(); }


//    var idList = $button.attr('data-otf-target');

//    var ismultil = $button.attr('data-otf-mutil');
//    if (ismultil == undefined) {
//        //Trường hợp 1 item
//        $.ajax({
//            type: 'Post',
//            cache: false,
//            url: $button.attr('data-otf-action'),
//            success: function (data) {
//                $(idList).load($button.attr('data-otf-action-target') + keysearch);
//            }
//        }).done(function () {
//        });
//        return true;
//    }

//    //Trường hợp nhiều item    
//    var numberCheckboxSeleted = $(idList + ' input.checkbox-item:checked').length;
//    var count = 0;
//    $(idList + ' input.checkbox-item').each(function (index, value) {
//        if ($(this).is(':checked')) {
//            $.ajax({
//                type: 'Post',
//                cache: false,
//                url: $button.attr('data-otf-action') + $(this).attr('value'),
//                success: function (data) {
//                    count++;
//                    if (count == numberCheckboxSeleted)
//                        $(idList).load($button.attr('data-otf-action-target') + keysearch);
//                }
//            }).done(function () {
//            });
//        }
//    });
//    return false;
//}



