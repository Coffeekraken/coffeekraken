"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
/**
 * @name                                        set
 * @namespace           sugar.js.object
 * @type                                        Function
 *
 * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
 *
 * @param                         {Object}                         obj                      The object in which to set the value
 * @param                         {String}                        path                      The object path where to set the value
 * @param                         {Mixed}                         value                     The value to set
 * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
 *
 * @example               js
 * import set from '@coffeekraken/sugar/js/object/set';
 * set('myObject.cool.value', 'Hello world'); // => Hello world
 *
 */
exports.default = (obj, path, value) => {
    if (!path || path === '' || path === '.') {
        obj = value;
        return;
    }
    var a = path.split('.');
    var o = obj;
    while (a.length - 1) {
        var n = a.shift();
        if (!(n in o))
            o[n] = {};
        o = o[n];
    }
    o[a[0]] = value;
    return get_1.default(obj, path);
};
