"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const uniqid_1 = __importDefault(require("../../../shared/string/uniqid"));
/**
 * @name            injectStyle
 * @namespace            js.css
 * @type            Function
 * @platform          js
 * @status              beta
 *
 * Inject a passed style string in the DOM
 *
 * @param         {String}          style         The style to inject in DOM
 * @param         {HTMLElement}     [node=document.head]    The node in which to inject the new style tag
 * @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
 * injectStyle('a { color: red; }');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function injectStyle(style, id = `injected-style-${(0, uniqid_1.default)()}`, node = document.head) {
    if (document.querySelector(`#${id}`))
        return;
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', `injected-style-${id.toLowerCase()}`);
    $tag.innerHTML = style;
    node.appendChild($tag);
    return $tag;
}
exports.default = injectStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDJFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsV0FBVyxDQUNoQixLQUFhLEVBQ2IsS0FBYSxrQkFBa0IsSUFBQSxnQkFBUSxHQUFFLEVBQUUsRUFDM0MsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJO0lBRXBCLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTztJQUM3QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGtCQUFlLFdBQVcsQ0FBQyJ9