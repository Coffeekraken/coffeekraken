import __getStyleProperty from '../style/getStyleProperty';
describe('sugar.js.dom.getStyleProperty', () => {
    document.body.innerHTML = `
      <style>
          #testing {
            content: 'hello world';
            animation: coco 2s ease-in-out 3s;
          }
      </style>
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should get the "content" css property correctly', () => {
        expect(__getStyleProperty($elm, 'content')).toBe('hello world');
    });
    it('Should get the "animation" css property correctly', () => {
        expect(__getStyleProperty($elm, 'animation')).toBe('coco 2s ease-in-out 3s');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sa0JBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFFM0QsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7O0dBU3pCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxHQUFHLEVBQUU7UUFDekQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxHQUFHLEVBQUU7UUFDM0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDaEQsd0JBQXdCLENBQ3pCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=