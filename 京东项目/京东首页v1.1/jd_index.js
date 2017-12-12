
var imgs=[
	{"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];

var slider={
	$ulImgs:null,//保存轮播图片的ul;
	$ulIdex:null,
	IMGWIDTH:670,
	move:0,

	init()
	{
		var me=this;
		me.$ulImgs=$('#imgs');
		me.$ulIdex=$('#indexs');
		me.initView();
		me.autoMove();
		$("#slider").mouseenter(function(){
			this.$ulImgs.stop(true);
		}.bind(this));
		$("#slider").mouseleave(function(){
			this.autoMove();
		}.bind(this));

		me.$ulImgs.on('mouseover','li>img',function(e){
			var target=$(e.target);
			var i=target.index('#imgs img');
			me.move=i;
			me.$ulImgs.css({left:-me.move*me.IMGWIDTH});
			me.autoHover();
		});
	},
	initView(){
		for (var i = 0,htmlImgs='',htmlIndex=''; i < imgs.length; i++) {
			htmlImgs+=`<li><img src="${imgs[i]['img']}" /></li>`;
			htmlIndex+=`<li>${i+1}</li>`;

			this.$ulImgs.html(htmlImgs).css('width',this.IMGWIDTH*(imgs.length+1));
			this.$ulIdex.html(htmlIndex);
		}
	this.$ulImgs.append(this.$ulImgs.children(":first").clone());
	this.$ulIdex.children(":first").addClass("hover");
	},
	autoMove(){
		this.move++;
		this.$ulImgs.delay('slow').animate({left:-this.IMGWIDTH*this.move},1000,function(){
			if(this.move==imgs.length){
				this.move=0;
				this.$ulImgs.css('left',0);
			}
			this.autoHover();
			this.autoMove();
		}.bind(this));
	},
	autoHover(){
		this.$ulIdex.children().eq(this.move).addClass('hover').siblings().removeClass('hover');
	},
}
slider.init();	