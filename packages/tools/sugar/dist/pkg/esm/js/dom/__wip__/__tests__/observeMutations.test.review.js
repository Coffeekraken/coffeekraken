import __observeMutations from '../observeMutations';
describe('sugar.js.dom.observeMutations', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let mutationsCount = 0;
    __observeMutations($elm).then((mutation) => {
        if (mutation.attributeName === 'plop' ||
            mutation.attributeName === 'hello') {
            mutationsCount++;
        }
    });
    $elm.setAttribute('plop', 'coco');
    $elm.setAttribute('hello', 'world');
    it('Should have detect all the mutations done on the $elm', () => {
        setTimeout(() => {
            expect(mutationsCount).toBe(2);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sa0JBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFFckQsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7O0dBR3pCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztJQUV2QixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN6QyxJQUNFLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTTtZQUNqQyxRQUFRLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFDbEM7WUFDQSxjQUFjLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFcEMsRUFBRSxDQUFDLHVEQUF1RCxFQUFFLEdBQUcsRUFBRTtRQUMvRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==