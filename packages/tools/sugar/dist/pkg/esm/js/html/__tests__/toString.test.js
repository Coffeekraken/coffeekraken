/**
 * @jest-environment jsdom
 */
// @ts-nocheck
import __toString from '../toString';
describe('sugar.js.html.toString', () => {
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
    const res = __toString($elm);
    it('Should have transform the dom element to a string correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUVyQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHOzs7Ozs7O0NBT2hCLENBQUM7SUFDRSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFL0IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFN0IsRUFBRSxDQUFDLDZEQUE2RCxFQUFFLEdBQUcsRUFBRTtRQUNuRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9