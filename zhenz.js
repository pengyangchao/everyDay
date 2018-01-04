function GetURLval(url) {
                var vars ={},
                    hash;
                if(!url) url = window.location.href;
                var hashes = url.slice(url.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars[hash[0]]=decodeURIComponent(hash[1]);
                }
                return vars;
            }
             
            console.log(GetURLval());
            console.log(GetURLval('?a=111&b=222&c=李四'));
  function isString(str){
        if(Object.prototype.toString.call(str) === "[object String]"){
            console.log("是字符串");
            return true;
        }else{
            console.log("不是字符串");
            return false;
        }
    }
 // e.g.: http://domain.com/path/to/picture.jpg?size=1280×960 -> picture.jpg
  function getImageName(url) {
    return isString(url) ? url.replace(/^.*\//, '').replace(/[\?&#].*$/, '') : '';
  } 


  常用URL参数操作方法：
获取单个参数
/**
 * [getParam ]
 * @param  {String} name
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean} 
 */
function getParam(name, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
 
getParam('query','https://juejin.im/search?query=hello&time=2017-11-12')
// output:
// "hello"
设置单个参数
/**
 * [setParam 设置单个参数]
 * @param {String} name
 * @param {String|Number} val 
 * @return {String|Boolean} 
 */
function setParam(name, val, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    var _name = name.replace(/[\[\]]/g, '\\$&');
    var value = name + '=' + encodeURIComponent(val);
    var regex = new RegExp(_name + '=[^&]*');
    var urlArr = url.split('#');
    var result = '';
 
    if(regex.exec(url)){
        result =  url.replace(regex, value);
    }else{
        result = urlArr[0]+'&'+value+ (urlArr[1] || '');
    }
 
    return result
}
setParam('query','world','https://juejin.im/search?query=hello&time=2017-11-12')
// output:
// "https://juejin.im/search?query=world&time=2017-11-12"
移除单个参数
/**
 * [removeParam 移除单个参数]
 * @param  {String} name
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}     
 */
function removeParam(name, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    var urlparts = url.split('?');
    var prefix = encodeURIComponent(name + '=');
    var pars = urlparts[1].split(/[&;]/g);
    var i = 0, len = pars.length;
 
    for (; i < len; i++) {
        if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
        }
    }
 
    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
 
    return url;
}
removeParam('query','https://juejin.im/search?query=hello&time=2017-11-12')
// output:
// "https://juejin.im/search?time=2017-11-12"
获取多个参数
/**
 * [getParams 获取多个参数]
 * @param  {String} names [多个用空格分割]
 * @param  {String} url   [default:location.href]
 * @return {[String|Boolean]}      
 */
function getParams(names, url) {
    if(typeof name !== 'string') return false;
    var names = names.split(' ');
    var result = {};
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;
    for (; i < len; i++) {
        result[names[i]] = getParam(names[i], url);
    }
    return result;
}
getParams('query time','https://juejin.im/search?query=hello&time=2017-11-12')
// output:
// {query: "hello", time: "2017-11-12"}
设置多个参数
/**
 * [setParams 设置多个参数]
 * @param {Object} obj
 * @param  {String} url   [default:location.href]
 * @return {[String|Boolean]}      
 */
function setParams(obj, url) {
    var result = url || '';
    if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
    for (var name in obj) {
        result = setParam(name, obj[name], result);
    }
    return result;
}
setParams({a:111,b:222,query:'world'},'https://juejin.im/search?query=hello&time=2017-11-12')
// output:
// "https://juejin.im/search?query=world&time=2017-11-12&a=111&b=222"
移除多个参数
/**
 * [removeParams 移除多个参数]
 * @param  {String} names [多个用空格分割]
 * @param  {String} url   [default:location.href]
 * @return {[String|Boolean]}      
 */
function removeParams(names, url) {
    var result = url || '';
    var names = names.split(' ');
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;
 
    for (; i < len; i++) {
        result = removeParam(names[i], result);
    }
    return result;
}
removeParams('query time','https://juejin.im/search?query=hello&time=2017-11-12')
// output:
// "https://juejin.im/search"
url hash 操作
/**
 * [getHash 方法]
 * @param  {[String]} url [default:location.href]
 * @return {[String]}    
 */
function getHash(url) {
    return decodeURIComponent(url ? url.substring(url.indexOf('#') + 1) : window.location.hash.substr(1));
}
 
/**
 * [setHash 方法]
 * @param {String} hash
 */
function setHash(hash) {
    window.location.replace('#' + encodeURIComponent(hash));
}
 
/**
 * [removeHash 方法]
 */
function removeHash() {
    window.location.replace('#', '');
}
数字：^[0-9]*$
 
n位的数字：^\d{n}$
 
至少n位的数字：^\d{n,}$
 
m-n位的数字：^\d{m,n}$
 
零和非零开头的数字：^(0|[1-9][0-9]*)$
 
非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
 
带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
 
正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
 
有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
 
有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
 
非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
 
非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
 
非负整数：^\d+$ 或 ^[1-9]\d*|0$
 
非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
 
非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
 
非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
 
正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
 
负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
 
浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
 
二、校验字符的表达式
 
汉字：^[\u4e00-\u9fa5]{0,}$
 
英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
 
长度为3-20的所有字符：^.{3,20}$
 
由26个英文字母组成的字符串：^[A-Za-z]+$
 
由26个大写英文字母组成的字符串：^[A-Z]+$
 
由26个小写英文字母组成的字符串：^[a-z]+$
 
由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
 
由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
 
中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
 
中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
 
可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+ 12 禁止输入含有~的字符：[^~\x22]+
 
三、特殊需求表达式
 
Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
 
域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?
 
InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
 
手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
 
电话号码(“XXX-XXXXXXX”、”XXXX-XXXXXXXX”、”XXX-XXXXXXX”、”XXX-XXXXXXXX”、”XXXXXXX”和”XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$
 
国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}
 
身份证号(15位、18位数字)：^\d{15}|\d{18}$
 
短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$
 
帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
 
密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
 
强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
 
日期格式：^\d{4}-\d{1,2}-\d{1,2}
 
一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
 
一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$
 
钱的输入格式：
 
1.有四种钱的表示形式我们可以接受:”10000.00” 和 “10,000.00”, 和没有 “分” 的 “10000” 和 “10,000”：^[1-9][0-9]*$
 
2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符”0”不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$
 
3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$
 
4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$
 
5.必须说明的是,小数点后面至少应该有1位数,所以”10.”是不通过的,但是 “10” 和 “10.2” 是通过的：^[0-9]+(.[0-9]{2})?$
 
6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$
 
7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$
 
23 8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$
 
备注：这就是最终结果了,别忘了”+”可以用”*”替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
 
xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
 
中文字符的正则表达式：[\u4e00-\u9fa5]
 
双字节字符：[^\x00-\xff] (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
 
空白行的正则表达式：\n\s*\r (可以用来删除空白行)
 
HTML标记的正则表达式：<(\S*?)[^>]*>.*?</\1>|<.*? /> (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
 
首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$) (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
 
腾讯QQ号：[1-9][0-9]{4,} (腾讯QQ号从10000开始)
 
中国邮政编码：[1-9]\d{5}(?!\d) (中国邮政编码为6位数字)
 
IP地址：\d+\.\d+\.\d+\.\d+ (提取IP地址时有用)
 
IP地址：((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)
 
   
 
1 用户名正则
//用户名正则，4到16位（字母，数字，下划线，减号）
var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
//输出 true
console.log(uPattern.test("caibaojian"));
2 密码强度正则
//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
//输出 true
console.log("=="+pPattern.test("caibaojian#"));
3 整数正则
//正整数正则
var posPattern = /^\d+$/;
//负整数正则
var negPattern = /^-\d+$/;
//整数正则
var intPattern = /^-?\d+$/;
//输出 true
console.log(posPattern.test("42"));
//输出 true
console.log(negPattern.test("-42"));
//输出 true
console.log(intPattern.test("-42"));
4 数字正则
可以是整数也可以是浮点数
 
//正数正则
var posPattern = /^\d*\.?\d+$/;
//负数正则
var negPattern = /^-\d*\.?\d+$/;
//数字正则
var numPattern = /^-?\d*\.?\d+$/;
console.log(posPattern.test("42.2"));
console.log(negPattern.test("-42.2"));
console.log(numPattern.test("-42.2"));
5 Email正则
//Email正则
var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//输出 true
console.log(ePattern.test("99154507@qq.com"));
6 手机号码正则
//手机号正则
var mPattern = /^1[34578]\d{9}$/; //http://caibaojian.com/regexp-example.html
//输出 true
console.log(mPattern.test("15507621888"));
7 身份证号正则
//身份证号（18位）正则
var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//输出 true
console.log(cP.test("11010519880605371X"));
8 URL正则
//URL正则
var urlP= /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
//输出 true
console.log(urlP.test("http://caibaojian.com"));
9 IPv4地址正则
//ipv4地址正则
var ipP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//输出 true
console.log(ipP.test("115.28.47.26"));
10 十六进制颜色正则
//RGB Hex颜色正则
var cPattern = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
//输出 true
console.log(cPattern.test("#b8b8b8"));
11 日期正则
//日期正则，简单判定,未做月份及日期的判定
var dP1 = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/;
//输出 true
console.log(dP1.test("2017-05-11"));
//输出 true
console.log(dP1.test("2017-15-11"));
//日期正则，复杂判定
var dP2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
//输出 true
console.log(dP2.test("2017-02-11"));
//输出 false
console.log(dP2.test("2017-15-11"));
//输出 false
console.log(dP2.test("2017-02-29"));
12 QQ号码正则
//QQ号正则，5至11位
var qqPattern = /^[1-9][0-9]{4,10}$/;
//输出 true
console.log(qqPattern.test("65974040"));
13 微信号正则
//微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
var wxPattern = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
//输出 true
console.log(wxPattern.test("caibaojian_com"));
14 车牌号正则
//车牌号正则
var cPattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
//输出 true
console.log(cPattern.test("粤B39006"));
15 包含中文正则
//包含中文正则
var cnPattern = /[\u4E00-\u9FA5]/;
//输出 true
console.log(cnPattern.test("蔡宝坚"));