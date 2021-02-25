"use strict";
const __path = require('path');
module.exports = (__SPathValidation) => {
    describe('sugar.js.validation.value.validation.SPathValidation', () => {
        it('Should validate the passed value correctly', () => {
            expect(__SPathValidation.apply('hello/world', false)).toBe(true);
            expect(__SPathValidation.apply(`${__path.resolve(__dirname, 'SPathValidation.js')}`, true)).toBe(true);
            expect(__SPathValidation.apply(`${__path.resolve(__dirname, 'SomethingThatNotExists.js')}`, true)).toBe(`This value must be a valid <yellow>path</yellow and you've passed \"<red>src/js/validation/value/validation/__tests__/SomethingThatNotExists.js\"</red>`);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BhdGhWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1BhdGhWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7SUFDckMsUUFBUSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtRQUNwRSxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBRyxFQUFFO1lBQ3BELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FDSixpQkFBaUIsQ0FBQyxLQUFLLENBQ3JCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxFQUNwRCxJQUFJLENBQ0wsQ0FDRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FDSixpQkFBaUIsQ0FBQyxLQUFLLENBQ3JCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUMsRUFBRSxFQUMzRCxJQUFJLENBQ0wsQ0FDRixDQUFDLElBQUksQ0FDSix5SkFBeUosQ0FDMUosQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==