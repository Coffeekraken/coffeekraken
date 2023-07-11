import __md5 from '../crypto/md5.js';
import __isPlainObject from '../is/isPlainObject.js';
import __unique from './unique.js';
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
export default function __sameItems(...args) {
    var _a, _b, _c;
    const arrays = args.filter((arg) => Array.isArray(arg));
    const settings = Object.assign({ references: true, hash: true }, ((_a = args.filter((arg) => __isPlainObject(arg))[0]) !== null && _a !== void 0 ? _a : {}));
    if (arrays.length > 2) {
        let newArray = arrays[0];
        arrays.forEach((currentArray) => {
            newArray = sameItems(newArray, currentArray, settings);
        });
        return __unique(newArray);
    }
    else {
        const array1 = (_b = arrays[0]) !== null && _b !== void 0 ? _b : [], array2 = (_c = arrays[1]) !== null && _c !== void 0 ? _c : [];
        const sameArray = [];
        array1.forEach((array1Item) => {
            let array1ItemHash = array1Item;
            if (typeof array1Item !== 'string' && settings.hash) {
                array1ItemHash = __md5.encrypt(array1Item);
            }
            array2.forEach((array2Item) => {
                let array2ItemHash = array2Item;
                if (typeof array2Item !== 'string' && settings.hash) {
                    array2ItemHash = __md5.encrypt(array2Item);
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
        return __unique(sameArray);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JDLE9BQU8sZUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLGFBQWEsQ0FBQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsR0FBRyxJQUFJOztJQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEQsTUFBTSxRQUFRLG1CQUNWLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLElBQUksRUFBRSxJQUFJLElBQ1AsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FDM0QsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbkIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUM1QixRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM3QjtTQUFNO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsRUFDMUIsTUFBTSxHQUFHLE1BQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFFN0IsTUFBTSxTQUFTLEdBQVUsRUFBRSxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMxQixJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUM7WUFDaEMsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDakQsY0FBYyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUM7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQzFCLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQztnQkFDaEMsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDakQsY0FBYyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzNDLElBQUksY0FBYyxLQUFLLGNBQWMsRUFBRTt3QkFDbkMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDM0IsT0FBTztxQkFDVjtpQkFDSjtxQkFBTSxJQUFJLFVBQVUsS0FBSyxVQUFVLEVBQUU7b0JBQ2xDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzNCLE9BQU87aUJBQ1Y7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDOUI7QUFDTCxDQUFDIn0=