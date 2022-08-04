"use strict";
module.exports = (__convert) => {
    describe('sugar.js.color.convert', () => {
        it('Should convert the color string #ff00ff to rgba object correctly', () => {
            expect(__convert('#ff00ff', 'rgba')).toEqual({
                r: 255, g: 0, b: 255, a: 1
            });
        });
        it('Should convert the color string #ff00ff to hsl object correctly', () => {
            expect(__convert('#ff00ff', 'hsl')).toEqual({
                h: 300, s: 100, l: 50
            });
        });
        it('Should convert the color string #ff00ff to hsv object correctly', () => {
            expect(__convert('#ff00ff', 'hsv')).toEqual({
                h: 300, s: 100, v: 100
            });
        });
        it('Should convert the color string #ff00ff to rgba string correctly', () => {
            expect(__convert('#ff00ff', 'rgbaString')).toBe('rgba(255,0,255,1)');
        });
        it('Should convert the color string #ff00ff to hsl string correctly', () => {
            expect(__convert('#ff00ff', 'hslString')).toBe('hsl(300,100,50)');
        });
        it('Should convert the color string #ff00ff to hsv string correctly', () => {
            expect(__convert('#ff00ff', 'hsvString')).toBe('hsv(300,100,100)');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFFN0IsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUV0QyxFQUFFLENBQUMsa0VBQWtFLEVBQUUsR0FBRyxFQUFFO1lBQzFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUMzQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUMzQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLEVBQUU7WUFDekUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTthQUN0QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLEVBQUU7WUFDekUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRzthQUN2QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxHQUFHLEVBQUU7WUFDMUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLEVBQUU7WUFDekUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLEVBQUU7WUFDekUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=