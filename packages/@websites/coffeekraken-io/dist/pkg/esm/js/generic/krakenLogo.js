import __querySelectorLive from "@coffeekraken/sugar/js/dom/query/querySelectorLive";
export default function () {
    const maxOffset = 6;
    function krakenLogo($elm) {
        let isHover = false, hoverTimeout;
        const $squareItems = $elm.querySelectorAll(".kraken-logo > path");
        $squareItems.forEach(($item) => {
            $item.style.transition =
                "transform 0.1s cubic-bezier(0.700, 0.000, 0.305, 0.995)";
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
        $elm.addEventListener("mouseover", hover);
        $elm.addEventListener("mouseout", out);
    }
    __querySelectorLive("[s-kraken-logo]", krakenLogo);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFFckYsTUFBTSxDQUFDLE9BQU87SUFDWixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFFcEIsU0FBUyxVQUFVLENBQUMsSUFBSTtRQUN0QixJQUFJLE9BQU8sR0FBRyxLQUFLLEVBQ2pCLFlBQVksQ0FBQztRQUVmLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVU7Z0JBQ3BCLHlEQUF5RCxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBRUgsU0FBUyxJQUFJO1lBQ1gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNuQyxNQUFNLE9BQU8sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUM5RCxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsYUFBYSxPQUFPLE9BQU8sT0FBTyxLQUFLLENBQUM7WUFDeEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDdEQ7UUFDSCxDQUFDO1FBRUQsU0FBUyxLQUFLO1lBQ1osSUFBSSxPQUFPO2dCQUFFLE9BQU87WUFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztRQUNELFNBQVMsR0FBRztZQUNWLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQixPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDbkMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNyRCxDQUFDIn0=