"use strict";

var __addAnimationClass = require('../addAnimationClass');

var __dispatchEvent = require('../dispatchEvent');

describe('sugar.js.dom.addAnimationClass', () => {
  document.body.innerHTML = "\n      <div id=\"testing\">Hello World</div>\n  ";
  var $elm = document.querySelector('#testing');
  it('Should add the animation class to the element', () => {
    __addAnimationClass($elm, 'test');

    expect($elm.className).toBe('test');
  });
  it('Should have the animation class on the elements after 0.5s', done => {
    setTimeout(() => {
      expect($elm.className).toBe('test');
      done();
    }, 500);
  });
  it('Should not have the animation class anymore on the elements after 1.2s', done => {
    __dispatchEvent($elm, 'animationend');

    setTimeout(() => {
      expect($elm.className).toBe('');
      done();
    }, 1000);
  });
});