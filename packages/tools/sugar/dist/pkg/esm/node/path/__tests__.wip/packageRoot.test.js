"use strict";
const __packageRoot = require('../packageRoot');
describe('sugar.node.path.packageRoot', () => {
    it('Should return a path when calling it', () => {
        expect(__packageRoot(__dirname).split('/').pop()).toBe('sugar');
        expect(__packageRoot(__dirname, {
            highest: true,
        })
            .split('/')
            .pop()).toBe('coffeekraken');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUVoRCxRQUFRLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7UUFDNUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUNGLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDckIsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQzthQUNHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLEVBQUUsQ0FDYixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=