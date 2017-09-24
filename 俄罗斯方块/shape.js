// 图形类
function Shape() {
    // // 等待存放新产生的数组
    // this.newData = [];

    // 设置原点
    this.origin = {
        x: 0,
        y: 0
    };
}

Shape.prototype = {
    canDown: function () {
        var test = {};
        this.origin.x += 1;
        // return checkVlaue(test,this)
    },
    canLeft: function () {
        if (this.origin.y > -1) {
            this.origin.y -= 1;
        }
    },
    canRight: function () {
        if (this.origin.y < 7) {
            this.origin.y += 1;
        }
    },
    canRoate:function () {

    }
}


  
   































