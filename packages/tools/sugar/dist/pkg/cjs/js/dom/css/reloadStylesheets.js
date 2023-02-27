"use strict";
/**
 * @name            reloadStylesheets
 * @namespace       js.dom.css
 * @type             Function
 * @platform          js
 * @status           stable
 *
 * This function just loop on each "link" tags that point to some css files
 * and reload them by adding a "queryString" with the timestamp in it
 * to prevent caching
 *
 * @param       {HTMLElement}           [$root=document]            The root element in which to reload the stylesheets
 *
 * @snippet         __reloadStylesheets()
 *
 * @example         js
 * import { __reloeadStylesheets } from '@coffeekraken/sugar/dom';
 * __reloadStylesheets();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function reloadStylesheets(settings) {
    const finalSettings = Object.assign({ $root: document }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on all stylesheetgs link and add the timestamp in
    for (var link of finalSettings.$root.querySelectorAll('link[rel=stylesheet]')) {
        // @ts-ignore
        link.href = link.href.replace(/\?.*|$/, '?' + Date.now());
    }
}
exports.default = reloadStylesheets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHOztBQU1ILFNBQXdCLGlCQUFpQixDQUNyQyxRQUE4QztJQUU5QyxNQUFNLGFBQWEsbUJBQ2YsS0FBSyxFQUFFLFFBQVEsSUFDWixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0YseURBQXlEO0lBQ3pELEtBQUssSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDakQsc0JBQXNCLENBQ3pCLEVBQUU7UUFDQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQzdEO0FBQ0wsQ0FBQztBQWRELG9DQWNDIn0=