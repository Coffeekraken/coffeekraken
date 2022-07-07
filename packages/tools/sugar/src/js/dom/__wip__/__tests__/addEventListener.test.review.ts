import __addEventListener from '../event/addEventListener';
import __dispatchEvent from '../event/dispatchEvent';

describe('sugar.js.dom.addEventListener', () => {
  let isCallbackCalled = false,
    isThenCalled = false,
    hasBeenReleased = false,
    hasBeenCanceled = false;
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
