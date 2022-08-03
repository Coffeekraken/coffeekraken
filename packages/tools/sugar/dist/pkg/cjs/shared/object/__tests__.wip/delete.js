"use strict";
module.exports = (__delete) => {
    describe('sugar.shared.object.delete', () => {
        it('Should delete correctly a simple property', () => {
            const obj = {
                hello: {
                    world: 'plop',
                },
                plop: 'yop',
            };
            expect(__delete(obj, 'hello.world')).toEqual({
                hello: {},
                plop: 'yop',
            });
        });
        it('Should delete correctly a property in an array', () => {
            const obj = {
                hello: {
                    world: ['one', 'two', 'three', 'four', 'five'],
                },
                plop: 'yop',
            };
            const deletedObj = __delete(obj, 'hello.world.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'three', 'four', 'five'],
                },
                plop: 'yop',
            });
        });
        it('Should delete correctly a property in an object that is inside an array', () => {
            const obj = {
                hello: {
                    world: [
                        'one',
                        'two',
                        {
                            coco: 'yeah',
                            del: {
                                branch: 'master',
                            },
                        },
                        'four',
                        'five',
                    ],
                },
                plop: 'yop',
            };
            const deletedObj = __delete(obj, 'hello.world.2.del.branch');
            expect(deletedObj).toEqual({
                hello: {
                    world: [
                        'one',
                        'two',
                        {
                            coco: 'yeah',
                            del: {},
                        },
                        'four',
                        'five',
                    ],
                },
                plop: 'yop',
            });
        });
        it('Should delete correctly a property in an array that is inside another array', () => {
            const obj = {
                hello: {
                    world: [
                        'one',
                        'two',
                        ['01', '02', '03', '04'],
                        'four',
                        'five',
                    ],
                },
                plop: 'yop',
            };
            const deletedObj = __delete(obj, 'hello.world.2.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'two', ['01', '03', '04'], 'four', 'five'],
                },
                plop: 'yop',
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7SUFDMUIsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtRQUN4QyxFQUFFLENBQUMsMkNBQTJDLEVBQUUsR0FBRyxFQUFFO1lBQ2pELE1BQU0sR0FBRyxHQUFHO2dCQUNSLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsTUFBTTtpQkFDaEI7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1lBRUYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pDLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1lBQ3RELE1BQU0sR0FBRyxHQUFHO2dCQUNSLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO2lCQUNqRDtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7WUFFRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7aUJBQzFDO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUVBQXlFLEVBQUUsR0FBRyxFQUFFO1lBQy9FLE1BQU0sR0FBRyxHQUFHO2dCQUNSLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUU7d0JBQ0gsS0FBSzt3QkFDTCxLQUFLO3dCQUNMOzRCQUNJLElBQUksRUFBRSxNQUFNOzRCQUNaLEdBQUcsRUFBRTtnQ0FDRCxNQUFNLEVBQUUsUUFBUTs2QkFDbkI7eUJBQ0o7d0JBQ0QsTUFBTTt3QkFDTixNQUFNO3FCQUNUO2lCQUNKO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztZQUVGLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN2QixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFO3dCQUNILEtBQUs7d0JBQ0wsS0FBSzt3QkFDTDs0QkFDSSxJQUFJLEVBQUUsTUFBTTs0QkFDWixHQUFHLEVBQUUsRUFBRTt5QkFDVjt3QkFDRCxNQUFNO3dCQUNOLE1BQU07cUJBQ1Q7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2RUFBNkUsRUFBRSxHQUFHLEVBQUU7WUFDbkYsTUFBTSxHQUFHLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRTt3QkFDSCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7d0JBQ3hCLE1BQU07d0JBQ04sTUFBTTtxQkFDVDtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7WUFFRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDdkIsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7aUJBQzVEO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9