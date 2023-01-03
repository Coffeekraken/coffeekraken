"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name          uniqid
 * @namespace            js.string
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __uniqid } from '@coffeekraken/sugar/string';
 * console.log(__uniqid()); // => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *
 * @see       https://medium.com/teads-engineering/generating-uuids-at-scale-on-the-web-2877f529d2a2
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __uniqid() {
    const url = URL.createObjectURL(new Blob());
    return `s-${url.substring(url.lastIndexOf('/') + 1)}`;
}
exports.default = __uniqid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IsUUFBUTtJQUM1QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1QyxPQUFPLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUQsQ0FBQztBQUhELDJCQUdDIn0=