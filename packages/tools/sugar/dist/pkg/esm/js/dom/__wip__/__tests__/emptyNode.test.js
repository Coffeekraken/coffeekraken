import __emptyNode from '../manipulate/emptyNode';
describe('sugar.js.dom.emptyNode', () => {
    document.body.innerHTML = `
      <div id="testing">
        <div class="coco">
        </div>
        <div id="source"></div>
      </div>
  `;
    const $elm = document.querySelector('#testing');
    __emptyNode($elm);
    it('Should have empty the node correctly', () => {
        expect($elm.childNodes.length).toBe(0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLHlCQUF5QixDQUFDO0FBRWxELFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7OztHQU16QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbEIsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLEdBQUcsRUFBRTtRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9