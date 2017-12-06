$('.app_jd,.service').hover(function ()
{
    $(this).children("[id$='items']").toggle()
    .prev().toggleClass('hover');
})
$('#category').hover(function () 
{
    $('#cate_box').toggle();
})

$('#cate_box').on('mouseenter','li',showsub).on('mouseleave','li',showsub);

function showsub() 
{
    $(this).children('.sub_cate_box').toggle().prev().toggleClass('hover');
}
//标签切换
$('#product_detail>.main_tabs').on('click','li:not(.current)',function () 
{
    var $div= $("#product_detail>[id^='product']");
    $div.removeClass('show');
    $(this).addClass('current').siblings().removeClass('current');
    if(!$(this).is(":contains('商品评价')"))
    {
        var i=$(this).attr('i');
        $("#product_detail>[id^='product']").eq(i).addClass('show').siblings().removeClass('show');
    }
});
//放大镜
var preview={
    LIWIDTH:62,
    $ul:null,
    $mask:null,
    init()
    {
        this.$ul=$('#icon_list');
        $('#preview>h1>a').click(function(e)
        {
            if($(e.target).is("[class$='_disabled']")){return}
                if($(e.target).is('.forward'))
                {
                    this.$ul.css('left',parseFloat(this.$ul.css('left'))-this.LIWIDTH);
                    $(e.target).prev().addClass('backward').removeClass('backward_disabled');
                    if(parseFloat(this.$ul.css('left'))==-166)
                    {
                        $(e.target).addClass('forward_disabled').removeClass('forward');
                    }
                }

                if($(e.target).is('.backward'))
                {
                    this.$ul.css('left',parseFloat(this.$ul.css('left'))+this.LIWIDTH);
                    $(e.target).next().addClass('forward').removeClass('forward_disabled');
                    if(parseFloat(this.$ul.css('left'))==20)
                    {
                        $(e.target).addClass('backward_disabled').removeClass('backward');
                    }
                }

            }.bind(this))

        this.$ul.on('mouseenter','li>img',function()
        {
            var src = $(this).attr('src');
            var i = src.lastIndexOf('.');
            src=src.slice(0,i)+'-m'+src.slice(i);
            $('#mImg').attr('src',src); 
        })
        this.$mask=$('#mask');
        $('#superMask').hover(function()
        {
            this.$mask.toggle();
        }.bind(this))
    }
};
preview.init();
