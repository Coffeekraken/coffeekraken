// @shared
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../value/typeof"], factory);
    }
})(function (require, exports) {
    "use strict";
    var typeof_1 = __importDefault(require("../value/typeof"));
    /**
     * @name            map
     * @namespace       sugar.js.iterable
     * @type            Function
     *
     * This function take an iterable value like an Array, an Object, a Map, a String, an Integer, a Set, etc... and
     * simply iterate over like a forEach.
     *
     * @param       {Iterable}      stack       The stack on which to iterate
     * @param       {IIterableCallbackFn}                     A callback called on each stack items with parameters "key" and "value". You must return either a new value for the stack item to be set, either nothing to pass to the next item
     * @return      {Promise}               A promise resolved with the new stack
     *
     * @example       js
     * import map from '@coffeekraken/sugar/js/iterable/map';
     * const myStack = ['hello', 'world'];
     * map(myStack, (key, value) => {
     *    return `${value} coco`;
     * });
     * // ['hello coco', 'world coco']
     *
     * @since         2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var fn = function (stack, callback, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ newStack: false }, settings);
        var stackType = typeof_1.default(stack).toLowerCase();
        var loopOnKeys;
        if (stackType === 'object')
            loopOnKeys = Object.keys(stack);
        // @ts-ignore
        else if (stackType === 'array')
            // @ts-ignore
            loopOnKeys = Array.from(Array(stack.length).keys());
        else if (stackType === 'number' || stackType === 'integer')
            // @ts-ignore
            loopOnKeys = Array.from(Array(Math.round(stack)).keys());
        else if (stackType === 'string')
            loopOnKeys = Array.from(stack);
        else if (stackType === 'set')
            loopOnKeys = Array.from(stack);
        // @ts-ignore
        else
            loopOnKeys = Array.from(stack.keys());
        // handle the forcing of "newStack" setting
        if (stackType === 'string' ||
            stackType === 'number' ||
            stackType === 'integer' ||
            stackType === 'set')
            settings.newStack = true;
        // create a newStack by stack types
        var newStack = [];
        if (stackType === 'object')
            newStack = {};
        else if (stackType === 'map')
            newStack = new Map();
        else if (stackType === 'set')
            newStack = new Set();
        var value;
        var newValue;
        var _get = function (s, k) {
            switch (typeof_1.default(s).toLowerCase()) {
                case 'array':
                case 'object':
                    return s[k];
                    break;
                case 'string':
                    return k;
                    break;
                case 'number':
                case 'integer':
                    return k;
                    break;
                case 'map':
                    return s.get(k);
                    break;
                case 'set':
                    return k;
                    break;
            }
        };
        var _set = function (s, k, v) {
            switch (typeof_1.default(s).toLowerCase()) {
                case 'array':
                    if (settings.newStack === true)
                        s.push(v);
                    else
                        s[k] = v;
                    break;
                case 'object':
                    s[k] = v;
                    break;
                case 'number':
                case 'integer':
                case 'string':
                    s.push(v);
                    break;
                case 'map':
                    s.set(k, v);
                    break;
                case 'set':
                    s.add(v);
                    break;
            }
        };
        for (var i = 0; i < loopOnKeys.length; i++) {
            var key = loopOnKeys[i];
            value = _get(stack, key);
            newValue = callback(key, value, i);
            if (newValue === -1)
                break;
            // @ts-ignore
            _set(settings.newStack ? newStack : stack, key, newValue);
        }
        if (stackType === 'string') {
            return newStack.join('');
        }
        return settings.newStack ? newStack : stack;
    };
    return fn;
});
//# sourceMappingURL=module.js.map