"use strict";
module.exports = (__setRecursiveTimeout) => {
    describe('sugar.js.function.setRecursiveTimeout', () => {
        let calledCount = 0;
        __setRecursiveTimeout(() => {
            calledCount++;
        }, 100, 1000);
        it('Sould have called the function 10 times in 1s', done => {
            setTimeout(() => {
                expect(calledCount).toBe(10);
                done();
            }, 1100);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0UmVjdXJzaXZlVGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldFJlY3Vyc2l2ZVRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO0lBRXpDLFFBQVEsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7UUFFckQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtZQUN6QixXQUFXLEVBQUUsQ0FBQztRQUNoQixDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWQsRUFBRSxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBRXpELFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQTtJQUVKLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=