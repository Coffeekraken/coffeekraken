"use strict";
module.exports = (__deleteProperty) => {
    describe('sugar.shared.object.delete', () => {
        it('Should delete correctly a simple property', () => {
            const obj = {
                hello: {
                    world: 'plop',
                },
                plop: 'yop',
            };
            expect(__deleteProperty(obj, 'hello.world')).toEqual({
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
            const deletedObj = __deleteProperty(obj, 'hello.world.1');
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
            const deletedObj = __deleteProperty(obj, 'hello.world.2.del.branch');
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
            const deletedObj = __deleteProperty(obj, 'hello.world.2.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'two', ['01', '03', '04'], 'four', 'five'],
                },
                plop: 'yop',
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtJQUNsQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBQ3hDLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxNQUFNO2lCQUNoQjtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7WUFFRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNqRCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLEdBQUcsRUFBRTtZQUN0RCxNQUFNLEdBQUcsR0FBRztnQkFDUixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztpQkFDakQ7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1lBRUYsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzFELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7aUJBQzFDO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUVBQXlFLEVBQUUsR0FBRyxFQUFFO1lBQy9FLE1BQU0sR0FBRyxHQUFHO2dCQUNSLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUU7d0JBQ0gsS0FBSzt3QkFDTCxLQUFLO3dCQUNMOzRCQUNJLElBQUksRUFBRSxNQUFNOzRCQUNaLEdBQUcsRUFBRTtnQ0FDRCxNQUFNLEVBQUUsUUFBUTs2QkFDbkI7eUJBQ0o7d0JBQ0QsTUFBTTt3QkFDTixNQUFNO3FCQUNUO2lCQUNKO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztZQUVGLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUU7d0JBQ0gsS0FBSzt3QkFDTCxLQUFLO3dCQUNMOzRCQUNJLElBQUksRUFBRSxNQUFNOzRCQUNaLEdBQUcsRUFBRSxFQUFFO3lCQUNWO3dCQUNELE1BQU07d0JBQ04sTUFBTTtxQkFDVDtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDZFQUE2RSxFQUFFLEdBQUcsRUFBRTtZQUNuRixNQUFNLEdBQUcsR0FBRztnQkFDUixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFO3dCQUNILEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzt3QkFDeEIsTUFBTTt3QkFDTixNQUFNO3FCQUNUO2lCQUNKO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQztZQUVGLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO2lCQUM1RDtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==