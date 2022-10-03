"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const string_1 = require("@coffeekraken/sugar/string");
const fs_1 = __importDefault(require("fs"));
/**
 * @name          SDataFileJs
 * @namespace     node
 * @type          Class
 * @status              beta
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
        return new s_promise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
            let settings = {};
            if (filePath.match(/\.json$/)) {
                settings = { assert: { type: 'json' } };
            }
            let finalFilePath = filePath;
            if (filePath.match(/\.json$/)) {
                finalFilePath = filePath.replace('.json', `.${(0, string_1.__uniqid)()}.json`);
            }
            else {
                finalFilePath = filePath.replace('.js', `.${(0, string_1.__uniqid)()}.js`);
            }
            // make a copy of the file to avoid import caching
            fs_1.default.copyFileSync(filePath, finalFilePath);
            // import the newly created file
            let data = (yield Promise.resolve().then(() => __importStar(require(finalFilePath)))).default;
            if (typeof data === 'function')
                data = yield data();
            // delete the file
            fs_1.default.unlinkSync(finalFilePath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsd0VBQWlEO0FBQ2pELHVEQUFzRDtBQUN0RCw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFxQixjQUFjO0lBYy9COzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUNoQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUN4QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzQixRQUFRLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQzthQUMzQztZQUVELElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUM3QixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNCLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUM1QixPQUFPLEVBQ1AsSUFBSSxJQUFBLGlCQUFRLEdBQUUsT0FBTyxDQUN4QixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksSUFBQSxpQkFBUSxHQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hFO1lBRUQsa0RBQWtEO1lBQ2xELFlBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRTNDLGdDQUFnQztZQUNoQyxJQUFJLElBQUksR0FBRyxDQUFDLHdEQUFhLGFBQWEsR0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzNELElBQUksT0FBTyxJQUFJLEtBQUssVUFBVTtnQkFBRSxJQUFJLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUVwRCxrQkFBa0I7WUFDbEIsWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBeERMLGlDQXlEQztBQXhERzs7Ozs7Ozs7OztHQVVHO0FBQ0kseUJBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyJ9