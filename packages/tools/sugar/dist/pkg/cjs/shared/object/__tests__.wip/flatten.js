"use strict";
module.exports = (__flatten) => {
    describe('sugar.shared.object.flatten', () => {
        it('Should flatten the object correctly', (done) => {
            const obj1 = __flatten({
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            }, '_', false);
            expect(obj1).toEqual({
                hello_world: 'hello world',
                plop_array: [0, 1, 2],
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFDM0IsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMscUNBQXFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQ2xCO2dCQUNJLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsYUFBYTtpQkFDdkI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNuQjthQUNKLEVBQ0QsR0FBRyxFQUNILEtBQUssQ0FDUixDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDakIsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9