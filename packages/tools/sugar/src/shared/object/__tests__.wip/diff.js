"use strict";
module.exports = (__diff) => {
    describe('sugar.js.object.diff', () => {
        it('Should merge the passed objects correctly', done => {
            const obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {
                    yop: 'coco'
                },
                param: {
                    three: 'nelson'
                },
                yes: true
            };
            const obj2 = {
                hello: {
                    coco: 'coco'
                },
                param: {
                    three: 'nelson',
                    nelson: {
                        coco: 'eating'
                    }
                },
                added: 'value',
                yes: false
            };
            const result = __diff(obj1, obj2);
            expect(result).toEqual({
                hello: {
                    coco: 'coco'
                },
                param: {
                    nelson: {
                        coco: 'eating'
                    }
                },
                added: 'value',
                yes: false
            });
            const result2 = __diff(obj1, obj2, {
                added: false
            });
            expect(result2).toEqual({
                yes: false
            });
            const result3 = __diff(obj1, obj2, {
                deleted: true
            });
            expect(result3).toEqual({
                hello: {
                    world: 'hello world',
                    coco: 'coco'
                },
                plop: {
                    yop: 'coco'
                },
                param: {
                    nelson: {
                        coco: 'eating'
                    }
                },
                added: 'value',
                yes: false
            });
            const result4 = __diff(obj1, obj2, {
                equals: true
            });
            expect(result4).toEqual({
                hello: {
                    coco: 'coco'
                },
                param: {
                    three: 'nelson',
                    nelson: {
                        coco: 'eating'
                    }
                },
                added: 'value',
                yes: false
            });
            const result5 = __diff(obj1, obj2, {
                updated: false
            });
            expect(result5).toEqual({
                hello: {
                    coco: 'coco'
                },
                param: {
                    nelson: {
                        coco: 'eating'
                    }
                },
                added: 'value'
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUUxQixRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1FBRXBDLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUVyRCxNQUFNLElBQUksR0FBRztnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2dCQUNELElBQUksRUFBRTtvQkFDSixHQUFHLEVBQUUsTUFBTTtpQkFDWjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLFFBQVE7aUJBQ2hCO2dCQUNELEdBQUcsRUFBRSxJQUFJO2FBQ1YsQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHO2dCQUNYLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRSxRQUFRO3FCQUNmO2lCQUNGO2dCQUNELEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxLQUFLO2FBQ1gsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDckIsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxNQUFNO2lCQUNiO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUU7d0JBQ04sSUFBSSxFQUFFLFFBQVE7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsR0FBRyxFQUFFLEtBQUs7YUFDWCxDQUFDLENBQUM7WUFFSCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtnQkFDakMsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN0QixHQUFHLEVBQUUsS0FBSzthQUNYLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO2dCQUNqQyxPQUFPLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RCLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLE1BQU07aUJBQ2I7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEdBQUcsRUFBRSxNQUFNO2lCQUNaO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUU7d0JBQ04sSUFBSSxFQUFFLFFBQVE7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsR0FBRyxFQUFFLEtBQUs7YUFDWCxDQUFDLENBQUM7WUFFSCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtnQkFDakMsTUFBTSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN0QixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLE1BQU07aUJBQ2I7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxRQUFRO29CQUNmLE1BQU0sRUFBRTt3QkFDTixJQUFJLEVBQUUsUUFBUTtxQkFDZjtpQkFDRjtnQkFDRCxLQUFLLEVBQUUsT0FBTztnQkFDZCxHQUFHLEVBQUUsS0FBSzthQUNYLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO2dCQUNqQyxPQUFPLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RCLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRSxRQUFRO3FCQUNmO2lCQUNGO2dCQUNELEtBQUssRUFBRSxPQUFPO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFFVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBR0wsQ0FBQyxDQUFBIn0=