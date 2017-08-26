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
                if (num !== -1) {
                    num--;
                } else {
                    num = len - 1;
                }
            }
            if (keyCode === 40) {
                if (num !== len - 1) {
                    num++;
                } else {
                    num = -1;
                }
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