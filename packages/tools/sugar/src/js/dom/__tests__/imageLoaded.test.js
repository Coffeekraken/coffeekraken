import __imageLoaded from '../imageLoaded';
import __dispatchEvent from '../dispatchEvent';

describe('sugar.js.dom.imageLoaded', () => {
  document.head.innerHTML = `
    <img src="src/data/tests/testing.jpg" />
  `;
  const $elm = document.head.querySelector('img');

  let isLoaded = false,
    isError = false;

  __imageLoaded($elm)
    .then(() => {
      isLoaded = true;
    })
    .catch((e) => {
      isError = true;
    });

  __dispatchEvent($elm, 'load');

  it('Should detect the image loading complete state', () => {
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
    });
  });
});
