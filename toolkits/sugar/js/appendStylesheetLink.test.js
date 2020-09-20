"use strict";

var __appendStylesheetLink = require('../appendStylesheetLink');

describe('sugar.js.dom.appendStylesheetLink', () => {
  __appendStylesheetLink('hello.css');

  it('Should append the style link correctly', () => {
    var $elm = document.querySelector('style');
    expect(typeof $elm).toBe('object');
  });
});