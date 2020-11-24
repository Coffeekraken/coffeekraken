// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/plainObject", "is-equal"], factory);
    }
})(function (require, exports) {
    "use strict";
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var is_equal_1 = __importDefault(require("is-equal"));
    /**
     * @name                      diff
     * @namespace           sugar.js.object
     * @type                      Function
     * @beta
     *
     * This function take two objects and return an object that contains only what has been changed between the two.
     * This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
     *
     * @param         {Object}          object1            The first object used for the diff process
     * @param         {Object}          object2            The second object used for the diff process
     * @param         {Object}          [settings={}]      An object of settings to configure the diff process:
     * - deep (true) {Boolean}: Specify if you want a deep diff or a simple one level diff
     * - added (true) {Boolean}: Specify if you want to include the props that does not exist on the object1 but exists on the object2
     * - deleted (false) {Boolean}: Specify if you want to include the props that exists on the object1 but no more on the object2
     * - equals (false) {Boolean}: Specify if you want to include the props that are equals from the object1 to the object2
     * - emptyObject (false) {Boolean}: Specify if you want to keep the empty objects in the resulting one
     * - updated (true) {Boolean}: Specify if you want to include the updated values
     * @return        {Object}                             The object that contains only the differences between the two
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import diff from '@coffeekraken/sugar/js/object/diff';
     * const myObject1 = {
     *    hello: 'world',
     *    plop: 'yop'
     * };
     * const myObject2 = {
     *    coco: 'plop',
     *    hello: 'hey!',
     *    plop: 'yop'
     * };
     * diff(myObject1, myObject2);
     * {
     *    coco: 'plop',
     *    hello: 'hey!'
     * }
     *
     * @see       https://www.npmjs.com/package/is-equal
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function diff(object1, object2, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ deep: true, added: true, deleted: false, equals: false, emptyObject: false, updated: true }, settings);
        var finalObj = {};
        var keys = Array.from(new Set(__spreadArrays(Object.keys(object1), Object.keys(object2))));
        for (var i = 0; i < keys.length; i++) {
            var _prop = keys[i];
            if (settings.deep) {
                if (plainObject_1.default(object1[_prop]) && plainObject_1.default(object2[_prop])) {
                    finalObj[_prop] = diff(object1[_prop], object2[_prop], settings);
                    if (Object.keys(finalObj[_prop]).length === 0)
                        delete finalObj[_prop];
                    continue;
                }
            }
            if (settings.added) {
                if (object1[_prop] === undefined && object2[_prop] !== undefined) {
                    finalObj[_prop] = object2[_prop];
                    continue;
                }
            }
            if (settings.deleted) {
                if (object1[_prop] !== undefined && object2[_prop] === undefined) {
                    // delete object1[_prop];
                    finalObj[_prop] = object1[_prop];
                    continue;
                }
            }
            if (settings.equals) {
                if (is_equal_1.default(object1[_prop], object2[_prop])) {
                    finalObj[_prop] = object2[_prop];
                    continue;
                }
            }
            if (settings.emptyObject) {
                if (plainObject_1.default(object1[_prop]) &&
                    Object.keys(object1[_prop]).length === 0) {
                    finalObj[_prop] = {};
                    continue;
                }
            }
            if (settings.updated) {
                if (object1[_prop] === undefined || object2[_prop] === undefined) {
                    continue;
                }
                if (!is_equal_1.default(object1[_prop], object2[_prop])) {
                    finalObj[_prop] = object2[_prop];
                    continue;
                }
            }
        }
        return finalObj;
    }
    return diff;
});
