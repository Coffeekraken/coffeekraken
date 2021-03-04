"use strict";
module.exports = function (__SValuesValidation) {
    describe('sugar.js.validation.value.validation.SValuesValidation', function () {
        it('Should validate the passed value correctly', function () {
            expect(__SValuesValidation.apply('oco', ['hello', 'world'])).toBe("This value must be one of these \"<green>hello,world</green>\" but you've passed \"<red>oco</red>\"");
            expect(__SValuesValidation.apply('world', ['hello', 'world'])).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbHVlc1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsdWVzVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLG1CQUFtQjtJQUNuQyxRQUFRLENBQUMsd0RBQXdELEVBQUU7UUFDakUsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO1lBQy9DLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQy9ELHFHQUFxRyxDQUN0RyxDQUFDO1lBQ0YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=