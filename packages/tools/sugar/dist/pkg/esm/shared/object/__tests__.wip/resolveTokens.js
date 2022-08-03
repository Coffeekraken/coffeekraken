"use strict";
module.exports = (__resolveTokens) => {
    describe('sugar.shared.object.resolveTokens', () => {
        it('Should apply the proxy correctly and return the good value when is some tokens', (done) => {
            const obj1 = __resolveTokens({
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                    nelson: '{this.hello.world}',
                },
            });
            expect(obj1.plop.array).toEqual([0, 1, 2]);
            expect(obj1.plop.nelson).toBe('hello world');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7SUFDakMsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtRQUMvQyxFQUFFLENBQUMsZ0ZBQWdGLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxRixNQUFNLElBQUksR0FBRyxlQUFlLENBQUM7Z0JBQ3pCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsYUFBYTtpQkFDdkI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoQixNQUFNLEVBQUUsb0JBQW9CO2lCQUMvQjthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFN0MsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=