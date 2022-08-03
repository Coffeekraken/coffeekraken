"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      scrollTop
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the amount of scroll top that the user as made in the page
 *
 * @return      {Number}            The amount of scroll top that the user as made in the page
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import scrollTop from '@coffeekraken/sugar/js/dom/scroll/scrollTop';
 * scrollTop();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) (https://olivierbossel.com)
 */
function scrollTop() {
    return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}
exports.default = scrollTop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFNBQVM7SUFDZCxPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMvRSxDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=