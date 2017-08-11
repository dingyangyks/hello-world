# 布局,样式
1. 布局使用百分数,以适应不同设备屏幕;想清楚层级关系在布局;
2. 简单的滚动效果,用动画`animation`写;
3. 两个类名的样式优先级高于一个类名的样式;
4. 需要蒙版时,把内容和蒙版放在一起,利用背景图片的`rgba`调整透明度,不要直接在样式里用`opacity`,调整样式,这样会子元素的透明度也会被调整;
5. 在父元素和子元素都不知道高度的情况下,用`transform: translate(-50%,-50%);`,进行位置调整和剧中;
6. 

# 习惯
1. 常数命名全部用大写字母表示;
2. 参数命名要结合代码的意思,并结合上下文把相似参数加以区别;
3. 颜色尽量使用十六进制表示;

# js
1. 把类数组对象转化为数组
2. 利用`dataset`添加自定义属性;
3. for循环的理解
4. `setInterval`的使用;
5. 用参数判断状态;(代码中的`startMark`)
6. 进行条件判断时要考虑仔细,写出所有情况;
7. 创建子弹的定时器和发射子弹的定时器如果频率相同,则看不出有发射的效果;
8. 面向对象程序设计;
9. 暂停计时器,重开计时器
10. 重复定时器,回调函数

*****************************************
# Array like
##. 什么是类数组ArrayLike?
    * 拥有length属性， 
    * 不具有数组所具有的方法
javascript中常见的类数组有`arguments`对象和`DOM`方法的返回结果。

## 2. 类数组转换成数组之后进行操作有什么优势?  
   由于类数组不具有数组所具有的操作数组的方法，讲类数组转换为数组之后就能调用如`shift`,`unshift`,`splice`,`slice`,`concat`,`reverse`,`sort`等这些强大的方法，方便快捷。

## 3. 类数组转化为数组:

### 方法一: `Array.prototype.slice.call(arrayLike)`
首先`Array.prototype.slice.call(arrayLike)`的结果是将`arrayLike`对象转换成一个`Array`对象。所以其后面可以直接调用数组具有的方法。

`slice()`方法可从已有的数组中返回选定的元素。是数组原型对象上的方法;***该方法并不会修改数组，而是返回一个子数组。***如果想删除数组中的一段元素，应该使用方法 `Array.splice()`;

`call()`方法主要作用为传递参数和扩充作用域,。
`Array.prototype.slice.call(arrayLike,0)`这句话就可以理解为:对于`arraylike`对象,调用`call()`方法,把`Array.prototype.slice()`方法的作用域限定在`arraylike`,然后在`arraylike`调用数组原型上的`slice()`方法,返回一个新的数组,0代表从第一个元素开始返回;
```js
var enemy_planesNodes = [].slice.call(enemy_planes.querySelectorAll('.className'), 0);
```
上述代码意思是把`enemy_planes`对相信类名为`className`的元素对象组,转化为名为`enemy_planesNodes`的数组对象.

## 方法二:便利类数组对象,把每一项放入数组中

*******************************************************************
# `dataset`自定义属性

data属性基本上所有的浏览器都是支持的，但是dataset对象就属于新贵，目前仅在Opera 11.1+， Chrome 9+下可以通过JavaScript，使用dataset访问你自定义的data属性。使用dataset操作data 要比使用getAttribute稍微慢些,但是，如果我们只是处理少量的data数据，这种速度上差异造成的影响是基本上没有的。反而，我们应该看到，使用dataset操作自适应属性要比其他类似getAttribute的形式要少很多让人头疼的麻烦，并且更具有可读性。因此，权衡来看，操作自定义属性，dataset操作是上选。  
假设我们要获得多个自定义的属性值，得，折腾的事情就来了，我们可能要采用类似下面的N行代码实现了：
```js
var attrs = expenseday2.attributes,
expense = {}, i, j;  
for (i = 0, j = attrs.length; i < j; i++) {
  if(attrs[i].name.substring(0, 5) == 'data-') {
    expense[attrs[i].name.substring(5)] = attrs[i].value;
  }
}
```

而使用dataset属性，我们根本不需要任何循环去获取你想要的那个值：

```js
expense = document.getElementById('day2-meal-expense').dataset;
```

****************************************
# for循环的理解
对于代码:目的是为了让一系列的子弹按照一定的速度运动
```js
flyTimer = setInterval(function () {
    for (var i = 0; i < plane.length; i++) {
        var current_plane = plane[i];
        var plane_Y = parseInt(current_plane.dataset.plane_Y);//第一次存下初始值 current_plane.dataset.plane_Y这个参数用于存值 
        var speed = parseInt(current_plane.dataset.speed);//取得speed的值
        var newPlaneY = plane_Y + speed;//进行计算   
        current_plane.dataset.plane_Y = newPlaneY;//新值
        current_plane.style.top = newPlaneY + 'px';//把新值赋给top
    }

}, 50)
```
这一段代码思想:给元素设置一个自定义属性`plane_Y`,和元素的`top`值关联,(通过`current_plane.dataset.plane_Y`取得),作用是用于计算和存储计算后的值;把计算后的值赋给`top`,就可以改变元素的高度.再把计算后的值赋给自定义属性,就完成了一次循环,如下表:
设`top`初始值为100,speed为10

|         | dataset.plane_Y | style.top | newPlaneY  |style.top(new) |
| ------- |:---------------:| ---------:|:----------:| -------------:|
|  第一次  |      100        |    100    |     90     |      90       |
|  第一次  |      90         |     90    |     80     |      80       |
|  第一次  |      80         |     80    |     70     |      70       |
**********************************************************************

#`setInterval`的使用;
在飞机加速的过程中使用了回调函数




