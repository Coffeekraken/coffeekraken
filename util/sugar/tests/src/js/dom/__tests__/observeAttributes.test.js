const __observeAttributes = require('../observeAttributes');

describe('sugar.js.dom.observeAttributes', () => {

  document.body.innerHTML = `
    <div id="testing"></div>
  `;
  const $elm = document.querySelector('#testing');

  let isMutated = false;

  __observeAttributes($elm).then(mutation => {
    isMutated = true;
  });

  $elm.setAttribute('hello', 'world');

  it('Should observe the attributes updates correctly', () => {
    expect(isMutated).toBe(true);
  });

});