~function(){
	var effect={
		linear:function(t,b,c,d){
			return t*c/d+b;
		},
	}
	function move(curEle,target,duration){
		window.clearInterval(curEle.timer);
		var begin={},change={};
		for(key in target){
			if(target.hasOwnProperty(key)){
				begin[key]=utils.css(curEle,key);
				change[key]=target[key]-begin[key];
			}
		}

		var time =0;
		curEle.timer=window.setInterval(function(){
			time+=10;
			if(time>=duration){
				utils.css(curEle,target);
				window.clearInterval(curEle.timer);
				return;
			}

			for(key in target){
				if(target.hasOwnProperty(key)){

					var curPositon=effect.linear(time,parseFloat(begin[key]),change[key],duration);
					utils.css(curEle,key,curPositon);
				}
			}

		},10);

	}
	window.animate=move;
}();