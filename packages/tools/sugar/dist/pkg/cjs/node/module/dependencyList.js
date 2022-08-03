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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMap_1 = __importDefault(require("../../shared/object/deepMap"));
const dependencyTree_1 = __importDefault(require("./dependencyTree"));
/**
 * @name                dependencyList
 * @namespace            node.module
 * @type                Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function make use of the ```dependencyTree``` one and returns the result into a simple array of file pathes
 *
 * @param       {String}                    filePath                The absolute file path you want to get the dependency tree from
 * @param       {IDependencyTreeExtendedSettings}       [settings={}]       Some settings (like all the dependency-tree supported ones (excluding filename and directory)), and some additional like caching.
 * @return      {SPromise}                               An SPromise instance through which you can get logs, and that will be resolved once the process is over
 *
 * @example         js
 * import dependencyList from '@coffeekraken/sugar/node/module/dependencyList';
 * await dependencyList('/something/cool.js', {
 *      cache: true,
 *      // etc...
 * });
 *
 * @see             https://www.npmjs.com/package/dependency-tree
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dependencyList(filePath, settings) {
    return new s_promise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const tree = yield pipe((0, dependencyTree_1.default)(filePath, settings));
        const list = [];
        (0, deepMap_1.default)(tree, ({ prop, value }) => {
            if (list.indexOf(prop) === -1)
                list.push(prop);
            return value;
        }, {
            processObjects: true,
        });
        resolve(list);
    }));
}
exports.default = dependencyList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELDBFQUFvRDtBQUNwRCxzRUFFMEI7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILFNBQXdCLGNBQWMsQ0FDbEMsUUFBZ0IsRUFDaEIsUUFBbUQ7SUFFbkQsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzlDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUEsd0JBQWdCLEVBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1FBQzFCLElBQUEsaUJBQVMsRUFDTCxJQUFJLEVBQ0osQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLEVBQ0Q7WUFDSSxjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUNKLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuQkQsaUNBbUJDIn0=