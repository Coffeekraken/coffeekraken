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
const dependencyTree_1 = __importDefault(require("./dependencyTree"));
const deepMap_1 = __importDefault(require("../object/deepMap"));
/**
 * @name                dependencyList
 * @namespace           sugar.node.module
 * @type                Function
 * @async
 *
 * This function make use of the ```dependencyTree``` one and returns the result into a simple array of file pathes
 *
 * @param       {String}                    filePath                The absolute file path you want to get the dependency tree from
 * @param       {IDependencyTreeExtendedSettings}       [settings={}]       Some settings (like all the dependency-tree supported ones (excluding filename and directory)), and some additional like caching.
 * @return      {SPromise}                               An SPromise instance through which you can get logs, and that will be resolved once the process is over
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dependencyList(filePath, settings) {
    return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const tree = yield pipe(dependencyTree_1.default(filePath, settings));
        const list = [];
        deepMap_1.default(tree, (value, prop, fullPath) => {
            if (list.indexOf(prop) === -1)
                list.push(prop);
            return value;
        }, {
            processObjects: true
        });
        resolve(list);
    }));
}
exports.default = dependencyList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBlbmRlbmN5TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxzRUFBZ0Q7QUFDaEQsZ0VBQTBDO0FBSTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsU0FBd0IsY0FBYyxDQUNwQyxRQUFnQixFQUNoQixRQUFtRDtJQUVuRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3hELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLHdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUMxQixpQkFBUyxDQUNQLElBQUksRUFDSixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUNEO1lBQ0UsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FDRixDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbkJELGlDQW1CQyJ9