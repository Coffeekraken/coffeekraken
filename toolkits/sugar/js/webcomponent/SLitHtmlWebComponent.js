"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("./SWebComponent"));

var _litHtml = require("lit-html");

var _throttle = _interopRequireDefault(require("../function/throttle"));

var _insertAfter = _interopRequireDefault(require("../dom/insertAfter"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _asyncReplace = require("lit-html/directives/async-replace.js");

var _asyncAppend = require("lit-html/directives/async-append.js");

var _cache = require("lit-html/directives/cache.js");

var _classMap = require("lit-html/directives/class-map.js");

var _ifDefined = require("lit-html/directives/if-defined");

var _guard = require("lit-html/directives/guard");

var _repeat = require("lit-html/directives/repeat");

var _styleMap = require("lit-html/directives/style-map.js");

var _templateContent = require("lit-html/directives/template-content");

var _unsafeHtml = require("lit-html/directives/unsafe-html.js");

var _unsafeSvg = require("lit-html/directives/unsafe-svg");

var _until = require("lit-html/directives/until.js");

var _canHaveChildren = _interopRequireDefault(require("../dom/canHaveChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <p>\n        You need to specify a static template property for your component...\n      </p>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SLitHtmlWebComponent
 * @namespace           sugar.js.webcomponent
 * @type              Class
 * @extends           SWebComponent
 *
 * // TODO: example
 *
 * Base class that you can extends to create some SWebComponent with Lit Html rendering capabilities
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SLitHtmlWebComponent from '@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent';
 * class MyCoolComponent extends SLitHtmlWebComponent {
 *
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @see       https://lit-html.polymer-project.org/
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function SLitHtmlWebComponentGenerator(extendSettings) {
  var _class, _temp;

  if (extendSettings === void 0) {
    extendSettings = {};
  }

  return _temp = _class = /*#__PURE__*/function (_SWebComponent) {
    _inherits(SLitHtmlWebComponent, _SWebComponent);

    var _super = _createSuper(SLitHtmlWebComponent);

    /**
     * @name        template
     * @type        Function
     * @static
     *
     * This static variable store a function that has as parameter the state object
     * of your component and the lit-html ```html``` function that you can use in your template.
     * This function MUST return a template string representing your component HTML depending on the state
     * object at this point.
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name        lit
     * @type        Object
     *
     * Store all the litHtml functions that you may need
     *
     * @see       https://lit-html.polymer-project.org/guide/template-reference
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function SLitHtmlWebComponent(settings) {
      var _this;

      if (settings === void 0) {
        settings = {};
      }

      _classCallCheck(this, SLitHtmlWebComponent);

      _this = _super.call(this, (0, _deepMerge.default)({}, settings)); // wait until mounted to render the component first time

      _defineProperty(_assertThisInitialized(_this), "lit", {
        html: _litHtml.html,
        render: _litHtml.render,
        asyncReplace: _asyncReplace.asyncReplace,
        asyncAppend: _asyncAppend.asyncAppend,
        cache: _cache.cache,
        classMap: _classMap.classMap,
        ifDefined: _ifDefined.ifDefined,
        guard: _guard.guard,
        repeat: _repeat.repeat,
        styleMap: _styleMap.styleMap,
        templateContent: _templateContent.templateContent,
        unsafeHTML: _unsafeHtml.unsafeHTML,
        unsafeSVG: _unsafeSvg.unsafeSVG,
        until: _until.until
      });

      _defineProperty(_assertThisInitialized(_this), "render", (0, _throttle.default)(() => {
        _this._render();
      }, 50));

      _this.on('mounted', e => {
        // insert the container in the document
        if ((0, _canHaveChildren.default)(_assertThisInitialized(_this))) {
          _this.$container = _assertThisInitialized(_this);

          _this.addClass('', _assertThisInitialized(_this));
        } else {
          _this.$container = document.createElement('div');

          _this.addClass('', _this.$container);

          (0, _insertAfter.default)(_this.$container, _assertThisInitialized(_this));
        } // // render for the first time
        // this.render();
        // // refresh references
        // this._refreshIdReferences();


        _this.update();

        console.log('Moutned'); // dispatch a ready event

        _this.dispatch('ready', _assertThisInitialized(_this), {
          bubbles: true // preventSameTarget: true

        }); // listen for media query change to update the view


        _this._mediaQuery.on('match', media => {
          _this.render();
        });
      });

      return _this;
    }
    /**
     * @name          $root
     * @type          Function
     * @get
     *
     * Access the root element of the webcomponent from which the requests like ```$``` and ```$$``` will be executed
     *
     * @since         2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */


    _createClass(SLitHtmlWebComponent, [{
      key: "update",

      /**
       * @name          update
       * @type          Function
       *
       * This method allows you to update your componment manually if needed.
       * - call the ```render``` method of this class
       * - call the ```update``` method of the SWebComponent parent class
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      value: function update() {
        // render
        this._render(); // update parent


        _get(_getPrototypeOf(SLitHtmlWebComponent.prototype), "update", this).call(this);
      }
      /**
       * @name          render
       * @type          Function
       *
       * This method is called every time an update has been made in the state object
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_render",
      value: function _render() {
        if (!this.$container) return;
        var tplFn = this.constructor.template.bind(this);
        var tpl = tplFn(this.props, this._settings, this.lit);
        (0, _litHtml.render)(tpl, this.$container);
      }
    }, {
      key: "$root",
      get: function get() {
        return this.$container || this;
      }
    }]);

    return SLitHtmlWebComponent;
  }((0, _SWebComponent2.default)(extendSettings)), _defineProperty(_class, "template", (props, settings, lit) => lit.html(_templateObject())), _temp;
}

var _default = SLitHtmlWebComponentGenerator;
exports.default = _default;
module.exports = exports.default;