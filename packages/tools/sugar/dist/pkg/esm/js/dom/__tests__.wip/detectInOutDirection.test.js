import __detectInOutDirection from '../detection/detectInOutDirection';
import __dispatchEvent from '../event/dispatchEvent';
describe('sugar.js.dom.detectInOutDirection', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let isInTriggered = false, isOutTriggered = false, isThenTriggered = false;
    __detectInOutDirection($elm)
        .on('in', (direction) => {
        isInTriggered = true;
    })
        .on('out', (direction) => {
        isOutTriggered = true;
    })
        .then((value) => {
        isThenTriggered = true;
    });
    __dispatchEvent($elm, 'mouseenter');
    __dispatchEvent($elm, 'mouseleave');
    it('Should have trigger the "in" stack correctly', () => {
        setTimeout(() => {
            expect(isInTriggered).toBe(true);
        });
    });
    it('Should have trigger the "out" stack correctly', () => {
        setTimeout(() => {
            expect(isOutTriggered).toBe(true);
        });
    });
    it('Should have trigger the "then" stack correctly', () => {
        setTimeout(() => {
            expect(isThenTriggered).toBe(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sc0JBQXNCLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxlQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7O0dBR3pCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELElBQUksYUFBYSxHQUFHLEtBQUssRUFDdkIsY0FBYyxHQUFHLEtBQUssRUFDdEIsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUUxQixzQkFBc0IsQ0FBQyxJQUFJLENBQUM7U0FDekIsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3RCLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQyxDQUFDO1NBQ0QsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3ZCLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDZCxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUwsZUFBZSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwQyxlQUFlLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRXBDLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7UUFDdEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7UUFDdkQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLEVBQUU7UUFDeEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=