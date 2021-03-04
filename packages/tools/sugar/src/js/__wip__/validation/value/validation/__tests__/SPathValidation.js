"use strict";
var __path = require('path');
module.exports = function (__SPathValidation) {
    describe('sugar.js.validation.value.validation.SPathValidation', function () {
        it('Should validate the passed value correctly', function () {
            expect(__SPathValidation.apply('hello/world', false)).toBe(true);
            expect(__SPathValidation.apply("" + __path.resolve(__dirname, 'SPathValidation.js'), true)).toBe(true);
            expect(__SPathValidation.apply("" + __path.resolve(__dirname, 'SomethingThatNotExists.js'), true)).toBe("This value must be a valid <yellow>path</yellow and you've passed \"<red>src/js/validation/value/validation/__tests__/SomethingThatNotExists.js\"</red>");
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BhdGhWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1BhdGhWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLGlCQUFpQjtJQUNqQyxRQUFRLENBQUMsc0RBQXNELEVBQUU7UUFDL0QsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO1lBQy9DLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FDSixpQkFBaUIsQ0FBQyxLQUFLLENBQ3JCLEtBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUcsRUFDcEQsSUFBSSxDQUNMLENBQ0YsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDYixNQUFNLENBQ0osaUJBQWlCLENBQUMsS0FBSyxDQUNyQixLQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLDJCQUEyQixDQUFHLEVBQzNELElBQUksQ0FDTCxDQUNGLENBQUMsSUFBSSxDQUNKLHlKQUF5SixDQUMxSixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9