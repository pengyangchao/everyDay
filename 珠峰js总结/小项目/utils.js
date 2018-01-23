
//惰性思想，使用自执行行数形成闭包，第一次给utils赋值的时候我们就已经把兼容处理好了，把最后的结果反正flag中；以后再每一个方法中我不不需要重新判断，只需要使用falg的值即可；
var utils=(function(){
   var flag='getComputedStyle' in window;

   return{
      //用try catch 方法让类数组变数组兼容所有浏览器
    listToArray:function(likeArray){
      try{
               // 标准
               var arr= Array.prototype.slice.call(likeArray);
            }
            catch(e){
               // 非标准
               var arr=[];
               for(var i = 0;i<likeArray.length;i++){
                  arr[arr.length]=likeArray[i];
               }
            }
            return arr;
         },

      //ie6、7下没有JSON对象，json字符串转化为json对象兼容方法；
      jsonParse:function(jsonString){
         return "JSON" in window ? JSON.parse(jsonString) : eval("("+jsonString+")");
      },

      getCss:function(curEle,attr){
         var val=null; var reg=null;

         if(flag){
            val=getComputedStyle(curEle,null)[attr];
         }else{
         //ie6-8不支持opacity 只支持滤镜；
         if(attr=='opacity'){

            val=curEle.currentStyle["filter"];
            reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val=reg.test(val)?reg.exec(val)[1]/100:1;

         }else{
            val=curEle.currentStyle[attr];
         }
      }
         //如果是px pt rem em 去单位计算；
         reg=/^(-?\d+(\.\d+)?)(px|pt|rem|em)$/i;
         return reg.test(val)?parseFloat(val):val;
      },

      // jquery的offset方法，获取当前元素的偏移量，父级元素都是body；
      offset:function(curEle){
         var totalLeft=null,totalTop=null,par=curEle.parentNode;
         totalLeft+=curEle.offsetLeft;
         totalTop+=curEle.offsetTop;

         while(par){


            totalLeft+=par.offsetLeft;
            totalTop+=par.offsetTop;
            

         // ie8本身是加上边框的，所以如果是ie要忽略下面的代码
         if(par.clientLeft!="undefined"&&par.clientTop!='undefined'){
            totalLeft+=par.clientLeft;
            totalTop+=par.clientTop;
         }

         par=par.offsetParent;

      }

      return {left:totalLeft,top:totalTop};
   },
      win:function(attr,value) {
         // 根据参数不同来实现不同的功能
         // 类似于重载
         if(typeof value ==='string'){
            return document.documentElement[attr] || document.body[attr];
         }

         document.documentElement[attr]=value;
         document.body[attr]=value;
      },

      //curEle [元素对象]
      // tagNmae [string] 标签名称 
      //return [array] curEle下的字元素 如果tagNmae不为空，则进行二次筛选
      children:function (curEle,tagNmae){
         var arr  =[];

         if(/MISE (6|7|8)/i.test(navigator.userAgent)) {
            var nodeList=curEle.childNodes;
            for (var i=0;i<nodeList.length;i++){
               var curNode=nodeList[i];
               if(curNode.nodeType===1){
                  arr[arr.length]=curNode;
               }
            }
         } else {
            arr=Array.prototype.slice.call(curEle.children);
         }

         if (typeof tagNmae=='string') {
            var tagNmaes=[];
            for(var k=0;k<arr.length;k++){
               var kCurNode=arr[k];
               if(kCurNode.nodeName.toLowerCase()===tagNmae.toLowerCase()){
                  tagNmaes[tagNmaes.length]=kCurNode;
               }
            }
            arr=null;
            return tagNmaes;
         }
         
         return arr; 
      },
   }
})();