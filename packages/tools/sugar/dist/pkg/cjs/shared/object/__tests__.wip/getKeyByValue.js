"use strict";
module.exports = (__geKeyByValue) => {
    describe('sugar.shared.object.geKeyByValue', () => {
        it('Should find the correct key passing a value', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };
            expect(__geKeyByValue(obj1.hello, 'hello world')).toBe('world');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7SUFDaEMsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtRQUM5QyxFQUFFLENBQUMsNkNBQTZDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2RCxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ25CO2FBQ0osQ0FBQztZQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVoRSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==