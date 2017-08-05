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

    // 事件委托
    oBox.addEventListener('click', function (event) {
        var target = event.target;
        if (!target.classList.contains("item")) {
            return;
        }

        // 判断点的第几个
        var index;
        for (var i = 0; i < items.length; i++) {
            if (items[i] === target) {
                index = i;
            }
        }
        console.log(index);

        // 判断是否落子

        // 有棋子则返回
        var clickNum = 0;
        if (data[index]) {
            return;
        } else {
            for (var i = 0; i < data.length; i++) {
                if (data[i]) {
                    clickNum += 1;
                }
            }
        }
        console.log(clickNum);

        data[index] = clickNum % 2 ? "0" : "X";
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
            showWinner("平局");
        } else if (winner) {
            showWinner(winner + "胜利");
        }
    })

    btn.addEventListener('click',clean)

    function showWinner(message) {
        setTimeout(function () {
            oWrap.style.display = "block";
            txtP.innerHTML = message;
        }, 200);
    }

    function clean() {
        oWrap.style.display = "none";
        for(var i = 0; i< items.length; i++){
            items[i].innerHTML = null;
            items[i].classList.remove('X','O');
        }

        for (var i = 0; i < data.length; i++) {
            data[i] = undefined;
        }
    }

})



function result(arr) {
    // 判断对角
    if (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== undefined) {
        return arr[2];
    }
    if (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== undefined) {
        return arr[0];
    }

    // 判断行
    for (var i = 0; i < 3; i++) {
        var first = arr[i * 3];
        if (first === arr[i * 3 + 1] && arr[i * 3 + 1] === arr[i * 3 + 2] && first !== undefined) {
            return first;
        }
    }

    // 判断咧
    for (var i = 0; i < 3; i++) {
        var first = arr[i];
        if (first === arr[i + 3] && arr[i + 3] === arr[i + 6] && first !== undefined) {
            return first;
        }
    }

}

