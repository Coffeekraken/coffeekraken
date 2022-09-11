/**
 * @jest-environment jsdom
 */
// @ts-nocheck
import __nodeToString from '../nodeToString';
describe('sugar.js.html.nodeToString', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
    document.body.innerHTML = html;
    const $elm = document.querySelector('bold');
    const res = __nodeToString($elm);
    it('Should have transform the dom element to a string correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsTUFBTSxJQUFJLEdBQUc7Ozs7Ozs7Q0FPaEIsQ0FBQztJQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUUvQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqQyxFQUFFLENBQUMsNkRBQTZELEVBQUUsR0FBRyxFQUFFO1FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=