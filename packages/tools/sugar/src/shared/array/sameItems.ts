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
export default function sameItems(...args): any[] {

    const arrays = args.filter(arg => Array.isArray(arg));
    const settings = {
        references: true,
        hash: true,   
        ...(args.filter(arg =>__isPlainObject(arg))[0] ?? {})
    };

    if (arrays.length > 2) {

        let newArray = arrays[0];

        arrays.forEach((currentArray) => {
            newArray = sameItems(newArray, currentArray, settings);
        });

        return __unique(newArray);

    } else {
        const array1 = arrays[0] ?? [],
                array2 = arrays[1] ?? [];

        const sameArray: any[] = [];

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
                } else if (array1Item === array2Item) {
                    sameArray.push(array1Item);
                    return;
                }

            });

        });

        return __unique(sameArray);

    }

}