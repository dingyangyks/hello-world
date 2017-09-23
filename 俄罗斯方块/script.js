var game = new Game();

//键盘事件
document.addEventListener('keydown', function (e) {
    var keyCode = e.keyCode;
    switch (keyCode) {
        case 37://左
            game.left();
            break;
        case 39://右
            game.right();
            break;
        case 40://下
            game.down();
            break;
        case 32://空格

            break;

        default:
            break;
    }
});

game.on('change', function (data) {
    console.log(game.gameDivs.length)
    for (var i = 0; i < game.gameDivs.length; i++) {
        for (var j = 0; j < game.gameDivs[i].length; j++) {
            switch (data[i][j]) {
                case 0:
                    game.gameDivs[i][j].className = 'none';
                    break;
                case 1:
                    game.gameDivs[i][j].className = 'flying';
                    break;
                case 2:
                    game.gameDivs[i][j].className = 'stopped';
                    break;
                default:
                    break;
            }
        }
    }
});

// game.on('change', function (data) {
//     console.log(game.gameDivs.length)
//     for (var i = 0; i < game.nextDivs.length; i++) {
//         for (var j = 0; j < game.nextDivs[i].length; j++) {
//             switch (data[i][j]) {
//                 case 0:
//                     game.nextDivs[i][j].className = 'none';
//                     break;
//                 case 1:
//                     game.nextDivs[i][j].className = 'flying';
//                     break;
//                 case 2:
//                     game.nextDivs[i][j].className = 'stopped';
//                     break;
//                 default:
//                     break;
//             }
//         }
//     }
// });
