"use strict";

var __appendScriptTag = require('../appendScriptTag');

describe('sugar.js.dom.appendScriptTag', () => {
  __appendScriptTag('hello.js');

  it('Should append the script tag correctly', () => {
    var $elm = document.querySelector('script');
    expect(typeof $elm).toBe('object');
  });
});