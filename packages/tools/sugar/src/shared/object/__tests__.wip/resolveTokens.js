"use strict";
module.exports = (__resolveTokens) => {
    describe('sugar.js.object.resolveTokens', () => {
        it('Should apply the proxy correctly and return the good value when is some tokens', (done) => {
            const obj1 = __resolveTokens({
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2],
                    nelson: '{this.hello.world}'
                }
            });
            expect(obj1.plop.array).toEqual([0, 1, 2]);
            expect(obj1.plop.nelson).toBe('hello world');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtJQUNuQyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBQzdDLEVBQUUsQ0FBQyxnRkFBZ0YsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVGLE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQztnQkFDM0IsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxhQUFhO2lCQUNyQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2hCLE1BQU0sRUFBRSxvQkFBb0I7aUJBQzdCO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU3QyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==