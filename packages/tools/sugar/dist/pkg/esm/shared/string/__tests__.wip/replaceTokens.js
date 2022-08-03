"use strict";
module.exports = (__replaceTokens) => {
    describe('sugar.js.string.replaceTokens', () => {
        it('Should replace tokens correctly', (done) => {
            const string = __replaceTokens('hello [world] how [are] you?', {
                world: 'coco',
                are: 'plop'
            });
            expect(string).toBe('hello coco how plop you?');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7SUFDbkMsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtRQUM3QyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsOEJBQThCLEVBQUU7Z0JBQzdELEtBQUssRUFBRSxNQUFNO2dCQUNiLEdBQUcsRUFBRSxNQUFNO2FBQ1osQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBRWhELElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9