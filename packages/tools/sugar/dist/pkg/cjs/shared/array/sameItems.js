"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_js_1 = __importDefault(require("../crypto/md5.js"));
const isPlainObject_js_1 = __importDefault(require("../is/isPlainObject.js"));
const unique_js_1 = __importDefault(require("./unique.js"));
/**
 * @name            sameItems
 * @namespace       shared.array
 * @type            Function
 * @platform        node
 * @platform        js
 * @status           beta
 *
 * This function take two arrays and return all the items that are the same.
 * You can specify if you want only comparing by reference for object, etc... or if
 * you want to transform items in hashes and compare that instead.
 *
 * @param       {Array}         ...arrays           The arrays you want to compare
 * @param       {Object}        [settings={}]           Some settings to refine your comparaison process
 * @return      {Array}                              An array containing all the items that are present in all the passed arrays
 *
 * @setting         {Boolean}          [references=true]        Specify if you want to use the references comparaison or not
 * @setting         {Boolean}           [hash=true]             Specify if you want to allows transforming object etc in to hashes and compare this instead
 *
 * @snippet         __sameItems($1, $2)
 *
 * @example         js
 * import { __sameItems } from '@coffeekraken/sugar/array';
 * __sameItems([1,2,3,4], [1,3,5]); // => [1,3]
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __sameItems(...args) {
    var _a, _b, _c;
    const arrays = args.filter((arg) => Array.isArray(arg));
    const settings = Object.assign({ references: true, hash: true }, ((_a = args.filter((arg) => (0, isPlainObject_js_1.default)(arg))[0]) !== null && _a !== void 0 ? _a : {}));
    if (arrays.length > 2) {
        let newArray = arrays[0];
        arrays.forEach((currentArray) => {
            newArray = __sameItems(newArray, currentArray, settings);
        });
        return (0, unique_js_1.default)(newArray);
    }
    else {
        const array1 = (_b = arrays[0]) !== null && _b !== void 0 ? _b : [], array2 = (_c = arrays[1]) !== null && _c !== void 0 ? _c : [];
        const sameArray = [];
        array1.forEach((array1Item) => {
            let array1ItemHash = array1Item;
            if (typeof array1Item !== 'string' && settings.hash) {
                array1ItemHash = md5_js_1.default.encrypt(array1Item);
            }
            array2.forEach((array2Item) => {
                let array2ItemHash = array2Item;
                if (typeof array2Item !== 'string' && settings.hash) {
                    array2ItemHash = md5_js_1.default.encrypt(array2Item);
                    if (array1ItemHash === array2ItemHash) {
                        sameArray.push(array1Item);
                        return;
                    }
                }
                else if (array1Item === array2Item) {
                    sameArray.push(array1Item);
                    return;
                }
            });
        });
        return (0, unique_js_1.default)(sameArray);
    }
}
exports.default = __sameItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLDhFQUFxRDtBQUNyRCw0REFBbUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQXdCLFdBQVcsQ0FBQyxHQUFHLElBQUk7O0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RCxNQUFNLFFBQVEsbUJBQ1YsVUFBVSxFQUFFLElBQUksRUFDaEIsSUFBSSxFQUFFLElBQUksSUFDUCxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBQSwwQkFBZSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxDQUMzRCxDQUFDO0lBRUYsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQzVCLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBQSxtQkFBUSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxFQUMxQixNQUFNLEdBQUcsTUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUU3QixNQUFNLFNBQVMsR0FBVSxFQUFFLENBQUM7UUFFNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFCLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQztZQUNoQyxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNqRCxjQUFjLEdBQUcsZ0JBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUM7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQzFCLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQztnQkFDaEMsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDakQsY0FBYyxHQUFHLGdCQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLGNBQWMsS0FBSyxjQUFjLEVBQUU7d0JBQ25DLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzNCLE9BQU87cUJBQ1Y7aUJBQ0o7cUJBQU0sSUFBSSxVQUFVLEtBQUssVUFBVSxFQUFFO29CQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQixPQUFPO2lCQUNWO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBQSxtQkFBUSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzlCO0FBQ0wsQ0FBQztBQTdDRCw4QkE2Q0MifQ==