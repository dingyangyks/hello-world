window.addEventListener('load', function () {
    //发送请求
    var inputTextBox = document.getElementById('input_text');
    var search_result = document.getElementById('search_result');
    var timer = null;
    var num;
    inputTextBox.addEventListener('input', function () {
        num = -1;
        clientInput = inputTextBox.value;
        clearTimeout(timer);
        if (!clientInput) {
            search_result.style.display = 'none';
            return;
        } else {
            timer = setTimeout(search, 300);
        }
       
    })

    
    
    inputTextBox.addEventListener('keydown', function (event) {
        console.log(num)
        var keyCode = event.keyCode;
        // 上下键事件
        if (keyCode === 38 || keyCode === 40) {
            var remindLi = document.getElementById('search_result').getElementsByTagName('li');
            var len = remindLi.length;
            if (keyCode === 38) {
                // if (num !== -1) {
                //     num--;
                // } else {
                //     num = len - 1;
                // }
                num = num !== -1 ? num-- : len - 1;
            }
            if (keyCode === 40) {
                // if (num !== len - 1) {
                //     num++;
                // } else {
                //     num = -1;
                // }
                num = num !== len - 1 ? num++ : -1;
            }
            if (num !== -1) {
                for (var i = 0; i < len; i++) {
                    remindLi[i].classList.remove('changeStyle');
                }
                remindLi[num].classList.add('changeStyle');
                inputTextBox.value = remindLi[num].innerText;
            } else {
                inputTextBox.value = clientInput;
                for (var i = 0; i < len; i++) {
                    remindLi[i].classList.remove('changeStyle');
                }
            }
        }
        // 回车键事件
        if (keyCode === 13) {
            if (num === -1) {
                clientInput = inputTextBox.value;
            } else {
                inputTextBox.value = document.getElementById('search_result').getElementsByClassName('changeStyle')[0].innerText;
                clientInput = inputTextBox.value;
            }
            location.href = aimUrl + clientInput;
        }
    })
    document.addEventListener('click', function () {
        search_result.style.display = 'none';
    })

    var submit = document.getElementById('submit');
    submit.addEventListener('click', function () {
        clientInput = inputTextBox.value;
        location.href = aimUrl + clientInput;
    })

    jump();

})

var key = '49295dbc48ec47c5a7f52c1502f8db7f';
var url = 'https://api.cognitive.microsoft.com/bing/v5.0/suggestions?q=';
var aimUrl = 'http://cn.bing.com/search?q=';
var clientInput = '';

function search() {
    var inputTextBox = document.getElementById('input_text');
    clientInput = inputTextBox.value;

    // 发送请求
    var xhr = new XMLHttpRequest();
    // 接受请求
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState)
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var ret = JSON.parse(xhr.responseText);
                var result = ret.suggestionGroups[0].searchSuggestions;
                var search_result = document.getElementById('search_result');
                var html = '';
                for (var i = 0; i < result.length; i++) {
                    // var aLi = document.createElement('li');
                    // aLi.innerText = result[i].displayText;
                    // search_result.appendChild(aLi);//会不停的添加li
                    html += '<li>' + result[i].displayText + '</li>'
                }
                search_result.innerHTML = html;
                search_result.style.display = 'block';
            } else {
                console.log('error');
            }
        }
    }
    xhr.open('GET', url + clientInput, true);
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', key);
    // console.log(xhr.setRequestHeader())
    xhr.send(null);
}

function jump() {
    var search_result = document.getElementById('search_result')
    var remindLiClick = search_result.getElementsByTagName('li');
    search_result.addEventListener('click', function (event) {
        var target = event.target;
        var inputTextBox = document.getElementById('input_text');
        for (var i = 0; i < remindLiClick.length; i++) {
            if( target === remindLiClick[i]){
                clientInput = remindLiClick[i].innerText;
                inputTextBox.value = clientInput;
                location.href = aimUrl + clientInput;
            }
        }
    })
}

// 总结:
// 1. 通过延时进行ajax操作,可以避免无意义或者重复的请求不断被提交,这个例子中就是对输入框变化进行延时,以到达减少请求的目的
// 2. 在开启新定时器前要先关闭上一次开启的定时器,否则会开启多个定时器
// 3. 三目运算符,`variable = boolean_expression ? true_value : false_value;`
// 4. 短路运算符: a = a1 && a2 有一个为false则返回0或者false
//              a = a1 || a2 返回a1 a2中为true的值
// 5. 短路运算符:!$(_this).val() && suggestList.hide(); 这句解释为如果$(_this).val()不存在就隐藏,即前面条件为true则执行后面的
//             a && b a为true就执行b
//             a || b a为false就执行b
// 6. 事件委托:当需要给不同的元素绑定同一事件时,可以利用冒泡机制把事件绑定在父元素上,只用绑定一次事件即可
//    js中:通过指定`event.target`给真正的事件目标即可完成事件委托
//    search_result.addEventListener('click', function (event) {
//         var target = event.target;
//         var inputTextBox = document.getElementById('input_text');
//         for (var i = 0; i < remindLiClick.length; i++) {
//             if( target === remindLiClick[i]){
//                 clientInput = remindLiClick[i].innerText;
//                 inputTextBox.value = clientInput;
//                 location.href = aimUrl + clientInput;
//             }
//         }
//     })
//     jq中:可以通过`delegate()`方法进行事件委托,接收三个参数必须参数`$(selector).delegate(childSelector,event,function)`
//         //  也可以通过`on()`方法进行事件委托,参数和`delegate()`一样?
//     $('#search_result').delegate('li', 'click', function () {
//         var resultPage = $(this).text();
//         location.href = 'http://cn.bing.com/search?q=' + resultPage;
//     })
// 7. 在js中创建新元素也可以用字符串拼接的方法 `html += '<li>' + result[i].displayText + '</li>'`,注意在循环中创建多个节点需要使用 `+=`,循环结束后在统一插入
//     在这个例子中不要使用`createElement`创建DOM,因为插入到dom树中没有移除的话会一直插入li,需要移除且性能不佳
//    在jq中利用`html()`方法创建dom结构