import __strToHtml from '../strToHtml';
describe('sugar.js.html.strToHtml', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
    const res = __strToHtml(html);
    it('Should have transform the dom element to a string correctly', () => {
        expect(typeof res).toBe('object');
        expect(res instanceof HTMLDivElement).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyVG9IdG1sLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJUb0h0bWwudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFFdkMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtJQUNyQyxNQUFNLElBQUksR0FBRzs7Ozs7OztDQU9oQixDQUFDO0lBRUUsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLEVBQUUsQ0FBQyw2REFBNkQsRUFBRSxHQUFHLEVBQUU7UUFDbkUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLFlBQVksY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==