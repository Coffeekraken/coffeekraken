"use strict";
module.exports = function (__SUrlAction) {
    describe('sugar.js.action.SUrlAction', function () {
        it('Should return the correct JSON object', function () {
            var action = new __SUrlAction({
                target: '_blank',
                url: 'https://google.com'
            });
            expect(action.toJson()).toEqual({
                type: 'browser.url',
                descriptorObj: { target: '_blank', url: 'https://google.com' },
                settings: {}
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1VybEFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNVcmxBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxZQUFZO0lBQzVCLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtRQUNyQyxFQUFFLENBQUMsdUNBQXVDLEVBQUU7WUFDMUMsSUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUM7Z0JBQzlCLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixHQUFHLEVBQUUsb0JBQW9CO2FBQzFCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzlCLElBQUksRUFBRSxhQUFhO2dCQUNuQixhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRTtnQkFDOUQsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=