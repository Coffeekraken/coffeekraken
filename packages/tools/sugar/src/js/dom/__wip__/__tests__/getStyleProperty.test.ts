import __getStyleProperty from '../style/getStyleProperty';

describe('sugar.js.dom.getStyleProperty', () => {
  document.body.innerHTML = `
      <style>
          #testing {
            content: 'hello world';
            animation: coco 2s ease-in-out 3s;
          }
      </style>
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector('#testing');

  it('Should get the "content" css property correctly', () => {
    expect(__getStyleProperty($elm, 'content')).toBe('hello world');
  });
  it('Should get the "animation" css property correctly', () => {
    expect(__getStyleProperty($elm, 'animation')).toBe(
      'coco 2s ease-in-out 3s'
    );
  });
});
