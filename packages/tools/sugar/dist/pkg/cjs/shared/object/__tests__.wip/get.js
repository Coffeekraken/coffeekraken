"use strict";
module.exports = (__get) => {
    describe('sugar.shared.object.get', () => {
        it('Should get the object property correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };
            const val1 = __get(obj1, 'hello.world');
            const val2 = __get(obj1, 'plop.array.2');
            expect(val1).toBe('hello world');
            expect(val2).toBe(2);
            done();
        });
        it('Should get the object property under an optional one', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };
            const val1 = __get(obj1, 'hello.coco?.world');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDdkIsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUNyQyxFQUFFLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNwRCxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDbkI7YUFDSixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyQixJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHNEQUFzRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDaEUsTUFBTSxJQUFJLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxhQUFhO2lCQUN2QjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ25CO2FBQ0osQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUU5QyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==