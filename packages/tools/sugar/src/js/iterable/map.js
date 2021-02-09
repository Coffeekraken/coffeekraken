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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLDZEQUF1QztBQUd2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sRUFBRSxHQUFXLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN6RCxRQUFRLG1CQUNOLFFBQVEsRUFBRSxLQUFLLElBQ1osUUFBUSxDQUNaLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hELElBQUksVUFBK0IsQ0FBQztJQUNwQyxJQUFJLFNBQVMsS0FBSyxRQUFRO1FBQUUsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsYUFBYTtTQUNSLElBQUksU0FBUyxLQUFLLE9BQU87UUFDNUIsYUFBYTtRQUNiLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNqRCxJQUFJLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLFNBQVM7UUFDeEQsYUFBYTtRQUNiLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN0RCxJQUFJLFNBQVMsS0FBSyxRQUFRO1FBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0QsSUFBSSxTQUFTLEtBQUssS0FBSztRQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELGFBQWE7O1FBQ1IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFM0MsMkNBQTJDO0lBQzNDLElBQ0UsU0FBUyxLQUFLLFFBQVE7UUFDdEIsU0FBUyxLQUFLLFFBQVE7UUFDdEIsU0FBUyxLQUFLLFNBQVM7UUFDdkIsU0FBUyxLQUFLLEtBQUs7UUFFbkIsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFM0IsbUNBQW1DO0lBQ25DLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQztJQUN2QixJQUFJLFNBQVMsS0FBSyxRQUFRO1FBQUUsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNyQyxJQUFJLFNBQVMsS0FBSyxLQUFLO1FBQUUsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7U0FDOUMsSUFBSSxTQUFTLEtBQUssS0FBSztRQUFFLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBRW5ELElBQUksS0FBVSxDQUFDO0lBQ2YsSUFBSSxRQUFhLENBQUM7SUFFbEIsSUFBSSxJQUFJLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsUUFBUSxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2pDLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxRQUFRO2dCQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxDQUFDLENBQUM7Z0JBQ1QsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxTQUFTO2dCQUNaLE9BQU8sQ0FBQyxDQUFDO2dCQUNULE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNO1lBQ1IsS0FBSyxLQUFLO2dCQUNSLE9BQU8sQ0FBQyxDQUFDO2dCQUNULE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQztJQUNGLElBQUksSUFBSSxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQixRQUFRLGdCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDakMsS0FBSyxPQUFPO2dCQUNWLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxJQUFJO29CQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUNyQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVCxNQUFNO1lBQ1IsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssUUFBUTtnQkFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QixRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDO1lBQUUsTUFBTTtRQUMzQixhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMzRDtJQUVELElBQUksU0FBUyxLQUFLLFFBQVEsRUFBRTtRQUMxQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDMUI7SUFDRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzlDLENBQUMsQ0FBQztBQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9