"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SError = _interopRequireDefault(require("../error/SError"));

var _class2 = _interopRequireDefault(require("../is/class"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _parse = _interopRequireDefault(require("../string/parse"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _when = _interopRequireDefault(require("../dom/when"));

var _camelize = _interopRequireDefault(require("../string/camelize"));

var _paramCase = _interopRequireDefault(require("../string/paramCase"));

var _validateValue = _interopRequireDefault(require("../validation/value/validateValue"));

var _watch = _interopRequireDefault(require("../object/watch"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _dispatch = _interopRequireDefault(require("../event/dispatch"));

var _on = _interopRequireDefault(require("../event/on"));

var _SLitHtmlWebComponent = _interopRequireDefault(require("./SLitHtmlWebComponent"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(require("../html/htmlTagToHtmlClassMap"));

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

var _getHtmlClassFromTagName = _interopRequireDefault(require("../html/getHtmlClassFromTagName"));

var _domReady = _interopRequireDefault(require("../dom/domReady"));

var _getTagNameFromHtmlClass = _interopRequireDefault(require("../html/getTagNameFromHtmlClass"));

var _mediaQuery = _interopRequireDefault(require("../responsive/mediaQuery"));

var _SMediaQuery = _interopRequireDefault(require("../responsive/SMediaQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SWebComponent
 * @namespace           sugar.js.webcomponent
 * @type              Class
 * @extends           HTMLElement
 *
 * // TODO: example
 *
 * Base class that allows you to create easily new webcomponents and handle things like attributes updates,
 * base css (scss) importing, etc... Here's a list a features that this class covers:
 * - Listen for attributes changes
 * - Mount the component at a certain point in time (inViewport, visible, etc...)
 * - **Automatically cast the attributes** to their proper js variable types (Array, Object, String, etc...)
 * - **Physical props** : Specify some props that will ALWAYS be present as attribute on the component for styling purpose
 * - Define some **default CSS** that will be injected in the head automatically
 * - Specify some **required props**
 * - **Full lifecycle management** through "events":
 * 	  - attach: Dispatched when the component is attached to the DOM
 *    - detach: Dispatched when the component is detached from the DOM
 *    - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
 *    - mounted: Dispatched when the component has be mounted properly
 *    - prop|prop.{name}: Dispatched when a property has been updated, removed or added
 *      - The object format sended with the event is this one:
 *        - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
 * - **Mount dependencies** : This will allows you to set some promises that have to be resolved before mounting the component
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SWebComponent from '@coffeekraken/sugar/js/webcomponent/SWebComponent';
 * class MyCoolComponent extends SWebComponent {
 *
 *    constructor() {
 *      super();
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _sWebComponentPromise = new _SPromise.default({
  id: 'SWebComponentPromise'
});

var _sWebComponentStack = {};

function SWebComponentGenerator(extendsSettings) {
  var _class, _temp;

  if (extendsSettings === void 0) {
    extendsSettings = {};
  }

  extendsSettings = (0, _deepMerge.default)({
    extends: HTMLElement,
    name: null
  }, extendsSettings);
  return _temp = _class = /*#__PURE__*/function (_extendsSettings$exte) {
    _inherits(SWebComponent, _extendsSettings$exte);

    var _super = _createSuper(SWebComponent);

    _createClass(SWebComponent, null, [{
      key: "getComponentMetas",

      /**
       * @name					getComponentMetas
       * @type 					Function
       * @static
       *
       * This static method return the component metas information like:
       * - name: The camelcase component name
       * - dashName: The component name in dash case
       * - class: The component class
       * - extends: The HTML class that the component extends
       * - settings: An object of settings
       *
       * @param     {String}      name      The component name you want to get the metas of
       *
       * @since 					2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      value: function getComponentMetas(name) {
        return _sWebComponentStack[(0, _uncamelize.default)(name)] || {};
      }
      /**
       * @name					define
       * @type 					Function
       * @static
       *
       * This method allows you to define your component as a webcomponent recognized by the browser
       *
       * @param       {Object}        [settings={}]                 An object of settings to configure your component
       *
       * @setting     {String}        [name=null]                   Specify the component name in CamelCase. MyCoolComponent => <my-cool-component />
       *
       * @since 					2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "define",
      value: function define(settings) {
        if (settings === void 0) {
          settings = {};
        }

        var name = (settings.name || this.componentName || this.name).replace('WebComponent', '');
        var uncamelizedName = (0, _uncamelize.default)(name); // avoid multi define of the same component

        if (customElements.get(uncamelizedName)) return;
        this.componentName = name;
        if (_sWebComponentStack[uncamelizedName]) return;
        _sWebComponentStack[uncamelizedName] = {
          name,
          dashName: uncamelizedName,
          class: this,
          extends: extendsSettings.extends,
          settings
        };
        var defineSettings = {};
        if (extendsSettings.extends !== HTMLElement) defineSettings.extends = (0, _getTagNameFromHtmlClass.default)(extendsSettings.extends);

        if (window.customElements) {
          try {
            window.customElements.define(uncamelizedName, this, defineSettings);
          } catch (e) {// @TODO      find why the component is registeres twice...
            // console.log(e);
          }
        } else if (document.registerElement) {
          try {
            defineSettings.prototype = this.prototype;
            document.registerElement(uncamelizedName, defineSettings);
          } catch (e) {// @TODO      find why the component is registeres twice...
            // console.log(e);
          }
        } else {
          throw "Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...";
        }
      }
      /**
       * @name          constructor
       * @type          Function
       * @constructor
       *
       * Constructor
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "observedAttributes",

      /**
       * @name          promise
       * @type          SPromise
       * @private
       *
       * Store the SPromise instance used to "dispatch" some events
       * that you can subscribe using the "on" exposed method
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          _props
       * @type          Object
       * @private
       *
       * Store all the properties (attributes)
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          _settings
       * @type          Object
       * @private
       *
       * Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          _metas
       * @type          Object
       * @private
       *
       * Store the component metas:
       * - name: The camelcase component name
       * - dashName: The component name in dash case
       * - class: The component class
       * - extends: The HTML class that the component extends
       * - settings: An object of settings
       * - instance: The component instance (this),
       * - $node: The html element (this)
       *
       * @since         2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name        _contexts
       * @type        Array
       * @private
       *
       * Store all the contexts this component will be aware of
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name        observedAttributes
       * @type        Function
       * @get
       * @static
       *
       * This medhod simply return the list of props that will be
       * observed by the customElements under the hood system.
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      get: function get() {
        return Object.keys(this.props).map(name => (0, _uncamelize.default)(name));
      }
    }]);

    function SWebComponent(settings) {
      var _this;

      if (settings === void 0) {
        settings = {};
      }

      _classCallCheck(this, SWebComponent);

      // init base html element
      _this = _super.call(this); // make sure the component has a componentName static prop

      _defineProperty(_assertThisInitialized(_this), "_settedAttributesStack", {});

      _defineProperty(_assertThisInitialized(_this), "_isSWebComponent", true);

      _defineProperty(_assertThisInitialized(_this), "promise", null);

      _defineProperty(_assertThisInitialized(_this), "_props", {});

      _defineProperty(_assertThisInitialized(_this), "props", {});

      _defineProperty(_assertThisInitialized(_this), "_settings", {});

      _defineProperty(_assertThisInitialized(_this), "_metas", {});

      _defineProperty(_assertThisInitialized(_this), "_contexts", [_assertThisInitialized(_this)]);

      if (!_this.constructor.componentName) throw "Your MUST define a static \"componentName\" camelcase property like \"SFiltrableInput\" for your component to work properly..."; // get component metas

      _this._metas = _this.constructor.getComponentMetas(_this.constructor.componentName); // save the settings

      _this._settings = (0, _deepMerge.default)({
        id: _this.getAttribute('id') || (0, _uniqid.default)(),
        props: {}
      }, _this._metas.settings || {}, settings); // add the "this" into the contexts stack

      _this.registerContext(_assertThisInitialized(_this)); // create the SPromise instance


      _this.promise = new _SPromise.default({
        id: _this._settings.id
      }); // init props proxy

      _this._initPropsProxy();

      _this.on('ready', e => {
        if (e.target === _assertThisInitialized(_this)) return;

        if (e.target._isSWebComponent) {
          e.stopImmediatePropagation();
          e.target.registerContext(_assertThisInitialized(_this));
        }
      });

      _this.on('mounted', () => {
        // dispatch a ready event
        if (!_this.lit) {
          _this.update(); // the Lit HTML class dispatch the ready event after having rendering the template the first time


          _this.dispatch('ready', _assertThisInitialized(_this), {
            bubbles: true
          });
        }
      });

      (0, _domReady.default)(() => {
        // get the inital content
        // this._$initialContent =
        // handle props
        _this._initDomProps();

        _this._mediaQuery = new _SMediaQuery.default('*');

        _this._mediaQuery.on('match', media => {
          Object.keys(_this.constructor.props).forEach(prop => {
            if (!_this._props[prop].responsive || _this._props[prop].responsiveValues[media.name] !== undefined) return;

            if (_this.hasAttribute("".concat((0, _uncamelize.default)(prop), "-").concat(media.name))) {
              var value = (0, _parse.default)(_this.getAttribute("".concat((0, _uncamelize.default)(prop), "-").concat(media.name)));

              _this.setProp(prop, value, media.name);
            }
          });
        }); // apply the $node class


        var currentClassName = _this.getAttribute('class') || '';

        _this.setAttribute('class', "".concat(currentClassName, " ").concat(_this.selector("node"))); // launch the mounting process


        _this._mount();
      });
      return _this;
    }
    /**
     * @name          settings
     * @type          Function
     * @get
     *
     * Get the settings object
     *
     * @since         2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */


    _createClass(SWebComponent, [{
      key: "update",

      /**
       * @name        update
       * @type        Function
       *
       * This method allows you to update your component manually if needed
       *
       * @since       2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      value: function update() {
        // refresh references
        this._refreshIdReferences(); // physical props


        this._handlePhysicalProps();
      }
      /**
       * @name					$
       * @type 					Function
       *
       * This method is a shortcut to the ```querySelector``` function
       *
       * @param         {String}        path      The selector path
       * @return        {HTMLElement}             The html element getted
       *
       * @since 					2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "$",
      value: function $(path) {
        var tries = [this.selector(path), path];

        for (var i = 0; i < tries.length; i++) {
          var $tryRes = this.$root.querySelector(tries[i]);
          if ($tryRes) return $tryRes;
        }

        return null;
      }
      /**
       * @name					$$
       * @type 					Function
       *
       * This method is a shortcut to the ```querySelectorAll``` function
       *
       * @param         {String}        path      The selector path
       * @return        {HTMLElement}             The html element(s) getted
       *
       * @since 					2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "$$",
      value: function $$(path) {
        var tries = [this.selector(path), path];

        for (var i = 0; i < tries.length; i++) {
          var $tryRes = this.$root.querySelectorAll(tries[i]);
          if ($tryRes) return $tryRes;
        }

        return null;
      }
      /**
       * @name          registerContext
       * @type          Function
       *
       * This method allows you to register some additional contexts that "this"
       * for the component to be able to find expressions like ```:on-select="doSometing"```
       * It is used by all the SWebComponent instances to find their parent components for example
       *
       * @param       {Object}        context         The context you want to register
       *
       * @since       2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "registerContext",
      value: function registerContext(context) {
        if (this._contexts.indexOf(context) !== -1) return;

        this._contexts.push(context);
      }
      /**
       * @name          setProp
       * @type          Function
       *
       * This method allows you to set a prop and specify the "media" for which you want to set this value
       * The media parameter can be one of the media queries defined in the configuration config.media.queries
       *
       * @param       {String}      prop        The property name you want to set in camelcase
       * @param       {Mixed}       value       The value to set
       * @param       {String}    [media=null]    The media for which you want to set the property. Work only on "responsive" defined props
       *
       * @since       2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "setProp",
      value: function setProp(prop, value, media) {
        if (media === void 0) {
          media = null;
        }

        if (!media) return this.props[prop] = value;

        if (!this._props[prop].responsive) {
          throw new _SError.default("You try to set the responsive property \"".concat(prop, "\" for the media \"").concat(media, "\" but this property is not defined as \"responsive\"..."));
        }

        this._props[prop].responsiveValues[media] = value; // trigger a "prop" event

        this._triggerPropsEvents(prop);
      }
      /**
       * @name          getProp
       * @type          Function
       *
       * This method allows you to get a prop and specify the "media" for which you want to get this value
       * The media parameter can be one of the media queries defined in the configuration config.media.queries
       *
       * @param       {String}      prop        The property name you want to set in camelcase
       * @param       {String}    [media=null]    The media for which you want to set the property. Work only on "responsive" defined props
       *
       * @since       2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "getProp",
      value: function getProp(prop, media) {
        if (media === void 0) {
          media = null;
        }

        if (!media) return this._props[prop].value;

        if (!this._props[prop].responsive) {
          throw new _SError.default("You try to get the responsive property \"".concat(prop, "\" for the media \"").concat(media, "\" but this property is not defined as \"responsive\"..."));
        }

        return this._props[prop].responsiveValues[media];
      }
      /**
       * @name          setSettings
       * @type          Function
       *
       * This method allows you to set some settings by merging the actual once with your new once
       *
       * @param       {Object}      settings        The settings to setting
       * @param       {Boolean}     [reactive=true]     Specify if you want yout component to react directly to the settings changes or not
       * @return      {SWebComponent}           Maintain chainability
       *
       * @since     2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "setSettings",
      value: function setSettings(settings, reactive) {
        if (settings === void 0) {
          settings = {};
        }

        if (reactive === void 0) {
          reactive = true;
        }

        // set the new settings
        this._settings = (0, _deepMerge.default)(this._settings, settings); // check if is reactive

        if (reactive) this.update();
      }
      /**
       * @name          addClass
       * @type          Function
       *
       * This method can be used to add class(es) to an element in the component.
       * This will take care of adding the pcomponent name prefix as well as the ```cssName```prefix
       * if needed
       *
       * @param       {String}      cls       The class(es) to add.
       * @param       {HTMLElement|String}     [$elm=this]       The item on which you want to add the class. Can be a string which will be passed to the ```$``` method to get the HTMLElement itself
       * @return      {SWebComponent}               Return the component itself to maintain chainability
       *
       * @since       2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "addClass",
      value: function addClass(cls, $elm) {
        if ($elm === void 0) {
          $elm = this;
        }

        // split the cls
        var clsArray = cls.split(' ');
        clsArray.forEach(className => {
          // build the selector
          var selector = this.selector(className); // split the selector

          selector.split(' ').forEach(sel => {
            // add the class to the element
            $elm.classList.add(sel);
          });
        }); // maintain chainability

        return this;
      }
      /**
       * @name          removeClass
       * @type          Function
       *
       * This method can be used to remove class(es) to an element in the component.
       * This will take care of adding the component name prefix as well as the ```cssName```prefix
       * if needed
       *
       * @param       {String}      cls       The class(es) to add.
       * @param       {HTMLElement|String}     [$elm=this]       The item on which you want to add the class. Can be a string which will be passed to the ```$``` method to get the HTMLElement itself
       * @return      {SWebComponent}               Return the component itself to maintain chainability
       *
       * @since       2.0.0
       * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "removeClass",
      value: function removeClass(cls, $elm) {
        if ($elm === void 0) {
          $elm = this;
        }

        // split the cls
        var clsArray = cls.split(' ');
        clsArray.forEach(className => {
          // build the selector
          var selector = this.selector(className); // split the selector

          selector.split(' ').forEach(sel => {
            // add the class to the element
            $elm.classList.remove(sel);
          });
        }); // maintain chainability

        return this;
      }
      /**
       * @name          metas
       * @type          Object
       * @get
       *
       * This property store all the component metas informations like the name,
       * the type, what it is extending, etc...
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_refreshIdReferences",
      value: function _refreshIdReferences() {
        var $refs = this.$root.querySelectorAll('[id]');
        Array.from($refs).forEach($item => {
          if (this["$".concat($item.id)] === $item) return;
          this["$".concat($item.id)] = $item;
        });
      }
    }, {
      key: "_initPropsProxy",
      value: function _initPropsProxy() {
        var _this2 = this;

        var _loop = function _loop(prop) {
          var originalProp = void 0;
          if (_this2[prop] !== undefined) originalProp = _this2[prop];
          Object.defineProperty(_this2._props, prop, {
            enumerable: false,
            writable: true,
            configurable: false,
            value: _objectSpread(_objectSpread({}, _this2.constructor.props[prop]), {}, {
              previousValue: undefined,
              value: undefined,
              responsiveValues: {}
            })
          });
          Object.defineProperty(_this2.props, prop, {
            enumerable: true,
            configurable: false,
            get: () => {
              var returnValue = _this2._props[prop].value !== undefined ? _this2._props[prop].value : _this2._settings.props[prop] !== undefined ? _this2._settings.props[prop] : _this2.constructor.props[prop].default;

              if (_this2._props[prop].responsive && _this2._props[prop].responsiveValues) {
                if (_this2._props[prop].responsiveValues[_SMediaQuery.default.getActiveMedia()] !== undefined) {
                  returnValue = _this2._props[prop].responsiveValues[_SMediaQuery.default.getActiveMedia()];
                }
              } // js expression or references


              if (prop.substr(0, 1) === ':') {
                if (typeof returnValue !== 'string') {
                  return returnValue;
                }

                for (var i = 0; i < _this2._contexts.length; i++) {
                  var context = _this2._contexts[i]; // check if is a reference in the current component

                  if (context[returnValue] !== undefined) return context[returnValue];
                }
              }

              return returnValue;
            },
            set: value => {
              _this2._props[prop].previousValue = _this2._props[prop].value;
              _this2._props[prop].value = value;

              if (originalProp) {
                Object.getOwnPropertyDescriptor(_this2.prototype, prop).set.call(_this2, value);
              } // trigger a "prop" event


              _this2._triggerPropsEvents(prop);
            }
          });

          _this2.promise.on("props.".concat(prop, ".*"), update => {
            console.log('updated', prop, update);

            _this2.update();
          });
        };

        for (var prop in this.constructor.props) {
          _loop(prop);
        }
      }
    }, {
      key: "_initDomProps",
      value: function _initDomProps() {
        // handle props
        for (var prop in this.constructor.props) {
          var attr = this.getAttribute((0, _uncamelize.default)(prop));

          if (!attr && this.hasAttribute((0, _uncamelize.default)(prop))) {
            attr = true;
          }

          if (!attr) continue;
          this._props[prop].value = attr ? (0, _parse.default)(attr) : this._props[prop].value !== undefined ? this._props[prop].value : this._settings.props[prop] !== undefined ? this._settings.props[prop] : this.constructor.props[prop].default;
        }
      }
      /**
       * @name          _mount
       * @type          Function
       * @private
       * @async
       *
       * This method handle the mounting of the component
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_mount",
      value: function () {
        var _mount2 = _asyncToGenerator(function* () {
          // dispatch mounting event
          this.dispatch('mounting', this); // wait until the component match the mountDependencies and mountWhen status

          yield this._mountDependencies(); // check props definition

          this._checkPropsDefinition(); // update


          this.update(); // dispatch mounted event

          this._isMounted = true;
          this.dispatch('mounted', this);
        });

        function _mount() {
          return _mount2.apply(this, arguments);
        }

        return _mount;
      }()
      /**
       * @name          on
       * @type          Function
       *
       * Method used to subscribe to the "events" dispatched
       * during the lifecycle of the component. Here's the list of events:
       * - attach: Dispatched when the component is attached to the DOM
       * - detach: Dispatched when the component is detached from the DOM
       * - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
       * - mounted: Dispatched when the component has be mounted properly
       * - prop|prop.{name}: Dispatched when a property has been updated, removed or added
       *    - The object format sended with the event is this one:
       *      - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
       *
       * @param       {String}        event         The event you want to subscribe to
       * @param       {Function}      callback      The callback function that has to be called
       * @return      {SPromise}                    The SPromise used in this instance
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "on",
      value: function on(event, callback) {
        this.addEventListener(event, e => {
          // if (
          //   e.detail &&
          //   e.detail.settings &&
          //   e.detail.settings.preventSameTarget
          // ) {
          //   if (e.target === this) return;
          // }
          callback(e);
        }); // return this.promise.on(event, callback);
      }
      /**
       * @name          off
       * @type          Function
       *
       * Method used to unsubscribe to a previously subscribed event
       *
       * @param       {String}        event         The event you want to unsubscribe for
       * @param       {Function}      callback      The callback function that has to be called
       * @return      {SPromise}                    The SPromise used in this instance
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "off",
      value: function off(event, callback) {// return this.promise.off(event, callback);
      }
      /**
       * @name          dispatch
       * @type          Function
       * @private
       *
       * This method is used to dispatch events simultaneously through the SPromise internal instance on which you can subscribe using the "on" method,
       * and through the global "sugar.js.event.dispatch" function on which you can subscribe using the function "sugar.js.event.on"
       *
       * @param       {String}        name          The event name to dispatch
       * @param       {Mixed}         value         The value to attach to the event
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "dispatch",
      value: function dispatch(name, value, settings) {
        if (settings === void 0) {
          settings = {};
        }

        var event = new CustomEvent(name, _objectSpread(_objectSpread({}, settings), {}, {
          detail: value
        }));
        this.dispatchEvent(event); // // dispatch event through the SPromise internal instance
        // this.promise.trigger(name, value || this);
        // // dispatch a general event
        // __dispatch(`${this.metas.dashName}.${name}`, {
        //   target: this,
        //   value
        // });
        // __dispatch(`${this.metas.dashName}#${this._settings.id}.${name}`, {
        //   target: this,
        //   value
        // });
        // setTimeout(() => {
        //   // dispatch an SWebComponent level event
        //   _sWebComponentPromise.trigger(`${this.metas.dashName}.${name}`, {
        //     target: this,
        //     value
        //   });
        //   _sWebComponentPromise.trigger(
        //     `${this.metas.dashName}#${this._settings.id}.${name}`,
        //     {
        //       target: this,
        //       value
        //     }
        //   );
        // });
      }
      /**
       * @name          _mountDependencies
       * @type          Function
       * @private
       * @async
       *
       * This method simply delay the mounting process of the component
       * based on different settings "properties":
       * - mountWhen (null) {String}: Specify when you want the component to be mounted. Can be:
       *    - inViewport: Mount the component only when it appears in the viewport
       *    - visible: Mount the component when the component became visible (like display:none; to display:block; for example)
       *    - domReady: Mount the component when the DOM is ready
       *    - transitionEnd. Mount the component when the transition is ended
       * - mountDependencies (null) {Function|Array<Function>}: Specify one/some function(s) that returns a Promise and that need to be all resolved before mounting the component
       *
       * @return      {Promise}               Return a promise that will be resolved once every "dependencies" are satisfied
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_mountDependencies",
      value: function _mountDependencies() {
        return new Promise((resolve, reject) => {
          var promises = []; // check if we have a "mountWhen" setting specified

          if (this._settings.mountWhen) {
            promises.push((0, _when.default)(this._settings.mountWhen));
          } // check if we have one/some "mountDependencies" setting specified


          if (this._settings.mountDependencies) {
            var depsFns = [...this._settings.mountDependencies];
            depsFns.forEach(fn => {
              promises.push(fn());
            });
          } // wait until all promises are resolved


          Promise.all(promises).then(() => {
            resolve();
          });
        });
      }
      /**
       * @name          connectedCallback
       * @type          Function
       *
       * Called when the component is attached to the dom
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        // dispatch "event"
        setTimeout(() => {
          this.dispatch('attach', this);
        });
      }
      /**
       * @name          disconnectedCallback
       * @type          Function
       *
       * Called when the component is detached from the dom
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        // dispatch "event"
        this.dispatch('detach', this);
      }
      /**
       * @name            attributeChangedCallback
       * @type            Function
       *
       * Called when an attribute is removed, added or updated
       *
       * @param     {String}      attrName      The attribute name
       * @param     {Mixed}       oldVal        The old attribute value
       * @param     {Mixed}       newVal        The new attribute value
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldVal, newVal) {
        if (!this._isMounted) return;
        if (this._settedAttributesStack[attrName]) return; // const previousValue = __parse(oldVal);

        var newValue = (0, _parse.default)(newVal) || false; // set the value into the props

        this[attrName] = newValue;
      }
      /**
       * @name            selector
       * @type            Function
       *
       * This method return you a selector generated depending on the
       * webcomponent name
       *
       * @param       {String}      cls         The class name to use
       * @return      {String}                  The generated class name
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "selector",
      value: function selector(cls) {
        if (cls === void 0) {
          cls = '';
        }

        var split = cls.split(' ');
        var finalSelectorArray = [];
        split.forEach(part => {
          var hasDot = part.match(/^\./),
              hasHash = part.match(/^\#/);
          part = part.replace('.', '').replace('#', '');
          var finalClsPart;
          if (part.match(/^(--)/)) finalClsPart = "".concat(this.metas.dashName).concat(part);else if (part !== '') finalClsPart = "".concat(this.metas.dashName, "__").concat(part);else finalClsPart = this.metas.dashName;
          if (hasDot) finalClsPart = ".".concat(finalClsPart);
          if (hasHash) finalClsPart = "#".concat(finalClsPart); // add the base class if needed

          if (this.constructor.cssName) {
            var baseCls = (0, _uncamelize.default)(this.constructor.cssName).replace('-web-component', '');

            if (!finalClsPart.includes(baseCls)) {
              var finalBaseCls = '';
              if (part.match(/^(--)/)) finalBaseCls = "".concat(baseCls).concat(part);else if (part !== '') finalBaseCls = "".concat(baseCls, "__").concat(part);else finalBaseCls = baseCls;

              if (hasDot) {
                finalBaseCls = ".".concat(finalBaseCls);
              } else if (hasHash) {
                finalBaseCls = "#".concat(finalBaseCls);
              } else {
                finalClsPart += " ".concat(finalBaseCls);
              }
            }
          }

          finalSelectorArray.push(finalClsPart);
        });
        return finalSelectorArray.join(' ');
      }
      /**
       * @name        _triggerPropsEvents
       * @type        Function
       * @private
       *
       * This method simply trigger a prop|prop.{name} event through the SPromise instance.
       *
       * @param     {String}      prop      The property name to trigger event for
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_triggerPropsEvents",
      value: function _triggerPropsEvents(prop) {
        // trigger a "prop" event
        var eventObj = {
          prop,
          action: this._props[prop].previousValue !== null ? this._props[prop].value !== null ? 'set' : 'delete' : 'set',
          value: this._props[prop].value,
          previousValue: this._props[prop].previousValue,
          media: _SMediaQuery.default.getActiveMedia()
        };
        this.promise.trigger("props.".concat(prop, ".").concat(eventObj.action), eventObj);
      }
      /**
       * @name        _handlePhysicalProps
       * @type        Function
       * @private
       *
       * This method make sure that all the defined physical props are
       * setted as attribute on the DOM element
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_handlePhysicalProps",
      value: function _handlePhysicalProps() {
        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }

        if (!props || props.length === 0) props = Object.keys(this._props); // loop on each required props

        props.forEach(prop => {
          if (!this._props[prop].physical) return;
          var value = this._props[prop].value; // if the value is false, remove the attributee from the dom node

          if (value === undefined || value === null || value === false) {
            this.removeAttribute(prop);
            return;
          }

          if (!this.getAttribute(prop)) {
            // set the attribute with the value
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, (0, _toString.default)(value));
            delete this._settedAttributesStack[prop];
          } else {
            var currentAttributeValue = this.getAttribute(prop);
            var currentValueStringified = (0, _toString.default)(value);

            if (currentAttributeValue !== currentValueStringified) {
              this._settedAttributesStack[prop] = true;
              this.setAttribute(prop, currentValueStringified);
              delete this._settedAttributesStack[prop];
            }
          }
        });
      }
      /**
       * @name        _checkPropsDefinition
       * @type        Function
       * @private
       *
       * This method simply check a property value depending on his definition such as type, required, etc...
       * If you pass no props to check, it will check all the registered ones.
       *
       * @param       {Array<String>|String}        ...props        The properties to check
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_checkPropsDefinition",
      value: function _checkPropsDefinition() {
        for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          props[_key2] = arguments[_key2];
        }

        if (!props || props.length === 0) props = Object.keys(this.constructor.props);
        props.forEach(prop => {
          var propObj = this._props[prop];
          var validationResult = (0, _validateValue.default)(propObj.value, propObj, {
            name: "".concat(this.constructor.name, ".props.").concat(prop),
            throw: true
          }); // if (validationResult !== true) throw new Error(validationResult);
        });
      }
    }, {
      key: "settings",
      get: function get() {
        return this._settings;
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

    }, {
      key: "$root",
      get: function get() {
        return this;
      }
    }, {
      key: "metas",
      get: function get() {
        return _objectSpread({
          instance: this,
          $node: this
        }, this._metas);
      }
    }]);

    return SWebComponent;
  }(extendsSettings.extends), _defineProperty(_class, "customEvents", {}), _defineProperty(_class, "componentName", undefined), _temp;
}

var _default = SWebComponentGenerator;
exports.default = _default;
module.exports = exports.default;