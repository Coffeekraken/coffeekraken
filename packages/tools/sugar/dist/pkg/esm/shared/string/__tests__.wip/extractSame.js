"use strict";
module.exports = (__extractSame) => {
    describe('sugar.js.string.extractSame', () => {
        it('Should process the passed string correctly', (done) => {
            const res = __extractSame(`Hello world how are you?`, `Hello world it's me`, false);
            expect(res).toBe('Hello world ');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7SUFDakMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUMzQyxFQUFFLENBQUMsNENBQTRDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4RCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQ3ZCLDBCQUEwQixFQUMxQixxQkFBcUIsRUFDckIsS0FBSyxDQUNOLENBQUM7WUFDRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRWpDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9