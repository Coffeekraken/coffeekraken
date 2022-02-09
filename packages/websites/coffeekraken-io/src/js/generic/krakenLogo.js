import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
export default function () {
    const maxOffset = 6;
    function krakenLogo($elm) {
        let isHover = false, hoverTimeout;
        const $squareItems = $elm.querySelectorAll('.__square *');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3Jha2VuTG9nby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImtyYWtlbkxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsTUFBTSxvREFBb0QsQ0FBQztBQUVyRixNQUFNLENBQUMsT0FBTztJQUVWLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztJQUVwQixTQUFTLFVBQVUsQ0FBQyxJQUFJO1FBRXBCLElBQUksT0FBTyxHQUFHLEtBQUssRUFBRSxZQUFZLENBQUM7UUFFbEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcseURBQXlELENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUE7UUFFRixTQUFTLElBQUk7WUFDVCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ3hELE9BQU8sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxhQUFhLE9BQU8sT0FBTyxPQUFPLEtBQUssQ0FBQztZQUMxRSxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxFQUFFO2dCQUNULFlBQVksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUN4RDtRQUVMLENBQUM7UUFFRCxTQUFTLEtBQUs7WUFDVixJQUFJLE9BQU87Z0JBQUUsT0FBTztZQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0QsU0FBUyxHQUFHO1lBQ1IsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNCLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNqQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFM0MsQ0FBQztJQUVELG1CQUFtQixDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRXZELENBQUMifQ==