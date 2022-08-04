"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
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
 * import uniqid from '@coffeekraken/sugar/js/string/uniqid';
 * console.log(uniqid()); // => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *
 * @see       https://www.npmjs.com/package/uuid
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function uniqid() {
    return (0, uuid_1.v4)();
}
exports.default = uniqid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLCtCQUFzQztBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE1BQU07SUFDWCxPQUFPLElBQUEsU0FBUSxHQUFFLENBQUM7QUFDdEIsQ0FBQztBQUNELGtCQUFlLE1BQU0sQ0FBQyJ9