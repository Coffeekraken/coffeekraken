"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../is/node"));
/**
 * @name                    dataTypesArray
 * @namespace           sugar.js.dev
 * @type                    Array
 * @wip
 *
 * This is just a list of data types available in the
 * current language (node/js)
 *
 * @todo        interface
 * @todo        doc
 * @todo        move this into more appropriate folder
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
if (node_1.default()) {
    export = [
        'Number',
        'String',
        'Symbol',
        'Boolean',
        'Null',
        'Undefined',
        'Object',
        'Array',
        'JSON',
        'Function'
    ];
}
else {
    export = [
        'Number',
        'String',
        'Symbol',
        'Boolean',
        'Null',
        'Undefined',
        'Object',
        'Array',
        'JSON',
        'Function'
    ];
}
