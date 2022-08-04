"use strict";
module.exports = (__trimLines) => {
    describe('sugar.js.string.trimLines', () => {
        it('Should trim the lines correctly', (done) => {
            const string = `Something
      So cool
So cool
                  a
Yes`;
            expect(__trimLines(string, {
                leftPadding: 2
            })).toBe(`  Something
  So cool
  So cool
  a
  Yes`);
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFDL0IsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRzs7OztJQUlqQixDQUFDO1lBQ0MsTUFBTSxDQUNKLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLFdBQVcsRUFBRSxDQUFDO2FBQ2YsQ0FBQyxDQUNILENBQUMsSUFBSSxDQUNKOzs7O01BSUYsQ0FDQyxDQUFDO1lBQ0YsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=