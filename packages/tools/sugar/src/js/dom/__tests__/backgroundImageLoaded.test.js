import __backgroundImageLoaded from '../backgroundImageLoaded';
import __dispatchEvent from '../dispatchEvent';
describe('sugar.js.dom.backgroundImageLoaded', () => {
    document.body.innerHTML = `
    <style>
      .testing {
        background-image: url('/test.jpg');
      }
    </style>
    <div id="testing" class="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    let isLoaded = false, isError = false;
    const promise = __backgroundImageLoaded($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    __dispatchEvent(promise.__$img, 'load');
    it('Should detect the background image loading complete state', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
