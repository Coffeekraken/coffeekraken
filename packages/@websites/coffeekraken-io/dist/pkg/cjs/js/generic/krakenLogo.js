"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querySelectorLive_1 = __importDefault(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"));
function default_1() {
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
    (0, querySelectorLive_1.default)("[s-kraken-logo]", krakenLogo);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkdBQXFGO0FBRXJGO0lBQ0UsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBRXBCLFNBQVMsVUFBVSxDQUFDLElBQUk7UUFDdEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxFQUNqQixZQUFZLENBQUM7UUFFZixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNsRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVO2dCQUNwQix5REFBeUQsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsSUFBSTtZQUNYLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDbkMsTUFBTSxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFDOUQsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsT0FBTyxPQUFPLE9BQU8sS0FBSyxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsWUFBWSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ3REO1FBQ0gsQ0FBQztRQUVELFNBQVMsS0FBSztZQUNaLElBQUksT0FBTztnQkFBRSxPQUFPO1lBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7UUFDRCxTQUFTLEdBQUc7WUFDVixZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0IsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ25DLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBQSwyQkFBbUIsRUFBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBM0NELDRCQTJDQyJ9