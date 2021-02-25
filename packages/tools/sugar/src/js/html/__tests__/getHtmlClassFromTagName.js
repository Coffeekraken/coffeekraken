"use strict";
module.exports = (__getHtmlClassFromTagName) => {
    describe('sugar.js.string.getHtmlClassFromTagName', () => {
        it('Should get back the correct HTMLElement class from passed tags', (done) => {
            expect(__getHtmlClassFromTagName('a')).toBe(HTMLAnchorElement);
            expect(__getHtmlClassFromTagName('link')).toBe(HTMLLinkElement);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SHRtbENsYXNzRnJvbVRhZ05hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRIdG1sQ2xhc3NGcm9tVGFnTmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLHlCQUF5QixFQUFFLEVBQUU7SUFDN0MsUUFBUSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtRQUN2RCxFQUFFLENBQUMsZ0VBQWdFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1RSxNQUFNLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFaEUsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=