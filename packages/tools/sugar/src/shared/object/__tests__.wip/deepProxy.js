"use strict";
module.exports = (__deepProxy) => {
    describe('sugar.js.object.deepProxy', () => {
        it('Should detect the updates in the object correctly', (done) => {
            let updatesCount = 0;
            const obj1 = __deepProxy({
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcFByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcFByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFDL0IsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsbURBQW1ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7WUFFckIsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUN0QjtnQkFDRSxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDakI7YUFDRixFQUNELENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ04sSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUs7b0JBQUUsT0FBTztnQkFDakMsWUFBWSxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUNGLENBQUM7WUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0IsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=