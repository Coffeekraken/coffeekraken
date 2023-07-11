/**
 * @jest-environment jsdom
 */
// @ts-nocheck
import __getTagNameFromHtmlClass from '../getTagNameFromHtmlClass.js';
describe('sugar.js.html.getTagNameFromHtmlClass', () => {
    it('Should get back the correct tagname from passed classes', (done) => {
        expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe('a');
        expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe('link');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsY0FBYztBQUVkLE9BQU8seUJBQXlCLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsUUFBUSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtJQUNuRCxFQUFFLENBQUMseURBQXlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuRSxNQUFNLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMseUJBQXlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEUsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=