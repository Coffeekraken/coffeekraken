"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const uniqid_1 = __importDefault(require("../../../js/string/uniqid"));
function __injectStyle(style, settings) {
    var _a;
    const finalSettings = Object.assign({ id: `injected-style-${(0, uniqid_1.default)()}`, rootNode: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    if (document.querySelector(`#${finalSettings.id}`))
        return;
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', finalSettings.id);
    $tag.innerHTML = style;
    if (finalSettings.rootNode) {
        finalSettings.rootNode.appendChild($tag);
    }
    else {
        const $firstLink = document.querySelector('head link[rel="stylesheet"]');
        if ($firstLink) {
            (_a = $firstLink.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore($tag, $firstLink);
        }
        else {
            document.head.appendChild($tag);
        }
    }
    return $tag;
}
exports.default = __injectStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHVFQUFpRDtBQW1DakQsU0FBd0IsYUFBYSxDQUNqQyxLQUFhLEVBQ2IsUUFBd0M7O0lBRXhDLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixFQUFFLEVBQUUsa0JBQWtCLElBQUEsZ0JBQVEsR0FBRSxFQUFFLEVBQ2xDLFFBQVEsRUFBRSxTQUFTLElBQ2hCLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUM7UUFBRSxPQUFPO0lBRTNELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7SUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBRXZCLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtRQUN4QixhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QztTQUFNO1FBQ0gsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDckMsNkJBQTZCLENBQ2hDLENBQUM7UUFDRixJQUFJLFVBQVUsRUFBRTtZQUNaLE1BQUEsVUFBVSxDQUFDLGFBQWEsMENBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM1RDthQUFNO1lBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE5QkQsZ0NBOEJDIn0=