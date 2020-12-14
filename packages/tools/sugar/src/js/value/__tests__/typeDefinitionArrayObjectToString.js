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
    module.exports = function (__typeDefinitionArrayObjectToString) {
        describe('sugar.js.value.typeDefinitionArrayObjectToString', function () {
            it('Should return the correct typeDefinitionArrayObjectToString of the passed values', function () {
                expect(__typeDefinitionArrayObjectToString([
                    {
                        type: 'Array',
                        of: [
                            {
                                type: 'Boolean'
                            },
                            {
                                type: 'String'
                            }
                        ]
                    }
                ])).toEqual('Array<Boolean|String>');
                expect(__typeDefinitionArrayObjectToString([
                    {
                        type: 'Array',
                        of: [
                            {
                                type: 'Boolean'
                            },
                            {
                                type: 'String'
                            }
                        ]
                    },
                    {
                        type: 'Object',
                        of: [
                            {
                                type: 'Number'
                            },
                            {
                                type: 'String'
                            }
                        ]
                    }
                ])).toEqual('Array<Boolean|String>|Object<Number|String>');
            });
        });
    };
});
//# sourceMappingURL=module.js.map