import __dispatchEvent from '../event/dispatchEvent';
describe('sugar.js.dom.dispatchEvent', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let isDetected = false;
    $elm.addEventListener('coco', (e) => {
        if (!e.detail.custom)
            return;
        isDetected = true;
    });
    __dispatchEvent($elm, 'coco', {
        custom: true
    });
    it('Should detect the dispatched custom event with custom data attached', () => {
        expect(isDetected).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7OztHQUd6QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQzdCLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUM1QixNQUFNLEVBQUUsSUFBSTtLQUNiLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxRUFBcUUsRUFBRSxHQUFHLEVBQUU7UUFDN0UsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=