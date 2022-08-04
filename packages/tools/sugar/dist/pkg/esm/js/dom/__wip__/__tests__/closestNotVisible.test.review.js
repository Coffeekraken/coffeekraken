import __closestNotVisible from '../query/closestNotVisible';
describe('sugar.js.dom.closestNotVisible', () => {
    document.body.innerHTML = `
  <style>
    #testing {
      display: none;
    }
  </style>
      <div id="testing">
        <div class="coco testing">
          <div id="source"></div>
        </div>
      </div>
  `;
    const $elm = document.querySelector('#source');
    it('Should find the "testing" element that is up in the dom tree', () => {
        const $testing = __closestNotVisible($elm, '.testing');
        expect($testing.id).toBe('testing');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sbUJBQW1CLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsUUFBUSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtJQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7R0FXekIsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFL0MsRUFBRSxDQUFDLDhEQUE4RCxFQUFFLEdBQUcsRUFBRTtRQUN0RSxNQUFNLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9