"use strict";
module.exports = (__deepize) => {
    describe('sugar.shared.object.deepize', () => {
        it('Should deepize the passed objects correctly', (done) => {
            const obj1 = {
                'hello.world': 'coco',
                'something.else': true,
            };
            const res = __deepize(obj1);
            expect(res).toEqual({
                hello: {
                    world: 'coco',
                },
                something: {
                    else: true,
                },
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFDM0IsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsNkNBQTZDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2RCxNQUFNLElBQUksR0FBRztnQkFDVCxhQUFhLEVBQUUsTUFBTTtnQkFDckIsZ0JBQWdCLEVBQUUsSUFBSTthQUN6QixDQUFDO1lBRUYsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsTUFBTTtpQkFDaEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLElBQUksRUFBRSxJQUFJO2lCQUNiO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=