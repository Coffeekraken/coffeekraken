"use strict";
module.exports = (__deepize) => {
    describe('sugar.js.object.deepize', () => {
        it('Should deepize the passed objects correctly', (done) => {
            const obj1 = {
                'hello.world': 'coco',
                'something.else': true
            };
            const res = __deepize(obj1);
            expect(res).toEqual({
                hello: {
                    world: 'coco'
                },
                something: {
                    else: true
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUM3QixRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBQ3ZDLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3pELE1BQU0sSUFBSSxHQUFHO2dCQUNYLGFBQWEsRUFBRSxNQUFNO2dCQUNyQixnQkFBZ0IsRUFBRSxJQUFJO2FBQ3ZCLENBQUM7WUFFRixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEIsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxNQUFNO2lCQUNkO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsSUFBSTtpQkFDWDthQUNGLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9