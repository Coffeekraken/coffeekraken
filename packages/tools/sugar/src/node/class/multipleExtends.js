"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es5_1 = __importDefault(require("aggregation/es5"));
/**
 * @name                multipleExtends
 * @namespace           sugar.js.class
 * @type                Function
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @example         js
 * import multipleExtends from '@coffeekraken/sugar/js/class/multipleExtends';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = (...classes) => {
    return es5_1.default(...classes);
};
