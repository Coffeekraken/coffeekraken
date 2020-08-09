"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = innerHtml;

var _uniqid2 = _interopRequireDefault(require("../string/uniqid"));

var _injectStyle = _interopRequireDefault(require("../css/injectStyle"));

var _emptyNode = _interopRequireDefault(require("./emptyNode"));

var _convert = _interopRequireDefault(require("../time/convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO tests

/**
 * @name            innerHtml
 * @namespace           js.dom
 * @type            Function
 *
 * Change the content of a Node with the possibility to animate the change using one of these animations:
 * - fade
 * - fadeUp
 * - fadeDown
 * - fadeLeft
 * - fadeRight
 * You can also choose between 3 actions which are: replace, append and prepend
 *
 * @param           {HTMLElement}            node           The node to change to content of
 * @param           {String}                 content        The new content of the node
 * @param           {Object}                 [settings={}]  The settings to change the content like 'animIn', 'animOut', and more...
 * @return          {Promise}                               A promise resolved when the change has been made
 *
 * @example       js
 * import innerHtml from '@coffeekraken/sugar/js/dom/innerHtml'
 * innerHtml(myCoolNode, 'Hello World', {
 *    action: 'replace', // replace, append, prepend
 *    animIn: 'fade', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
 *    animOut: 'fadeUp', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
 *    animInDuration: 600, // in ms if number, otherwise a string like '1s', '1m', etc...
 *    animOutDuration: 300, // in ms if number, otherwise a string like '1s', '1m', etc...
 *    animInDistance: 25, // in px
 *    animOutDistance: 25, // in px
 *    animInEasing: 'ease-in-out',
 *    animOutEasing: 'ease-in-out'
 * }).then(() => {
 *    // do something when the change has been made...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function innerHtml(node, content, settings) {
  if (settings === void 0) {
    settings = {};
  }

  return new Promise((resolve, reject) => {
    // process the settings
    settings = _objectSpread({
      action: 'replace',
      animIn: 'fade',
      animOut: 'fade',
      animInDuration: 300,
      animOutDuration: 150,
      animInDistance: 25,
      animOutDistance: 25,
      animInEasing: 'ease-in-out',
      animOutEasing: 'ease-in-out'
    }, settings);
    settings.animInDuration = (0, _convert.default)(settings.animInDuration, 'ms');
    settings.animOutDuration = (0, _convert.default)(settings.animOutDuration, 'ms'); // generate a uniqid for this process

    var _uniqid = (0, _uniqid2.default)();

    var _animInClassName = "s-innerHtml-animIn-".concat(_uniqid);

    var _animOutClassName = "s-innerHtml-animOut-".concat(_uniqid); // some html elements references


    var $styleAnimIn, $styleAnimOut, $div; // generate the animation styles

    switch (settings.animIn) {
      case 'fade':
        var sheetAnimIn = "\n          @keyframes animIn-".concat(_uniqid, " {\n            from {\n              opacity: 0;\n            }\n            to {\n              opacity: 1;\n            }\n          }\n          .").concat(_animInClassName, " {\n              animation: animIn-").concat(_uniqid, " ").concat(settings.animInDuration, "ms ").concat(settings.animInEasing, ";\n          }\n        ");
        $styleAnimIn = (0, _injectStyle.default)(sheetAnimIn);
        break;

      case 'fadeDown':
        var sheetAnimInFadeUp = "\n          @keyframes animIn-".concat(_uniqid, " {\n            from {\n              opacity: 0;\n              transform: translateY(-").concat(settings.animInDistance, "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          .").concat(_animInClassName, " {\n              animation: animIn-").concat(_uniqid, " ").concat(settings.animInDuration, "ms ").concat(settings.animInEasing, ";\n          }\n        ");
        $styleAnimIn = (0, _injectStyle.default)(sheetAnimInFadeUp);
        break;

      case 'fadeUp':
        var sheetAnimInFadeDown = "\n          @keyframes animIn-".concat(_uniqid, " {\n            from {\n              opacity: 0;\n              transform: translateY(").concat(settings.animInDistance, "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          .").concat(_animInClassName, " {\n              animation: animIn-").concat(_uniqid, " ").concat(settings.animInDuration, "ms ").concat(settings.animInEasing, ";\n          }\n        ");
        $styleAnimIn = (0, _injectStyle.default)(sheetAnimInFadeDown);
        break;

      case 'fadeRight':
        var sheetAnimInFadeLeft = "\n          @keyframes animIn-".concat(_uniqid, " {\n            from {\n              opacity: 0;\n              transform: translateX(-").concat(settings.animInDistance, "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateX(0);\n            }\n          }\n          .").concat(_animInClassName, " {\n              animation: animIn-").concat(_uniqid, " ").concat(settings.animInDuration, "ms ").concat(settings.animInEasing, ";\n          }\n        ");
        $styleAnimIn = (0, _injectStyle.default)(sheetAnimInFadeLeft);
        break;

      case 'fadeLeft':
        var sheetAnimInFadeRight = "\n          @keyframes animIn-".concat(_uniqid, " {\n            from {\n              opacity: 0;\n              transform: translateX(").concat(settings.animInDistance, "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateX(0);\n            }\n          }\n          .").concat(_animInClassName, " {\n              animation: animIn-").concat(_uniqid, " ").concat(settings.animInDuration, "ms ").concat(settings.animInEasing, ";\n          }\n        ");
        $styleAnimIn = (0, _injectStyle.default)(sheetAnimInFadeRight);
        break;
    }

    switch (settings.animOut) {
      case 'fade':
        var sheetAnimOutFade = "\n          @keyframes animOut-".concat(_uniqid, " {\n            0% {\n              opacity: 1;\n            }\n            100% {\n              opacity: 0;\n            }\n          }\n          .").concat(_animOutClassName, " {\n            animation: animOut-").concat(_uniqid, " ").concat(settings.animOutDuration, "ms ").concat(settings.animOutEasing, ";\n          }\n        ");
        $styleAnimOut = (0, _injectStyle.default)(sheetAnimOutFade);
        break;

      case 'fadeUp':
        var sheetAnimOutFadeUp = "\n          @keyframes animOut-".concat(_uniqid, " {\n            from {\n              opacity: 1;\n              transform: translateY(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateY(-").concat(settings.animOutDistance, "px);\n            }\n          }\n          .").concat(_animOutClassName, " {\n              animation: animOut-").concat(_uniqid, " ").concat(settings.animOutDuration, "ms ").concat(settings.animOutEasing, ";\n          }\n        ");
        $styleAnimOut = (0, _injectStyle.default)(sheetAnimOutFadeUp);
        break;

      case 'fadeDown':
        var sheetAnimOutFadeDown = "\n          @keyframes animOut-".concat(_uniqid, " {\n            from {\n              opacity: 1;\n              transform: translateY(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateY(").concat(settings.animOutDistance, "px);\n            }\n          }\n          .").concat(_animOutClassName, " {\n              animation: animOut-").concat(_uniqid, " ").concat(settings.animOutDuration, "ms ").concat(settings.animOutEasing, ";\n          }\n        ");
        $styleAnimOut = (0, _injectStyle.default)(sheetAnimOutFadeDown);
        break;

      case 'fadeLeft':
        var sheetAnimOutFadeLeft = "\n          @keyframes animOut-".concat(_uniqid, " {\n            from {\n              opacity: 1;\n              transform: translateX(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateX(-").concat(settings.animOutDistance, "px);\n            }\n          }\n          .").concat(_animOutClassName, " {\n              animation: animOut-").concat(_uniqid, " ").concat(settings.animOutDuration, "ms ").concat(settings.animOutEasing, ";\n          }\n        ");
        $styleAnimOut = (0, _injectStyle.default)(sheetAnimOutFadeLeft);
        break;

      case 'fadeRight':
        var sheetAnimOutFadeRight = "\n          @keyframes animOut-".concat(_uniqid, " {\n            from {\n              opacity: 1;\n              transform: translateX(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateX(").concat(settings.animOutDistance, "px);\n            }\n          }\n          .").concat(_animOutClassName, " {\n              animation: animOut-").concat(_uniqid, " ").concat(settings.animOutDuration, "ms ").concat(settings.animOutEasing, ";\n          }\n        ");
        $styleAnimOut = (0, _injectStyle.default)(sheetAnimOutFadeRight);
        break;
    } // switch on the action to execute


    switch (settings.action) {
      case 'replace':
        // anim out the content by adding the corresponding class
        node.classList.add(_animOutClassName); // waiting the animation out to be finished

        setTimeout(() => {
          // removing the animation out class
          node.classList.remove(_animOutClassName); // change the content

          if (typeof content === 'string') {
            node.innerHTML = content;
          } else {
            (0, _emptyNode.default)(node).append(content);
          } // anim in the content by adding the corresponding class


          node.classList.add(_animInClassName); // wait until the animation is finished to resolve the promise

          setTimeout(() => {
            resolve(); // removing the classes

            node.classList.remove(_animInClassName); // removing the styles elements

            $styleAnimIn.parentNode.removeChild($styleAnimIn);
            $styleAnimOut.parentNode.removeChild($styleAnimOut);
          }, settings.animInDuration);
        }, settings.animOutDuration);
        break;

      case 'append':
        // append the new content inside a simple div to animate it
        $div = document.createElement('div');
        $div.classList.add(_animInClassName);

        if (typeof content === 'string') {
          $div.innerHTML = content;
        } else {
          $div.append(content);
        } // append the content


        node.appendChild($div); // wait until the animation is finished to resolve the promise

        setTimeout(() => {
          resolve(); // removing the classes

          $div.classList.remove(_animInClassName); // removing the styles elements

          $styleAnimIn.parentNode.removeChild($styleAnimIn);
          $styleAnimOut.parentNode.removeChild($styleAnimOut);
        }, settings.animInDuration);
        break;

      case 'prepend':
        // append the new content inside a simple div to animate it
        $div = document.createElement('div');
        $div.classList.add(_animInClassName);

        if (typeof content === 'string') {
          $div.innerHTML = content;
        } else {
          $div.append(content);
        } // append the content


        node.insertBefore($div, node.firstChild); // wait until the animation is finished to resolve the promise

        setTimeout(() => {
          resolve(); // removing the classes

          $div.classList.remove(_animInClassName); // removing the styles elements

          $styleAnimIn.parentNode.removeChild($styleAnimIn);
          $styleAnimOut.parentNode.removeChild($styleAnimOut);
        }, settings.animInDuration);
        break;
    }
  });
}

module.exports = exports.default;