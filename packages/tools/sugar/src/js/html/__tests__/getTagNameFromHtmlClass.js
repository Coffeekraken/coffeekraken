"use strict";
module.exports = function (__getTagNameFromHtmlClass) {
    describe('sugar.js.string.getTagNameFromHtmlClass', function () {
        it('Should get back the correct tagname from passed classes', function (done) {
            expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe('a');
            expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe('link');
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFnTmFtZUZyb21IdG1sQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUYWdOYW1lRnJvbUh0bWxDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLHlCQUF5QjtJQUN6QyxRQUFRLENBQUMseUNBQXlDLEVBQUU7UUFDbEQsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLFVBQUMsSUFBSTtZQUNqRSxNQUFNLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMseUJBQXlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEUsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=