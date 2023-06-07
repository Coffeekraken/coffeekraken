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
        // clone the link element
        const $newLink = link.cloneNode();
        $newLink.href = link.href.replace(/\?.*|$/, '?' + Date.now());
        // listen when fully loaded
        $newLink.addEventListener('load', (e) => {
            var _a;
            // remove old css
            (_a = link.remove) === null || _a === void 0 ? void 0 : _a.call(link);
        });
        // add the new link after the one to reload
        link.after($newLink);
    }
}
exports.default = reloadStylesheets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHOztBQU1ILFNBQXdCLGlCQUFpQixDQUNyQyxRQUE4QztJQUU5QyxNQUFNLGFBQWEsbUJBQ2YsS0FBSyxFQUFFLFFBQVEsSUFDWixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0YseURBQXlEO0lBQ3pELEtBQUssSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDakQsc0JBQXNCLENBQ3pCLEVBQUU7UUFDQyx5QkFBeUI7UUFDekIsTUFBTSxRQUFRLEdBQW9CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuRCxRQUFRLENBQUMsSUFBSSxHQUFxQixJQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDaEQsUUFBUSxFQUNSLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQ25CLENBQUM7UUFDRiwyQkFBMkI7UUFDM0IsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFOztZQUNwQyxpQkFBaUI7WUFDakIsTUFBQSxJQUFJLENBQUMsTUFBTSxvREFBSSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDeEI7QUFDTCxDQUFDO0FBekJELG9DQXlCQyJ9