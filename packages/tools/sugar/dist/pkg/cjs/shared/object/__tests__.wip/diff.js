"use strict";
module.exports = (__diff) => {
    describe('sugar.shared.object.diff', () => {
        it('Should merge the passed objects correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    yop: 'coco',
                },
                param: {
                    three: 'nelson',
                },
                yes: true,
            };
            const obj2 = {
                hello: {
                    coco: 'coco',
                },
                param: {
                    three: 'nelson',
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            };
            const result = __diff(obj1, obj2);
            expect(result).toEqual({
                hello: {
                    coco: 'coco',
                },
                param: {
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            });
            const result2 = __diff(obj1, obj2, {
                added: false,
            });
            expect(result2).toEqual({
                yes: false,
            });
            const result3 = __diff(obj1, obj2, {
                deleted: true,
            });
            expect(result3).toEqual({
                hello: {
                    world: 'hello world',
                    coco: 'coco',
                },
                plop: {
                    yop: 'coco',
                },
                param: {
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            });
            const result4 = __diff(obj1, obj2, {
                equals: true,
            });
            expect(result4).toEqual({
                hello: {
                    coco: 'coco',
                },
                param: {
                    three: 'nelson',
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            });
            const result5 = __diff(obj1, obj2, {
                updated: false,
            });
            expect(result5).toEqual({
                hello: {
                    coco: 'coco',
                },
                param: {
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDeEIsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUN0QyxFQUFFLENBQUMsMkNBQTJDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyRCxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCO2dCQUNELElBQUksRUFBRTtvQkFDRixHQUFHLEVBQUUsTUFBTTtpQkFDZDtnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLFFBQVE7aUJBQ2xCO2dCQUNELEdBQUcsRUFBRSxJQUFJO2FBQ1osQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHO2dCQUNULEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsTUFBTTtpQkFDZjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsTUFBTSxFQUFFO3dCQUNKLElBQUksRUFBRSxRQUFRO3FCQUNqQjtpQkFDSjtnQkFDRCxLQUFLLEVBQUUsT0FBTztnQkFDZCxHQUFHLEVBQUUsS0FBSzthQUNiLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsTUFBTTtpQkFDZjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsTUFBTSxFQUFFO3dCQUNKLElBQUksRUFBRSxRQUFRO3FCQUNqQjtpQkFDSjtnQkFDRCxLQUFLLEVBQUUsT0FBTztnQkFDZCxHQUFHLEVBQUUsS0FBSzthQUNiLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO2dCQUMvQixLQUFLLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BCLEdBQUcsRUFBRSxLQUFLO2FBQ2IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7Z0JBQy9CLE9BQU8sRUFBRSxJQUFJO2FBQ2hCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLE1BQU07aUJBQ2Y7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEdBQUcsRUFBRSxNQUFNO2lCQUNkO2dCQUNELEtBQUssRUFBRTtvQkFDSCxNQUFNLEVBQUU7d0JBQ0osSUFBSSxFQUFFLFFBQVE7cUJBQ2pCO2lCQUNKO2dCQUNELEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxLQUFLO2FBQ2IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7Z0JBQy9CLE1BQU0sRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDcEIsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxNQUFNO2lCQUNmO2dCQUNELEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsUUFBUTtvQkFDZixNQUFNLEVBQUU7d0JBQ0osSUFBSSxFQUFFLFFBQVE7cUJBQ2pCO2lCQUNKO2dCQUNELEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxLQUFLO2FBQ2IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7Z0JBQy9CLE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BCLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsTUFBTTtpQkFDZjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsTUFBTSxFQUFFO3dCQUNKLElBQUksRUFBRSxRQUFRO3FCQUNqQjtpQkFDSjtnQkFDRCxLQUFLLEVBQUUsT0FBTzthQUNqQixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==