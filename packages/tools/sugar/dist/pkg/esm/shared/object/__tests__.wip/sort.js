"use strict";
module.exports = (__sort) => {
    describe('sugar.shared.object.sort', () => {
        it('Should sort the object correctly', (done) => {
            const res = __sort({
                coco: { weight: 10 },
                lolo: { weight: 2 },
                plop: { weight: 5 },
            }, (a, b) => {
                return a.weight - b.weight;
            });
            expect(res).toEqual({
                lolo: { weight: 2 },
                plop: { weight: 5 },
                coco: { weight: 10 },
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDeEIsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUN0QyxFQUFFLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQ2Q7Z0JBQ0ksSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDcEIsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTthQUN0QixFQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNMLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FDSixDQUFDO1lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDaEIsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTthQUN2QixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==