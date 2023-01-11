// @ts-nocheck
import __unique from './unique';

/**
 * @name        fromQuantifier
 * @namespace            shared.array
 * @type      Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function allows you to generate an array from a certain passed quantifier like "2", "<10", ">10", etc...
 *
 * @param       {String|Number}     quantifier          The quantifier to generate
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
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
