var oTab =  document.getElementById('tab');
var tHead=oTab.tHead;
var oThs=oTab.rows[0].cells;
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;

/*var xhr = new XMLHttpRequest  ;
 
xhr.open("get", "data.txt",true)

xhr.onreadystatechange = function(){
   if(xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
      var val = xhr.responseText;
      console.log(val);
   }  
} 
xhr.send(null);*/

var val = [
{"name":"令狐冲","age":"18","score":"9999","sex":"男"},
{"name":"东方不败","age":"17","score":"9998","sex":"女"},
{"name":"令狐冲","age":"30","score":"999","sex":"男"},
{"name":"令狐冲","age":"31","score":"99","sex":"男"},
{"name":"令狐冲","age":"35","score":"959","sex":"男"},
{"name":"令狐冲","age":"38","score":"9922","sex":"男"},
{"name":"令狐冲","age":"40","score":"9939","sex":"男"},
];
// console.log(val);
//绑定数据
var frg = document.createDocumentFragment(); //创建文档碎片
for(var i=0;i<val.length;i++){
	var cur = val[i];
	// 循环数据创建tr
	var oTr = document.createElement('tr');
	for (var key in cur){
		// 循环数据创建td
		var oTd=document.createElement('td');
		// td添加文本
		oTd.innerHTML=cur[key];

		oTr.appendChild(oTd);
	}
	frg.appendChild(oTr);
}
tBody.appendChild(frg);
frg=null;
	
//各行变色
function changeColor(){
	for (var i=0; i<oRows.length;i++){
		var cur= oRows[i];
		cur.className=i%2==1?'bg':null;
	}
}
changeColor();
//排序
function sort (n){
	// 获取tbody所有行转化为类数组
	var arr = utils.listToArray(oRows);
	var _this=this;
	_this.flag*=-1;

	// 其他列排序初始化
	for (var i=0; i<oThs.length;i++){
		if(oThs[i]!=this){
			oThs[i].flag*=-1;
		}
	}

	// 排序方法
	arr.sort(function(a, b){
		// undefined调用innerHTML会报错
		var next=b.cells[n]!=undefined?b.cells[n].innerHTML:0;
		var cur=a.cells[n].innerHTML;
		var curNum=parseFloat(a.cells[n].innerHTML);
		var nextNum=b.cells[n]!=undefined?parseFloat(b.cells[n].innerHTML):0;

		if(isNaN(curNum) || isNaN(nextNum)){
			// 如果不是num就用localeCompare比较
			return (cur.localeCompare(next))*_this.flag;
		}

		return (curNum - nextNum)*_this.flag;
	});

	// 映射机制
	var frg=document.createDocumentFragment();
	for (var i=0;i<arr.length;i++){
		frg.appendChild(arr[i]);
	}

	tBody.appendChild(frg);
	frg=null;
	changeColor();

}



for(var i=0;i<oThs.length;i++){
	var curTh=oThs[i];
	if(curTh.className=='cursor'){
		curTh.flag=-1;
		curTh.index=i;
		curTh.onclick=function(){
			sort.call(this,this.index);
		}
	}
}