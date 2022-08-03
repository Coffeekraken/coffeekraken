import __getAnimationProperties from '../style/getAnimationProperties';
describe('sugar.js.dom.getAnimationProperties', () => {
    document.body.innerHTML = `
  <style>
    @keyframes coco {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    #testing {
      animation: coco 2s ease-in-out;
      animation-name: coco;
    }
  </style>
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    const props = __getAnimationProperties($elm);
    it('Should find the "testing" element that is up in the dom tree', () => {
        //  expect($testing.id).toBe('testing');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sd0JBQXdCLE1BQU0saUNBQWlDLENBQUM7QUFFdkUsUUFBUSxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsRUFBRTtJQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQnpCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELE1BQU0sS0FBSyxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdDLEVBQUUsQ0FBQyw4REFBOEQsRUFBRSxHQUFHLEVBQUU7UUFDdEUsd0NBQXdDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==