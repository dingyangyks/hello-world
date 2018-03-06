function Factory () {
    // 随机产生的图形的结果,直接调用即可
    this.result = null;

    this.randomShape();
}

Factory.prototype = {
    // 随机生产任意一种图形的任意角度
    randomShape: function () {
        var num = Math.floor(Math.random() * 7 + 1);
        this.result = this.produce(num);
        // console.log(this.result)
    },

    // 产生多种的工厂类
    produce: function (index) {
        var result = null;
        switch (index) {
            case 1:
                result = new Shape_A()
                break;
            case 2:
                result = new Shape_B()
                break;
            case 3:
                result = new Shape_C()
                break;
            case 4:
                result = new Shape_D()
                break;
            case 5:
                result = new Shape_E()
                break;
            case 6:
                result = new Shape_F()
                break;
            case 7:
                result = new Shape_G()
                break;
            default:
                break;
        }
        return result;
    }
}