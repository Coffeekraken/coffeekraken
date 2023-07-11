/**
 * @jest-environment jsdom
 */
import __getHtmlClassFromTagName from '../getHtmlClassFromTagName.js';
describe('sugar.js.html.getHtmlClassFromTagName', () => {
    it('Should get back the correct HTMLElement class from passed tags', (done) => {
        expect(__getHtmlClassFromTagName('a')).toBe(window.HTMLAnchorElement);
        expect(__getHtmlClassFromTagName('img')).toBe(window.HTMLImageElement);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsT0FBTyx5QkFBeUIsTUFBTSwrQkFBK0IsQ0FBQztBQUV0RSxRQUFRLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO0lBQ25ELEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFFLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdkUsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=