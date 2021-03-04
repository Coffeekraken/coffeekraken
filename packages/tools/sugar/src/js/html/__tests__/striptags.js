"use strict";
module.exports = function (__striptags) {
    describe('sugar.js.html.striptags', function () {
        var html = "<div><bold>Hello world</bold><h1>How are you?</h1></div>";
        var res = __striptags(html, '<bold>');
        it('Should have replace the tags correctly', function () {
            expect(res).toBe('<bold>Hello world</bold>How are you?');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXB0YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaXB0YWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUMsV0FBVztJQUUzQixRQUFRLENBQUMseUJBQXlCLEVBQUU7UUFFbEMsSUFBTSxJQUFJLEdBQUcsMERBQTBELENBQUM7UUFFeEUsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV4QyxFQUFFLENBQUMsd0NBQXdDLEVBQUU7WUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==