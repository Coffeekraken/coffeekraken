"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_glob_1 = __importDefault(require("is-glob"));
/**
 * @name                                      isGlob
 * @namespace           sugar.js.is
 * @type                                      Function
 *
 * Check if the passed string is a valid glob pattern or not
 *
 * @param                 {String}        $string             The string to check
 * @return                {Boolean}                           true if is a valid glob pattern, false if not
 *
 * @example               js
 * import isGlob from '@coffeekraken/sugar/js/is/js';
 * isGlob('something/*.js); // => true
 *
 * @see       https://www.npmjs.com/package/is-glob
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = (string) => {
    return is_glob_1.default(string);
};
