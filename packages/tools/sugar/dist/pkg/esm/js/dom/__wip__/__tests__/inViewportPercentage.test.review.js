"use strict";
const __inViewportPercentage = require('../inViewportPercentage');
describe('sugar.js.dom.inViewportPercentage', () => {
    document.body.innerHTML = `
    <style>
      #testing {
        display: block;
        width: 100px; height: 100px;
        background: red;
        position: absolute;
        top:0; left: -50px;
      }
    </style>
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    $elm.getBoundingClientRect = jest.fn(() => ({
        x: -50,
        y: 0,
        width: 100,
        height: 100,
        top: 0,
        right: 50,
        bottom: 100,
        left: -50,
    }));
    const percentage = __inViewportPercentage($elm);
    it('Should get the percentage in the viewport correctly', () => {
        expect(percentage).toBe(50);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRWxFLFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLEVBQUU7SUFFakQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7O0dBV3pCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNOLENBQUMsRUFBRSxDQUFDO1FBQ0osS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDO1FBQ04sS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsR0FBRztRQUNYLElBQUksRUFBRSxDQUFDLEVBQUU7S0FDVixDQUFDLENBQUMsQ0FBQztJQUVKLE1BQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhELEVBQUUsQ0FBQyxxREFBcUQsRUFBRSxHQUFHLEVBQUU7UUFDN0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=