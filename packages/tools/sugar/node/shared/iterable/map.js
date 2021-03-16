"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeof_1 = __importDefault(require("../value/typeof"));
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
const fn = function (stack, callback, settings = {}) {
    settings = Object.assign({ newStack: false }, settings);
    const stackType = typeof_1.default(stack).toLowerCase();
    let loopOnKeys;
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
    let newStack = [];
    if (stackType === 'object')
        newStack = {};
    else if (stackType === 'map')
        newStack = new Map();
    else if (stackType === 'set')
        newStack = new Set();
    let value;
    let newValue;
    let _get = (s, k) => {
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
    let _set = (s, k, v) => {
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
    for (let i = 0; i < loopOnKeys.length; i++) {
        let key = loopOnKeys[i];
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
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9pdGVyYWJsZS9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBRVYsNkRBQXVDO0FBR3ZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxFQUFFLEdBQVcsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3pELFFBQVEsbUJBQ04sUUFBUSxFQUFFLEtBQUssSUFDWixRQUFRLENBQ1osQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsSUFBSSxVQUErQixDQUFDO0lBQ3BDLElBQUksU0FBUyxLQUFLLFFBQVE7UUFBRSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxhQUFhO1NBQ1IsSUFBSSxTQUFTLEtBQUssT0FBTztRQUM1QixhQUFhO1FBQ2IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2pELElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssU0FBUztRQUN4RCxhQUFhO1FBQ2IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3RELElBQUksU0FBUyxLQUFLLFFBQVE7UUFBRSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRCxJQUFJLFNBQVMsS0FBSyxLQUFLO1FBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7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