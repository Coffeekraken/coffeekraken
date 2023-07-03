"use strict";
module.exports = (__ensureExists) => {
    describe('sugar.shared.object.ensureExists', () => {
        it('Should have created the passed dotted path inside the object', (done) => {
            const obj1 = {
                hello: 'world',
            };
            __ensureExists(obj1, 'coco.yop', {});
            expect(obj1).toEqual({
                hello: 'world',
                coco: {
                    yop: {},
                },
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7SUFDaEMsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtRQUM5QyxFQUFFLENBQUMsOERBQThELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4RSxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUUsT0FBTzthQUNqQixDQUFDO1lBRUYsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDakIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFO29CQUNGLEdBQUcsRUFBRSxFQUFFO2lCQUNWO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=