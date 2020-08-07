"use strict";

var _getKeyByValue = _interopRequireDefault(require("../../object/getKeyByValue"));

var _querySelectorLive = _interopRequireDefault(require("../../dom/querySelectorLive"));

var _fastdom = _interopRequireDefault(require("fastdom"));

var _dispatchEvent = _interopRequireDefault(require("../../dom/dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		dispatchEventAttribute
 * @namespace           js.feature
 * @type      Feature
 *
 * Add the possibility to dispatch an event named as you want
 * when the native event is listened. By default the feature listen for
 * the click event unless you specify another one by using the format "{event}:{eventNameToDispach}"
 *
 * @example 	js
 * import '@coffeekraken/sugar/js/feature/dispatchEventAttribute'
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function handleDispatchEventAttributes(e) {
  e.preventDefault();
  const field = e.target ? e.target : e;
  if (!field || !field.tagName) return;
  const dispatchEventValue = field.getAttribute('dispatch-event'); // handle the dispatchEvent value

  let nativeEvent = 'click';
  let dispatchEventName = dispatchEventValue;

  if (dispatchEventValue.indexOf(':') > -1) {
    nativeEvent = dispatchEventValue.split(':')[0];
    dispatchEventName = dispatchEventValue.split(':')[1];
  }

  const keyCodes = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    pausebreak: 19,
    capslock: 20,
    esc: 27,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    leftarrow: 37,
    uparrow: 38,
    rightarrow: 39,
    downarrow: 40,
    insert: 45,
    delete: 46,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    leftwindowkey: 91,
    rightwindowkey: 92,
    selectkey: 93,
    numpad0: 96,
    numpad1: 97,
    numpad2: 98,
    numpad3: 99,
    numpad4: 100,
    numpad5: 101,
    numpad6: 102,
    numpad7: 103,
    numpad8: 104,
    numpad9: 105,
    multiply: 106,
    add: 107,
    subtract: 109,
    decimalpoint: 110,
    divide: 111,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    numlock: 144,
    scrolllock: 145,
    semicolon: 186,
    equalsign: 187,
    comma: 188,
    dash: 189,
    period: 190,
    forwardslash: 191,
    graveaccent: 192,
    openbracket: 219,
    backslash: 220,
    closebracket: 221,
    singlequote: 222
  };
  const dispatchEventData = JSON.parse(field.getAttribute('dispatch-event-data')) || {};

  _fastdom.default.mutate(() => {
    if (e.keyCode) {
      const keyName = (0, _getKeyByValue.default)(keyCodes, e.keyCode);

      if (nativeEvent.toLowerCase() === keyName || nativeEvent.toLowerCase() === `on${keyName.toLowerCase()}`) {
        (0, _dispatchEvent.default)(field, dispatchEventName, dispatchEventData);
      }
    } else {
      // means that we have a click
      if (nativeEvent === 'click') {
        (0, _dispatchEvent.default)(field, dispatchEventName, dispatchEventData);
      }
    }
  });
}

(0, _querySelectorLive.default)('[dispatch-event]', $elm => {
  $elm.addEventListener('click', handleDispatchEventAttributes);
  $elm.addEventListener('keyup', handleDispatchEventAttributes);
});