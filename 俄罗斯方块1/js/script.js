window.addEventListener('load', function () {
    var game = new Game();

    //利用初始数组,初始化游戏界面
    // 初始化预告界面
    initInterface(game.nextData, 'nextBox', nextCell);
    // 初始化游戏界面
    initInterface(game.gameData, 'gameBox', gameCell);

    // 更新界面
    updata(nextCell, game.nextData);
    updata(gameCell, game.gameData);
    // 测试用
    // updata(gameCell,game.varyData);

    // 键盘事件
    document.addEventListener('keydown', function (e) {
        var keyCode = e.keyCode;
        switch (keyCode) {
            case 37://左
                game.left();
                updata(gameCell, game.gameData);
                break;
            case 39://右
                game.right();
                updata(gameCell, game.gameData);
                break;
            case 40://下
                game.down();
                updata(gameCell, game.gameData);
                if (!game.canMove) {
                    updata(nextCell, game.nextData);
                }
                break;
            case 32://空格
                game.rotate();
                updata(gameCell, game.gameData);
                break;

            default:
                break;
        }
    });



})

// 定义两个数组 用来存储预告界面和游戏界面的div
var gameCell = [];
var nextCell = [];

// 初始化页面
function initInterface(arr, id, cellList) {
    var dom = document.getElementById(id);
    for (var i = 0; i 　< 　arr.length; i++) {
        var adiv = [];
        for (var j = 0; j < arr[0].length; j++) {
            var newCode = document.createElement('div');
            newCode.classList.add('none');
            newCode.style.top = (i * 25) + 'px';
            newCode.style.left = (j * 25) + 'px';
            dom.appendChild(newCode);
            adiv.push(newCode)
        }
        cellList.push(adiv);
    }
}

// 更新页面
function updata(divArr, dataArr) {
    for (var i = 0; i < divArr.length; i++) {
        for (var j = 0; j < divArr[0].length; j++) {
            switch (dataArr[i][j]) {
                case 0:
                    divArr[i][j].className = 'none';
                    break;
                case 1:
                    divArr[i][j].className = 'flying';
                    break;
                case 2:
                    divArr[i][j].className = 'stopped';
                    break;
                default:
                    break;
            }
        }
    }
}

