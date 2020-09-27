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
      if (e.detail.twice) isTriggeredTwice = true;
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
