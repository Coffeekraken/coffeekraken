"use strict";
module.exports = function (__SRequiredValidation) {
    describe('sugar.js.validation.value.validation.SRequiredValidation', function () {
        it('Should validate the passed value correctly', function () {
            expect(__SRequiredValidation.apply('oco')).toBe(true);
            expect(__SRequiredValidation.apply(null)).toBe('This value is <yellow>required</yellow> and you\'ve passed "<red>null"</red>');
            expect(__SRequiredValidation.apply(undefined)).toBe('This value is <yellow>required</yellow> and you\'ve passed "<red>undefined"</red>');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVpcmVkVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNSZXF1aXJlZFZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxxQkFBcUI7SUFDckMsUUFBUSxDQUFDLDBEQUEwRCxFQUFFO1FBQ25FLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtZQUMvQyxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzVDLDhFQUE4RSxDQUMvRSxDQUFDO1lBQ0YsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDakQsbUZBQW1GLENBQ3BGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=