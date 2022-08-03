import __em2px from '../em2px';
describe('sugar.js.unit.em2px', () => {
    document.body.innerHTML = `
    <style>
      #testing {
        font-size: 10px;
      }
    </style>
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should convert the passed em value to px correctly', () => {
        expect(__em2px(2, $elm)).toBe(20);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUUvQixRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBRW5DLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHOzs7Ozs7O0dBT3pCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxHQUFHLEVBQUU7UUFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9