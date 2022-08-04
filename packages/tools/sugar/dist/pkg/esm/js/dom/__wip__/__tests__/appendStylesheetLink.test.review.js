"use strict";
const __appendStylesheetLink = require('../appendStylesheetLink');
describe('sugar.js.dom.appendStylesheetLink', () => {
    __appendStylesheetLink('hello.css');
    it('Should append the style link correctly', () => {
        const $elm = document.querySelector('style');
        expect(typeof $elm).toBe('object');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRWxFLFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLEVBQUU7SUFFakQsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFcEMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUVoRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyQyxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=