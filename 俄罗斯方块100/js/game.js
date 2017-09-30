function Game() {
    // 预告区域数组
    this.nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // 操作数组
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

    // 呈现结果数组
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

    // 游戏显示的方块  初始需要一个,然后下一个为nextData中的方块形状
    this.curData = [];

    // 观察者模式所需的callbacks
    this.callbacks = {};

    this.init();
}

Game.prototype = {
    //初始化
    init: function () {
        this.updateNext();
        this.firstShape();
        this.updataVaryData();
        this.updataGameData();
    },

    // 数组更改时,给操作dom的部分发出信息
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

    // 产生预告方块
    updateNext: function () {
        var me = this;
        me.newShape = new Factory();
        me.roateNum = Math.floor(Math.random() * 4);
        me.nextData = me.newShape.result.rotates[me.roateNum];
        me.emit('change', me.nextData);
    },

    // 初始状态游戏数组也需要一种方块
    firstShape: function () {
        var me = this;
        me.newShape = new Factory();
        me.roateNum = Math.floor(Math.random() * 4);
        me.curData = me.newShape.result.rotates[me.roateNum];
    },

    // 把curData的数据传给varyData
    updataVaryData: function () {
        var me = this;
        console.log(me.curData)
        for (var i = 0; i < me.curData.length; i++) {
            for (var j = 0; j < me.curData[0].length; j++) {
                me.varyData[i][j] = me.curData[i][j];
            }
        }
    },

    // 把varyData的数据传给gameData
    updataGameData:function () {
        var me = this;
        for (var i = 0; i < me.varyData.length; i++) {
            for (var j = 0; j < me.varyData[0].length; j++) {
                me.gameData[i][j] = me.varyData[i][j];
            }
        }
    },

    // 测试
    test:function(){
        var me = this;
        document.onclick =function () {
            me.curData = me.nextData;


            
        }
    }
}