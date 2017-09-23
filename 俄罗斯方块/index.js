window.addEventListener('load', function () {

    init(nextData, 'nextBox', 25, nextDivs);
    init(gameData, 'gameBox', 25, gameDivs);

    reFreshGame(gameDivs, gameData);
    // reFreshGame(nextDivs,G_shape_2);

    createNew();
});

var nextData = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 2]
]

var nextDivs = [];
var gameDivs = [];

function init(arr, id, wid, divs) {
    var dom = document.getElementById(id);
    console.log(this.gameData);
    for (var i = 0; i < arr.length; i++) {
        var oDivs = [];
        for (var j = 0; j < arr[i].length; j++) {
            var newCode = document.createElement('div');
            newCode.classList.add('none');
            newCode.style.top = (i * wid) + 'px';
            newCode.style.left = (j * wid) + 'px';
            dom.appendChild(newCode);
            oDivs.push(newCode);
        }
        divs.push(oDivs);
    }
}

function reFreshGame(divs, data) {
    for (var i = 0; i < divs.length; i++) {
        for (var j = 0; j < divs[i].length; j++) {

            switch (data[i][j]) {
                case 0:
                    divs[i][j].className = 'none';
                    break;
                case 1:
                    divs[i][j].className = 'flying';
                    break;
                case 2:
                    divs[i][j].className = 'stopped';
                    break;
                default:
                    break;
            }
        }
    }
}



// 七种图形
// A竖形
var shapeI = {
    A_shape_1: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    A_shape_2: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    A_shape_3: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    A_shape_4: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    height: 4,
    width: 1
}


// B田字形
var B_shape_1 = [[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 1, 1, 0],
[0, 0, 0, 0]];
var B_shape_2 = [[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 1, 1, 0],
[0, 0, 0, 0]];
var B_shape_3 = [[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 1, 1, 0],
[0, 0, 0, 0]];
var B_shape_4 = [[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 1, 1, 0],
[0, 0, 0, 0]];

// C L形
var C_shape_1 = [[0, 0, 0, 0],
[0, 1, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0]];

var C_shape_2 = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 1, 0],
[1, 1, 1, 0]];

var C_shape_3 = [[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0],
[0, 0, 1, 0]];

var C_shape_4 = [[0, 0, 0, 0],
[1, 1, 1, 0],
[1, 0, 0, 0],
[0, 0, 0, 0]];

// D 反L形
var D_shape_1 = [[0, 0, 0, 0],
[0, 0, 1, 0],
[0, 0, 1, 0],
[0, 1, 1, 0]];

var D_shape_2 = [[0, 0, 0, 0],
[0, 0, 0, 0],
[1, 1, 1, 0],
[0, 0, 1, 0]];

var D_shape_3 = [[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 1, 0, 0],
[0, 1, 0, 0]];

var D_shape_4 = [[0, 0, 0, 0],
[1, 0, 0, 0],
[1, 1, 1, 0],
[0, 0, 0, 0]];

//E  Z形  
var E_shape_1 = [[0, 0, 0, 0],
[1, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 0, 0]];

var E_shape_2 = [[0, 0, 0, 0],
[0, 0, 1, 0],
[0, 1, 1, 0],
[0, 1, 0, 0]];
var E_shape_3 = [[0, 0, 0, 0],
[1, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 0, 0]];

var E_shape_4 = [[0, 0, 0, 0],
[0, 0, 1, 0],
[0, 1, 1, 0],
[0, 1, 0, 0]];

//E  反Z形 
var F_shape_1 = [[0, 0, 0, 0],
[0, 0, 1, 1],
[0, 1, 1, 0],
[0, 0, 0, 0]];

var F_shape_2 = [[0, 0, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0]];
var F_shape_3 = [[0, 0, 0, 0],
[0, 0, 1, 1],
[0, 1, 1, 0],
[0, 0, 0, 0]];

var F_shape_4 = [[0, 0, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0]];

//F  土形 
var G_shape_1 = [[0, 0, 0, 0],
[0, 1, 0, 0],
[1, 1, 1, 0],
[0, 0, 0, 0]];

var G_shape_2 = [[0, 0, 0, 0],
[0, 1, 0, 0],
[1, 1, 0, 0],
[0, 1, 0, 0]];

var G_shape_3 = [[0, 0, 0, 0],
[1, 1, 1, 0],
[0, 1, 0, 0],
[0, 0, 0, 0]];

var G_shape_4 = [[0, 0, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 1, 0, 0]];


// 在预告框随机产生一种形状的一种形式
function createNew() {
    var shapeType = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    setInterval(function () {
        var typeNum = Math.floor(Math.random() * 7 + 1);
        var T = shapeType[typeNum - 1];
        var shapeNum = Math.floor(Math.random() * 4 + 1);
        var TypeName = eval(T + '_shape_' + shapeNum);//把字符串转换成对象
        reFreshGame(nextDivs, TypeName);
        startDrop(TypeName);
    }, 1000)
}

function startDrop(TypeName) {

    // console.log(TypeName)
}




function Shape(){
    this.table = null;
    this.currentPoint = [-1,-1];
    this.table = [][];
}

Shape.prototype.init = function(){
    // 初始化数组
}


Shape.prototype.left = function(){

}
Shape.prototype.right = function(){
    
}
Shape.prototype.down = function(){
    
}



function Game(){
    this.score = 0;
    this.speed = 0;
    this.table = [][];
    this.timer = null;
    this.activeShape = null;
    this.callbacks = {};
}

Game.prototype.start = function(){
    this.timer = setInterval(function(){
        // 
        if(this.canMoveDown()){
            this.activeShape.down();
        }
        this.clearRow();
    }, this.speed)
}

Game.prototype.speedUp = function(){

}

Game.prototype.canMoveDown = function(){

}

Game.prototype.merge = function(){

}

Game.prototype.clearRow = function(){

}

Game.prototype.rotate = function(direction){
    var allow = this.activeShape.requestRotate(direction);
    if(allow){
        game.activeShape.rotate();
        this.emit('change');
    }
}

Game.prototype.stop = function(){

}

Game.prototype.resume = function(){
    
}

// Publish/Subscribe 模式
// 
Game.prototype.on = function(eventType, callback){
    if(!this.callbacks[eventType]){
        this.callbacks[eventType] = [];
    }

    this.callbacks[eventType].push(callback);
}

Game.prototype.emit = function(eventType){
    this.callbacks[eventType].forEach(function(callback) {
        callback({
            table: this.table
        })
    }, this);
}


function init(){
    var game = new Game();
    game.start();
    window.addEventListener('keypress', function(){
        var code // 当前的按键
        // 过滤
        // 判断能否旋转
        game.rotate();
        
    })
    addEventListener(/stop/, function(){
        game.stop();
    })


    game.on('change', function(event){
        var table = event.table;
        // clear current page
        // set new page
    });
}