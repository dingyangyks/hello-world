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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

    // 初始位置
    this.origin = {
        x: 0,
        y: 3
    }

    this.callbacks = {};

    // 判断是否能下降
    this.canMove = true;

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
        var newShape = new Factory();
        me.nextData = newShape.result;//接收到生产出来的方块
        me.emit('change', me.nextData);
    },

    // 更新变化数组
    updateVary: function () {
        var me = this;
        var x = me.origin.x;
        var y = me.origin.y;
        // 初始位置
        for (var i = 0; i < me.moveData.length; i++) {
            for (var j = 0; j < me.moveData[0].length; j++) {
                if (me.limitOrigin(me.varyData, i, j)) {
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
                    me.canMove = false;
                    me.fixed();
                }
            }
        }
    },

    // 检测初始位置,没置顶的把他置顶
    checkPos: function () {
        var me = this;
        for (var i = 0; i < me.nextData.length; i++) {
            if (!me.checkZero(me.nextData[i])) {
                console.log("第" + i + "行不全为0")
                me.moveData.push(me.nextData[i]);
            }
        }

        // 计算movedata数组对应索引的和,得到temp数组
        var temp = [];
        for (var i = 0; i < me.moveData.length; i++) {
            for (var j = 0; j < me.moveData[0].length; j++) {
                if (temp[j] === undefined) {
                    temp[j] = 0;
                }
                temp[j] += me.moveData[i][j];
            }
        }
        // 计算出temp中不为0的个数,即为movedata的有效宽度
        var wid = [];
        temp.forEach(function(item,index,array) {
            if(item !== 0) {
                wid.push(item);
            }
        })
        me.effectWid = wid.length;

        
        // console.log(me.effectWid)
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

    // 限制方块的移动范围
    checkShape: function () {

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
        if (this.canMove) {
            this.clear();
            this.origin.y -= 1;
            if (this.origin.y <= 0) {
                this.origin.y = 0;
            }
            this.updateDisplay();
        }
    },

    right: function () {
        if (this.canMove) {
            this.clear();
            console.log(this.varyData[0].length - this.effectWid - 1)
            if (this.origin.y < this.varyData[0].length - this.effectWid - 1 ) {
                this.origin.y += 1;
            }
            this.updateDisplay();
        }
    },

    down: function () {
        if (this.canMove) {
            this.clear();
            this.origin.x += 1;
            if (this.origin.x === this.varyData.length - this.moveData.length + 1) {
                this.canMove = false;
                this.fixed();
            }
            this.updateDisplay();
        }
    },

    // 旋转
    rotate: function () {

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
}

