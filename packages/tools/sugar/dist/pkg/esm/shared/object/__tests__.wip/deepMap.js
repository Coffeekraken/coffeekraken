"use strict";
module.exports = (__deepMap) => {
    describe('sugar.shared.object.deepMap', () => {
        it('Should map the passed objects correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    world: 'Yop',
                },
            };
            const res = __deepMap(obj1, (value, prop, fullPath) => {
                return `~ ${value}`;
            });
            expect(res).toEqual({
                hello: {
                    world: '~ hello world',
                },
                plop: {
                    world: '~ Yop',
                },
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFDM0IsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuRCxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsS0FBSztpQkFDZjthQUNKLENBQUM7WUFFRixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDbEQsT0FBTyxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDaEIsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxlQUFlO2lCQUN6QjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLE9BQU87aUJBQ2pCO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=