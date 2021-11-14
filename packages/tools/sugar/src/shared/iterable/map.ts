import __typeOf from '../value/typeof';

/**
 * @name            map
 * @namespace            js.iterable
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * map(myStack, ({key, value}) => {
 *    return `${value} coco`;
 * });
 * // ['hello coco', 'world coco']
 *
 * @since         2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IMapFnSettings {
    newStack?: boolean;
}

export interface IMapCallbackObj {
    key: any;
    prop: any;
    value: any;
    i: number;
    idx: number;
}

export interface IMapCallbackFn {
    (metas: IMapCallbackObj): any;
}

export interface IMapFn {
    (
        stack: Iterable<any>,
        callback: IMapCallbackFn,
        settings?: IMapFnSettings,
    ): Promise<Iterable<any>>;
}

const fn: IMapFn = function (stack, callback, settings = {}) {
    settings = {
        newStack: false,
        ...settings,
    };

    const stackType = __typeOf(stack).toLowerCase();
    let loopOnKeys: (string | number)[];
    if (stackType === 'object') loopOnKeys = Object.keys(stack);
    // @ts-ignore
    else if (stackType === 'array')
        // @ts-ignore
        loopOnKeys = Array.from(Array(stack.length).keys());
    else if (stackType === 'number' || stackType === 'integer')
        // @ts-ignore
        loopOnKeys = Array.from(Array(Math.round(stack)).keys());
    else if (stackType === 'string') loopOnKeys = Array.from(stack);
    else if (stackType === 'set') loopOnKeys = Array.from(stack);
    // @ts-ignore
    else loopOnKeys = Array.from(stack.keys());

    // handle the forcing of "newStack" setting
    if (
        stackType === 'string' ||
        stackType === 'number' ||
        stackType === 'integer' ||
        stackType === 'set'
    )
        settings.newStack = true;

    // create a newStack by stack types
    let newStack: any = [];
    if (stackType === 'object') newStack = {};
    else if (stackType === 'map') newStack = new Map();
    else if (stackType === 'set') newStack = new Set();

    let value: any;
    let newValue: any;

    const _get: Function = (s, k) => {
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
    const _set: Function = (s, k, v) => {
        switch (__typeOf(s).toLowerCase()) {
            case 'array':
                if (settings.newStack === true) s.push(v);
                else s[k] = v;
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
        const key = loopOnKeys[i];
        value = _get(stack, key);
        newValue = callback({ key, prop: key, value, i, idx: i });
        if (newValue === -1) break;
        // @ts-ignore
        _set(settings.newStack ? newStack : stack, key, newValue);
    }

    if (stackType === 'string') {
        return newStack.join('');
    }
    return settings.newStack ? newStack : stack;
};
export default fn;
