import __convert from '../convert';

describe('sugar.js.unit.convert', () => {

  document.body.innerHTML = `
    <style>
      #testing {
        font-size: 10px;
      }
    </style>
    <div id="testing"></div>
  `;
  const $elm = document.querySelector('#testing');

  it('Should convert the passed em value to px correctly', () => {
    expect(__convert('2em', 'px', $elm)).toBe(20);
  });
  it('Should convert the passed rem value to px correctly', () => {
    expect(__convert('2rem', 'px')).toBe(32);
  });
  it('Should convert the passed px value to em correctly', () => {
    expect(__convert('20px', 'em', $elm)).toBe(2);
  });
  it('Should convert the passed px value to em correctly', () => {
    expect(__convert('32px', 'rem')).toBe(2);
  });

});