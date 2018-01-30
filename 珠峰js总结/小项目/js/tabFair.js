// 选项卡封装方法
// @parmar container [object] 容器
// @parmar defultIndex [num] 默认选中序号
~function(){
	function tabChange(container,defultIndex){
		var tabfirst=utils.firstChild(container),oLi=utils.children(tabfirst);
		var oDivs=utils.nextAll(tabfirst);
		//初始化选中
		defultIndex=defultIndex||0;
		utils.addClass(oLi[defultIndex],'select');
		utils.addClass(oDivs[defultIndex],'select');


	// 事件委托方法
	tabfirst.onclick=function(e){
		e=e||window.event;
		e.target=e.target||e.srcElement;
		if(e.target.nodeName.toLowerCase()=="li"){
			var curLi=e.target;
			curLi.index=utils.index(curLi);
			liDetail.call(curLi);
		}
	}
	function liDetail (){
		for(var i = 0;i<oLi.length;i++){
			utils.removeClass(oLi[i],'select');
			utils.removeClass(oDivs[i],'select');
		}
		utils.addClass(this,'select');
		utils.addClass(oDivs[this.index],'select');
	}

	// 循环绑定事件方法
	/*for (var i=0 ; i<oLi.length; i++){
		var curLi= oLi[i];
		curLi.index=i;
		curLi.onclick=function(){
			var siblings= utils.siblings(this);
			var oDivs=utils.nextAll(tabfirst);
			for(var i = 0;i<siblings.length;i++){
				utils.removeClass(siblings[i],'select');
				utils.removeClass(oDivs[siblings[i].index],'select');
			}
			utils.addClass(this,'select');
			utils.addClass(oDivs[this.index],'select');
		}
	}*/
}
window.tabChange=tabChange;
}();


// 选项卡构造函数封装方法
// @parmar container [object] 容器
// @parmar defultIndex [num] 默认选中序号
~function(){
	function tabChange(container,defultIndex){
		return this.init(container,defultIndex);
	}
	tabChange.prototype={
		constructor:tabChange,
		init:function(container,defultIndex){
			this.container=container||null;
			this.defultIndex=defultIndex||0;
			this.tabfirst=utils.firstChild(this.container);
			this.oLi=utils.children(this.tabfirst);
			this.oDivs=utils.nextAll(this.tabfirst);
			this.initDefault();
			this.liveClick();
			return this;
		},
		//初始化选中
		initDefault:function(){
			utils.addClass(this.oLi[this.defultIndex],'select');
			utils.addClass(this.oDivs[this.defultIndex],'select');
		},

		liveClick:function(){
			var _this=this;
			this.tabfirst.onclick=function(e){
				e=e||window.event;
				e.target=e.target||e.srcElement;
				if(e.target.nodeName.toLowerCase()=="li"){
					var curLi=e.target;
					curLi.index=utils.index(curLi);
					_this.liDetail(curLi);
				}
			}
		},
		liDetail:function(curLi){
			for(var i = 0;i<this.oLi.length;i++){
				utils.removeClass(this.oLi[i],'select');
				utils.removeClass(this.oDivs[i],'select');
			}
			utils.addClass(curLi,'select');
			utils.addClass(this.oDivs[curLi.index],'select');
		}
	}
	window.constructorTabChange=tabChange;
}();