"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SCodeSplitter
 * @namespace         sugar.js.code
 * @type              Class
 *
 * This class allows you to specify some "splitters" that will be used to split the code accordingly.
 * A "splitter" is an object of these properties:
 * - type (null) {String}: A simple word used as "type" to define the splitted blocks
 * - prefix (null) {Regex}: A regex used to detect the start of a block
 * - suffix (null) {Regex}: A regex used to detect what can be after the block
 * - open ('{') {String}: A 1 character string that specify the opening of a code block like "{", etc...
 * - close ('}') {String}: A 1 character string that specify the closing of a code block like "}", etc...
 * - exclude (null) {Array<Regex>}: An array of regex used to exclude some previously matched blocks of this splitter
 *
 * @param       {Object}      [settings={}]         An object of settings to configure your code splitter instance:
 *
 * @todo        enhance documentation
 *
 * @example       js
 * import SCodeSplitter from '@coffeekraken/sugar/js/code/SCodeSplitter';
 * const splitter = new SCodeSplitter();
 * const splitStack = splitter.split([{
 *    type: 'include',
 *    prefix: /@include\s[a-zA-Z0-9-_\.]+/,
 *    suffix: /;/,
 *    open: '(',
 *    close: ')',
 *    exclude: [/@include Sugar\.setup\(.*\);/]
 * }]);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SCodeSplitter = /*#__PURE__*/function () {
  /**
   * @name        _settings
   * @type        Object
   * @private
   *
   * Store the instance settings
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SCodeSplitter(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SCodeSplitter);

    _defineProperty(this, "_settings", {});

    this._settings = (0, _deepMerge.default)({}, settings);
  }
  /**
   * @name            split
   * @type            Function
   *
   * This method is the main one that allows you to actually split the passed code
   * into small pieces.
   *
   * @param       {String}        code        The code you want to split
   * @param       {Array<Object>}     splitters       An array of splitter objects composed of these properties:
   * - type (null) {String}: A simple word used as "type" to define the splitted blocks
   * - prefix (null) {Regex}: A regex used to detect the start of a block
   * - suffix (null) {Regex}: A regex used to detect what can be after the block
   * - open ('{') {String}: A 1 character string that specify the opening of a code block like "{", etc...
   * - close ('}') {String}: A 1 character string that specify the closing of a code block like "}", etc...
   * - exclude (null) {Array<Regex>}: An array of regex used to exclude some previously matched blocks of this splitter
   * @param       {Object}        [settings={}]         An object of settings to override the instance ones
   * @return      {Array<Object>}                       An array of splited code blocks objects
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SCodeSplitter, [{
    key: "split",
    value: function split(code, splitters, settings) {
      if (splitters === void 0) {
        splitters = [];
      }

      if (settings === void 0) {
        settings = {};
      }

      settings = (0, _deepMerge.default)(this._settings, settings);
      var blocks = [];
      var thingsToExtract = true;

      var _loop = function _loop() {
        var splittersMatches = [];
        splitters.forEach(extractorObj => {
          if (extractorObj.prefix) {
            var matches = code.match(extractorObj.prefix);

            if (matches) {
              splittersMatches.push({
                extractorObj,
                match: {
                  index: matches.index,
                  string: matches[extractorObj.prefixMatchIdx || 0]
                }
              });
            }
          }
        });
        var idx = code.length,
            extractorObj = void 0;
        splittersMatches.forEach(obj => {
          if (obj.match.index < idx) {
            idx = obj.match.index;
            extractorObj = _objectSpread(_objectSpread({
              opened: false,
              closed: false,
              openCount: 0,
              closeCount: 0
            }, obj.extractorObj), {}, {
              match: obj.match
            });
          }
        });

        if (extractorObj) {
          blocks.push({
            type: 'string',
            data: code.slice(0, extractorObj.match.index)
          });
          code = code.slice(extractorObj.match.index);
        } else {
          blocks.push({
            type: 'string',
            data: code
          });
          thingsToExtract = false;
          return "break";
        }

        var blockString = '';

        for (var i = extractorObj.match.string.length; i < code.length; i++) {
          var char = code[i];
          blockString += char;

          if (char === extractorObj.open) {
            if (!extractorObj.opened) {
              extractorObj.opened = true;
            }

            extractorObj.openCount++;
          } else if (char === extractorObj.close) {
            extractorObj.closeCount++;

            if (extractorObj.opened && extractorObj.closeCount === extractorObj.openCount) {
              extractorObj.closed = true; // check suffix

              if (extractorObj.suffix) {
                var suffixMatch = code.slice(i).match(extractorObj.suffix);

                if (suffixMatch && suffixMatch.index === 1) {
                  blockString += suffixMatch[0];
                }
              }

              blockString = "".concat(extractorObj.match.string).concat(blockString);
              var type = extractorObj.type;

              if (extractorObj.exclude) {
                if (!Array.isArray(extractorObj.exclude)) extractorObj.exclude = [extractorObj.exclude];

                for (var k = 0; k < extractorObj.exclude.length; k++) {
                  var excludeReg = extractorObj.exclude[k];

                  if (blockString.match(excludeReg)) {
                    type = 'string';
                    break;
                  }
                }
              } // append the block to the blocks stack


              blocks.push({
                type: type,
                data: blockString
              }); // crop the code

              code = code.slice(blockString.length); // stop the loop here

              break;
            }
          }
        }
      };

      while (thingsToExtract) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      return blocks;
    }
  }]);

  return SCodeSplitter;
}();

exports.default = SCodeSplitter;
module.exports = exports.default;