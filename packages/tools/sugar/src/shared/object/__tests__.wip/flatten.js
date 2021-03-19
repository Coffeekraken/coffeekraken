"use strict";
module.exports = (__flatten) => {
    describe('sugar.js.object.flatten', () => {
        it('Should flatten the object correctly', done => {
            const obj1 = __flatten({
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            }, '_', false);
            expect(obj1).toEqual({
                'hello_world': 'hello world',
                'plop_array': [0, 1, 2]
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUU3QixRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBRXZDLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUUvQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ3JCLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsYUFBYTtpQkFDckI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNqQjthQUNGLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWYsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBRVQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUdMLENBQUMsQ0FBQSJ9