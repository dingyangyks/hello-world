window.addEventListener('load', function () {
    var oBox = document.getElementById('box');
    var items = document.getElementsByClassName('item');
    // console.log(items.length);

    var oWrap = document.getElementsByClassName('wrap')[0];
    var txtP = document.getElementsByClassName('message')[0];
    var btn = document.getElementsByClassName("btn")[0];

    var data = new Array(9);
    for (var i = 0; i < data.length; i++) {
        data[i] = undefined;
    }
    console.log(data)

    oBox.addEventListener('click', function (event) {
        var target = event.target;
        // 先判断点击的子元素还是父元素
        if (!target.classList.contains('item')) {
            return;
        }
        // 判断点击的是第几个方格
        var index;
        for (var i = 0; i < items.length; i++) {
            if (target === items[i]) {
                index = i;
            }
        }
        // console.log(index);
        // 判断是否落子，即数组里有没有传入内容
        if (data[index]) {
            console.log('有子了');
            return;
        }

        // 计数 没有落字是点击一次次数加一
        var clickNum = 0;//还需要遍历加1；

        for (var i = 0; i < data.length; i++) {
            if (data[i]) {//下一个子，计数加一
                clickNum++;
            }
        }
        console.log(clickNum)//没有下子之前都是0

        data[index] = clickNum % 2 === 0 ? "0" : "X";
        // 根据点击的奇偶来落子
        if (data[index] === "0") {
            target.innerHTML = '0';
            target.style.color = "rgb(185, 220, 47)"
            target.classList.add('O');
        }
        if (data[index] === "X") {
            target.innerHTML = 'X';
            target.style.color = "rgb(25, 169, 229)"
            target.classList.add('X');
        }

        var winner = result(data);
        console.log(winner)

        if (winner === undefined && data.indexOf(undefined) === -1) {
            setTimeout(function () {
                oWrap.style.display = "block";
                txtP.innerHTML = "平局!";
            }, 500);
        } else if (winner === "0") {
            setTimeout(function () {
                oWrap.style.display = "block";
                txtP.innerHTML = "0获胜";
            }, 200)
        } else if (winner === "X") {
            setTimeout(function () {
                oWrap.style.display = "block";
                txtP.innerHTML = "X获胜";
            }, 200)

        }


    })

    //关闭弹框 清除样式
    btn.addEventListener('click', function () {
        oWrap.style.display = "none";
        for (var i = 0; i < items.length; i++) {
            items[i].innerHTML = null;
            items[i].classList.remove("O", "X");
        }
        for (var i = 0; i < 9; i++) {
            data[i] = undefined;
        }
    })

    // 判断结果
    function result(data) {
        // 判断行
        for (var i = 0; i < 3; i++) {
            var first = data[i * 3];
            if (first === data[i * 3 + 1] && data[i * 3 + 1] == data[i * 3 + 2] && first !== undefined) {
                return first;
            }
        }
        //判断列
        for (var i = 0; i < 3; i++) {
            var first = data[i];
            if (first === data[i + 3] && data[i + 3] === data[i + 6] && first !== undefined) {
                return first;
            }
        }
        // 判断对角
        if (data[0] === data[4] && data[0] === data[8] && data[0] !== undefined) {
            return first;
        }
        if (data[2] === data[4] && data[2] === data[6] && data[2] !== undefined) {
            return first;
        }
    }

})