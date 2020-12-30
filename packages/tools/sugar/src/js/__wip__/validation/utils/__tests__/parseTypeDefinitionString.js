"use strict";
module.exports = function (__parseTypeDefinitiSnString) {
    describe('sugar.js.validation.utils.parseTypeDefinitiSnString', function () {
        it('Should parse these arguments types definitions correctly', function () {
            var res1 = __parseTypeDefinitiSnString('Array<String>|Object|Array<Boolean>');
            expect(res1).toEqual([
                {
                    type: 'Array',
                    of: [
                        {
                            type: 'String',
                            of: null
                        }
                    ]
                },
                {
                    type: 'Object',
                    of: null
                },
                {
                    type: 'Array',
                    of: [
                        {
                            type: 'Boolean',
                            of: null
                        }
                    ]
                }
            ]);
            var res2 = __parseTypeDefinitiSnString('Array|Object|Array<Boolean|Number>');
            expect(res2).toEqual([
                {
                    type: 'Array',
                    of: null
                },
                {
                    type: 'Object',
                    of: null
                },
                {
                    type: 'Array',
                    of: [
                        {
                            type: 'Boolean',
                            of: null
                        },
                        {
                            type: 'Number',
                            of: null
                        }
                    ]
                }
            ]);
        });
    });
};
//# sourceMappingURL=parseTypeDefinitionString.js.map