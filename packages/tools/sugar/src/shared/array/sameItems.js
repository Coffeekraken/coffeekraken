import __md5 from '../crypt/md5';
import __isPlainObject from '../is/plainObject';
import __unique from './unique';
/**
 * @name            sameItems
 * @namespace       shared.array
 * @type            Function
 *
 * This function take two arrays and return all the items that are the same.
 * You can specify if you want only comparing by reference for object, etc... or if
 * you want to transform items in hashes and compare that instead.
 *
 * @param       {Array}         ...arrays           The arrays you want to compare
 * @param       {Object}        [settings={}]           Some settings to refine your comparaison process
 * @return      {Array}                              An array containing all the items that are present in all the passed arrays
 *
 * @setting         {Boolean}          [references=true]        Specify if you want to use the references comparaison or not
 * @setting         {Boolean}           [hash=true]             Specify if you want to allows transforming object etc in to hashes and compare this instead
 *
 * @import      import sameItems from '@coffeekraken/sugar/shared/array/sameItems';
 *
 * @example         js
 * import sameItems from '@coffeekraken/sugar/shared/array/sameItems';
 * sameItems([1,2,3,4], [1,3,5]); // => [1,3]
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function sameItems(...args) {
    var _a, _b, _c;
    const arrays = args.filter(arg => Array.isArray(arg));
    const settings = Object.assign({ references: true, hash: true }, ((_a = args.filter(arg => __isPlainObject(arg))[0]) !== null && _a !== void 0 ? _a : {}));
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
        array1.forEach(array1Item => {
            let array1ItemHash = array1Item;
            if (typeof array1Item !== 'string' && settings.hash) {
                array1ItemHash = __md5.encrypt(array1Item);
            }
            array2.forEach(array2Item => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtZUl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FtZUl0ZW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLEdBQUcsSUFBSTs7SUFFckMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0RCxNQUFNLFFBQVEsbUJBQ1YsVUFBVSxFQUFFLElBQUksRUFDaEIsSUFBSSxFQUFFLElBQUksSUFDUCxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FDeEQsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFFbkIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUM1QixRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUU3QjtTQUFNO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsRUFDdEIsTUFBTSxHQUFHLE1BQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFFakMsTUFBTSxTQUFTLEdBQVUsRUFBRSxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFFeEIsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pELGNBQWMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFFeEIsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDO2dCQUNoQyxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUNqRCxjQUFjLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxjQUFjLEtBQUssY0FBYyxFQUFFO3dCQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMzQixPQUFPO3FCQUNWO2lCQUNKO3FCQUFNLElBQUksVUFBVSxLQUFLLFVBQVUsRUFBRTtvQkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0IsT0FBTztpQkFDVjtZQUVMLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUU5QjtBQUVMLENBQUMifQ==