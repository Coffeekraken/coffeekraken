"use strict";
module.exports = (__uid) => {
    describe('sugar.js.object.uid', () => {
        it('Should encrypt the same object twice the same', done => {
            const obj = {
                param1: 'hello',
                param2: 'world coco'
            };
            const res1 = __uid(obj, 'somethingCool');
            const res2 = __uid(obj, 'somethingCool');
            expect(res1).toBe(res2);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFFekIsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtRQUVuQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFekQsTUFBTSxHQUFHLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsTUFBTSxFQUFFLFlBQVk7YUFDckIsQ0FBQTtZQUVELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDekMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksRUFBRSxDQUFDO1FBRVQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUdMLENBQUMsQ0FBQSJ9