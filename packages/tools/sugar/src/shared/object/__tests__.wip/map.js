"use strict";
module.exports = (__map) => {
    describe('sugar.js.object.map', () => {
        it('Should be processed correctly using the map function', done => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou'
                },
                plop: {
                    array: [0, 1, 2]
                }
            };
            expect(__map(obj1, (value, prop) => {
                return prop === 'plop' ? 'yeah' : value;
            })).toEqual({
                hello: {
                    world: 'hello world',
                    plop: 'youhou'
                },
                plop: 'yeah'
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFFekIsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtRQUVuQyxFQUFFLENBQUMsc0RBQXNELEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFaEUsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxhQUFhO29CQUNwQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2pCO2FBQ0YsQ0FBQztZQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNqQyxPQUFPLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNWLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsSUFBSSxFQUFFLE1BQU07YUFDYixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUVULENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFHTCxDQUFDLENBQUEifQ==