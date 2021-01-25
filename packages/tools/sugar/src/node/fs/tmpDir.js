"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const temp_dir_1 = __importDefault(require("temp-dir"));
const sugar_1 = __importDefault(require("../config/sugar"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
/**
 * @name                            tmpDir
 * @namespace           sugar.node.fs
 * @type                            Function
 * @stable
 *
 * Return the os temp directory path
 *
 * @param       {ITmpDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your tmpDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import tmpDir from '@coffeekraken/node/fs/tmpDir';
 * tmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @see       https://www.npmjs.com/package/temp-dir
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function (settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const tmpDir = sugar_1.default('storage.tempDir');
        if (tmpDir !== undefined) {
            ensureDirSync_1.default(tmpDir);
            return tmpDir;
        }
    }
    ensureDirSync_1.default(temp_dir_1.default);
    return temp_dir_1.default;
};
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG1wRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBSWQsd0RBQWdDO0FBQ2hDLDREQUE0QztBQUM1QyxvRUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sRUFBRSxHQUFZLFVBQVUsV0FBNEIsRUFBRTtJQUMxRCxRQUFRLG1CQUNOLEtBQUssRUFBRSxPQUFPLElBQ1gsUUFBUSxDQUNaLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO1FBQzlCLE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4Qix1QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7S0FDRjtJQUNELHVCQUFlLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0lBQzFCLE9BQU8sa0JBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFDRixpQkFBUyxFQUFFLENBQUMifQ==