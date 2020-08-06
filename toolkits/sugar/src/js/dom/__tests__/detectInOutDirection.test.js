import __detectInOutDirection from '../detectInOutDirection';
import __dispatchEvent from '../dispatchEvent';

describe('sugar.js.dom.detectInOutDirection', () => {
  document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector('#testing');

  let isInTriggered = false,
    isOutTriggered = false,
    isThenTriggered = false;

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
