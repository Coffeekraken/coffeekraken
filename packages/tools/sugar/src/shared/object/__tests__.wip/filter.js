"use strict";
module.exports = (__filter) => {
    describe('sugar.js.object.filter', () => {
        it('Should filter the object correctly', done => {
            const obj1 = __filter({
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            }, (item, name) => {
                return name === 'hello';
            });
            expect(obj1).toEqual({
                hello: {
                    world: 'hello world'
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7SUFFNUIsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUV0QyxFQUFFLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFFOUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDO2dCQUNwQixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDakI7YUFDRixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNoQixPQUFPLElBQUksS0FBSyxPQUFPLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNuQixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFFVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBR0wsQ0FBQyxDQUFBIn0=