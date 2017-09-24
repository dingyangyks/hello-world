function Game() {
    // 初始化游戏界面数组和预告界面数组
    this.nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    this.gameData = [
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ];

    // 保存div
    this.nextDivs = [];
    this.gameDivs = [];

    // 更新数组
    this.cur = {
        data: []
    }

    this.callbacks = {};
    // 执行初始化
    this.init();

    this.move = false;
}



Game.prototype = {
    init: function () {
        var me = this;
        me.initTable(me.nextData, 'nextBox', me.nextDivs);
        me.initTable(me.gameData, 'gameBox', me.gameDivs);

        me.receive();
        return me;
    },


    initTable: function (arr, id, divs) {
        // var me = this;
        var dom = document.getElementById(id);
        for (var i = 0; i < arr.length; i++) {
            var oDivs = [];
            for (var j = 0; j < arr[i].length; j++) {
                var newCode = document.createElement('div');
                newCode.classList.add('none');
                newCode.style.top = (i * 25) + 'px';
                newCode.style.left = (j * 25) + 'px';
                dom.appendChild(newCode);
                oDivs.push(newCode);
            }
            divs.push(oDivs);
        }
    },

    receive: function () {
        var me = this;
        // 随机产生一种类型 应该在上一个模块停止后产生随机数
        var typeNum = Math.floor(Math.random() * 7 + 1);
        var shapeNum = Math.floor(Math.random() * 4);
        // 产生随机方块
        var product = new Factory();
        //产生形状确定的方块
        me.cur = product.produce(typeNum);
        var curShape = me.cur;
        curShape.data = curShape.rotates[shapeNum];

        // me.setData();
        // me.emit('change',curShape.data);
    },

    down: function () {
        var me = this;
        var curShape = me.cur;
        
        if (me.checkVlaue (curShape.origin,curShape.data)) {
            me.clear();            
            curShape.canDown();
            me.setData();
        }
    },

    right: function () {
        var me = this;
        var curShape = me.cur;
        me.clear();
        curShape.right();
        me.setData();
    },

    left: function () {
        var me = this;
        var curShape = me.cur;
        me.clear();
        curShape.left();
        me.setData();
    },

    setData: function () {
        var me = this;
        var curShape = me.cur;
        for (var i = 0; i < curShape.data.length; i++) {
            for (var j = 0; j < curShape.data[0].length; j++) {
                if (me.check(curShape.origin,i,j)) {
                    me.gameData[curShape.origin.x + i][curShape.origin.y + j] = curShape.data[i][j];
                }
            }
        }
        me.emit('change', me.gameData);
    },

    // 清除上一次位置上的数据 
    clear: function () {
        var me = this;
        var curShape = me.cur;
        for (var i = 0; i < curShape.data.length; i++) {
            for (var j = 0; j < curShape.data[0].length; j++) {
                if (me.check(curShape.origin,i,j)) {
                    me.gameData[curShape.origin.x + i][curShape.origin.y + j] = 0;
                }
            }
        }
        me.emit('change', me.gameData);
    },

    // 检查原点是否超出了边界 在true时 并不回组织数组更新数据 
    check: function (pos, x, y) {
        var me = this;
        if (pos.x + x < 0) {//超出上边界
            // console.log('上')
            return false;
        } else if (pos.x + x >= me.gameData.length) { //超出下边界
            console.log('下')
            return false;
        } else if (pos.y + y < 0) { //超出左边界
            // console.log('左')
            return false;
        } else if (pos.y + y >= me.gameData[0].length) {
            // console.log('右')
            return false;
        } else if (me.gameData[pos.x + x][pos.y + y] === 2) {
            return false;
        }else {
            return true;
        }
    },

    // 检测值(方块)是否超出了边界
    checkVlaue:function (pos,data) {
        var me = this;
        console.log(data.length)
        for (var i = 0; i < data.length; i++){
            for (var j = 0; j < data[0].length; j++){
                if (data[i][j] !== 0 && !me.check(pos, i, j)) {
                    console.log(data[i][j])
                    return false;
                }
            }
        }
        return true;
    },

    on: function (eventType, callback) {
        if (!this.callbacks[eventType]) {
            this.callbacks[eventType] = [];
        }
        this.callbacks[eventType].push(callback);
    },

    emit: function (eventType, data) {
        this.callbacks[eventType] && this.callbacks[eventType].forEach(function (callback) {
            callback(data);
        }, this);
    }
}

