//获取css属性
function getStyle(obj, attr) {//形参中字符串不能写冒号
    return getComputedStyle(obj, false)[attr];//兼容于非IE浏览器
}

//运动框架
function MoveFrame(obj, attr, iTarget, speed, times) {
    clearInterval(obj.timer)
    //添加自定义属性timer不需要声明
    obj.timer = setInterval(function () {
        //改变透明度时  在获取是需要判断
        var iStyle;
        if (attr == "opacity") {
            iStyle = parseFloat(getStyle(obj, attr)) * 100;//透明度为小数，所有用parseFloat，转化为三位数以便计算
        } else {
            iStyle = parseInt(getStyle(obj, attr))//把获取的属性存储在参数中
        }

        var ispeed = (iTarget - iStyle) / speed;//速度定义一定要在定时器里，因为速度是根据变化的属性确定的

        ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);//对速度结果进行处理，用来解决不能到达准确位置的问题

        if (iStyle == iTarget) {
            clearInterval(obj.timer);
        } else {
            //因为透明度没有px单位所以在计算后也要进行一次判断
            if (attr == "opacity") {
                obj.style[attr] = (iStyle + ispeed) / 100//除以100以让透明度回到正确的小数;
            } else {
                obj.style[attr] = iStyle + ispeed + "px";
            }
        }

    }, times);
}