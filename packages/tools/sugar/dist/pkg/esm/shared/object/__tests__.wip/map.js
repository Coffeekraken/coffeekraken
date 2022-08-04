"use strict";
module.exports = (__map) => {
    describe('sugar.shared.object.map', () => {
        it('Should be processed correctly using the map function', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };
            expect(__map(obj1, (value, prop) => {
                return prop === 'plop' ? 'yeah' : value;
            })).toEqual({
                hello: {
                    world: 'hello world',
                    plop: 'youhou',
                },
                plop: 'yeah',
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDdkIsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUNyQyxFQUFFLENBQUMsc0RBQXNELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoRSxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ25CO2FBQ0osQ0FBQztZQUVGLE1BQU0sQ0FDRixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUN4QixPQUFPLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUNMLENBQUMsT0FBTyxDQUFDO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=