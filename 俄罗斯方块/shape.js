// 图形类
function Shape() {
    // 等待存放新产生的数组
    this.newData = [];

    // 设置原点
    this.origin = {
        x: 0,
        y: 0
    };
}

Shape.prototype = {
    down: function () {
        this.origin.x += 1;
    },
    left: function () {

    },
    right: function () {

    },
    roate:function () {

    }
}


  
   































