"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../config/sugar"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
/**
 * @name                            localDir
 * @namespace           sugar.node.fs
 * @type                            Function
 * @stable
 *
 * Return the .local directory path
 *
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import localDir from '@coffeekraken/node/fs/localDir';
 * localDir(); // => '/my/cool/path/.local'
 *
 * @see       https://www.npmjs.com/package/temp-dir
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function () {
    const path = sugar_1.default('storage.localFolderPath');
    ensureDirSync_1.default(path);
    return path;
};
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUdkLDREQUE0QztBQUM1QyxvRUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sRUFBRSxHQUFjO0lBQ3BCLE1BQU0sSUFBSSxHQUFHLGVBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3RELHVCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFDRixpQkFBUyxFQUFFLENBQUMifQ==