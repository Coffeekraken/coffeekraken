"use strict";
module.exports = (__deepProxy) => {
    describe('sugar.shared.object.deepProxy', () => {
        it('Should detect the updates in the object correctly', (done) => {
            let updatesCount = 0;
            const obj1 = __deepProxy({
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            }, (obj) => {
                if (obj.action === 'get')
                    return;
                updatesCount++;
            });
            obj1.hello.world = 'Coco';
            obj1.plop.array.push('coco');
            expect(updatesCount).toBe(2);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFDN0IsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtRQUMzQyxFQUFFLENBQUMsbURBQW1ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3RCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7WUFFckIsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUNwQjtnQkFDSSxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDbkI7YUFDSixFQUNELENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ0osSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUs7b0JBQUUsT0FBTztnQkFDakMsWUFBWSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUNKLENBQUM7WUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0IsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=