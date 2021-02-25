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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXB0YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaXB0YWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFFL0IsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUV2QyxNQUFNLElBQUksR0FBRywwREFBMEQsQ0FBQztRQUV4RSxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXhDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==