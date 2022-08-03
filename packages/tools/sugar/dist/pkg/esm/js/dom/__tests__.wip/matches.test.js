import __matches from '../query/matches';
describe('sugar.js.dom.matches', () => {
    document.body.innerHTML = `
      <div id="testing" class="hello-world coco">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should return true on the match testing', () => {
        expect(__matches($elm, '.hello-world, .coco')).toBe(true);
    });
    it('Should return false on the match testing', () => {
        expect(__matches($elm, '.hello-wold, .coco')).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7OztHQUd6QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBRyxFQUFFO1FBQ2pELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO1FBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9