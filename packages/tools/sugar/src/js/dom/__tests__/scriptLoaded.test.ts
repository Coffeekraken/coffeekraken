import __scriptLoaded from '../scriptLoaded';
import __dispatchEvent from '../dispatchEvent';

describe('sugar.js.dom.scriptLoaded', () => {
  document.head.innerHTML = `
    <script type="text/javascript" src="src/data/tests/testing.js"></script>
  `;
  const $elm = document.head.querySelector('script');

  let isLoaded = false,
    isError = false;

  __scriptLoaded($elm)
    .then(() => {
      isLoaded = true;
    })
    .catch((e) => {
      isError = true;
    });

  it('Should detect the script loading complete state', () => {
    $elm.onload();
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
    });
  });
});
