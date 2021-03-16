"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
/**
 * @name        ensureFileSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureFileSync from '@coffeekraken/node/fs/ensureFileSync';
 * try {
 *    ensureFileSync('my/cool/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureFileSync(file) {
    file = replacePathTokens_1.default(file);
    fs_extra_1.default.ensureFileSync(file);
}
exports.default = ensureFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRmlsZVN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9mcy9lbnN1cmVGaWxlU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3REFBNEI7QUFDNUIsa0ZBQTREO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGNBQWMsQ0FBQyxJQUFJO0lBQzFCLElBQUksR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxrQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=