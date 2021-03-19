"use strict";
module.exports = (__color, __SColor) => {
    // TODO Create more tests for the SColor class
    const color = __color('#ff00ff');
    describe('sugar.js.color.color', () => {
        // it('Should return an instance of the SColor class', () => {
        //   expect(color instanceof __SColor).toBe(true);
        // });
        it('Should return rgba(255,0,255,1) string when using the toString method', () => {
            expect(color.toString()).toBe('#ff00ff');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtJQUNyQyw4Q0FBOEM7SUFFOUMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWpDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7UUFDcEMsOERBQThEO1FBQzlELGtEQUFrRDtRQUNsRCxNQUFNO1FBRU4sRUFBRSxDQUFDLHVFQUF1RSxFQUFFLEdBQUcsRUFBRTtZQUMvRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==