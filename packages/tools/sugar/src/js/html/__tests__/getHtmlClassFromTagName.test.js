/**
 * @jest-environment jsdom
 */
import __getHtmlClassFromTagName from '../getHtmlClassFromTagName';
describe('sugar.js.html.getHtmlClassFromTagName', () => {
    it('Should get back the correct HTMLElement class from passed tags', (done) => {
        expect(__getHtmlClassFromTagName('a')).toBe(window.HTMLAnchorElement);
        expect(__getHtmlClassFromTagName('img')).toBe(window.HTMLImageElement);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SHRtbENsYXNzRnJvbVRhZ05hbWUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEh0bWxDbGFzc0Zyb21UYWdOYW1lLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLHlCQUF5QixNQUFNLDRCQUE0QixDQUFDO0FBRW5FLFFBQVEsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7SUFDbkQsRUFBRSxDQUFDLGdFQUFnRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUUsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV2RSxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==