"use strict";
module.exports = (__sprintf) => {
    describe('sugar.js.string.sprintf', () => {
        it('Should process the passed string correctly', done => {
            const res1 = __sprintf('Hello %s', 'world'); // => Hello world
            const res2 = __sprintf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
            const res4 = __sprintf('Hello %(first)s, I\'m %(name)s', { first: 'world', name: 'John Doe' }); // Hello world, I'm John Doe
            expect(res1).toBe('Hello world');
            expect(res2).toBe("Hello world, I'm John Doe");
            expect(res4).toBe("Hello world, I'm John Doe");
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFFN0IsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUV2QyxFQUFFLENBQUMsNENBQTRDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFdEQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtZQUM5RCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO1lBQzlGLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7WUFHNUgsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBRy9DLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9