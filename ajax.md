# 原生js中的ajax
* AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
* AJAX 不是新的编程语言，而是一种使用现有标准的新方法。
* AJAX 是与服务器交换数据并更新部分网页的艺术，在不重新加载整个页面的情况下。

# XMLHttpRequest对象（ajax核心）
他是一个对象，创建它： `var xhr = new XMLHttpRequest()`;

## `open()`方法;
接受三个参数:1.要发送请求的方法,2.请求的url,3.是否异步发送请求的布尔值(`true`为异步)  
`xhr.open('GET',url,true)`  
这个方法只是启动了一个指定方法的请求,并不是真正的发送请求,而是启动一个请求以备发送.

## `send()`方法
接受一个参数:作为请求主体发送的数据,如果不需要发送数据则必须传入`null`,因为这个参数对某些浏览器来说是必须的  
调`send()`方法后请求就被发送到服务器,在收到响应后,响应的数据会自动填充xhr对象的属性:  相关属性:
* `responseText`:作为响应主题被返回的文本,***无论响应内容的类型是什么,响应主体内容都会保存在`responseText`属性中,而对于非XML数据而言,`responseXML`属性值将为`null`,***  
***`responseText`是一个长字符串,需要把它转换称`json`,利用`JSON.parse(xhr.responseText)`***
* `responseXML`:如果响应内容类型是"text/xml"或"application/xml",这个属性将保存还有响应数据的XML DOM文档.
* `status`:响应http的状态
* `statusText`:http状态说明

在接受到响应后:
先检查`status`属性,`200`表示Ok,此时,如果内容类型正确,`responseText`或`responseXML`,就已经收到了正确的响应,且能够访问.    
状态码`status`如果是2开头的就表明返回正确,状态码`304`表示请求资源并没有被修改,可以直接使用浏览器中缓存的内容,这也意味着响应是有效的.

为了确保收到适当的响应,应该先进性状态码检查:
```js
if (xhr.status >= 200 && xhr.status <300 || xhr.status === 304){
    alert("成功收到响应,收到的响应内容为:" + xhr.responseText);
} else {
    alert("有错误")
}
``` 

## `readyState`属性
这个属性可取的值如下:  
`0`:未初始化,尚未调用`open()`方法  
`1`:启动,已经调用`open()`方法,尚未调用`send()`方法  
`2`:发送,已经调用`send()`方法,尚未接收到响应,     
`3`:接受,已经接收到部分响应  
`4`:完成,已经收到全部响应,而且已经可以再客户端使用了

### `onreadystatechange`事件.
用来监听`readyState`发生改变时要进行的操作,通常我们只对`readyState`为`4`的状态感兴趣; ***`onreadystatechange`事件必须在调用`open()`之前指定,才能确保跨浏览器的兼容性*** 


## `setRequestHeader()`方法
这个方法可以自定义请求头部信息,接受两个参数:1.头部字段的名称,2.头部字段的值  
***要成功发送请求头信息,必须在调用`open()`方法之后且尚未调用`send()`方法的时候调用`setRequestHeader()`方法***

## `getResponesHeader()`方法
这个方法可以获得响应头部字段的信息,接受一个参数:头部字段的名称

## `getAllResponesHeaders()`方法
这个方法可以获得一个包含所有响应头部的信息的长 ***字符串***

# jQuery中的ajax
[w3c ajax 文档](http://www.w3school.com.cn/jquery/ajax_ajax.asp)  
jQuery中有自带的ajax方法.`$.ajax()`  
***语法:`$.ajax()setting`***
```js
$.ajax({
    url: url + inputContent,
    type: 'GET',
    headers: {
        'Ocp-Apim-Subscription-Key': key
    },
    dataType: 'json',
    success: function (d) {
        var d = d.suggestionGroups[0].searchSuggestions;
        var html = '';
        // 转化称jq对象
        var $d = $(d)
        $d.each(function () {
            // 需要把返回的数据赋给新创建的html结构
            html += '<li>' + $(this)[0].displayText + '</li>';
        })
        $('#search_result').html(html);
        $('#search_suggest').show();
    }
})
```