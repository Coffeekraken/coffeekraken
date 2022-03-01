import __swipeListener from '../lib/utils/dom/swipeListener';
import __querySelectorLive from '../lib/utils/dom/querySelectorLive';
(() => {
    function slider($slider) {
        var _a;
        const $items = Array.from($slider.querySelectorAll('[slider-item]'));
        const $next = $slider.querySelector('[slider-next]'), $previous = $slider.querySelector('[slider-previous]');
        const $navItems = Array.from($slider.querySelectorAll('[slider-nav] li'));
        const isLoop = $slider.hasAttribute('loop');
        let page = 0, item = 0;
        const simultaneousSlidesCount = parseInt((_a = $slider.getAttribute('displayed-slides')) !== null && _a !== void 0 ? _a : 1);
        function render() {
            $slider.style.setProperty('--slider-page', page);
            $slider.style.setProperty('--slider-item', item);
            $slider.style.setProperty('--slider-total', $items.length);
            $navItems.forEach(($item, i) => {
                if (simultaneousSlidesCount === 1) {
                    if (i === item)
                        $item.classList.add('active');
                    else
                        $item.classList.remove('active');
                }
                else {
                    if (i === page)
                        $item.classList.add('active');
                    else
                        $item.classList.remove('active');
                }
            });
            $items.forEach(($item, i) => {
                if (i + 1 > page * simultaneousSlidesCount &&
                    i + 1 <= (page + 1) * simultaneousSlidesCount) {
                    $item.classList.add('active');
                }
                else {
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
                if (!isLoop)
                    return;
                item = 0;
            }
            else {
                item++;
            }
            page = Math.floor(item / simultaneousSlidesCount);
            render();
        }
        function previousItem() {
            if (item <= 0) {
                if (!isLoop)
                    return;
                item = $items.length - 1;
            }
            else {
                item--;
            }
            page = Math.floor(item / simultaneousSlidesCount);
            render();
        }
        $previous === null || $previous === void 0 ? void 0 : $previous.addEventListener('click', (e) => {
            previousItem();
        });
        $next === null || $next === void 0 ? void 0 : $next.addEventListener('click', (e) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLGdDQUFnQyxDQUFDO0FBRTdELE9BQU8sbUJBQW1CLE1BQU0sb0NBQW9DLENBQUM7QUFFckUsQ0FBQyxHQUFHLEVBQUU7SUFDRixTQUFTLE1BQU0sQ0FBQyxPQUFPOztRQUNuQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQ2hELFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0QsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FDeEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQzlDLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxHQUFHLENBQUMsRUFDUixJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRWIsTUFBTSx1QkFBdUIsR0FBRyxRQUFRLENBQ3BDLE1BQUEsT0FBTyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxtQ0FBSSxDQUFDLENBQ2hELENBQUM7UUFFRixTQUFTLE1BQU07WUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxTQUFTLENBQUMs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