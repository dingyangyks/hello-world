# Javascript定时器中的this指向  
使用js中的定时器（setInterval，setTimeout），很容易会遇到this指向的问题。  
例子1:
```js
var name = 'my name is window';
var obj = {
    name: 'my name is obj',
    fn: function () {
        var timer = null;
        clearInterval(timer);
        timer = setInterval(function () {
            console.log(this.name);  //my name is window
        }, 1000)
    }
}
```

例子2:
```js
$('#input_text').on('input', function () {
    timer && clearTimeout(timer);
    var _this = this;//input
    timer = setTimeout(function () {
        var suggestList = $('#search_suggest');
        console.log(this);//window
        console.log(_this);//input
        suggestList.show();
        !$(_this).val() && suggestList.hide();
        originText = $(_this).val();
        search();
    }, 500);
});
```
***如果没有特殊指向，setInterval和setTimeout的回调函数中this的指向都是window。这是因为JS的定时器方法是定义在window下的。*** 但是平时很多场景下，都需要修改this的指向。这里总结了几种：

1. 最常用的方法：在外部函数中将this存为一个变量，回调函数中使用该变量，而不是直接使用this。(创建闭包):
```js
var name = 'my name is window';
var obj = {
    name: 'my name is obj',
    fn: function () {
        var that = this;
        var timer = null;
        clearInterval(timer);
        timer = setInterval(function () {
            console.log(that.name);   //my name is obj
        }, 1000)
    }
}
```

2. 使用bind()方法（bind()为ES5的标准，低版本IE下有兼容问题，可以引入es5-shim.js解决）  
bind()的作用类似call和apply，都是修改this指向。***但是call和apply是修改this指向后函数会立即执行，而bind则是返回一个新的函数，在全局中也会在指定作用域下执行*** 它会创建一个与原来函数主体相同的新函数，新函数中的this指向传入的对象。  
在这里为什么不能用call和apply，是因为call和apply不是返回函数，而是立即执行函数，那么，就失去了定时器的作用。
```js
var name = 'my name is window';
var obj = {
    name: 'my name is obj',
    fn: function () {
        var timer = null;
        clearInterval(timer);
        timer = setInterval(function () {
            console.log(this.name);   //my name is obj
        }.bind(this), 1000)
    }
}
```

3、使用es6的箭头函数：箭头函数的最大作用就是this指向。

```js
var name = 'my name is window';
var obj = {
    name: 'my name is obj',
    fn: function () {
        var timer = null;
        clearInterval(timer);
        timer = setInterval(() => {
            console.log(this.name);  //my name is obj
        }, 1000)
    }
}
```
箭头函数没有自己的this，它的this继承自外部函数的作用域。所以，在该例中，定时器回调函数中的this，是继承了fn的this。当然箭头函数也有兼容问题，要是兼容低版本ie，需要使用babel编译，并且引入es5-shim.js才可以。

转自 [Javascript定时器中的this指向  ](http://www.cnblogs.com/443855539-wind/p/6480673.html)