
//惰性思想，使用自执行行数形成闭包，第一次给utils赋值的时候我们就已经把兼容处理好了，把最后的结果反正flag中；以后再每一个方法中我不不需要重新判断，只需要使用falg的值即可；
var utils=(function(){
   var flag='getComputedStyle' in window;

   // 类数组变数组兼容所有浏览器
   function listToArray(likeArray){
      if(flag){
            var arr= Array.prototype.slice.call(likeArray);
      }else{
       // 非标准
         var arr=[];
         for(var i = 0;i<likeArray.length;i++){
            arr[arr.length]=likeArray[i];
         }
      }
         return arr;
   }

   //ie6、7下没有JSON对象，json字符串转化为json对象兼容方法；
   function jsonParse(jsonString){
      return "JSON" in window ? JSON.parse(jsonString) : eval("("+jsonString+")");
   }

   // jquery的offset方法，获取当前元素的偏移量，父级元素都是body；
   function offset(){
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
   }

   function getCss(curEle,attr){
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
   }

   function win(attr,value){
      // 根据参数不同来实现不同的功能
         // 类似于重载
         if(typeof value ==='string'){
            return document.documentElement[attr] || document.body[attr];
         }

         document.documentElement[attr]=value;
         document.body[attr]=value;
   }

   //curEle [元素对象]
   // tagNmae [string] 标签名称 
   //return [array] curEle下的字元素 如果tagNmae不为空，则进行二次筛选
   function children(curEle,tagNmae){
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
   }

   function prev(curEle){
      if(flag){
         return curEle.previousElementSibling;
      }else{
         var par=curEle.previousSibling;
         while(par && par.nodeType !==1){
            par = par.previousSibling;
         }
         return par;
      }
   }
   function next(curEle){
      if(flag){
         return curEle.nextElementSibling;
      }else{
         var next=curEle.nextSibling;
         while(next && next.nodeType !==1){
            next = next.nextSibling;
         }
         return next;
      }
   }

   /*function prevAll(curEle){
      var arr=[],par=null;
      if(flag){
         par=curEle.previousElementSibling;
         while(par){
            arr[arr.length]=par;
            par=par.previousElementSibling;
         }else{
            par=curEle.previousSibling;
            while(par && par.nodeType !==1){
            arr[arr.length]=par;
            par=par.previousSibling;
         }
      }
      return arr
   }*/

   function prevAll(curEle){
      var arr=[];
      var par=this.prev(curEle);
      while(par){
         arr.unshift(par);
         par=this.prev(par);
      }
      return arr;
   }

   function nextAll(curEle){
      var arr=[];
      var next=this.next(curEle);
      while(next){
         arr.push(next);
         next=this.next(next);
      }
      return arr;
   }

   function sibling(curEle){
      var arr=[];
      var prev = this.prev(curEle);
      var next = this.next(curEle);
      prev?arr.push(prev):null;
      next?arr.push(next):null;
      return arr;
   } 
   function siblings(curEle){
      return this.prevAll(curEle).concat(this.nextAll(curEle));
   }

   function index(curEle){
      return this.prevAll(curEle).length;
   }

   function firstChild(curEle){
      var chs = this.children(curEle);
      return chs.length>0?chs[0]:null;
   }
   function lastChild(curEle){
      var chs = this.children(curEle);
      return chs.length>0?chs[chs.length-1]:null;
   }

   function append(newEle,container){
      container.appendChild(newEle);
   }

   function prepend(newEle,container){
      var firstChild = this.firstChild(container);
      if(firstChild){
         container.insertBefore(newEle,firstChild);
         return;
      }
      container.appendChild(newEle);
   }

   function insertBefore(newEle,oldELe){
      oldELe.parentNode.insertBefore(newEle,oldELe);
   }
   function insertAfter(newEle,oldELe){
      var next = this.next(oldELe);
      if(next){
         oldELe.parentNode.insertBefore(newEle,next);
         return;
      }
      oldELe.parentNode.appendChild(newEle);
   }


   function addClass(curEle,className){
      var arr = className.split(/ +/g);
      for (var i = 0;i<arr.length;i++){
         if(!this.hasClass(curEle,className)){
            curEle.className+= " "+arr[i];
         }
      }
   }

   function removeClass(curEle,className){
      var arr = className.split(/ +/g);
      for (var i = 0;i<arr.length;i++){
         if(this.hasClass(curEle,className)){
            var reg = new RegExp("(^| +)"+className+"( +|$)","g");
            curEle.className=curEle.className.replace(reg," ");
         }
      }
   }

   function hasClass(curEle,className){
     var reg = new RegExp("(^| +)"+className+"( +|$)");
     return reg.test(curEle.className);
   }

   function getElementsByClass(strName,context){
      context = context || document;
      if(flag){
        return this.listToArray(context.getElementsByClassName(strName));
      }

      var arr=[];
         var sriNameArr = sriName.replace(/^ +| +$/g,"").split(/ +/g);

         var nodeList=context.getElementsByTagName("*");

         for(var i = 0; i<nodeList.length;i++){
            var curNode=nodeList[i];
            var isOk=true;
            for(var k=0;k<sriNameArr.length;k++){
               var reg =  new RegExp("(^| +)"+sriNameArr[k]+"( +|$)");


               if(!reg.test(curNode.className)){
                  isOk=false;
                  break;
               }
            }
            if(isOk==true){
               arr.push(curNode);
            }
         }
         return arr;
   }

   function setCss(curEle,attr,value){
      if(attr=='float'){
         curEle['style']['cssFloat']=value;
         curEle['style']['styleCss']=value;
         return;
      }
      if(attr=='opacity'){
         curEle['style']['opacity']=value;
         curEle['style']['filter']="alpha(opacity="+value*100+")";
         return;
      }

      var reg = new RegExp("/(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))/");

      if(reg.test(attr)){
         if(!isNaN(value)){
            value+="px";
         }
      }
         curEle['style'][attr]=value;
   }

   function setGroupCss(curEle,options){
      options=options||0;
      if(options.toString()!=="[object object]"){
         return;
      }

      for(key in options){
         this.setCss(curEle,key,options[key]);
      }
   }

   function css(curEle){
      var argTwo = arguments[1];
      if(typeof argTwo == "string"){
         if(typeof arguments[2]!=="undefined"){
            return getCss.aplly(this,arguments);
         }
         setCss.aplly(this,arguments);
      }
      argTwo=argTwo|0;
         if(argTwo.toString()=="[object object]"){
            setGroupCss.aplly(this,arguments);
         }
   }

   return{

      listToArray:listToArray,

      jsonParse:jsonParse,

      // getCss:getCss,

      offset:offset,

      win:win,
      
      children:children,

      prev:prev,

      next:next,

      prevAll:prevAll,

      nextAll:nextAll,

      sibling:sibling,

      index:index,

      siblings:siblings,

      firstChild:firstChild,

      lastChild:lastChild,

      append:append,

      prepend:prepend,

      insertBefore:insertBefore,

      insertAfter:insertAfter,

      addClass:addClass,

      removeClass:removeClass,

      hasClass:hasClass,

      getElementsByClass:getElementsByClass,

      // setCss:setCss,

      // setGroupCss:setGroupCss,

      css:css,
   }
})(); 