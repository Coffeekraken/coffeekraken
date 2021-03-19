"use strict";
module.exports = (__gravatarUrl) => {
    describe('sugar.js.url.gravatarUrl', () => {
        it('Should correctly generate the gravatar url', () => {
            expect(__gravatarUrl('olivier.bossel@gmail.com', 200)).toBe('https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f?s=200');
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXJVcmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmF2YXRhclVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFO0lBRWpDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFFeEMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxNQUFNLENBQUMsYUFBYSxDQUNsQiwwQkFBMEIsRUFDMUIsR0FBRyxDQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsd0VBQXdFLENBQUMsQ0FBQztRQUNwRixDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDIn0=