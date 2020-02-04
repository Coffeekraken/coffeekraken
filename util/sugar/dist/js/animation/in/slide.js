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
    const uniqClass = `slide-in-${(0, _uniqid.default)()}`;
    $item.classList.add(uniqClass); // parse the slide-in value

    const slideInValue = $item.getAttribute('slide-in');
    const args = (0, _parseArgs.default)(slideInValue, {
      x: 'Number -x --x "0"',
      y: 'Number -y --y "0"',
      duration: 'Number -d --duration "500"',
      delay: 'Number --delay "0"',
      when: 'String -w --when "inViewport"'
    });
    console.log(args); // generate the animation css

    const css = `

      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${args.x || 0}px, ${args.y || 0}px);

      }
      [slide-in].${uniqClass}.in {
        transition: all ${args.duration / 1000 || '0.5'}s;
        opacity: 1;
        transform: translate(0, 0);
      }

    `; // append the css into the section

    document.head.innerHTML += `
      <style id="${uniqClass}">
        ${css}
      </style>
    `; // add the "in" class

    setTimeout(() => {
      $item.classList.add('in');
    }, args.delay);
    setTimeout(() => {
      const $style = document.querySelector(`style#${uniqClass}`);
      if ($style) $style.parentNode.removeChild($style);
    }, args.delay + args.duration);
  });
})();

exports.default = _default;
module.exports = exports.default;