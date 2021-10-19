import __replaceTags from '../replaceTags';
describe('sugar.shared.html.replaceTags', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
    const res = __replaceTags(html, {
        bold: (tag, content) => `<yop>${content}</yop>`,
        h1: (tag, content) => content,
    });
    it('Should have replace the tags correctly', () => {
        expect(res.replace(/\s/g, '')).toBe(`
<div>
<yop>Hello world</yop>

  How are you?

</div>
`.replace(/\s/g, ''));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRhZ3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcGxhY2VUYWdzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUMzQyxNQUFNLElBQUksR0FBRzs7Ozs7OztDQU9oQixDQUFDO0lBRUUsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRTtRQUM1QixJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxRQUFRLE9BQU8sUUFBUTtRQUMvQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO0tBQ2hDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7UUFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMvQjs7Ozs7OztDQU9YLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDWCxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9