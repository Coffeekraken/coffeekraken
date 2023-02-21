import __md5 from '../crypto/md5';
import __isPlainObject from '../is/isPlainObject';
import __unique from './unique';
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
 * @import      import sameItems from '@coffeekraken/sugar/shared/array/sameItems';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLGVBQWUsQ0FBQztBQUNsQyxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLEdBQUcsSUFBSTs7SUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sUUFBUSxtQkFDVixVQUFVLEVBQUUsSUFBSSxFQUNoQixJQUFJLEVBQUUsSUFBSSxJQUNQLENBQUMsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDLENBQzNELENBQUM7SUFFRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDNUIsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDN0I7U0FBTTtRQUNILE1BQU0sTUFBTSxHQUFHLE1BQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLEVBQzFCLE1BQU0sR0FBRyxNQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBRTdCLE1BQU0sU0FBUyxHQUFVLEVBQUUsQ0FBQztRQUU1QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pELGNBQWMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUMxQixJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUM7Z0JBQ2hDLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQ2pELGNBQWMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLGNBQWMsS0FBSyxjQUFjLEVBQUU7d0JBQ25DLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzNCLE9BQU87cUJBQ1Y7aUJBQ0o7cUJBQU0sSUFBSSxVQUFVLEtBQUssVUFBVSxFQUFFO29CQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQixPQUFPO2lCQUNWO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzlCO0FBQ0wsQ0FBQyJ9