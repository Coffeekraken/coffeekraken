"use strict";
module.exports = (__delete) => {
    describe('sugar.js.object.delete', () => {
        it('Should delete correctly a simple property', () => {
            const obj = {
                hello: {
                    world: 'plop'
                },
                plop: 'yop'
            };
            expect(__delete(obj, 'hello.world')).toEqual({
                hello: {},
                plop: 'yop'
            });
        });
        it('Should delete correctly a property in an array', () => {
            const obj = {
                hello: {
                    world: ['one', 'two', 'three', 'four', 'five']
                },
                plop: 'yop'
            };
            const deletedObj = __delete(obj, 'hello.world.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'three', 'four', 'five']
                },
                plop: 'yop'
            });
        });
        it('Should delete correctly a property in an object that is inside an array', () => {
            const obj = {
                hello: {
                    world: ['one', 'two', {
                            coco: 'yeah',
                            del: {
                                branch: 'master'
                            }
                        }, 'four', 'five']
                },
                plop: 'yop'
            };
            const deletedObj = __delete(obj, 'hello.world.2.del.branch');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'two', {
                            coco: 'yeah',
                            del: {}
                        }, 'four', 'five']
                },
                plop: 'yop'
            });
        });
        it('Should delete correctly a property in an array that is inside another array', () => {
            const obj = {
                hello: {
                    world: ['one', 'two', [
                            '01', '02', '03', '04'
                        ], 'four', 'five']
                },
                plop: 'yop'
            };
            const deletedObj = __delete(obj, 'hello.world.2.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'two', [
                            '01', '03', '04'
                        ], 'four', 'five']
                },
                plop: 'yop'
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7SUFFNUIsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUV0QyxFQUFFLENBQUMsMkNBQTJDLEVBQUUsR0FBRyxFQUFFO1lBRW5ELE1BQU0sR0FBRyxHQUFHO2dCQUNWLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsTUFBTTtpQkFDZDtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNaLENBQUM7WUFFRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDM0MsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLEVBQUU7WUFFeEQsTUFBTSxHQUFHLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7aUJBQy9DO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ1osQ0FBQztZQUVGLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDekIsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxHQUFHLEVBQUU7WUFFakYsTUFBTSxHQUFHLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7NEJBQ3BCLElBQUksRUFBRSxNQUFNOzRCQUNaLEdBQUcsRUFBRTtnQ0FDSCxNQUFNLEVBQUUsUUFBUTs2QkFDakI7eUJBQ0YsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO2lCQUNuQjtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNaLENBQUM7WUFFRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDekIsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7NEJBQ3BCLElBQUksRUFBRSxNQUFNOzRCQUNaLEdBQUcsRUFBRSxFQUFFO3lCQUNSLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2RUFBNkUsRUFBRSxHQUFHLEVBQUU7WUFFckYsTUFBTSxHQUFHLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7NEJBQ3BCLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7eUJBQ3ZCLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDO1lBRUYsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pCLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFOzRCQUNwQixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7eUJBQ2pCLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=