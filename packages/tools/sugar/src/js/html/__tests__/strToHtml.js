"use strict";
module.exports = function (__strToHtml) {
    describe('sugar.js.html.strToHtml', function () {
        var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";
        var res = __strToHtml(html);
        it('Should have transform the dom element to a string correctly', function () {
            expect(typeof res).toBe('object');
            expect(res instanceof HTMLDivElement).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyVG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyVG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUMsV0FBVztJQUUzQixRQUFRLENBQUMseUJBQXlCLEVBQUU7UUFFbEMsSUFBTSxJQUFJLEdBQUcsOEZBT2hCLENBQUM7UUFFRSxJQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO1lBQ2hFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsR0FBRyxZQUFZLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=