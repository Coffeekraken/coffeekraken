"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const set_1 = __importDefault(require("./set"));
/**
 * @name                      delete
 * @namespace           sugar.js.object
 * @type                      Function
 * @stable
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import delete from '@coffeekraken/sugar/js/object/delete';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * delete(myObject, 'plop');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function del(object, dotPath) {
    const parentDotPath = dotPath.split('.').slice(0, -1).join('.');
    if (!dotPath || dotPath === '' || dotPath === '.')
        return object;
    dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
    dotPath = dotPath.replace(/^\./, '');
    const a = dotPath.split('.');
    let o = object;
    while (a.length) {
        const n = a.shift();
        if (a.length < 1) {
            if (Array.isArray(o)) {
                const valueToDelete = o[n];
                o = o.filter((v) => {
                    return v !== valueToDelete;
                });
            }
            else {
                delete o[n];
            }
            set_1.default(object, parentDotPath, o);
        }
        else {
            o = o[n];
        }
    }
    return object;
}
module.exports = del;
