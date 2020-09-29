"use strict";

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _SDocblockOutput2 = _interopRequireDefault(require("../SDocblockOutput"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _default = _interopRequireDefault(require("./html/templates/default"));

var _class2 = _interopRequireDefault(require("./html/templates/class"));

var _function = _interopRequireDefault(require("./html/templates/function"));

var _default2 = _interopRequireDefault(require("./html/blocks/default"));

var _class3 = _interopRequireDefault(require("./html/blocks/class"));

var _function2 = _interopRequireDefault(require("./html/blocks/function"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _heading = _interopRequireDefault(require("./html/partials/heading"));

var _params = _interopRequireDefault(require("./html/partials/params"));

var _example = _interopRequireDefault(require("./html/partials/example"));

var _author = _interopRequireDefault(require("./html/partials/author"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name            SDocblockHtmlOutput
 * @namespace       sugar.js.docblock.outputs
 * @type            Class
 *
 * This class represent an SDocblock output like "html", "html", etc...
 * Supported docblock tags:
 * - @type
 * - @namespace
 * - @name
 * - @static
 * - @get
 * - @set
 * - @since
 * - @description
 * - @param
 * - @example
 * - @author
 *
 * @param       {SDocblock}         docblockInstance        The docblock instance you want to output using this class
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockHtmlOutput from '@coffeekraken/sugar/js/docblock/SDocblockHtmlOutput';
 * const docblock = new SDocblock('my/cool/file.js');
 * const docblockOutput = new SDocblockHtmlOutput(docblock);
 * docblockOutput.render();
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_temp = _class = /*#__PURE__*/function (_SDocblockOutput) {
  _inherits(SDocblockHtmlOutput, _SDocblockOutput);

  var _super = _createSuper(SDocblockHtmlOutput);

  /**
   * @name        supportedTags
   * @type        Array<String>
   * @static
   *
   * Store the list of supported docblock tags
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SDocblockHtmlOutput(docblockInstance, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SDocblockHtmlOutput);

    return _super.call(this, docblockInstance, (0, _deepMerge.default)({
      templates: {
        default: '@coffeekraken/sugar/js/docblock/outputs/html/templates/default.js',
        class: '@coffeekraken/sugar/js/docblock/outputs/html/templates/class.js',
        function: '@coffeekraken/sugar/js/docblock/outputs/html/templates/function.js'
      },
      blocks: {
        default: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/default.js',
        class: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/class.js',
        function: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/function.js'
      },
      partials: {
        author: '@coffeekraken/sugar/js/docblock/outputs/html/partials/author.js',
        heading: '@coffeekraken/sugar/js/docblock/outputs/html/partials/heading.js',
        example: '@coffeekraken/sugar/js/docblock/outputs/html/partials/example.js',
        params: '@coffeekraken/sugar/js/docblock/outputs/html/partials/params.js',
        sharings: '@coffeekraken/sugar/js/docblock/outputs/html/partials/sharings.js'
      }
    }, settings));
  }

  return SDocblockHtmlOutput;
}(_SDocblockOutput2.default), _defineProperty(_class, "supportedTags", ['@type', '@namespace', '@name', '@static', '@get', '@set', '@since', '@description', '@param', '@example', '@author']), _temp);