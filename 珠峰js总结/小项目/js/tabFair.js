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