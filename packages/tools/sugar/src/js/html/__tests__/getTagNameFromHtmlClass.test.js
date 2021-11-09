/**
 * @jest-environment jsdom
 */
// @ts-nocheck
import __getTagNameFromHtmlClass from '../getTagNameFromHtmlClass';
describe('sugar.js.html.getTagNameFromHtmlClass', () => {
    it('Should get back the correct tagname from passed classes', (done) => {
        expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe('a');
        expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe('link');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFnTmFtZUZyb21IdG1sQ2xhc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRhZ05hbWVGcm9tSHRtbENsYXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxjQUFjO0FBRWQsT0FBTyx5QkFBeUIsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRSxRQUFRLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO0lBQ25ELEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25FLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVoRSxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==