import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
export default function () {
    const maxOffset = 6;
    function krakenLogo($elm) {
        let isHover = false, hoverTimeout;
        const $squareItems = $elm.querySelectorAll('.kraken-logo > path');
        $squareItems.forEach($item => {
            $item.style.transition = 'transform 0.1s cubic-bezier(0.700, 0.000, 0.305, 0.995)';
        });
        function anim() {
            $squareItems.forEach(($squareItem) => {
                const offsetX = maxOffset * -1 + Math.random() * (maxOffset * 2), offsetY = maxOffset * -1 + Math.random() * (maxOffset * 2);
                $squareItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
            if (isHover) {
                hoverTimeout = setTimeout(anim, Math.random() * 100);
            }
        }
        function hover() {
            if (isHover)
                return;
            isHover = true;
            anim();
        }
        function out() {
            clearTimeout(hoverTimeout);
            isHover = false;
            $squareItems.forEach(($squareItem) => {
                $squareItem.style.transform = `translate(0px, 0px)`;
            });
        }
        $elm.addEventListener('mouseover', hover);
        $elm.addEventListener('mouseout', out);
    }
    __querySelectorLive('[s-kraken-logo]', krakenLogo);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3Jha2VuTG9nby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImtyYWtlbkxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsTUFBTSxvREFBb0QsQ0FBQztBQUVyRixNQUFNLENBQUMsT0FBTztJQUVWLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztJQUVwQixTQUFTLFVBQVUsQ0FBQyxJQUFJO1FBRXBCLElBQUksT0FBTyxHQUFHLEtBQUssRUFBRSxZQUFZLENBQUM7UUFFbEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbEUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyx5REFBeUQsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQTtRQUVGLFNBQVMsSUFBSTtZQUNULFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDakMsTUFBTSxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFDeEQsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsT0FBTyxPQUFPLE9BQU8sS0FBSyxDQUFDO1lBQzFFLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsWUFBWSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ3hEO1FBRUwsQ0FBQztRQUVELFNBQVMsS0FBSztZQUNWLElBQUksT0FBTztnQkFBRSxPQUFPO1lBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUM7UUFDRCxTQUFTLEdBQUc7WUFDUixZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0IsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ2pDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUUzQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFdkQsQ0FBQyJ9