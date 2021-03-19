"use strict";
module.exports = (__propertyProxy) => {
    describe('sugar.js.object.propertyProxy', () => {
        it('Should apply the property proxy correctly and detect the updated', done => {
            const obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            };
            __propertyProxy(obj1, 'hello.world', {
                get: value => {
                    return 'get ' + value;
                },
                set: value => {
                    return 'set ' + value;
                }
            });
            obj1.hello.world = 'lorem ipsum';
            const val = obj1.hello.world;
            expect(val).toBe('get set lorem ipsum');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtJQUVuQyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBRTdDLEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUU1RSxNQUFNLElBQUksR0FBRztnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDakI7YUFDRixDQUFDO1lBRUYsZUFBZSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7Z0JBQ25DLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDWCxPQUFPLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNYLE9BQU8sTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsQ0FBQzthQUNGLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztZQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUU3QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFeEMsSUFBSSxFQUFFLENBQUM7UUFFVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBR0wsQ0FBQyxDQUFBIn0=