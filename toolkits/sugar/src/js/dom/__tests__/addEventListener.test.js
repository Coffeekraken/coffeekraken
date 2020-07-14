import __addEventListener from '../addEventListener';
import __dispatchEvent from '../dispatchEvent';

describe('sugar.js.dom.addEventListener', () => {

  let isCallbackCalled = false, isThenCalled = false, hasBeenReleased = false, hasBeenCanceled = false;
  let clickCount = 0;

  document.body.innerHTML = `
    <div id="testing"></div>
  `;
  const $elm = document.querySelector('#testing');
  const listener = __addEventListener($elm, 'click', (...args) => {
    isCallbackCalled = true;
  }).then((...args) => {
    isThenCalled = true;
    clickCount++;
  }).finally((...args) => {
    hasBeenReleased = true;
  }).on('cancel', (...args) => {
    hasBeenCanceled = true;
  }).start();

  __dispatchEvent($elm, 'click');

  // release the listener
  listener.cancel('end');

  __dispatchEvent($elm, 'click');

  it('Should have register the listener correctly and called as expected', done => {
    expect(isCallbackCalled).toBe(true);
    expect(isThenCalled).toBe(true);
    expect(clickCount).toBe(1);
    expect(hasBeenCanceled).toBe(true);
    done();
  });

});