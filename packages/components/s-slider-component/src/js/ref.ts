import __swipeListener from '../lib/utils/dom/swipeListener';
import __isMobile from '../lib/utils/isMobile';
import __querySelectorLive from '../lib/utils/dom/querySelectorLive';

(() => {
    function slider($slider) {
        const $items = Array.from($slider.querySelectorAll('[slider-item]'));
        const $next = $slider.querySelector('[slider-next]'),
            $previous = $slider.querySelector('[slider-previous]');
        const $navItems = Array.from(
            $slider.querySelectorAll('[slider-nav] li'),
        );
        const isLoop = $slider.hasAttribute('loop');

        let page = 0,
            item = 0;

        const simultaneousSlidesCount = parseInt(
            $slider.getAttribute('displayed-slides') ?? 1,
        );

        function render() {
            $slider.style.setProperty('--slider-page', page);
            $slider.style.setProperty('--slider-item', item);
            $slider.style.setProperty('--slider-total', $items.length);
            $navItems.forEach(($item: any, i) => {
                if (simultaneousSlidesCount === 1) {
                    if (i === item) $item.classList.add('active');
                    else $item.classList.remove('active');
                } else {
                    if (i === page) $item.classList.add('active');
                    else $item.classList.remove('active');
                }
            });
            $items.forEach(($item: any, i) => {
                if (
                    i + 1 > page * simultaneousSlidesCount &&
                    i + 1 <= (page + 1) * simultaneousSlidesCount
                ) {
                    $item.classList.add('active');
                } else {
                    $item.classList.remove('active');
                }
            });
        }

        // function nextPage() {
        //     if (page >= $items.length / simultaneousSlidesCount - 1) return;
        //     page++;
        //     item = page * simultaneousSlidesCount;
        //     render();
        // }
        // function previousPage() {
        //     if (page <= 0) return;
        //     page--;
        //     item = page * simultaneousSlidesCount;
        //     render();
        // }
        function nextItem() {
            if (item >= $items.length - 1) {
                if (!isLoop) return;
                item = 0;
            } else {
                item++;
            }
            page = Math.floor(item / simultaneousSlidesCount);
            render();
        }
        function previousItem() {
            if (item <= 0) {
                if (!isLoop) return;
                item = $items.length - 1;
            } else {
                item--;
            }
            page = Math.floor(item / simultaneousSlidesCount);
            render();
        }

        $previous?.addEventListener('click', (e) => {
            previousItem();
        });
        $next?.addEventListener('click', (e) => {
            nextItem();
        });

        __swipeListener($slider, {
            left: () => {
                nextItem();
            },
            right: () => {
                previousItem();
            },
        });

        render();
    }

    __querySelectorLive('[slider]', slider);
})();
