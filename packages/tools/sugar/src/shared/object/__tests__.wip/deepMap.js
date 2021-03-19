"use strict";
module.exports = (__deepMap) => {
    describe('sugar.js.object.deepMap', () => {
        it('Should map the passed objects correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {
                    world: 'Yop'
                }
            };
            const res = __deepMap(obj1, (value, prop, fullPath) => {
                return `~ ${value}`;
            });
            expect(res).toEqual({
                hello: {
                    world: '~ hello world'
                },
                plop: {
                    world: '~ Yop'
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUM3QixRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBQ3ZDLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JELE1BQU0sSUFBSSxHQUFHO2dCQUNYLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsYUFBYTtpQkFDckI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxLQUFLO2lCQUNiO2FBQ0YsQ0FBQztZQUVGLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNwRCxPQUFPLEtBQUssS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNsQixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGVBQWU7aUJBQ3ZCO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsT0FBTztpQkFDZjthQUNGLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9