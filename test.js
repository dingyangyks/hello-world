window.addEventListener('load', function(){
    var btn = document.getElementById('btn');
    btn.addEventListener('click', bindEvent);
});

var PLANE_WIDTH = 66;
var PLANE_HEIGHT = 80;
var BULLET_HEIGHT = 16;
var plane_x, plane_y;

function bindEvent(){
    var btn = document.getElementById('btn');
    btn.style.display = 'none';
    var content = document.getElementById('content');
    content.classList.add('run');

    var plane = document.getElementById('plane');
    content.addEventListener('touchmove', function (event) {
        plane_x = event.touches[0].clientX;
        plane_y = event.touches[0].clientY;
        plane.style.left = plane_x - (PLANE_WIDTH / 2) + 'px';
        plane.style.top = plane_y - (PLANE_HEIGHT / 2) + 'px';
        
        
    });
    // setInterval(shooting, 500);
    shooting();
}


function shooting(){
    var bullets = document.getElementById('bullets');
    var bullet = document.createElement('span');
    bullet.classList.add('bullet');
    var x = plane_x;
    var y = plane_y - (PLANE_HEIGHT / 2) - BULLET_HEIGHT;
    bullet.style.top = y + 'px';
    bullet.style.left = x + 'px';
    bullet.dataset['x'] = x;
    bullet.dataset['y'] = y;
    
    var bulletNodes = [].slice.call(bullets.querySelectorAll('.bullet'), 0);


    for(var i=0,len = bulletNodes.length;i<len;i++){
        var currentBullet = bulletNodes[i];
        var currentY = currentBullet.dataset['y'] - 25  + 'px';
        if(currentY < BULLET_HEIGHT){
            currentBullet.parentNode.removeChild(currentBullet);
        }
        currentBullet.style.top = currentBullet.dataset['y'] - 25  + 'px';
    }
    
    
    bullets.appendChild(bullet);



}



//     var container = document.getElementsByClassName('container')[0];

//     var btn = document.getElementById('btn');
//     var bgi = document.getElementById('bgi');
//     var oImg = document.getElementsByClassName('bging')[0];
//     var timer = null;


//     // 进入游戏
//     btn.addEventListener('click', function (event) {
//         var plane_box = document.getElementById('planeBox');
//         // 飞机
//         var my = document.getElementById('myPlane');
//         btn.style.display = 'none';
//         plane_box.style.display = 'block';

//         // 飞机的起始位置
//         my.style.left = event.clientX - container.offsetLeft - my.offsetWidth / 2 + 'px';
//         my.style.top = event.clientY - container.offsetTop - my.offsetHeight / 2 + 'px';
//         oImg.src = "img/background_1.png";
//         bgiRun(bgi);

//         // 子弹
//         var bullet = document.getElementsByClassName('bullet');
//         // 子弹的起始位置



//         // var bullets = new Array();
//         // bullets.push(NewBullet)
//         // console.log(NewBullet)
//         // console.log(bullets)


//         // my.style.left = event.clientX - container.offsetLeft - my.offsetWidth / 2 + 'px';
//         // my.style.top = event.clientY - container.offsetTop - my.offsetHeight / 2 + 'px';
//         var planeLeft = my.style.left;
//         var planeTop = my.style.top;

//         container.addEventListener('mousemove', function (event) {
//             clearInterval(timer);
//             // 飞机跟随移动
//             my.style.left = event.clientX - container.offsetLeft - my.offsetWidth / 2 + 'px';
//             my.style.top = event.clientY - container.offsetTop - my.offsetHeight / 2 + 'px';
//             planeLeft = my.style.left;
//             planeTop = my.style.top;
//             // 飞机移动范围
//             if (parseInt(planeTop) <= 0) {
//                 my.style.top = 0 + 'px';
//             } else if (parseInt(planeTop) >= 488) {
//                 my.style.top = 488 + 'px';
//             }
//             if (parseInt(planeLeft) <= -33) {
//                 my.style.left = -33 + 'px';
//             }

//             var bulletX, bulletY;
//             // 创建新的子弹
//             for (var i = 0; i < bullet.length; i++) {
//                 // 子弹的起始位置
//                 bullet[i].style.left = parseInt(planeLeft) + my.offsetWidth / 2 - bullet[i].offsetWidth / 2 + "px";
//                 bullet[i].style.top = parseInt(planeTop) - bullet[i].offsetHeight + "px";
//                 bulletX = bullet[i].style.left;
//                 bulletY = bullet[i].style.top;
//             }
//             var div = document.createElement('div');
//             div.className = "bullet";
//             timer = setInterval(function () {
//                 plane_box.appendChild(div);
//                 console.log(bullet.length);
//                 if (bullet.length >= 16) {
//                     console.log("safafa")
//                     plane_box.removeChild(bullet[i])
//                 }
//             }, 100)
//             function NewBullet(X, Y, div) {
//                 div.style.left = X;
//                 div.style.top = Y;
//                 setInterval(function () {
//                     div.style.top = parseInt(Y) - 50 + 'px';
//                 }, 30)
//             }
//             NewBullet(bulletX, bulletY, div);

//         })

//         // setInterval(function(){
//         //     bullet[0].style.top = bullet[0].offsetTop - 20 +'px';
//         // },300)
//         // 子弹飞
//         // setInterval(function () {
//         //     var div = document.createElement('div');
//         //     div.className = "bullet";
//         //     my.appendChild(div);

//         //     for(var i = 0; i < bullet.length; i++){
//         //         bullet[i].style.top = bullet[i].offsetTop - 5 +'px';
//         //         bullet[i+1].style.top = bullet[i+1].offsetTop - 20 +'px';
//         //     }
//         // }, 30)
//     })
// })

// // 背景滚动
// function bgiRun(obj) {
//     setInterval(function () {
//         if (parseInt(obj.style.top) >= 0) {
//             obj.style.top = -568 + 'px';
//         }
//         obj.style.top = obj.offsetTop + 5 + 'px';
//     }, 50)
// }

