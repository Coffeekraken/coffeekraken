"use strict";
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
const readJsonSync_js_1 = __importDefault(require("../fs/readJsonSync.js"));
/**
 * @name                import
 * @namespace           node.module
 * @type                Function
 * @platform            node
 * @status              beta
 * @async
 * @private
 *
 * This function is the same as the native "import" one unless it allows you to pass an array with 2 values when the
 * first is the package name from which to import things, and the second is the "export" to import.
 *
 * @param       {String|Array}              what            Either a string like with the native "import" function, either an array with 2 values. 1st is the package name, 2nd is the "export" to import
 * @return      {any}                                       The imported things
 *
 * @example         js
 * import { __import } from '@coffeekraken/sugar/module';
 * __import('@coffeekraken/s-typescript-builder');
 * __import(['@coffeekraken/s-typescript-builder', 'STypescriptBuilderBuildParamsInterface']);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function _import(what) {
    return __awaiter(this, void 0, void 0, function* () {
        let imported;
        if (Array.isArray(what)) {
            if (what[0].match(/\.json$/)) {
                imported = (0, readJsonSync_js_1.default)(what[0]);
            }
            else {
                imported = yield import(what[0]);
            }
            return imported[what[1]];
        }
        if (what.match(/\.json$/)) {
            imported = (0, readJsonSync_js_1.default)(what);
            return imported;
        }
        return (yield import(what)).default;
    });
}
exports.default = _import;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQW1EO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBOEIsT0FBTyxDQUFDLElBQXVCOztRQUN6RCxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzFCLFFBQVEsR0FBRyxJQUFBLHlCQUFjLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0gsUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdkIsUUFBUSxHQUFHLElBQUEseUJBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUNELE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0NBQUE7QUFmRCwwQkFlQyJ9