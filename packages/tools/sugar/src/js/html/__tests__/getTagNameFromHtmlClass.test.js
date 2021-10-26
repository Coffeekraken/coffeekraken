/**
 * @jest-environment jsdom
 */
import __getTagNameFromHtmlClass from '../getTagNameFromHtmlClass';
describe('sugar.js.html.getTagNameFromHtmlClass', () => {
    it('Should get back the correct tagname from passed classes', (done) => {
        expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe('a');
        expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe('link');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFnTmFtZUZyb21IdG1sQ2xhc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRhZ05hbWVGcm9tSHRtbENsYXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLHlCQUF5QixNQUFNLDRCQUE0QixDQUFDO0FBRW5FLFFBQVEsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7SUFDbkQsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkUsTUFBTSxDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLHlCQUF5QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWhFLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9