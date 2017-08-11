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
// 定时器
var bulletTimer = null;
var shootingTime = null;
var flyTimer = null;
var makePlanesTime = null;
var timeTimer = null;
// 开始记号
var startMark = false;
//分数记录
var score = 0;
//飞机加速度
var timerSpeed = 50;

window.addEventListener('load', function () {
    // 点击开始
    var start_btn = document.getElementById('btn');
    start_btn.addEventListener('click', start_work);
    // 点击暂停
    var clcikContent = document.getElementById('content');
    clcikContent.addEventListener('click', function () {
        if (!startMark) {
            return;
        }
        var wrap = document.getElementById('wrap')
        wrap.style.display = 'block';
        clearInterval(shootingTime);//停止发射
        clearInterval(bulletTimer);
        clearInterval(makePlanesTime);
        clearInterval(flyTimer);
        // clearInterval(timeTimer);
    })


    // 重新游戏
    var restartBtn = document.getElementById('restart');
    var restartBtn1 = document.getElementById('restart1');
    restartBtn.addEventListener('click', restartFun);
    restartBtn1.addEventListener('click', restartFun);

    // 继续游戏
    var continueBtn = document.getElementById('continue');
    continueBtn.addEventListener('click', goOn)
})



function start_work() {
    // 隐藏按钮
    var start_btn = document.getElementById('btn');
    start_btn.style.display = 'none';
    // 更换背景并滚动
    var content = document.getElementById('content');
    content.classList.add('run');
    // 显示计分
    var scoreMark = document.getElementById('score');
    scoreMark.style.display = 'block';
    // 移动飞机
    var plane = document.getElementById('plane');
    plane.innerHTML = "<img src='img/我的飞机.gif'>";

    // 飞机的初始位置
    plane_x = screen_width / 2;
    plane_y = screen_height * 0.85;
    plane.style.left = plane_x - (PLANE_WIDTH / 2) + 'px';
    plane.style.top = plane_y - (PLANE_HEIGHT / 2) + 'px';
    plane.addEventListener('touchmove', move_plane);

    // 创建子弹
    shootingTime = setInterval(makeBullets, 100);
    // makeBullets();
    //发射子弹
    shooting();

    // 显示敌机
    var enemy_planes = document.getElementById('enemy_planes');
    enemy_planes.style.display = 'block';

    // 创建飞机
    console.log(score);
    makePlanesTime = setInterval(make_planes, 1000);
    // make_planes();
    // 发射飞机
    flying();
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

function makeBullets() {
    // 创建子弹
    var bullets = document.getElementById('bullets');
    var bullet = document.createElement('span');
    bullet.classList.add('bullet');
    bullets.appendChild(bullet);

    // 设置子弹的位置
    var bullet_X = plane_x - BULLET_WIDTH / 2 + 1;
    var bullet_Y = plane_y - PLANE_HEIGHT / 2 - BULLET_HEIGHT;
    // console.log(bullet_Y)

    bullet.style.left = bullet_X + 'px';
    bullet.style.top = bullet_Y + 'px';
    // 自定义两属性记录上一次移动的值
    bullet.dataset['bullet_Y'] = bullet_Y;
}

function shooting() {
    var bullets = document.getElementById('bullets');
    var bullet = bullets.getElementsByTagName('span');
    bulletTimer = setInterval(function () {
        // console.log(bullet.length)
        for (var i = 0; i < bullet.length; i++) {
            var current_bullet = bullet[i];
            var bullet_Y = parseInt(current_bullet.dataset.bullet_Y);
            var newBulletY = bullet_Y - 50;
            current_bullet.dataset.bullet_Y = newBulletY;
            // console.log(current_bullet.dataset.bullet_Y)
            current_bullet.style.top = newBulletY + 'px';
        }
        overBorder('enemy_plane1');
        judge('enemy_plane1', SMALL_PLANE_WIDTH, SMALL_PLANE_HEIGHT);
        overBorder('enemy_plane2');
        judge('enemy_plane2', MIDDLE_PLANE_WIDTH, MIDDLE_PLANE_HEIGHT);
        overBorder('enemy_plane3');
        judge('enemy_plane3', LARGE_PLANE_WIDTH, LARGE_PLANE_HEIGHT);
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
    var plane_Y;
    plane_Y = -planeHeight;
    new_enemyPlane.dataset['plane_Y'] = -planeHeight;

    if (new_enemyPlane.classList.contains('enemy_plane1')) {
        speed = 5;
        new_enemyPlane.dataset['speed'] = 5;
    } else if (new_enemyPlane.classList.contains('enemy_plane2')) {
        speed = 3;
        new_enemyPlane.dataset['speed'] = 3;
    } else if (new_enemyPlane.classList.contains('enemy_plane3')) {
        speed = 1;
        new_enemyPlane.dataset['speed'] = 1;
    }
}


function timerSpeedFun() {
    setInterval(function () {
        timerSpeed -= 1;
        console.log(timerSpeed)
    }, 5000)
}


function flying() {
    var planes = document.getElementById('enemy_planes');
    var plane = planes.getElementsByTagName('span');

    flyTimer = setInterval(function () {
        
        for (var i = 0; i < plane.length; i++) {
            var current_plane = plane[i];
            var plane_Y = parseInt(current_plane.dataset.plane_Y);
            var speed = parseInt(current_plane.dataset.speed);
            var newPlaneY = plane_Y + speed;
            current_plane.dataset.plane_Y = newPlaneY;
            // console.log(current_bullet.dataset.bullet_Y)
            current_plane.style.top = newPlaneY + 'px';

            if(score > 1000){
                timerSpeed = 10;
                clearInterval(flyTimer)
                flyTimer = setInterval(arguments.callee,timerSpeed);
                console.log("正是:"+timerSpeed)
            }
        }
    }, timerSpeed);
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
                clearInterval(shootingTime);//停止发射
                clearInterval(bulletTimer);
                clearInterval(makePlanesTime);
                clearInterval(flyTimer);
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
            if (score > 500) {
                timerSpeed = 10;
            }
        }
    }, 200)
}

function restartFun() {
    // 恢复飞机位置
    var myPlane = document.getElementById('plane');
    plane.style.left = plane_x - (PLANE_WIDTH / 2) + 'px';
    plane.style.top = plane_y - (PLANE_HEIGHT / 2) + 'px';

    // 显示开始按钮
    var start_btn = document.getElementById('btn');
    start_btn.style.display = 'block';
    // 更换背景
    var content = document.getElementById('content');
    content.classList.remove('run');
    // 弹窗消失
    var gameOver = document.getElementById('gameOver');
    gameOver.style.display = 'none';
    var wrap = document.getElementById('wrap');
    wrap.style.display = 'none';
    // 分数清零
    var scoreMark = document.getElementById('score');
    scoreMark.style.display = 'none';
    score = 0;
    scoreMark.innerHTML = '分数：' + score;
    // 恢复飞机加速度
    // timerSpeed = 50;
    // 移除所有飞机
    var enemy_planes = document.getElementById('enemy_planes');
    var planes = enemy_planes.getElementsByTagName('span');
    for (var i = planes.length - 1; i >= 0; i--) {
        enemy_planes.removeChild(planes[i]);
    }
    // 移除所有子弹
    var bullets = document.getElementById('bullets');
    var bullet = bullets.getElementsByTagName('span');
    for (var i = bullet.length - 1; i >= 0; i--) {
        bullets.removeChild(bullet[i]);
    }
    startMark = false;
    console.log("执行了重新开始")
}

function goOn() {
    // 影藏弹窗
    var wrap = document.getElementById('wrap')
    wrap.style.display = 'none';

    shootingTime = setInterval(makeBullets, 100);
    shooting();

    makePlanesTime = setInterval(make_planes, 1000);
    flying();
}