"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../is/node");
/**
 * @name                    dataTypesArray
 * @namespace           sugar.js.dev
 * @type                    Array
 *
 * This is just a list of data types available in the
 * current language (node/js)
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
if (node_1.default()) {
    module.exports = [
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
    module.exports = [
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
