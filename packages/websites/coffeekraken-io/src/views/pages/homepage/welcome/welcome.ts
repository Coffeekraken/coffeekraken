// import __animejs from 'animejs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

(() => {
    return;
    class Welcome {
        $layers;
        constructor($welcome) {
            this.$layers = Array.from($welcome.querySelectorAll('[layer]'));

            document.addEventListener('mousemove', (e) => {
                const percentage = this.getPositionPercentages(e);
                // this.setCoinsRotation(percentage.x);
                this.setLayersRotation(percentage.x, percentage.y);
            });
        }
        setLayersRotation(percentageX, percentageY) {
            const rotateY = (90 / 100) * percentageX;
            const rotateX = (90 / 100) * percentageY;
            const offsetX = (200 / 100) * percentageX;
            const offsetY = (200 / 100) * percentageY;
            this.$layers.forEach(($layer) => {
                const amount = $layer.getAttribute('amount') ?? 1;
                const finalRotateY = rotateY * parseFloat(amount);
                const finalRotateX = rotateX * parseFloat(amount);
                const finalOffsetX = offsetX * parseFloat(amount);
                const finalOffsetY = offsetY * parseFloat(amount);
                $layer.style.marginTop = `${finalOffsetY}px`;
                $layer.style.marginLeft = `${finalOffsetX}px`;
            });
        }
        // setCoinsRotation(percentage) {
        //     const rotate = (45 / 100) * percentage;
        //     this.$refs.coins.style.transform = `translate(-50%,-50%) perspective(350px) rotateY(${rotate}deg)`;
        // }
        getPositionPercentages(e) {
            const viewportWidth = document.documentElement.clientWidth,
                viewportHeight = document.documentElement.clientHeight,
                halfViewportWidth = viewportWidth * 0.5,
                halfViewportHeight = viewportHeight * 0.5,
                positionX = e.touches?.[0].clientX ?? e.pageX,
                positionY = e.touches?.[0].clientY ?? e.pageY,
                percentageX =
                    (100 / halfViewportWidth) * (positionX - halfViewportWidth),
                percentageY =
                    (100 / halfViewportHeight) *
                    (positionY - halfViewportHeight);
            return {
                x: percentageX,
                y: percentageY,
            };
        }
    }

    const $welcome = document.querySelector('#homepage-welcome');
    if (!$welcome) return;
    new Welcome($welcome);
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
