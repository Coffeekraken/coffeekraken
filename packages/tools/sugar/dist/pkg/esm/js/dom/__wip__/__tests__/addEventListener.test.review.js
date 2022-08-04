import __addEventListener from '../event/addEventListener';
import __dispatchEvent from '../event/dispatchEvent';
describe('sugar.js.dom.addEventListener', () => {
    let isCallbackCalled = false, isThenCalled = false, hasBeenReleased = false, hasBeenCanceled = false;
    let clickCount = 0;
    document.body.innerHTML = `
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    const listener = __addEventListener($elm, 'click', (event) => {
        isCallbackCalled = true;
    })
        .on('click', (event) => {
        isThenCalled = true;
        clickCount++;
    })
        .finally((event) => {
        hasBeenReleased = true;
    })
        .on('cancel', (event) => {
        hasBeenCanceled = true;
    });
    __dispatchEvent($elm, 'click');
    // release the listener
    listener.cancel();
    setTimeout(() => {
        __dispatchEvent($elm, 'click');
    });
    it('Should have register the listener correctly and called as expected', (done) => {
        expect(isCallbackCalled).toBe(true);
        expect(isThenCalled).toBe(true);
        expect(clickCount).toBe(1);
        expect(hasBeenCanceled).toBe(true);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sa0JBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxlQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxJQUFJLGdCQUFnQixHQUFHLEtBQUssRUFDMUIsWUFBWSxHQUFHLEtBQUssRUFDcEIsZUFBZSxHQUFHLEtBQUssRUFDdkIsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUMxQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFFbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7O0dBRXpCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMzRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQyxDQUFDO1NBQ0MsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3JCLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsVUFBVSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUM7U0FDRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQixlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUMsQ0FBQztTQUNELEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QixlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUwsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUUvQix1QkFBdUI7SUFDdkIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWxCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9FQUFvRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDaEYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9