"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            stripDocblocks
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all docblocks
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @example         js
 * import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
 * __stripDocblocks('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stripDocblocks(str) {
    return str.replace(/(\/\*{2})([\s\S]+?)(\*\/)/gm, '');
}
exports.default = stripDocblocks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUF3QixjQUFjLENBQUMsR0FBVztJQUM5QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUZELGlDQUVDIn0=