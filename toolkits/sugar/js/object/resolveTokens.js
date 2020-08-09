"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveTokens;

var _deepProxy = _interopRequireDefault(require("./deepProxy"));

var _get = _interopRequireDefault(require("./get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      resolveTokens
 * @namespace           js.object
 * @type                      Function
 *
 * This function take an object and propare it to accept tokens like:
 * - '{this.something.else}'
 * - etc...
 *
 * @param         {Object}            object        The object to process
 * @return        {Object}                          The proxied object that you can use
 *
 * @example       js
 * import resolveTokens from '@coffeekraken/sugar/js/object/resolveTokens';
 * const myObj = resolveTokens({
 *    hello: 'world',
 *    plop: '{this.hello}
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveTokens(object) {
  // proxy the object
  var proxiedObject = (0, _deepProxy.default)(object, getObj => {
    // get the raw value
    var rawValue = (0, _get.default)(getObj.target, getObj.key); // check if it's a string

    if (typeof rawValue !== 'string') return rawValue; // check if we have some tokens

    var reg = /\{([a-zA-Z0-9\.-_]+)\}/g;
    var tokens = rawValue.match(reg);
    var finalValue = rawValue;
    if (!tokens) return rawValue; // console.log(tokens);

    tokens.forEach(token => {
      finalValue = finalValue.replace(token, (0, _get.default)(object, token.replace('{', '').replace('}', '').replace('this.', '')));
    });
    return finalValue;
  }, {
    handleGet: true
  }); // return the proxied object

  return proxiedObject;
}

module.exports = exports.default;