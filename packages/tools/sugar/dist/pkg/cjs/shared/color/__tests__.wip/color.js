"use strict";
module.exports = (__color, __SColor) => {
    // TODO Create more tests for the SColor class
    const color = __color('#ff00ff');
    describe('sugar.js.color.color', () => {
        // it('Should return an instance of the SColor class', () => {
        //   expect(color instanceof __SColor).toBe(true);
        // });
        it('Should return rgba(255,0,255,1) string when using the toString method', () => {
            expect(color.toString()).toBe('#ff00ff');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO0lBQ3JDLDhDQUE4QztJQUU5QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFakMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtRQUNwQyw4REFBOEQ7UUFDOUQsa0RBQWtEO1FBQ2xELE1BQU07UUFFTixFQUFFLENBQUMsdUVBQXVFLEVBQUUsR0FBRyxFQUFFO1lBQy9FLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9