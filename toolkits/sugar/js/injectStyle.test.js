"use strict";

var __injectStyle = require('../injectStyle');

describe('sugar.js.css.injectStyle', () => {
  it('Should inject the string style properly', () => {
    __injectStyle('a { color: red; }');

    expect(document.head.querySelector('style').innerHTML).toBe('a { color: red; }');
  });
});