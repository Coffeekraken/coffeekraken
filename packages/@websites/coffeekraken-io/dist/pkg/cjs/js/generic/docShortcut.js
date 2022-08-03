"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotkey_1 = __importDefault(require("@coffeekraken/sugar/js/keyboard/hotkey"));
// search shortcut
(0, hotkey_1.default)("cmd+p").on("press", (e) => {
    // prevent behavior
    e.cancelBubble = true;
    e.preventDefault();
    e.stopImmediatePropagation();
    // svcroll to top
    // __scrollTo(document.body);
    // focus in search input
    // @ts-ignore
    document.querySelector("#search-input > input").focus();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0ZBQThEO0FBRzlELGtCQUFrQjtBQUNsQixJQUFBLGdCQUFRLEVBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2xDLG1CQUFtQjtJQUNuQixDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDN0IsaUJBQWlCO0lBQ2pCLDZCQUE2QjtJQUM3Qix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxRCxDQUFDLENBQUMsQ0FBQyJ9