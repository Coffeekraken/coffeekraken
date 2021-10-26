// import __animejs from 'animejs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

(() => {
    return;

    var canvas = document.getElementById('welcome-canvas'),
        ctx = canvas.getContext('2d'),
        canvas2 = document.getElementById('welcome-canvas-2'),
        ctx2 = canvas2.getContext('2d'),
        // full screen dimensions
        cw = window.innerWidth,
        ch = window.innerHeight,
        charArr = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
        ],
        charArr = ['0', '1', '0', '1', '0', '1'],
        maxCharCount = 100,
        fallingCharArr = [],
        fontSize = 60,
        maxColums = cw / fontSize;
    canvas.width = canvas2.width = cw;
    canvas.height = canvas2.height = ch;

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.prototype.draw = function (ctx) {
        this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
        this.speed = randomFloat(1, 20);

        ctx2.fillStyle = 'rgba(255,255,255,0.8)';
        ctx2.font = fontSize + 'px san-serif';
        ctx2.fillText(this.value, this.x, this.y);

        ctx.fillStyle = 'rgba(0,0,0,0.02)';
        ctx.font = fontSize + 'px san-serif';
        ctx.fillText(this.value, this.x, this.y);

        this.y += this.speed;
        if (this.y > ch) {
            this.y = randomFloat(-100, 0);
            this.speed = randomFloat(2, 5);
        }
    };

    for (var i = 0; i < maxColums; i++) {
        fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
    }

    var update = function () {
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(0, 0, cw, ch);

        ctx2.clearRect(0, 0, cw, ch);

        var i = fallingCharArr.length;

        while (i--) {
            fallingCharArr[i].draw(ctx);
            var v = fallingCharArr[i];
        }

        requestAnimationFrame(update);
    };

    update();
})();

// (() => {
//     const $welcome = document.querySelector('#homepage-welcome');
//     if (!$welcome) return;
//     const $blobs = document.querySelectorAll(
//         '#homepage-welcome #welcome-clip-path-01 polygon, #homepage-welcome #welcome-clip-path-02 polygon',
//     );

//     Array.from($blobs).forEach(($circle, i) => {
//         function customShape(pointsCount) {
//             const points = [];
//             for (let i = 0; i < pointsCount; i++) {
//                 points.push(
//                     `${Math.round(
//                         Math.random() * $welcome.clientWidth,
//                     )} ${Math.round(Math.random() * $welcome.clientHeight)}`,
//                 );
//             }
//             return points.join(',');
//         }

//         $circle.setAttribute('points', customShape(3));

//         function animeShape(pointsCount) {
//             __animejs({
//                 targets: $circle,
//                 // top: `${top}px`,
//                 // left: `${left}px`,
//                 // cx: Math.round(Math.random() * 100),
//                 // cy: Math.round(Math.random() * 100),
//                 // r: Math.round(Math.random() * 200),
//                 points: customShape(pointsCount),
//                 duration: Math.round(Math.random() * 7000) + 1000,
//                 easing: 'easeInOutCubic',
//                 complete() {
//                     animeShape(pointsCount);
//                 },
//             });
//         }
//         animeShape(3);
//     });
// })();
