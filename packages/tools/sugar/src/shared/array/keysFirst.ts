// @ts-nocheck
import __unique from './unique';

/**
 * @name        keysFirst
 * @namespace            shared.array
 * @type      Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @snippet         __keysFirst($1, $2)
 * 
 * @example    js
 * import { __keysFirst } from '@coffeekraken/sugar/array'
 * __keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __keysFirst(array: any[], keys: any[]): any[] {
    // all the keys has to exist in the array stack
    // otherwise we filter it out
    keys = keys.filter((key) => {
        return array.indexOf(key) !== -1;
    });
    // add the keys at start
    const empty: any[] = [];
    let res = empty.concat(keys).concat(array);
    // remove double items
    res = __unique(res);
    // return the result
    return res;
}
