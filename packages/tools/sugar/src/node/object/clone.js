"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_clone_1 = __importDefault(require("lodash.clone"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
/**
 * @name                clone
 * @type                Function
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Boolean}       [deep=false]  Specify if you want to clone the object deeply
 *
 * @example       js
 * import clone from '@coffeekraken/sugar/js/object/clone';
 * clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function clone(object, deep = false) {
    if (deep) {
        return lodash_clonedeep_1.default(object);
    }
    return lodash_clone_1.default(object);
}
exports.default = clone;
