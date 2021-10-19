import __striptags from '../striptags';
describe('sugar.shared.html.striptags', () => {
    const html = `<div><bold>Hello world</bold><h1>How are you?</h1></div>`;
    const res = __striptags(html, '<bold>');
    it('Should have replace the tags correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>How are you?');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXB0YWdzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpcHRhZ3MudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFFdkMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtJQUN6QyxNQUFNLElBQUksR0FBRywwREFBMEQsQ0FBQztJQUV4RSxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXhDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7UUFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==