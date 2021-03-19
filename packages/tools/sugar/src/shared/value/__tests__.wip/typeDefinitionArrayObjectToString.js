"use strict";
module.exports = (__typeDefinitionArrayObjectToString) => {
    describe('sugar.js.value.typeDefinitionArrayObjectToString', () => {
        it('Should return the correct typeDefinitionArrayObjectToString of the passed values', () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsRUFBRTtJQUN2RCxRQUFRLENBQUMsa0RBQWtELEVBQUUsR0FBRyxFQUFFO1FBQ2hFLEVBQUUsQ0FBQyxrRkFBa0YsRUFBRSxHQUFHLEVBQUU7WUFDMUYsTUFBTSxDQUNKLG1DQUFtQyxDQUFDO2dCQUNsQztvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixFQUFFLEVBQUU7d0JBQ0Y7NEJBQ0UsSUFBSSxFQUFFLFNBQVM7eUJBQ2hCO3dCQUNEOzRCQUNFLElBQUksRUFBRSxRQUFRO3lCQUNmO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUNILENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFbkMsTUFBTSxDQUNKLG1DQUFtQyxDQUFDO2dCQUNsQztvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixFQUFFLEVBQUU7d0JBQ0Y7NEJBQ0UsSUFBSSxFQUFFLFNBQVM7eUJBQ2hCO3dCQUNEOzRCQUNFLElBQUksRUFBRSxRQUFRO3lCQUNmO3FCQUNGO2lCQUNGO2dCQUNEO29CQUNFLElBQUksRUFBRSxRQUFRO29CQUNkLEVBQUUsRUFBRTt3QkFDRjs0QkFDRSxJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsUUFBUTt5QkFDZjtxQkFDRjtpQkFDRjthQUNGLENBQUMsQ0FDSCxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==