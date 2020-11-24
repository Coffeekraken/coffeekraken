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
        define(["require", "exports", "../is/plainObject", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    /**
     * @name            deepMap
     * @namespace           sugar.js.object
     * @type            Function
     * @stable
     *
     * This function is the same as the "map" one. The only difference is that this one goes deep into the object
     *
     * @param         {Object}        object          The object you want to map through
     * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
     * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
     * - processObjects (false) {Boolean}: Specify if you want the objects to be processed the same as other values
     * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
     * - handleArray (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
     * deepMap({
     *    hello: 'world'
     * }, (value, prop, fullPath) => {
     *    return '~ ' + value;
     * });
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function deepMap(object, processor, settings, _path) {
        if (settings === void 0) { settings = {}; }
        if (_path === void 0) { _path = []; }
        settings = deepMerge_2.default({
            deepFirst: false,
            processObjects: false,
            handleArray: true
        }, settings);
        Object.keys(object).forEach(function (prop) {
            var descriptor = Object.getOwnPropertyDescriptor(object, prop);
            if (descriptor.get &&
                typeof descriptor.get === 'function' &&
                !descriptor.set) {
                return;
            }
            if (!settings.deepFirst) {
                if (plainObject_1.default(object[prop]) ||
                    (Array.isArray(object[prop]) && settings.handleArray)) {
                    object[prop] = deepMap(object[prop], processor, settings, __spreadArrays(_path, [
                        prop
                    ]));
                    if (!settings.processObjects)
                        return;
                }
                var res = processor(object[prop], prop, __spreadArrays(_path, [prop]).join('.'));
                if (res === -1)
                    delete object[prop];
                else
                    object[prop] = res;
            }
            else {
                var res = processor(object[prop], prop, __spreadArrays(_path, [prop]).join('.'));
                if (res === -1)
                    delete object[prop];
                else
                    object[prop] = res;
                if (plainObject_1.default(object[prop]) ||
                    (Array.isArray(object[prop]) && settings.handleArray)) {
                    object[prop] = deepMap(object[prop], processor, settings, __spreadArrays(_path, [
                        prop
                    ]));
                    if (!settings.processObjects)
                        return;
                }
            }
        });
        return object;
    }
    return deepMap;
});
