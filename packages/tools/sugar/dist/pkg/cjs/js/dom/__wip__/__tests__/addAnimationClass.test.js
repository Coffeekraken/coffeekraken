"use strict";
const __addAnimationClass = require('../addAnimationClass');
const __dispatchEvent = require('../dispatchEvent');
describe('sugar.js.dom.addAnimationClass', () => {
    document.body.innerHTML = `
      <div id="testing">Hello World</div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should add the animation class to the element', () => {
        __addAnimationClass($elm, 'test');
        expect($elm.className).toBe('test');
    });
    it('Should have the animation class on the elements after 0.5s', done => {
        setTimeout(() => {
            expect($elm.className).toBe('test');
            done();
        }, 500);
    });
    it('Should not have the animation class anymore on the elements after 1.2s', done => {
        __dispatchEvent($elm, 'animationend');
        setTimeout(() => {
            expect($elm.className).toBe('');
            done();
        }, 1000);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzVELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFFOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7O0dBRXpCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7UUFDdkQsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDREQUE0RCxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ3RFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2xGLGVBQWUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFJTCxDQUFDLENBQUMsQ0FBQyJ9