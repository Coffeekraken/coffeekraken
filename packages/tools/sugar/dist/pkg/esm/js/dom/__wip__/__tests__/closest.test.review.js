import __closest from '../query/closest';
describe('sugar.js.dom.closest', () => {
    document.body.innerHTML = `
      <div id="testing">
        <div class="coco">
          <div id="source"></div>
        </div>
      </div>
  `;
    const $elm = document.querySelector('#source');
    it('Should find the "testing" element that is up in the dom tree', () => {
        const $testing = __closest($elm, '#testing');
        expect($testing.id).toBe('testing');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7OztHQU16QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUvQyxFQUFFLENBQUMsOERBQThELEVBQUUsR0FBRyxFQUFFO1FBQ3RFLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9