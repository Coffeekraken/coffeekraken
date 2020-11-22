import __isVisible from '../isVisible';
describe('sugar.js.dom.isVisible', () => {
    document.body.innerHTML = `
      <style>
        #testing {
          display: none;
        }
      </style>
      <div id="testing">
      </div>
      <div id="testing1"></div>
  `;
    const $elm = document.querySelector('#testing');
    const $elm1 = document.querySelector('#testing1');
    it('Should detect that the div #testing is not visible', () => {
        expect(__isVisible($elm)).toBe(false);
    });
    it('Should detect that the div #testing1 is visible', () => {
        expect(__isVisible($elm1)).toBe(true);
    });
});
