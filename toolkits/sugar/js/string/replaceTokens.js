"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceTokens;

var _deepMerge = _interopRequireDefault(require("../../node/object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            replaceTokens
 * @namespace           js.string
 * @type            Function
 *
 * This function takes as parameter a tokened string like "something [cool]", an object
 * of arguments/values and return the processed string with the tokens replaced by the arguments values.
 *
 * @param       {String}          string          The string to process
 * @param       {Object}          argsObj         The arguments/value object
 * @param       {Object}          [settings={}]   A settings object to configure the parsing process
 * - regexp ('\\[([a-zA-Z0-9-_]+)\\]') {String}: Specify the token reg to use for detecting/replacing values
 * - stripUndefined (true) {Boolean}: Specify if you want to strip the tokens that doesn't have any value passed
 *
 * @example     js
 * import replaceTokens from '@coffeekraken/sugar/js/string/replaceTokens';
 * replaceTokens('hello [world]', { world: 'Coco' }); // => hello Coco
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function replaceTokens(string, argsObj, settings = {}) {
  settings = (0, _deepMerge.default)({
    regexp: '\\[([a-zA-Z0-9-_]+)\\]',
    stripUndefined: true
  }, settings);
  let tokens;
  const reg = new RegExp(settings.regexp, 'g');

  while (tokens = reg.exec(string)) {
    if (argsObj[tokens[1]] === undefined && !settings.stripUndefined) return;
    string = string.replace(tokens[0], argsObj[tokens[1]] || '');
  }

  return string;
}

module.exports = exports.default;