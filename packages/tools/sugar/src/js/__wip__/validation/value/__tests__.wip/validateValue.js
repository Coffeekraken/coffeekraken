"use strict";
var __path = require('path');
/**
 * @TODO            more tests
 */
module.exports = function (__validateValue) {
    describe('sugar.js.validation.value.validateValue', function () {
        it('Should validate the passed value correctly', function () {
            expect(__validateValue('hello', {
                type: 'Boolean',
                required: true
            })).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUvQjs7R0FFRztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxlQUFlO0lBQy9CLFFBQVEsQ0FBQyx5Q0FBeUMsRUFBRTtRQUNsRCxFQUFFLENBQUMsNENBQTRDLEVBQUU7WUFDL0MsTUFBTSxDQUNKLGVBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUNILENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9