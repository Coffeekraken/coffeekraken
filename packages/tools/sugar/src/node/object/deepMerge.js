// @ts-nocheck
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
        define(["require", "exports", "copy-to", "../is/plainObject", "../array/unique"], factory);
    }
})(function (require, exports) {
    "use strict";
    var copy_to_1 = __importDefault(require("copy-to"));
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var unique_1 = __importDefault(require("../array/unique"));
    /**
     * @name                deepMerge
     * @namespace           sugar.js.object
     * @type                Function
     * @stable
     *
     * Deep merge one object with another and return the merged object result. This merging implementation support:
     * - Merging object with getters/setters
     * - n numbers of objects as arguments
     *
     * @param           {Object}            args...        Pass all the objects you want to merge
     * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
     * - object (true) {Boolean}: Specify if you want to merge the objects
     * - array (false) {Boolean}: Specify if you want to merge the arrays
     * @return          {Object}                              The merged object result
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
     * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
     * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function deepMerge() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var settings = {
            array: false,
            object: true
        };
        function merge(firstObj, secondObj) {
            var newObj = {};
            if (!firstObj && secondObj)
                return secondObj;
            if (!secondObj && firstObj)
                return firstObj;
            if (!firstObj && !secondObj)
                return {};
            copy_to_1.default(firstObj).override(newObj);
            for (var _i = 0, _a = Object.keys(secondObj); _i < _a.length; _i++) {
                var key = _a[_i];
                // merging arrays
                if (settings.array === true &&
                    Array.isArray(firstObj[key]) &&
                    Array.isArray(secondObj[key])) {
                    var newArray = unique_1.default(__spreadArrays(firstObj[key], secondObj[key]));
                    newObj[key] = newArray;
                    continue;
                }
                // merging objects
                else if (settings.object === true &&
                    plainObject_1.default(firstObj[key]) &&
                    plainObject_1.default(secondObj[key])) {
                    newObj[key] = merge(firstObj[key], secondObj[key]);
                    continue;
                }
                copy_to_1.default(secondObj).pick(key).toCover(newObj);
            }
            return newObj;
        }
        var potentialSettingsObj = args[args.length - 1] || {};
        if ((potentialSettingsObj.array &&
            typeof potentialSettingsObj.array === 'boolean') ||
            (potentialSettingsObj.object &&
                typeof potentialSettingsObj.object === 'boolean')) {
            if (potentialSettingsObj.array !== undefined)
                settings.array = potentialSettingsObj.array;
            if (potentialSettingsObj.object !== undefined)
                settings.object = potentialSettingsObj.object;
            args.pop();
        }
        var currentObj = {};
        for (var i = 0; i < args.length; i++) {
            var toMergeObj = args[i] || {};
            currentObj = merge(currentObj, toMergeObj);
        }
        return currentObj;
    }
    return deepMerge;
});
