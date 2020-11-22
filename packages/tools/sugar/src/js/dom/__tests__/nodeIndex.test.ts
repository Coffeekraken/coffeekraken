import __nodeIndex from '../nodeIndex';

describe('sugar.js.dom.nodeIndex', () => {

  document.body.innerHTML = `
      
      <div></div>
      <div></div>
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector('#testing');

  it('Should return 2 as node index for the #testing node', () => {
    expect(__nodeIndex($elm)).toBe(2);
  });

});