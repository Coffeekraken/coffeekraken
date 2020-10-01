"use strict";

var _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../../object/deepMerge');

module.exports = (_temp = /*#__PURE__*/function () {
  function SCodeExtractor(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SCodeExtractor);

    _defineProperty(this, "_settings", {});

    this._settings = __deepMerge({}, settings);
  }

  _createClass(SCodeExtractor, [{
    key: "extract",
    value: function extract(source, extractors, settings) {
      if (extractors === void 0) {
        extractors = [];
      }

      if (settings === void 0) {
        settings = {};
      }

      settings = __deepMerge(this._settings, settings);
      var blocks = [];
      var blockObj = {
        opened: false,
        closed: false,
        openCount: 0,
        closeCount: 0
      };
      var currentBlockObj = Object.assign({}, blockObj);
      var thingsToExtract = true;

      var _loop = function _loop() {
        var extractorsMatches = [];
        extractors.forEach(extractorObj => {
          if (extractorObj.prefix) {
            var matches = source.match(extractorObj.prefix);

            if (matches) {
              extractorsMatches.push({
                extractorObj,
                match: {
                  index: matches.index,
                  string: matches[extractorObj.prefixMatchIdx || 0]
                }
              });
            }
          }
        });
        var idx = source.length,
            extractorObj = void 0;
        extractorsMatches.forEach(obj => {
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
            data: source.slice(0, extractorObj.match.index)
          });
          source = source.slice(extractorObj.match.index);
        } else {
          blocks.push({
            type: 'string',
            data: source
          });
          thingsToExtract = false;
          return "break";
        }

        var blockString = '';

        for (var i = extractorObj.match.string.length; i < source.length; i++) {
          var char = source[i];
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
                var suffixMatch = source.slice(i).match(extractorObj.suffix);

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
              }); // crop the source

              source = source.slice(blockString.length); // stop the loop here

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

  return SCodeExtractor;
}(), _temp);