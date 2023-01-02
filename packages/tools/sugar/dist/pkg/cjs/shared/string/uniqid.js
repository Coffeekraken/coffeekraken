"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { v4 as __uuidv4 } from 'uuid';
const hyperid_1 = __importDefault(require("hyperid"));
/**
 * @name          uniqid
 * @namespace            shared.string
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
 * @see       https://www.npmjs.com/package/uuid
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _hyperidInstance;
function __uniqid() {
    if (!_hyperidInstance) {
        _hyperidInstance = (0, hyperid_1.default)({
            urlSafe: true,
        });
    }
    return `s-${_hyperidInstance()}`;
    // return __uuidv4();
}
exports.default = __uniqid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHlDQUF5QztBQUV6QyxzREFBZ0M7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixTQUF3QixRQUFRO0lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNuQixnQkFBZ0IsR0FBRyxJQUFBLGlCQUFTLEVBQUM7WUFDekIsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0tBQ047SUFDRCxPQUFPLEtBQUssZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO0lBRWpDLHFCQUFxQjtBQUN6QixDQUFDO0FBVEQsMkJBU0MifQ==