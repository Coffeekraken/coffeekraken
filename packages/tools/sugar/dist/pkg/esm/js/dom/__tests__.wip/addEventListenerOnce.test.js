"use strict";
const __addEventListenerOnce = require('../addEventListenerOnce');
const __dispatchEvent = require('../dispatchEvent');
describe('sugar.js.dom.addEventListenerOnce', () => {
    document.body.innerHTML = `
      <div id="testing">Hello World</div>
  `;
    const $elm = document.querySelector('#testing');
    let isTriggeredTwice = false;
    it('Should add the event listener on the element correctly', (done) => {
        __addEventListenerOnce($elm, 'click').on('click', (e) => {
            if (e.detail.twice)
                isTriggeredTwice = true;
            done();
        });
        __dispatchEvent($elm, 'click', {
            first: true
        });
    });
    it('Should not trigger anymore the same event', () => {
        __dispatchEvent($elm, 'click', {
            twice: true
        });
        expect(isTriggeredTwice).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLEVBQUU7SUFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7O0dBRXpCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBRTdCLEVBQUUsQ0FBQyx3REFBd0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BFLHNCQUFzQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzVDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUM3QixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtRQUNuRCxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUM3QixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=