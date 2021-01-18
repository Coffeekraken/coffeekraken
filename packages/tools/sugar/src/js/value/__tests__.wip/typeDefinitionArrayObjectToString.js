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
//# sourceMappingURL=typeDefinitionArrayObjectToString.js.map