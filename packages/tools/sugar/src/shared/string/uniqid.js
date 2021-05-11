"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * @name          uniqid
 * @namespace            js.string
 * @type          Function
 * @stable
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
 * import uniqid from '@coffeekraken/sugar/js/string/uniqid';
 * console.log(uniqid()); // => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *
 * @see       https://www.npmjs.com/package/uuid
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function uniqid() {
    return uuid_1.v4();
}
exports.default = uniqid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidW5pcWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLCtCQUFzQztBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxNQUFNO0lBQ2IsT0FBTyxTQUFRLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=