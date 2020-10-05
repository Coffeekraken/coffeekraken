"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _parse = _interopRequireDefault(require("../string/parse"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _when = _interopRequireDefault(require("../dom/when"));

var _camelize = _interopRequireDefault(require("../string/camelize"));

var _paramCase = _interopRequireDefault(require("../string/paramCase"));

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

var _validateValue = _interopRequireDefault(require("../validation/value/validateValue"));

var _watch = _interopRequireDefault(require("../object/watch"));

var _register = require("./register");

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _dispatch = _interopRequireDefault(require("../event/dispatch"));

var _on = _interopRequireDefault(require("../event/on"));

var _SLitHtmlWebComponent = _interopRequireDefault(require("./SLitHtmlWebComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function SWebComponent(extend) {
  var _temp;

  if (extend === void 0) {
    extend = HTMLElement;
  }

  return _temp = /*#__PURE__*/function (_extend) {
    _inherits(SWebComponent, _extend);

    var _super = _createSuper(SWebComponent);

    _createClass(SWebComponent, null, [{
      key: "observedAttributes",

      /**
       * @name          _promise
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
       * Store all the computed properties setted using the "setProp" method or through the
       * attributes
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
      /**
       * @name          constructor
       * @type          Function
       * @constructor
       *
       * Constructor
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }]);

    function SWebComponent(settings) {
      var _this;

      if (settings === void 0) {
        settings = {};
      }

      _classCallCheck(this, SWebComponent);

      // init base html element
      _this = _super.call(this); // get component metas

      _defineProperty(_assertThisInitialized(_this), "_settedAttributesStack", {});

      _defineProperty(_assertThisInitialized(_this), "_promise", null);

      _defineProperty(_assertThisInitialized(_this), "_props", {});

      _defineProperty(_assertThisInitialized(_this), "_settings", {});

      _this._metas = (0, _register.getComponentMetas)(_this.constructor.componentName); // save the settings

      _this._settings = (0, _deepMerge.default)({
        id: _this.getAttribute('id') || (0, _uniqid.default)(),
        props: _this.constructor.props || {}
      }, _this._metas.settings || {}, settings); // create the SPromise instance

      _this._promise = new _SPromise.default({
        id: _this._settings.id
      }); // apply the $node class

      var currentClassName = _this.getAttribute('class') || '';

      _this.setAttribute('class', "".concat(currentClassName, " ").concat(_this.className("node")));

      _this.on('mounted{1}', () => {
        // dispatch a ready event
        if (!_this.lit) {
          // the Lit HTML class dispatch the ready event after having rendering the template the first time
          _this.dispatch('ready', _assertThisInitialized(_this));
        }
      }); // launch the mounting process


      setTimeout(_this._mount.bind(_assertThisInitialized(_this)));
      return _this;
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


    _createClass(SWebComponent, [{
      key: "_mount",

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
      value: function () {
        var _mount2 = _asyncToGenerator(function* () {
          var _this2 = this;

          // dispatch mounting event
          this.dispatch('mounting', this); // handle props

          for (var key in this._settings.props) {
            var attr = this.getAttribute((0, _uncamelize.default)(key));

            if (!attr && this.hasAttribute((0, _uncamelize.default)(key))) {
              attr = true;
            }

            this._props[key] = _objectSpread(_objectSpread({}, this._settings.props[key]), {}, {
              value: attr ? (0, _parse.default)(attr) : this._settings.props[key].default,
              previousValue: undefined
            });
          } // handle props


          var _loop = function _loop(_key) {
            // if need to be watches deeply
            if (_this2._props[_key].watch) {
              _this2._props[_key] = (0, _watch.default)(_this2._props[_key], {
                deep: _this2._props[_key].watch === 'deep'
              });

              _this2._props[_key].on('value.*:+(set|delete|push|pop)', update => {
                if (update.path.split('.').length === 1) {
                  _this2.prop(update.path, update.value);
                } else {
                  _this2.handleProp(update.path, _this2._props[_key]);
                }
              });
            }
          };

          for (var _key in this._settings.props) {
            _loop(_key);
          } // wait until the component match the mountDependencies and mountWhen status


          yield this._mountDependencies(); // check props definition

          this._checkPropsDefinition(); // handle physical props


          this._handlePhysicalProps(); // dispatch mounted event


          this._isMounted = true;
          this.dispatch('mounted', this);
        });

        function _mount() {
          return _mount2.apply(this, arguments);
        }

        return _mount;
      }()
      /**
       * @name          handleProp
       * @type          Function
       * @async
       *
       * This method is supposed to be overrided by your component integration
       * to handle the props updates and delete actions.
       * The passed description object has this format:
       * ```js
       * {
       *    action: 'set|delete',
       *    path: 'something.cool',
       *    oldValue: '...',
       *    value: '...'
       * }
       * ```
       *
       * @param     {String}      prop      The property name that has been updated or deleted
       * @param     {Object}      descriptionObj      The description object that describe the update or delete action
       * @return    {Promise}                A promise that has to be resolved once the update has been handled correctly. You have to pass the prop variable to the resolve function
       *
       * @since     2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "handleProp",
      value: function handleProp(prop, descriptionObj) {
        return new Promise((resolve, reject) => {
          resolve(prop);
        });
      }
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
        return this._promise.on(event, callback);
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
      value: function dispatch(name, value) {
        // dispatch event through the SPromise internal instance
        this._promise.trigger(name, value || this); // dispatch a general event


        (0, _dispatch.default)("".concat(this.metas.dashName, ".").concat(name), {
          target: this,
          value
        });
        (0, _dispatch.default)("".concat(this.metas.dashName, "#").concat(this._settings.id, ".").concat(name), {
          target: this,
          value
        });
        setTimeout(() => {
          // dispatch an SWebComponent level event
          _sWebComponentPromise.trigger("".concat(this.metas.dashName, ".").concat(name), {
            target: this,
            value
          });

          _sWebComponentPromise.trigger("".concat(this.metas.dashName, "#").concat(this._settings.id, ".").concat(name), {
            target: this,
            value
          });
        });
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

        this.prop(attrName, newValue);
      }
      /**
       * @name            className
       * @type            Function
       *
       * This method return you a className generated depending on the
       * webcomponent name
       *
       * @param       {String}      cls         The class name to use
       * @return      {String}                  The generated class name
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "className",
      value: function className(cls) {
        if (cls === void 0) {
          cls = '';
        }

        var originalName = (0, _uncamelize.default)(this.constructor.name).replace('-web-component', '');
        var hasDot = cls.match(/^\./);
        cls = cls.replace('.', '');
        var finalCls;
        if (cls.match(/^(--)/)) finalCls = "".concat(this.metas.dashName).concat(cls);else if (cls !== '') finalCls = "".concat(this.metas.dashName, "__").concat(cls);else finalCls = this.metas.dashName;

        if (cls.match(/^(--)/)) {
          finalCls = "".concat(hasDot ? '.' : '').concat(originalName, "-bare").concat(cls, " ").concat(hasDot ? '.' : '').concat(finalCls);
        } else if (cls !== '') {
          finalCls = "".concat(hasDot ? '.' : '').concat(originalName, "-bare__").concat(cls, " ").concat(hasDot ? '.' : '').concat(finalCls);
        } else {
          finalCls = "".concat(hasDot ? '.' : '').concat(originalName, "-bare ").concat(hasDot ? '.' : '').concat(finalCls);
        }

        return finalCls;
      }
      /**
       * @name        prop
       * @type        Function
       *
       * Get of set a property
       *
       * @param       {String}      prop      The property you want to get/set
       * @param       {Mixed}       [value=undefined]    The value you want to set
       * @return      {Mixed}                 The property value
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "prop",
      value: function prop(_prop, value) {
        if (value === void 0) {
          value = undefined;
        }

        // camelize the attribute name
        _prop = (0, _camelize.default)(_prop);

        if (value === undefined) {
          return this._props[_prop] ? this._props[_prop].value : undefined;
        }

        this._props[_prop].previousValue = this._props[_prop] ? this._props[_prop].value : undefined;
        this._props[_prop].value = value;
        this.handleProp(_prop, this._props[_prop]); // handle physical props

        this._handlePhysicalProps(_prop); // trigger a "prop" event


        this._triggerPropsEvents(_prop);

        return value;
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
          previousValue: this._props[prop].previousValue
        };
        this.dispatch("prop.".concat(prop, ".").concat(eventObj.action), eventObj);
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
        for (var _len = arguments.length, props = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
          props[_key2] = arguments[_key2];
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
        for (var _len2 = arguments.length, props = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          props[_key3] = arguments[_key3];
        }

        if (!props || props.length === 0) props = Object.keys(this._props);
        props.forEach(prop => {
          var propObj = this._props[prop];
          var validationResult = (0, _validateValue.default)(propObj.value, propObj, {
            name: "".concat(this.constructor.name, ".props.").concat(prop),
            throw: true
          });
          if (validationResult !== true) throw new Error(validationResult);
        });
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
  }(extend), _temp;
}
/**
 * @name        on
 * @type        Function
 * @static
 *
 * This method can be used to subscribe to some SWebComponent instances events
 * like "SFiltrableInput.ready", etc...
 *
 * @param       {String}      name        The event name to subscribe to
 * @param       {Function}    callback    The callback function to call
 * @return      {Function}                A function that you can use to unsubscribe to this particular event
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


SWebComponent.on = (name, callback) => {
  _sWebComponentPromise.on(name, callback);

  return () => {
    _sWebComponentPromise.off(name, callback);
  };
};

var _default = SWebComponent;
exports.default = _default;
module.exports = exports.default;