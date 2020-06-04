import __observeMutations from '../observeMutations';

describe('sugar.js.dom.observeMutations', () => {

  document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector('#testing');
  let mutationsCount = 0;

  __observeMutations($elm).then(mutation => {
    if (mutation.attributeName === 'plop' || mutation.attributeName === 'hello') {
      mutationsCount++;
    }
  });

  $elm.setAttribute('plop', 'coco');
  $elm.setAttribute('hello', 'world');

  it('Should have detect all the mutations done on the $elm', () => {
    expect(mutationsCount).toBe(2);
  });

});