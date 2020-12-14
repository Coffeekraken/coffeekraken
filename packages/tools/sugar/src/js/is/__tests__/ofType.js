(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __SLog = require('../../../node/log/SLog');
    module.exports = function (__isOfType) {
        describe('sugar.js.is.ofType', function () {
            it('Should detect the type of passed values correctly', function () {
                expect(__isOfType(true, 'Boolean')).toBe(true);
                expect(__isOfType(['item1'], 'Array')).toBe(true);
                expect(__isOfType({ property1: 'hello' }, 'Object')).toBe(true);
                expect(__isOfType(12, 'Number')).toBe(true);
                expect(__isOfType(12.34, 'Number')).toBe(true);
                expect(__isOfType(12, 'Integer')).toBe(true);
                expect(__isOfType(12.34, 'Integer')).toEqual({
                    $expected: { type: 'Integer' },
                    $received: { type: 'Number', value: 12.34 },
                    $issues: ['type']
                });
                expect(__isOfType('Hello world', 'String')).toBe(true);
                expect(__isOfType([10, 20, 45], 'Array<Number>')).toBe(true);
                expect(__isOfType([10, '20', 45], 'Array<Number>')).toEqual({
                    $expected: { type: 'Array<Number>' },
                    $received: { type: 'Array<Integer|String>', value: [10, '20', 45] },
                    $issues: ['type']
                });
                expect(__isOfType([
                    {
                        something: 'cool'
                    }
                ], 'Array<Object>')).toBe(true);
                expect(__isOfType(__SLog, 'SLog')).toBe(true);
                expect(__isOfType([__SLog], 'Array<SLog>')).toBe(true);
                expect(__isOfType({
                    something: __SLog
                }, 'Object<SLog>')).toBe(true);
                expect(__isOfType({
                    something: 'Hello world'
                }, 'Object<SLog>')).toEqual({
                    $expected: { type: 'Object<SLog>' },
                    $received: {
                        type: 'Object<String>',
                        value: { something: 'Hello world' }
                    },
                    $issues: ['type']
                });
            });
        });
    };
});
//# sourceMappingURL=module.js.map