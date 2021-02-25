// @shared
import __typeOf from '../value/typeof';
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
    const stackType = __typeOf(stack).toLowerCase();
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
        switch (__typeOf(s).toLowerCase()) {
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
        switch (__typeOf(s).toLowerCase()) {
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
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFFVixPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUd2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sRUFBRSxHQUFXLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN6RCxRQUFRLG1CQUNOLFFBQVEsRUFBRSxLQUFLLElBQ1osUUFBUSxDQUNaLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsSUFBSSxVQUErQixDQUFDO0lBQ3BDLElBQUksU0FBUyxLQUFLLFFBQVE7UUFBRSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxhQUFhO1NBQ1IsSUFBSSxTQUFTLEtBQUssT0FBTztRQUM1QixhQUFhO1FBQ2IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2pELElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssU0FBUztRQUN4RCxhQUFhO1FBQ2IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3RELElBQUksU0FBUyxLQUFLLFFBQVE7UUFBRSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRCxJQUFJLFNBQVMsS0FBSyxLQUFLO1FBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0QsYUFBYTs7UUFD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