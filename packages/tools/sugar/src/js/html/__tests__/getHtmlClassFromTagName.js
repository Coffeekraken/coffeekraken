"use strict";
module.exports = function (__getHtmlClassFromTagName) {
    describe('sugar.js.string.getHtmlClassFromTagName', function () {
        it('Should get back the correct HTMLElement class from passed tags', function (done) {
            expect(__getHtmlClassFromTagName('a')).toBe(HTMLAnchorElement);
            expect(__getHtmlClassFromTagName('link')).toBe(HTMLLinkElement);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SHRtbENsYXNzRnJvbVRhZ05hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRIdG1sQ2xhc3NGcm9tVGFnTmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLHlCQUF5QjtJQUN6QyxRQUFRLENBQUMseUNBQXlDLEVBQUU7UUFDbEQsRUFBRSxDQUFDLGdFQUFnRSxFQUFFLFVBQUMsSUFBSTtZQUN4RSxNQUFNLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFaEUsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=