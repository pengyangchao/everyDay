$('.app_jd,.service').hover(function () {
    $(this).children("[id$='items']").toggle()
        .prev().toggleClass('hover');
})
$('#category').hover(function () {
    $('#cate_box').toggle();
})

$('#cate_box').on('mouseenter','li',showsub).on('mouseleave','li',showsub);

function showsub() {
    $(this).children('.sub_cate_box').toggle().prev().toggleClass('hover');
}

$('#product_detail>.main_tabs').on('click','li:not(.current)',function () {
    var $div= $("#product_detail>[id^='product']");
    $div.removeClass('show');
    $(this).addClass('current').siblings().removeClass('current');
    if(!$(this).is(":contains('商品评价')")){
        var i=$(this).attr('i');
        $("#product_detail>[id^='product']").eq(i).addClass('show').siblings().removeClass('show');
    }
})