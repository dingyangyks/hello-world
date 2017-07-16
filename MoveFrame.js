//获取css属性
function getStyle(obj, attr) {//形参中字符串不能写冒号
    return getComputedStyle(obj, false)[attr];//兼容于非IE浏览器
}

//运动框架
function MoveFrame(obj, json, speed, times, fn) {
    clearInterval(obj.timer)
    //添加自定义属性timer不需要声明
    obj.timer = setInterval(function () {
        var bStop = true;//用来判断每项运动是否到达位置
        for (var attr in json) {//利用json的数据特性，解决了不能同时进行多个运动的问题
            //改变透明度时  在获取是需要判断
            var iStyle;
            if (attr == "opacity") {
                iStyle = parseFloat(getStyle(obj, attr)) * 100;//透明度为小数，所有用parseFloat，转化为三位数以便计算
            } else {
                iStyle = parseInt(getStyle(obj, attr))//把获取的属性存储在参数中
            }

            var ispeed = (json[attr] - iStyle) / speed;//速度定义一定要在定时器里，因为速度是根据变化的属性确定的

            ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);//对速度结果进行处理，用来解决不能到达准确位置的问题

            //检测停止
            if (iStyle !== json[attr]) {//如果有一个没达到则赋值为false
                bStop = false;
            }

            //因为透明度没有px单位所以在计算后也要进行一次判断
            if (attr == "opacity") {
                obj.style[attr] = (iStyle + ispeed) / 100//除以100以让透明度回到正确的小数;
            } else {
                obj.style[attr] = iStyle + ispeed + "px";
            }
        }

        //检测停止，如果循环结束 bstop的值为true，则停止，关闭定时器，进行下步运动
        //这样就解决了如果两个运动相差较大，一个运动结束后另一个还没完成却停止运动的问题
        if (bStop) {
            clearInterval(obj.timer);
            if (fn) {//链式运动 
                fn();
            }
        }

    }, times);
}
//该框架用于：
//1.匀速运动，只要将speed设置为1即为匀速运动，
//2.缓冲运动，降speed设置为不是1的数
//3.可进行链式运动，传入fn即可
//4.可同时进行多个运动，在json中传入，例如{width：'300'}，注意传入像素时不要加px
//5.可以进行淡入淡出运动，注意opacity是小数，但是在这里传入时需要乘以100，例如想要opacity变化到0.3，需要在json中传入{opacity：'30'}

