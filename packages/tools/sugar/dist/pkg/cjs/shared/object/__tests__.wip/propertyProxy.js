"use strict";
module.exports = (__propertyProxy) => {
    describe('sugar.shared.object.propertyProxy', () => {
        it('Should apply the property proxy correctly and detect the updated', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };
            __propertyProxy(obj1, 'hello.world', {
                get: (value) => {
                    return 'get ' + value;
                },
                set: (value) => {
                    return 'set ' + value;
                },
            });
            obj1.hello.world = 'lorem ipsum';
            const val = obj1.hello.world;
            expect(val).toBe('get set lorem ipsum');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7SUFDakMsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtRQUMvQyxFQUFFLENBQUMsa0VBQWtFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1RSxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDbkI7YUFDSixDQUFDO1lBRUYsZUFBZSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7Z0JBQ2pDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNYLE9BQU8sTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsQ0FBQztnQkFDRCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDWCxPQUFPLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQzFCLENBQUM7YUFDSixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7WUFDakMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFFN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXhDLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9