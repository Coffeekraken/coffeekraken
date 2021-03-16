"use strict";
module.exports = (__striptags) => {
    describe('sugar.js.html.striptags', () => {
        const html = `<div><bold>Hello world</bold><h1>How are you?</h1></div>`;
        const res = __striptags(html, '<bold>');
        it('Should have replace the tags correctly', () => {
            expect(res).toBe('<bold>Hello world</bold>How are you?');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXB0YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9odG1sL19fdGVzdHNfXy9zdHJpcHRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRTtJQUUvQixRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBRXZDLE1BQU0sSUFBSSxHQUFHLDBEQUEwRCxDQUFDO1FBRXhFLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFeEMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtZQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9