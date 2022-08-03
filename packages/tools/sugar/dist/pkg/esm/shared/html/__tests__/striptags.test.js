import __striptags from '../striptags';
describe('sugar.shared.html.striptags', () => {
    const html = `<div><bold>Hello world</bold><h1>How are you?</h1></div>`;
    const res = __striptags(html, '<bold>');
    it('Should have replace the tags correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>How are you?');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQztBQUV2QyxRQUFRLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLE1BQU0sSUFBSSxHQUFHLDBEQUEwRCxDQUFDO0lBRXhFLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFeEMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9