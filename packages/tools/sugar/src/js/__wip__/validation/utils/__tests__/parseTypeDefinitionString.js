"use strict";
module.exports = (__parseTypeDefinitiSnString) => {
    describe('sugar.js.validation.utils.parseTypeDefinitiSnString', () => {
        it('Should parse these arguments types definitions correctly', () => {
            const res1 = __parseTypeDefinitiSnString('Array<String>|Object|Array<Boolean>');
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
            const res2 = __parseTypeDefinitiSnString('Array|Object|Array<Boolean|Number>');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlRGVmaW5pdGlvblN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhcnNlVHlwZURlZmluaXRpb25TdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxFQUFFO0lBQy9DLFFBQVEsQ0FBQyxxREFBcUQsRUFBRSxHQUFHLEVBQUU7UUFDbkUsRUFBRSxDQUFDLDBEQUEwRCxFQUFFLEdBQUcsRUFBRTtZQUNsRSxNQUFNLElBQUksR0FBRywyQkFBMkIsQ0FDdEMscUNBQXFDLENBQ3RDLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNuQjtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixFQUFFLEVBQUU7d0JBQ0Y7NEJBQ0UsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsRUFBRSxFQUFFLElBQUk7eUJBQ1Q7cUJBQ0Y7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsRUFBRSxFQUFFLElBQUk7aUJBQ1Q7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsRUFBRSxFQUFFO3dCQUNGOzRCQUNFLElBQUksRUFBRSxTQUFTOzRCQUNmLEVBQUUsRUFBRSxJQUFJO3lCQUNUO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLEdBQUcsMkJBQTJCLENBQ3RDLG9DQUFvQyxDQUNyQyxDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkI7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsRUFBRSxFQUFFLElBQUk7aUJBQ1Q7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsRUFBRSxFQUFFLElBQUk7aUJBQ1Q7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsRUFBRSxFQUFFO3dCQUNGOzRCQUNFLElBQUksRUFBRSxTQUFTOzRCQUNmLEVBQUUsRUFBRSxJQUFJO3lCQUNUO3dCQUNEOzRCQUNFLElBQUksRUFBRSxRQUFROzRCQUNkLEVBQUUsRUFBRSxJQUFJO3lCQUNUO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9