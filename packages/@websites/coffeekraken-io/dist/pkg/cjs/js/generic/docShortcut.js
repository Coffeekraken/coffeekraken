"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
// search shortcut
(0, keyboard_1.__hotkey)('cmd+p').on('press', (e) => {
    // prevent behavior
    e.cancelBubble = true;
    e.preventDefault();
    e.stopImmediatePropagation();
    // svcroll to top
    // __scrollTo(document.body);
    // focus in search input
    // @ts-ignore
    document.querySelector('#search-input > input').focus();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXdEO0FBR3hELGtCQUFrQjtBQUNsQixJQUFBLG1CQUFRLEVBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2xDLG1CQUFtQjtJQUNuQixDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDN0IsaUJBQWlCO0lBQ2pCLDZCQUE2QjtJQUM3Qix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxRCxDQUFDLENBQUMsQ0FBQyJ9