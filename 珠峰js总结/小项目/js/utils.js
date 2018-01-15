var utils={
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
   		}
   	}