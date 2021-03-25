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
    Object.defineProperty(exports, "__esModule", { value: true });
    const typeof_1 = __importDefault(require("../value/typeof"));
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
        const _get = (s, k) => {
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
        const _set = (s, k, v) => {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNkRBQXVDO0lBa0R2QyxNQUFNLEVBQUUsR0FBVyxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDekQsUUFBUSxtQkFDTixRQUFRLEVBQUUsS0FBSyxJQUNaLFFBQVEsQ0FDWixDQUFDO1FBRUYsTUFBTSxTQUFTLEdBQUcsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRCxJQUFJLFVBQStCLENBQUM7UUFDcEMsSUFBSSxTQUFTLEtBQUssUUFBUTtZQUFFLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVELGFBQWE7YUFDUixJQUFJLFNBQVMsS0FBSyxPQUFPO1lBQzVCLGFBQWE7WUFDYixVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDakQsSUFBSSxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQ3hELGFBQWE7WUFDYixVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEQsSUFBSSxTQUFTLEtBQUssUUFBUTtZQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNELElBQUksU0FBUyxLQUFLLEtBQUs7WUFBRSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RCxhQUFhOztZQUNSLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJ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