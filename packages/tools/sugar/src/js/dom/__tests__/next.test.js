import __next from '../next';

describe('sugar.js.dom.next', () => {

  document.body.innerHTML = `
      <div id="testing"></div>
      <div id="next1"></div>
      <div id="next2"></div>
  `;
  const $elm = document.querySelector('#testing');
  const $next2 = document.querySelector('#next2');

  const $finded = __next($elm, '#next2');

  it('Should find the $next2 element from the $testing one', () => {
    expect($finded).toEqual($next2);
  });

});