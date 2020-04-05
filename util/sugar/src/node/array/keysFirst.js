/**
 * @name        keysFirst
 * @namespace       sugar.node.array
 * @type      Function
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * const keysFirst = require('@coffeekraken/sugar/node/array/keysFirst');
 * keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = require('../../../js/array/keysFirst');