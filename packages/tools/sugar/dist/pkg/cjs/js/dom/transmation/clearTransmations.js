"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
function __clearTransmations($elm = document.body, settings) {
    const cls = `s-clear-transmations-${(0, uniqid_1.default)()}`;
    $elm.classList.add(cls);
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.innerHTML = `
        .${cls},
        .${cls}:before,
        .${cls}:after,
        .${cls} *,
        .${cls} *:before,
        .${cls} *:after {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild($tag);
    function reset() {
        $elm.classList.remove(cls);
        $tag.remove();
    }
    if (settings === null || settings === void 0 ? void 0 : settings.timeout) {
        setTimeout(() => {
            reset();
        }, settings.timeout);
    }
    return reset;
}
exports.default = __clearTransmations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHNGQUFnRTtBQXNDaEUsU0FBd0IsbUJBQW1CLENBQ3ZDLE9BQW9CLFFBQVEsQ0FBQyxJQUFJLEVBQ2pDLFFBQThDO0lBRTlDLE1BQU0sR0FBRyxHQUFHLHdCQUF3QixJQUFBLGdCQUFRLEdBQUUsRUFBRSxDQUFDO0lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7SUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRztXQUNWLEdBQUc7V0FDSCxHQUFHO1dBQ0gsR0FBRztXQUNILEdBQUc7V0FDSCxHQUFHO1dBQ0gsR0FBRzs7OztLQUlULENBQUM7SUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVoQyxTQUFTLEtBQUs7UUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sRUFBRTtRQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osS0FBSyxFQUFFLENBQUM7UUFDWixDQUFDLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hCO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWxDRCxzQ0FrQ0MifQ==