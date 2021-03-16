"use strict";
module.exports = (__replaceTags) => {
    describe('sugar.js.html.replaceTags', () => {
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
            h1: (tag, content) => content
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2hhcmVkL2h0bWwvX190ZXN0c19fL3JlcGxhY2VUYWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7SUFFakMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUV6QyxNQUFNLElBQUksR0FBRzs7Ozs7OztDQU9oQixDQUFDO1FBRUUsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRTtZQUM5QixJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxRQUFRLE9BQU8sUUFBUTtZQUMvQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1NBQzlCLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0NBT3pDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==