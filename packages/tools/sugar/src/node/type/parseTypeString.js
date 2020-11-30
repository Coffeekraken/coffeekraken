"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const _SType_1 = __importDefault(require("./_SType"));
/**
 * @name            parseTypeString
 * @namespace       sugar.js.type
 * @type            Function
 *
 * This method simply parse the passed typeString like "string | number", or "string & path", etc... and return
 * an object defining this type string
 *
 * @param     {String}        typeString      The type string to parse
 * @return    {ITypeStringObject}             An object describing the type string passed
 *
 * @example       js
 * import parseTypeString from '@coffeekraken/sugar/js/type/parseTypeString';
 * parseTypeString('string | path');
 * // {
 * //   raw: 'string | path',
 * //   types: [SType('string'), SType('path')],
 * // }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
const fn = function parseTypeString(typeString) {
    // split the passed string
    const parts = typeString.split('|').map((t) => t.trim());
    // init each SType instances
    const types = [];
    parts.forEach((part) => {
        const typeInstance = new _SType_1.default(part);
        types.push(typeInstance);
    });
    const returnObj = {
        raw: typeString,
        types: types
    };
    return returnObj;
};
module.exports = fn;
