"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toHtml;

var _SError = _interopRequireDefault(require("../error/SError"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _htmlFromMarkdown = _interopRequireDefault(require("./html/htmlFromMarkdown"));

var _htmlFromDocblocks = _interopRequireDefault(require("./html/htmlFromDocblocks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            toHtml
 * @namespace       js.convert
 * @type            Function
 *
 * Take a string as input and convert it to HTML.
 *
 * @feature        2.0.0       Supported input types: markdown, docblocks
 * @feature        2.0.0       Try to detect the type automatically. For safer results, specify the "from" setting.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * - from (null) {String}: Specify the type of the input string like "markdown", "dockblocks", and more coming...
 * @return      {String}                              The HTML converted result
 *
 * @example       js
 * import toHtml from '@coffeekraken/sugar/js/convert/toHtml';
 * toHtml(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var supportedFromTypes = ['markdown', 'docblocks'];
var convertersByType = {
  markdown: _htmlFromMarkdown.default,
  docblocks: _htmlFromDocblocks.default
};

function toHtml(inputString, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    from: null
  }, settings); // check if we don't have the "from" setting

  if (!settings.from) {
    // check if is markdown
    if (inputString.match(/\s?#{1,6}\s?.*/g)) settings.from = 'markdown';else if (inputString.match(/(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g)) settings.from = 'docblocks';else {
      throw new _SError.default("Sorry but the passed inputString does not match any supported type which are: ".concat(supportedFromTypes.join(',')));
    }
  } // convert the string from the correct type


  var converterFn = convertersByType[settings.from];

  if (!converterFn) {
    throw new _SError.default("It seems that no converter exists for your inputString which is of type \"<yellow>".concat(settings.from, "</yellow>\"..."));
  }

  return converterFn(inputString, settings);
}

module.exports = exports.default;