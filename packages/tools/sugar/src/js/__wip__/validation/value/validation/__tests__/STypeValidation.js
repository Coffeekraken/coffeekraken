"use strict";
module.exports = (__STypeValidation) => {
    describe('sugar.js.validation.value.validation.STypeValidation', () => {
        it('Should validate the passed value correctly', () => {
            expect(__STypeValidation.apply('oco', 'Boolean')).toBe(`This value has to be of type <yellow>Boolean</yellow> and you've passed \"<red>oco\"</red> which is of type \"<red>String</red>\"`);
            expect(__STypeValidation.apply('oco', 'String')).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1R5cGVWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtJQUNyQyxRQUFRLENBQUMsc0RBQXNELEVBQUUsR0FBRyxFQUFFO1FBQ3BFLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3BELG1JQUFtSSxDQUNwSSxDQUFDO1lBQ0YsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9