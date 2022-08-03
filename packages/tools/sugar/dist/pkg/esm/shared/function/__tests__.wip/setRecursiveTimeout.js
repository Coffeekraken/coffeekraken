"use strict";
module.exports = (__setRecursiveTimeout) => {
    describe('sugar.js.function.setRecursiveTimeout', () => {
        let calledCount = 0;
        __setRecursiveTimeout(() => {
            calledCount++;
        }, 100, 1000);
        it('Sould have called the function 10 times in 1s', done => {
            setTimeout(() => {
                expect(calledCount).toBe(10);
                done();
            }, 1100);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMscUJBQXFCLEVBQUUsRUFBRTtJQUV6QyxRQUFRLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1FBRXJELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUVwQixxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7WUFDekIsV0FBVyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVkLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUV6RCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUE7SUFFSixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9