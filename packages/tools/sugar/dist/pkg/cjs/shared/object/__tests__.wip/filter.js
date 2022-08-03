"use strict";
module.exports = (__filter) => {
    describe('sugar.shared.object.filter', () => {
        it('Should filter the object correctly', (done) => {
            const obj1 = __filter({
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            }, (item, name) => {
                return name === 'hello';
            });
            expect(obj1).toEqual({
                hello: {
                    world: 'hello world',
                },
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7SUFDMUIsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtRQUN4QyxFQUFFLENBQUMsb0NBQW9DLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM5QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQ2pCO2dCQUNJLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsYUFBYTtpQkFDdkI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNuQjthQUNKLEVBQ0QsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxJQUFJLEtBQUssT0FBTyxDQUFDO1lBQzVCLENBQUMsQ0FDSixDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDakIsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxhQUFhO2lCQUN2QjthQUNKLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9