import __animejs from 'animejs';

(() => {
    const $welcome = document.querySelector('#homepage-welcome');
    if (!$welcome) return;
    const $blobs = document.querySelectorAll(
        '#homepage-welcome #welcome-clip-path-01 polygon, #homepage-welcome #welcome-clip-path-02 polygon',
    );

    Array.from($blobs).forEach(($circle, i) => {
        function customShape(pointsCount) {
            const points = [];
            for (let i = 0; i < pointsCount; i++) {
                points.push(
                    `${Math.round(
                        Math.random() * $welcome.clientWidth,
                    )} ${Math.round(Math.random() * $welcome.clientHeight)}`,
                );
            }
            return points.join(',');
        }

        $circle.setAttribute('points', customShape(3));

        function animeShape(pointsCount) {
            __animejs({
                targets: $circle,
                // top: `${top}px`,
                // left: `${left}px`,
                // cx: Math.round(Math.random() * 100),
                // cy: Math.round(Math.random() * 100),
                // r: Math.round(Math.random() * 200),
                points: customShape(pointsCount),
                duration: Math.round(Math.random() * 7000) + 1000,
                easing: 'easeInOutCubic',
                complete() {
                    animeShape(pointsCount);
                },
            });
        }
        animeShape(3);
    });
})();
