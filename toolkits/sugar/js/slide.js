"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqid = _interopRequireDefault(require("../../string/uniqid"));

var _parseArgs = _interopRequireDefault(require("../../string/parseArgs"));

var _querySelectorLive = _interopRequireDefault(require("../../dom/querySelectorLive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (() => {
  (0, _querySelectorLive.default)('[slide-in]', $item => {
    // generate a unique id for this node
    var uniqClass = "slide-in-".concat((0, _uniqid.default)());
    $item.classList.add(uniqClass); // parse the slide-in value

    var slideInValue = $item.getAttribute('slide-in');
    var args = (0, _parseArgs.default)(slideInValue, {
      x: 'Number -x --x "0"',
      y: 'Number -y --y "0"',
      duration: 'Number -d --duration "500"',
      delay: 'Number --delay "0"',
      when: 'String -w --when "inViewport"'
    }); // generate the animation css

    var css = "\n      [slide-in].".concat(uniqClass, " {\n        opacity: 0;\n        transform: translate(").concat(args.x.value || 0, "px, ").concat(args.y.value || 0, "px);\n\n      }\n    ");
    var cssIn = "\n      [slide-in].".concat(uniqClass, ".in {\n        transition: all ").concat(args.duration.value / 1000 || '0.5', "s;\n        opacity: 1;\n        transform: translate(0, 0);\n      }\n    "); // append the css into the section

    document.head.innerHTML += "\n      <style id=\"".concat(uniqClass, "\">\n        ").concat(css, "\n      </style>\n    ");
    setTimeout(() => {
      document.head.innerHTML += "\n        <style id=\"".concat(uniqClass, "-in\">\n          ").concat(cssIn, "\n        </style>\n      ");
    }, 100); // add the "in" class

    setTimeout(() => {
      $item.classList.add('in');
    }, args.delay.value);
    setTimeout(() => {
      var $style = document.querySelector("style#".concat(uniqClass));
      if ($style) $style.parentNode.removeChild($style);
      var $styleIn = document.querySelector("style#".concat(uniqClass, "-in"));
      if ($styleIn) $styleIn.parentNode.removeChild($styleIn);
    }, args.delay.value + args.duration.value);
  });
})();

exports.default = _default;
module.exports = exports.default;