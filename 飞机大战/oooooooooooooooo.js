window.addEventListener('load', function () {
    var start_btn = document.getElementById('btn');
    start_btn.addEventListener('click', start_work);
    var clcikContent = document.getElementById('content');
    clcikContent.addEventListener('click', function () {
        if (!startMark) {
            return;
        }
        var wrap = document.getElementById('wrap')
        wrap.style.display = 'block';
        clearInterval(plane_Time);
        clearInterval(bulletTimer);
    })

    // 重新游戏
    var restartBtn = document.getElementById('restart');
    var restartBtn1 = document.getElementById('restart1');
    restartBtn1.addEventListener('click', restartFun);
})

// 本飞机尺寸
var PLANE_WIDTH = 66;
var PLANE_HEIGHT = 80;
// 设备的高和宽
var screen_width = window.screen.width;
var screen_height = window.screen.height;
var plane_x = screen_width / 2;
var plane_y = screen_height * 0.85;
// 子弹尺寸
var BULLET_WIDTH = 4;
var BULLET_HEIGHT = 16;
// 小飞机尺寸
var SMALL_PLANE_WIDTH = 34;
var SMALL_PLANE_HEIGHT = 24;
// 中飞机尺寸
var MIDDLE_PLANE_WIDTH = 46;
var MIDDLE_PLANE_HEIGHT = 60;
// 大飞机尺寸
var LARGE_PLANE_WIDTH = 110;
var LARGE_PLANE_HEIGHT = 164;

var startMark = false;

var plane_Time = null;
var bulletTimer = null;

var score = 0;



function start_work() {
    // 隐藏按钮
    var start_btn = document.getElementById('btn');
    start_btn.style.display = 'none';
    // 更换背景并滚动
    var content = document.getElementById('content');
    content.classList.add('run');
    // 移动飞机
    var plane = document.getElementById('plane');
    plane.style.left = plane_x - (PLANE_WIDTH / 2) + 'px';
    plane.style.top = plane_y - (PLANE_HEIGHT / 2) + 'px';
    plane.addEventListener('touchmove', move_plane);

    var scoreMark = document.getElementById('score');
    scoreMark.style.display = 'block';

    // 发射子弹
    shootingTime = setInterval(shooting, 200);

    // 显示敌机
    var enemy_planes = document.getElementById('enemy_planes');
    enemy_planes.style.display = 'block';
    // makePlanesTime = setInterval(make_planes, 1000);
    make_planes();
    startMark = true;
}



function move_plane(event) {
    // 触点的位置
    plane_x = event.touches[0].clientX;
    plane_y = event.touches[0].clientY;
    // 飞机的位置
    plane.style.left = plane_x - (PLANE_WIDTH / 2) + 'px';
    plane.style.top = plane_y - (PLANE_HEIGHT / 2) + 'px';
    // 移动范围
    if (parseInt(plane.style.left) <= -(PLANE_WIDTH / 2)) {
        plane.style.left = -(PLANE_WIDTH / 2) + 'px';
    } else if (parseInt(plane.style.left) >= screen_width - (PLANE_WIDTH / 2)) {
        plane.style.left = screen_width - (PLANE_WIDTH / 2) + 'px';
    }
    if (parseInt(plane.style.top) <= 0) {
        plane.style.top = 0;
    } else if (parseInt(plane.style.top) >= screen_height - PLANE_HEIGHT) {
        plane.style.top = screen_height - PLANE_HEIGHT + 'px';
    }

}

function shooting() {
    var bullets = document.getElementById('bullets');
    var bullet = document.createElement('span');
    bullet.classList.add('bullet');
    // 设置子弹的位置
    var bullet_X = plane_x - BULLET_WIDTH / 2 + 1;
    var bullet_Y = plane_y - PLANE_HEIGHT / 2 - BULLET_HEIGHT;
    bullet.style.left = bullet_X + 'px';
    bullet.style.top = bullet_Y + 'px';
    // bullet.dataset['bullet_X'] = bullet_X;
    // bullet.dataset['bullet_Y'] = bullet_Y;
    // 触电位置plane_x,plane_y有初始值，但是在飞机移动的时候会发生改变

    
    var bulletNodes = [].slice.call(bullets.querySelectorAll('.bullet'), 0);

    for (var i = 0; i < bulletNodes.length; i++) {
        var current_bullet = bulletNodes[i];
        var current_Y = bullet_Y;
    }

    bulletTimer = setInterval(function () {
        current_bullet.style.top = current_Y - 30 + 'px';
        current_Y = parseInt(current_bullet.style.top);
    }, 50)
    overBorder('enemy_plane1');
    judge('enemy_plane1', SMALL_PLANE_WIDTH, SMALL_PLANE_HEIGHT);
    overBorder('enemy_plane2');
    judge('enemy_plane2', MIDDLE_PLANE_WIDTH, MIDDLE_PLANE_HEIGHT);
    overBorder('enemy_plane3');
    judge('enemy_plane3', LARGE_PLANE_WIDTH, LARGE_PLANE_HEIGHT);
}

// makePlane(className,planeHeight,planeWidth)
function makePlane(className, planeWidth, planeHeight) {
    var enemy_planes = document.getElementById('enemy_planes');
    var new_enemyPlane = document.createElement('span');
    new_enemyPlane.classList.add(className);
    var PlaneY = -planeHeight;// -SMALL_PLANE_Y
    var PlaneX = Math.floor(Math.random() * (screen_width - planeWidth));
    new_enemyPlane.style.top = PlaneY + 'px';// - planeHeight 
    new_enemyPlane.style.left = PlaneX + 'px';

    enemy_planes.appendChild(new_enemyPlane);

    var hitTime = 0;
    new_enemyPlane.dataset['hitTime'] = 0;

    var enemy_planesNodes = [].slice.call(enemy_planes.querySelectorAll('.className'), 0);

    var speed;

    // for (var i = 0; i < enemy_planesNodes.length; i++) {
    //     var current_S_plane = enemy_planesNodes[i];
    //     var current_S_planeTop = enemyPlane.style.top;

    if (new_enemyPlane.classList.contains('enemy_plane1')) {
        speed = 5;
        new_enemyPlane .dataset['speed'] = 5;
    } else if (new_enemyPlane.classList.contains('enemy_plane2')) {
        speed = 3;
        new_enemyPlane .dataset['speed'] = 3;

    } else if (new_enemyPlane.classList.contains('enemy_plane3')) {
        speed = 1;
        new_enemyPlane .dataset['speed'] = 1;

    }
    
    // }

     
    planetimer();
}

function planetimer() {
    plane_Time = setInterval(function () {
        var enemy_planes = document.getElementById('enemy_planes');
        var planes = enemy_planes.getElementsByTagName('span');
        for(var i = 0; i < planes.length; i++){
            var planeTime = planes[i];
            var planeY = parseInt(planeTime.style.top);
            var trueSpeed = parseInt(planes[i].dataset.speed);
            
            planeTime.style.top = planeY + trueSpeed + 'px';
            planeY = parseInt(planeTime.style.top);
            console.log(planeY)
        }
    }, 50)
}

function make_planes() {
    var num = Math.random();
    if (num > 0.4) {
        makePlane('enemy_plane1', SMALL_PLANE_WIDTH, SMALL_PLANE_HEIGHT);
    }
    else if (num > 0.05 && num <= 0.4) {
        makePlane('enemy_plane2', MIDDLE_PLANE_WIDTH, MIDDLE_PLANE_HEIGHT);
    }
    else if (num <= 0.05) {
        makePlane('enemy_plane3', LARGE_PLANE_WIDTH, LARGE_PLANE_HEIGHT);
    }
}

function overBorder(className) {
    var currentBullets = document.getElementsByClassName('bullet');
    var currentPlane = document.getElementsByClassName(className);
    for (var i = 0; i < currentBullets.length; i++) {
        if (parseInt(currentBullets[i].style.top) < -BULLET_HEIGHT) {
            var old_bullet = currentBullets[i].parentNode.removeChild(currentBullets[i]);
            old_bullet = null;
        }
    }
    for (var i = 0; i < currentPlane.length; i++) {
        if (parseInt(currentPlane[i].style.top) > screen_height) {
            console.log("safasfasf");
            var old_plane = currentPlane[i].parentNode.removeChild(currentPlane[i]);
            old_plane = null;
        }
    }
}

// judge(className)
function judge(className, planeWidth, planeHeight) {
    var currentBullets = document.getElementsByClassName('bullet');
    var currentPlane = document.getElementsByClassName(className);

    var myPlane = document.getElementById('plane');
    var myPlaneHead = parseInt(myPlane.style.top);
    var myPlaneLeft = parseInt(myPlane.style.left);
    var myPlaneTail = parseInt(myPlane.style.top) + PLANE_HEIGHT;

    for (var i = 0; i < currentBullets.length; i++) {
        var disappearBullet = currentBullets[i]
        var bulletHead = parseInt(disappearBullet.style.top);
        var bulletLeft = parseInt(disappearBullet.style.left);
        for (var j = 0; j < currentPlane.length; j++) {
            var disappearPlane = currentPlane[j];
            var planeHead = parseInt(disappearPlane.style.top) + planeHeight;
            var planeTail = parseInt(disappearPlane.style.top);
            var planeLeft = parseInt(disappearPlane.style.left);

            if (planeHead >= bulletHead && bulletLeft < planeLeft + planeWidth && bulletLeft > planeLeft - BULLET_WIDTH && planeHead < myPlaneHead) {
                var hitTimes = disappearPlane.dataset.hitTime;
                if (disappearBullet.parentNode != null) {
                    var old_bullet = disappearBullet.parentNode.removeChild(disappearBullet);
                    old_bullet = null;
                    disappearPlane.dataset.hitTime++;
                }
                // removeBullet();
                if (hitTimes >= 1 && disappearPlane.classList.contains('enemy_plane1')) {
                    planeBoomFunction(disappearPlane);
                } else if (hitTimes >= 4 && disappearPlane.classList.contains('enemy_plane2')) {
                    planeBoomFunction(disappearPlane);
                } else if (hitTimes >= 8 && disappearPlane.classList.contains('enemy_plane3')) {
                    planeBoomFunction(disappearPlane);
                }
            }
            if (myPlaneHead <= planeHead && myPlaneLeft < planeLeft + planeWidth && myPlaneLeft + PLANE_WIDTH > planeLeft && myPlaneTail > planeTail) {
                myPlane.innerHTML = "<img src='img/myself_boom.gif'>";
                var gameOver = document.getElementById('gameOver');
                var endScore = document.getElementById('endScore');
                endScore.innerHTML = '分数：' + score;
                gameOver.style.display = 'block';

            }
        }
    }
}

function planeBoomFunction(obj, className) {
    if (obj.classList.contains('enemy_plane1')) {
        obj.style.backgroundImage = 'url(img/plane1_boom.gif)';
        removePlane(obj);
    }
    else if (obj.classList.contains('enemy_plane2')) {
        obj.style.backgroundImage = 'url(img/plane2_boom.gif)';
        removePlane(obj);
    } else if (obj.classList.contains('enemy_plane3')) {
        obj.style.backgroundImage = 'url(img/plane3_boom.gif)';
        removePlane(obj);
    }
}


function removePlane(obj) {
    // 这个定时器是为了让爆炸动画放完在移除
    setInterval(function () {
        if (obj.parentNode != null) {
            var oldSmallPlane = obj.parentNode.removeChild(obj);
            if (oldSmallPlane.classList.contains('enemy_plane1')) {
                score += 100;
            }
            if (oldSmallPlane.classList.contains('enemy_plane2')) {
                score += 300;
            }
            if (oldSmallPlane.classList.contains('enemy_plane3')) {
                score += 500;
            }
            var scoreMark = document.getElementById('score');
            scoreMark.style.display = 'block';
            scoreMark.innerHTML = '分数：' + score;
            oldSmallPlane = null;
        }
    }, 200)
}

function restartFun() {
    var start_btn = document.getElementById('btn');
    start_btn.style.display = 'block';
    var content = document.getElementById('content');
    content.classList.remove('run');

    var enemy_planes = document.getElementById('enemy_planes');
    var planes = enemy_planes.getElementsByTagName('span');

    var gameOver = document.getElementById('gameOver');
    gameOver.style.display = 'none';

    for (var i = 0; i < planes.length; i++) {
        enemy_planes.removeChild(planes[i]);
    }
}





















  // if (new_enemyPlane.classList.contains('enemy_plane1')) {
    //     plane1Time = setInterval(function () {
    //         new_enemyPlane.style.top = PlaneY + 5 + 'px';
    //         PlaneY = parseInt(new_enemyPlane.style.top);//最新的Y值
    //         // 自定义记录top值的属性
    //         var pauseY = new_enemyPlane.style.top;
    //         new_enemyPlane.dataset['pauseY'] = new_enemyPlane.style.top;
    //         // console.log(new_enemyPlane.style.top+","+new_enemyPlane.dataset['pauseY'])
    //         overBorder('enemy_plane1');
    //         judge('enemy_plane1', SMALL_PLANE_WIDTH, SMALL_PLANE_HEIGHT);
    //     }, 50);
    // } else if (new_enemyPlane.classList.contains('enemy_plane2')) {
    //     plane2Time = setInterval(function () {
    //         new_enemyPlane.style.top = PlaneY + 3 + 'px';
    //         PlaneY = parseInt(new_enemyPlane.style.top);
    //         // 自定义记录top值的属性
    //         var pauseY = new_enemyPlane.style.top;
    //         new_enemyPlane.dataset['pauseY'] = new_enemyPlane.style.top;
    //         overBorder('enemy_plane2');
    //         judge('enemy_plane2', MIDDLE_PLANE_WIDTH, MIDDLE_PLANE_HEIGHT);
    //     }, 50)
    // } else if (new_enemyPlane.classList.contains('enemy_plane3')) {
    //     plane3Time = setInterval(function () {
    //         new_enemyPlane.style.top = PlaneY + 1 + 'px';
    //         PlaneY = parseInt(new_enemyPlane.style.top);
    //         // 自定义记录top值的属性
    //         var pauseY = new_enemyPlane.style.top;
    //         new_enemyPlane.dataset['pauseY'] = new_enemyPlane.style.top;
    //         overBorder('enemy_plane3');
    //         judge('enemy_plane3', LARGE_PLANE_WIDTH, LARGE_PLANE_HEIGHT);
    //     }, 50)
    // }






// function boomMyself() {
//     var myPlane = document.getElementById('plane');
//     var myPlaneHead = myPlane.style.top;
//     // console.log(myPlaneHead);
//     var enemy_planes = document.getElementById('enemy_planes');
//     var planes = enemy_planes.getElementsByTagName('span');
//     for(var i = 0; i < planes.length; i++){
//         var enemyPlaneHead = planes[i].style.top;
//     }
// }


// function pause(){
//     var enemy_planes = document.getElementById('enemy_planes');
//     var planes = enemy_planes.getElementsByTagName('span');
//     alert('asfa')
// }

// function planeSpeed(className, planeHeight) {
//     var enemyPlane = document.getElementsByClassName(className);
//     var PlaneY = -planeHeight;
//     var speedTimwer = null;
//     for (var i = 0; i < enemyPlane.length; i++) {
//         var SpeedEnemyPlane = enemyPlane[i];
//         if (SpeedEnemyPlane.classList.contains('enemy_plane1')) {
//             speedTimwer = setInterval(function () {
//                 SpeedEnemyPlane.style.top = PlaneY + 2 + 'px';
//                 PlaneY = parseInt(SpeedEnemyPlane.style.top);
//                 overBorder('enemy_plane1');
//                 judge('enemy_plane1', SMALL_PLANE_WIDTH, SMALL_PLANE_HEIGHT);
//                 clearInterval(speedTimwer);
//             }, 50)
//         }
//     }
// }

// setInterval(function () {
//     new_enemyPlane.style.top = PlaneY + 2 + 'px';
//     PlaneY = parseInt(new_enemyPlane.style.top);
//     // 判断飞机是否被击中 或者飞出屏幕
//     overBorder('enemy_plane1');
//     overBorder('enemy_plane2');
//     overBorder('enemy_plane3');
//     judge('enemy_plane1', SMALL_PLANE_WIDTH, SMALL_PLANE_HEIGHT);
//     judge('enemy_plane2', MIDDLE_PLANE_WIDTH, MIDDLE_PLANE_HEIGHT);
//     judge('enemy_plane3', LARGE_PLANE_WIDTH, LARGE_PLANE_HEIGHT);
// }, 50)
// planeBoomFunction(disappearPlane);
// planeBoomFunction(disappearPlane);
// planeBoomFunction(disappearPlane);

// function removeBullet() {
//     var currentPlane = document.getElementsByClassName('span');
//     for (var i = 0; i < currentPlane.length; i++) {
//         var disappearPlane = currentPlane[i];
//         var hitTimes = disappearPlane.dataset.hitTime;
//         console.log(hitTimes)
//         if (disappearPlane.parentNode != null) {
//             var old_bullet = disappearPlane.parentNode.removeChild(disappearPlane);
//             old_bullet = null;
//             disappearPlane.dataset.hitTime++;
//         }
//         console.log(hitTimes);
//         if (hitTimes >= 1 && disappearPlane.classList.contains('enemy_plane1')) {
//             planeBoomFunction(disappearPlane);

//         } else if (hitTimes >= 4 && disappearPlane.classList.contains('enemy_plane2')) {
//             planeBoomFunction(disappearPlane);
//             console.log(hitTimes);
//         } else if (hitTimes >= 8 && disappearPlane.classList.contains('enemy_plane3')) {
//             planeBoomFunction(disappearPlane);
//             console.log(hitTimes);
//         }
//     }
// }


// planeBoomFunction()

// var plane1Time = null;
//         plane1Time = setTimeout(function () {
//             if (obj.parentNode != null) {
//                 var oldSmallPlane = obj.parentNode.removeChild(obj);
//                 oldSmallPlane = null;
//                 clearTimeout(plane1Time);
//             }
//         }, 200)
// if (disappearBullet.parentNode != null) {
//     var old_bullet = disappearBullet.parentNode.removeChild(disappearBullet);
//     old_bullet = null;
//     life++;
//     console.log(life);
// }
// function killLife(bj,){
//     var plane1Time = null;
//     plane1Time = setTimeout(function () {
//         var life = 0;
//         if (obj.parentNode != null) {
//             var oldSmallPlane = obj.parentNode.removeChild(obj);
//             life
//             oldSmallPlane = null;
//             clearTimeout(plane1Time);
//         }
//     }, 200)
// }


// function judge() {
//     var currentBullets = document.getElementsByClassName('bullet');
//     var currentPlane1 = document.getElementsByClassName('enemy_plane1');
//     // console.log(currentPlane[0].style.top);
//     for (var i = 0; i < currentBullets.length; i++) {
//         var disappearBullet_1 = currentBullets[i]
//         var S_bulletHead = parseInt(disappearBullet_1.style.top);
//         var S_bulletLeft = parseInt(disappearBullet_1.style.left);
//         for (var j = 0; j < currentPlane1.length; j++) {
//             var disappearPlane_1 = currentPlane1[j];
//             var S_planeHead = parseInt(disappearPlane_1.style.top) + SMALL_PLANE_HEIGHT;
//             var S_planeLeft = parseInt(disappearPlane_1.style.left);
//             // console.log(parseInt(disappearPlane_1.style.top))
//             // console.log(screen_height)
//             if (S_planeHead >= S_bulletHead && S_bulletLeft < S_planeLeft + SMALL_PLANE_WIDTH && S_bulletLeft > S_planeLeft - BULLET_WIDTH) {
//                 plane1BoomFunction(disappearPlane_1);
//                 if (disappearBullet_1.parentNode != null) {
//                     var old_bullet = disappearBullet_1.parentNode.removeChild(disappearBullet_1);
//                     old_bullet = null;
//                 }
//             }
//         }
//     }
// }


// function removeBullet(obj2) {
//     if (parseInt(obj2.style.top) < -BULLET_HEIGHT) {
//         var old_bullet = obj2.parentNode.removeChild(obj2);
//         old_bullet = null;
//     }
// }

// function removePlane(obj1){
//     if(parseInt(obj1.style.top) > screen_height && obj1.parentNode != null){
//         console.log("safasfasf");
//         var old_plane = obj1.parentNode.removeChild(obj1);
//         old_plane = null;

//     }
// }

// function make_middle_plane() {
//     var middle_enemy_plane = document.createElement('span');
//     middle_enemy_plane.classList.add('enemy_plane2');
//     enemy_planes.appendChild(middle_enemy_plane);
//     console.log("2");
// }

// function make_large_plane() {
//     var large_enemy_plane = document.createElement('span');
//     large_enemy_plane.classList.add('enemy_plane3');
//     enemy_planes.appendChild(large_enemy_plane)
//     console.log("3");
// }


// function make_small_plane() {
//     var small_plane = document.createElement('span');//小飞机对象
//     small_plane.classList.add('enemy_plane1');

//     var smallPlaneY = 0;// -SMALL_PLANE_Y
//     var smallPlaneX = Math.floor(Math.random() * (screen_width - SMALL_PLANE_WIDTH));
//     small_plane.style.top = smallPlaneY + 'px';// -SMALL_PLANE_Y 
//     small_plane.style.left = smallPlaneX + 'px';

//     enemy_planes.appendChild(small_plane);

//     var enemy_planesNodes = [].slice.call(enemy_planes.querySelectorAll('.enemy_plane1'), 0);

//     for (var i = 0; i < enemy_planesNodes.length; i++) {
//         var current_S_plane = enemy_planesNodes[i];
//         var current_S_planeTop = small_plane.style.top;
//         // console.log(small_plane.style.top,current_S_planeTop)
//     }
//     setInterval(function () {
//         small_plane.style.top = smallPlaneY + 10 + 'px';
//         smallPlaneY = parseInt(small_plane.style.top);
//         // 判断飞机是否被击中 或者飞出屏幕
//         judge();
//     }, 1000)
// }