"use strict";
module.exports = (__queryStringToObject) => {
    describe('sugar.js.url.queryStringToObject', () => {
        it('Should correctly parse the passed query string', () => {
            expect(__queryStringToObject('?var1=value1&var2=value2')).toEqual({ var1: 'value1', var2: 'value2' });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMscUJBQXFCLEVBQUUsRUFBRTtJQUV6QyxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO1FBRWhELEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLEVBQUU7WUFDeEQsTUFBTSxDQUFDLHFCQUFxQixDQUMxQiwwQkFBMEIsQ0FDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyJ9