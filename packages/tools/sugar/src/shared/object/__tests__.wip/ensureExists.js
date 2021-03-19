"use strict";
module.exports = (__ensureExists) => {
    describe('sugar.js.object.ensureExists', () => {
        it('Should have created the passed dotted path inside the object', done => {
            const obj1 = {
                hello: 'world'
            };
            __ensureExists(obj1, 'coco.yop', {});
            expect(obj1).toEqual({
                hello: 'world',
                coco: {
                    yop: {}
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlRXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7SUFFbEMsUUFBUSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtRQUk1QyxFQUFFLENBQUMsOERBQThELEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFeEUsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFLE9BQU87YUFDZixDQUFDO1lBRUYsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFO29CQUNKLEdBQUcsRUFBRSxFQUFFO2lCQUNSO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFFVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBR0wsQ0FBQyxDQUFBIn0=