var oTab =  document.getElementById('tab');
var tHead=oTab.tHead;
var oThs=oTab.rows[0].cells;
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;

/*var xhr = new XMLHttpRequest  ;
 
xhr.open("get", "json/data.txt",true)

xhr.onreadystatechange = function(){
   if(xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
      var val = xhr.responseText;
      console.log(val);
   }  
} 
xhr.send(null);*/

var val = [
{"name":"令狐冲","age":"18","score":"9999","sex":"男"},
{"name":"令狐冲","age":"18","score":"9999","sex":"男"},
{"name":"令狐冲","age":"18","score":"9999","sex":"男"},
{"name":"令狐冲","age":"18","score":"9999","sex":"男"},
{"name":"令狐冲","age":"18","score":"9999","sex":"男"},
{"name":"令狐冲","age":"18","score":"9999","sex":"男"},
];
console.log(val);
