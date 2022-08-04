"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      scrollLeft
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the amount of scroll left that the user as made in the page
 *
 * @return      {Number}            The amount of scroll top that the user as made in the page
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import scrollLeft from '@coffeekraken/sugar/js/dom/scroll/scrollLeft';
 * scrollLeft();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) (https://olivierbossel.com)
 */
function scrollLeft() {
    return window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
}
exports.default = scrollLeft;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFVBQVU7SUFDZixPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUNqRixDQUFDO0FBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=