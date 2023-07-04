"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name          SDataFileJs
 * @namespace     node
 * @type          Class
 * @platform        node
 * @status              beta
 * @private
 *
 * This class represent the js/json data file loader
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDataHandlerJs {
    /**
     * @name          load
     * @type          Function
     * @static
     *
     * This static method allows you to actually load a data file
     *
     * @param       {String}      filePath      The file path to take care
     * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static load(filePath) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // import the newly created file
            let data = {};
            if (filePath.match(/\.json$/)) {
                data = (0, fs_1.__readJsonSync)(filePath);
            }
            else {
                data = (yield import(`${filePath}?${(0, string_1.__uniqid)()}`)).default;
            }
            if (typeof data === 'function')
                data = yield data();
            resolve(data);
        }));
    }
}
exports.default = SDataHandlerJs;
/**
 * @name          extensions
 * @type          String[]
 * @default         ['js', 'json']
 * @static
 *
 * This static property allow you to define the extensions that the data file loader
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SDataHandlerJs.extensions = ['js', 'json'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7OztBQUVkLCtDQUF3RDtBQUN4RCx1REFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFxQixjQUFjO0lBYy9COzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsZ0NBQWdDO1lBQ2hDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNkLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxHQUFHLElBQUEsbUJBQWMsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDSCxJQUFJLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxHQUFHLFFBQVEsSUFBSSxJQUFBLGlCQUFRLEdBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDOUQ7WUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVU7Z0JBQUUsSUFBSSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXZDTCxpQ0F3Q0M7QUF2Q0c7Ozs7Ozs7Ozs7R0FVRztBQUNJLHlCQUFVLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==