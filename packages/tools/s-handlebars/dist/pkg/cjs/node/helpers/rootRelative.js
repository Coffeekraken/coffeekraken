"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
/**
 * @name            rootRelative
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to remove in a path the absolute part and get only the relative part of it
 *
 * @param       {String}        path            The path you want to process
 * @return      {String}                    The processed path
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function rootRelative(path) {
    return path.replace(`${(0, path_1.__packageRootDir)()}/`, '');
}
exports.default = rootRelative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTREO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLFlBQVksQ0FBQyxJQUFZO0lBQzdDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFGRCwrQkFFQyJ9