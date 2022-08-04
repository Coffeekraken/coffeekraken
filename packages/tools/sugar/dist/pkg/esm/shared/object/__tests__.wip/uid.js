"use strict";
module.exports = (__uid) => {
    describe('sugar.shared.object.uid', () => {
        it('Should encrypt the same object twice the same', (done) => {
            const obj = {
                param1: 'hello',
                param2: 'world coco',
            };
            const res1 = __uid(obj, 'somethingCool');
            const res2 = __uid(obj, 'somethingCool');
            expect(res1).toBe(res2);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDdkIsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUNyQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6RCxNQUFNLEdBQUcsR0FBRztnQkFDUixNQUFNLEVBQUUsT0FBTztnQkFDZixNQUFNLEVBQUUsWUFBWTthQUN2QixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUN6QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEIsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=