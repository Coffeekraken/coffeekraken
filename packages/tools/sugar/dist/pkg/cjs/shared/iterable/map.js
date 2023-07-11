"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeof_js_1 = __importDefault(require("../type/typeof.js"));
const fn = function (stack, callback, settings = {}) {
    settings = Object.assign({ newStack: false }, settings);
    const stackType = (0, typeof_js_1.default)(stack).toLowerCase();
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
    const _get = (s, k) => {
        switch ((0, typeof_js_1.default)(s).toLowerCase()) {
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
    const _set = (s, k, v) => {
        switch ((0, typeof_js_1.default)(s).toLowerCase()) {
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
        const key = loopOnKeys[i];
        value = _get(stack, key);
        newValue = callback({ key, prop: key, value, i, idx: i });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXlDO0FBMER6QyxNQUFNLEVBQUUsR0FBVyxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkQsUUFBUSxtQkFDSixRQUFRLEVBQUUsS0FBSyxJQUNaLFFBQVEsQ0FDZCxDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsSUFBQSxtQkFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hELElBQUksVUFBK0IsQ0FBQztJQUNwQyxJQUFJLFNBQVMsS0FBSyxRQUFRO1FBQUUsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsYUFBYTtTQUNSLElBQUksU0FBUyxLQUFLLE9BQU87UUFDMUIsYUFBYTtRQUNiLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNuRCxJQUFJLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLFNBQVM7UUFDdEQsYUFBYTtRQUNiLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN4RCxJQUFJLFNBQVMsS0FBSyxRQUFRO1FBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0QsSUFBSSxTQUFTLEtBQUssS0FBSztRQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELGFBQWE7O1FBQ1IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElB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