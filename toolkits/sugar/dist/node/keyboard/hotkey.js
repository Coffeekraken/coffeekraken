"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __SPromise = require('../promise/SPromise');

var __uniqid = require('../string/uniqid');

var __keypress = require('keypress');

var __activeSpace = require('../core/activeSpace');
/**
 * @name                hotkey
 * @namespace           node.keyboard
 * @type                Function
 *
 * This function allows you to add keyboard listening process and subscribe to some sequences
 * using the SPromise instance returned.
 *
 * @param        {String}       hotkey          The hotkey to detect
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
 * - splitKey (+) {String}: Specify the split key to use in the sequences like "ctrl+a"
 * @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
 *
 * @example         js
 * const hotkey = require('@coffeekraken/sugar/node/keyboard/hotkey');
 * const promise = hotkey('ctrl+a').on('key', (e) => {
 *    // do something...
 * });
 * promise.cancel();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


var hotkeyStack = {};
var isListenerAlreadyAdded = false;

module.exports = function hotkey(key, settings) {
  if (settings === void 0) {
    settings = {};
  }

  // extends the settings
  settings = _objectSpread({
    once: false,
    splitKey: '+',
    activeSpace: null,
    disableWhenEditingForm: true
  }, settings); // generate a new uniqid for this listener

  var uniqid = __uniqid();

  if (!isListenerAlreadyAdded) {
    isListenerAlreadyAdded = true;

    __keypress(process.stdin);

    process.stdin.on('keypress', function (ch, keyObj) {
      // loop on each promises registered
      Object.keys(hotkeyStack).forEach(id => {
        var obj = hotkeyStack[id];
        if (!obj || !obj.key) return; // check if an activeSpace is specified

        if (obj.settings.disableWhenEditingForm) {
          if (__activeSpace.is('**.form.*')) return;
        }

        if (obj.settings.activeSpace) {
          if (!__activeSpace.is(obj.settings.activeSpace)) return;
        } // check if an "active" function exists


        if (obj.settings.active && typeof obj.settings.active === 'function') {
          if (!obj.settings.active(obj.key)) return;
        }

        obj.key.toString().split(',').map(m => m.trim()).forEach(key => {
          if (ch && ch.toString() === key) {
            obj.promise.trigger('key', {
              key,
              ctrl: keyObj ? keyObj.ctrl : false,
              meta: keyObj ? keyObj.meta : false,
              shift: keyObj ? keyObj.shift : false
            });
            obj.promise.trigger('press', {
              key,
              ctrl: keyObj ? keyObj.ctrl : false,
              meta: keyObj ? keyObj.meta : false,
              shift: keyObj ? keyObj.shift : false
            });
            return;
          }

          if (!keyObj) return;
          var pressedKey = keyObj.name;
          if (keyObj.ctrl) pressedKey = "ctrl".concat(obj.settings.splitKey).concat(pressedKey);
          if (keyObj.shift) pressedKey = "shift".concat(obj.settings.splitKey).concat(pressedKey);
          if (keyObj.meta) pressedKey = "alt".concat(obj.settings.splitKey).concat(pressedKey);

          if (pressedKey === key) {
            obj.promise.trigger('key', {
              key,
              ctrl: keyObj ? keyObj.ctrl : false,
              meta: keyObj ? keyObj.meta : false,
              shift: keyObj ? keyObj.shift : false
            });
            obj.promise.trigger('press', {
              key,
              ctrl: keyObj ? keyObj.ctrl : false,
              meta: keyObj ? keyObj.meta : false,
              shift: keyObj ? keyObj.shift : false
            });
          }
        });
      });
    });
  }

  var promise = new __SPromise((resolve, reject, trigger, cancel) => {}, {}).on('key,press', key => {
    if (settings.once) {
      promise.cancel();
    }
  }).on('finally,cancel', () => {
    // delete the callback from the stack
    delete hotkeyStack[uniqid];
  }).start(); // save the trigger function in the stack

  hotkeyStack[uniqid] = {
    key,
    promise,
    settings
  }; // return the promise

  return promise;
};