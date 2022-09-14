"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("../crypto/md5"));
/**
 * @name            gravatarUrl
 * @namespace            shared.url
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Return a gravatar url depending on the passed user email and size
 *
 * @param           {String}            email             The user email
 * @param           {Number}            [size=200]        The wanted image size. From 1 to 2048
 * @return          {String}                              The generated gravatar url
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move into "gravatar" folder
 *
 * @example       js
 * import { __gravatarUrl } from '@coffeekraken/sugar/url';
 * __gravatarUrl('olivier.bossel@gmail.com'); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __gravatarUrl(email, size = 200) {
    return `https://www.gravatar.com/avatar/${md5_1.default.encrypt(email)}?s=${size}`;
}
exports.default = __gravatarUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQXdCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLEdBQUc7SUFDbkQsT0FBTyxtQ0FBbUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUMvRSxDQUFDO0FBRkQsZ0NBRUMifQ==