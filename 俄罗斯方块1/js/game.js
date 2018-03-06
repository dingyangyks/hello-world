function Game() {
    // 游戏数组 10*20 用来显示图形的数组
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 0, 0, 0]
    ];

    //变化的数组 10*20 用来收每次变化的数组
    this.varyData = [
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // 预告区域的数组 4*4 用来显示下一个出现的方块
    this.nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // 预告区域中接受到的数组,进行删除全为0的项,处理后的数组存在这
    this.moveData = [];

    //记录角度
    this.roateNum;

    // 现在的形状 用于旋转
    this.curShape = [];

    // 初始位置
    this.origin = {
        x: 0,
        y: 3
    }

    // 新形状对象
    this.newShape = {};

    this.callbacks = {};

    // 判断是否能下降
    this.canMove = true;

    // 判断边界条件所用的临时数组
    this.temp = [];

    // 有效宽度
    this.effectWid = 0;

    // 更新预告数组,在上一个方块定位后更新
    this.updateNext();
    this.checkPos();
    this.updateDisplay();
    // console.log(this.checkZero(this.nextData[0]));
}

Game.prototype = {
    // 更新预告数组
    updateNext: function () {
        var me = this;
        me.newShape = new Factory();
        me.roateNum = Math.floor(Math.random() * 4);
        me.nextData = me.newShape.result.rotates[me.roateNum];
        me.curShape = me.nextData
        me.emit('change', me.curShape);
    },

    // 更新变化数组
    updateVary: function () {
        var me = this;
        var x = me.origin.x;
        var y = me.origin.y;
        // 初始位置
        for (var i = 0; i < me.moveData.length; i++) {
            for (var j = 0; j < me.moveData[0].length; j++) {
                if (me.limitOrigin(me.varyData, i, j) && me.canMove) {
                    me.varyData[i + x][j + y] = me.moveData[i][j];
                }
            }
        }
    },

    // 更新显示数组
    updateDisplay: function () {
        var me = this;
        me.updateVary();
        for (var i = 0; i < me.gameData.length; i++) {
            for (var j = 0; j < me.gameData[0].length; j++) {
                if (me.gameData[i][j] === 0 && me.varyData[i][j] === 1) {
                    me.gameData[i][j] = 1;
                } else if (me.gameData[i][j] === 1 && me.varyData[i][j] === 0) {
                    me.gameData[i][j] = 0;
                } else if ((me.gameData[i][j] === 2 && me.varyData[i - 1][j] === 1)) {
                    me.fixed();
                    me.createNew();
                    me.canMove = false;
                }
            }
        }
    },

    // 检测初始位置,没置顶的把他置顶
    checkPos: function () {
        var me = this;
        for (var i = 0; i < me.curShape.length; i++) {
            if (!me.checkZero(me.curShape[i])) {
                // console.log("第" + i + "行不全为0")
                me.moveData.push(me.curShape[i]);
            }
        }

        // 计算movedata数组对应索引的和,得到temp数组
        for (var i = 0; i < me.moveData.length; i++) {
            for (var j = 0; j < me.moveData[0].length; j++) {
                if (me.temp[j] === undefined) {
                    me.temp[j] = 0;
                }
                me.temp[j] += me.moveData[i][j];
            }
        }
        // 计算出temp中不为0的个数,即为movedata的有效宽度
        var wid = [];
        me.temp.forEach(function (item, index, array) {
            if (item !== 0) {
                wid.push(item);
            }
        })
        me.effectWid = wid.length;
    },

    // 判断一个数组是否所有的项都为0
    checkZero: function (arr) {
        return arr.every(function (item, index, array) {
            return item === 0;
        })
    },

    // 观察者模式监控数据变化
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
    },

    // 移动部分逻辑
    // 限制原点移动范围
    limitOrigin: function (arr, i, j) {
        var me = this;
        if (me.origin.x + i >= arr.length) {
            return false;
        } else if (me.origin.y + j < 0 || me.origin.y + j >= arr[0].length) {
            return false;
        } else {
            return true;
        }
    },

    // 清楚上次方块的位置
    clear: function () {
        var me = this;
        var x = me.origin.x;
        var y = me.origin.y;
        for (var i = 0; i < me.moveData.length; i++) {
            for (var j = 0; j < me.moveData[0].length; j++) {
                if (me.limitOrigin(me.varyData, i, j)) {
                    me.varyData[i + x][j + y] = 0;
                }
            }
        }
    },

    left: function () {
        var me = this;
        if (me.canMove) {
            me.clear();
            me.origin.y -= 1;
            if (me.temp[0] === 0) {
                if (me.origin.y <= -1) {
                    me.origin.y = -1;
                }
            } else if (me.temp[0] !== 0) {
                if (me.origin.y <= 0) {
                    me.origin.y = 0;
                }
            }
            me.updateDisplay();
        }
    },

    right: function () {
        var me = this;
        if (me.canMove) {
            me.clear();
            if (me.temp[0] === 0) {
                if (me.origin.y < me.varyData[0].length - me.effectWid - 1) {
                    me.origin.y += 1;
                }
            } else if (me.temp[0] !== 0) {
                if (me.origin.y < me.varyData[0].length - me.effectWid) {
                    me.origin.y += 1;
                }
            }

            me.updateDisplay();
        }
    },

    down: function () {
        var me = this;
        if (me.canMove) {
            me.clear();
            me.origin.x += 1;
            if (me.origin.x === me.varyData.length - me.moveData.length + 1) {
                me.canMove = false;
                me.fixed();
                me.createNew();
            }
            me.updateDisplay();
        }
    },

    // 旋转
    rotate: function () {
        var me = this;
        if (me.canMove) {
            me.roateNum += 1;
            if (me.roateNum === 4) {
                me.roateNum = 0;
            }
            me.curShape = me.newShape.result.rotates[me.roateNum];
            me.clearAll(me.varyData);
            // console.log(me.varyData)//全0
            // console.log(me.curShape)//正确
            me.moveData = [];
            // console.log(me.moveData) //清空
            me.checkPos();
            // console.log(me.moveData)//正确
            // console.log(me.origin)
            me.updateDisplay();
            
        }
    },

    // 清空数组
    clearAll: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[0].length; j++) { 
                arr[i][j] = 0;
            }
        }
    },

    clearShape: function () {
        var me = this;
        for (var i = 0; i < me.gameData.length; i++) {
            for (var j = 0; j < me.gameData[0].length; j++) { 
                if (me.gameData[i][j] === 1) {
                    me.gameData[i][j] = 0;
                }
            }
        }
    },

    // 方块固定以后改变颜色
    fixed: function () {
        var me = this;
        for (var i = 0; i < me.gameData.length; i++) {
            for (var j = 0; j < me.gameData[0].length; j++) {
                if (me.gameData[i][j] === 1) {
                    me.gameData[i][j] = 2;
                }
            }
        }
    },

    // 产生新方块
    createNew:function () {
        var me = this;
        me.updateNext();
    },
}