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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SWebComponent
 * @namespace         sugar.js.webcomponent
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
let SWebComponent = /*#__PURE__*/function (_HTMLElement) {
  _inherits(SWebComponent, _HTMLElement);

  var _super = _createSuper(SWebComponent);

  _createClass(SWebComponent, null, [{
    key: "define",

    /**
     * @name          _componentsStack
     * @type          Object
     * @private
     * @static
     *
     * Store all the registered components using the "define" static SWebComponent method
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          define
     * @type          Function
     * @static
     *
     * This method can be used to define your component the same way
     * as the "customElements.define" function but with some additional
     * features like passing default props, etc...
     *
     * @param       {SWebComponent}     cls       Your webcomponent class
     * @param       {Object}        [defaultProps={}]     Some default props that you want for this webcomponent
     * @param       {String}        [name=ull        Your component name
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function define(cls, defaultProps = {}, name = null) {
      name = name || cls.name;
      SWebComponent._componentsStack[name] = {
        class: cls,
        defaultProps
      };

      if (window.customElements) {
        window.customElements.define(name, cls);
      } else if (document.registerElement) {
        document.registerElement(name, {
          prototype: cls.prototype
        });
      } else {
        throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
      }
    }
  }]);

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SWebComponent(settings = {}) {
    var _this;

    _classCallCheck(this, SWebComponent);

    // init base html element
    _this = _super.call(this); // save the settings

    _defineProperty(_assertThisInitialized(_this), "_settedAttributesStack", {});

    _defineProperty(_assertThisInitialized(_this), "_promise", null);

    _defineProperty(_assertThisInitialized(_this), "_props", {});

    _defineProperty(_assertThisInitialized(_this), "_settings", {});

    _this._settings = (0, _deepMerge.default)({
      defaultProps: _this.constructor.defaultProps || {},
      requiredProps: _this.constructor.requiredProps || [],
      physicalProps: _this.constructor.physicalProps || []
    }, settings); // create the SPromise instance

    _this._promise = new _SPromise.default(() => {}).start(); // launch the mounting process

    setTimeout(_this._mount.bind(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * @name          _mount
   * @type          Function
   * @private
   * @async
   *
   * This method handle the mounting of the component
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SWebComponent, [{
    key: "_mount",
    value: async function _mount() {
      this._promise.trigger('mounting'); // wait until the component match the mountDependencies and mountWhen status


      await this._mountDependencies(); // init the default props

      this._handleDefaultProps(); // check the required props


      this._checkRequiredProps(); // handle physical props


      this._handlePhysicalProps();

      this._promise.trigger('mounted');
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
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      return this._promise.on(event, callback);
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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_mountDependencies",
    value: function _mountDependencies() {
      return new Promise((resolve, reject) => {
        let promises = []; // check if we have a "mountWhen" setting specified

        if (this._settings.mountWhen) {
          promises.push((0, _when.default)(this._settings.mountWhen));
        } // check if we have one/some "mountDependencies" setting specified


        if (this._settings._mountDependencies) {
          const depsFns = [...this._settings._mountDependencies];
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
      this._promise.trigger('attach');
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
      this._promise.trigger('detach');
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
      if (this._settedAttributesStack[attrName]) return; // try to get the property

      const currentPropObj = this._props[attrName];
      const previousValue = (0, _parse.default)(oldVal);
      const newValue = (0, _parse.default)(newVal); // save the old value and the new value

      const newPropObj = {
        value: newValue,
        previousValue,
        valuesStack: currentPropObj ? [...currentPropObj.valuesStack, newValue] : [newValue]
      }; // save the prop

      this._props[(0, _camelize.default)(attrName)] = newPropObj; // trigger a "prop" event

      this._triggerPropsEvents((0, _camelize.default)(attrName));
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
    value: function prop(_prop, value = undefined) {
      if (value === undefined) {
        return this._props[_prop] ? this._props[_prop].value : undefined;
      }

      if (!this._props[_prop]) {
        this._props[_prop] = {
          value,
          previousValue: null,
          valuesStack: [value]
        };
      } else {
        this._props[_prop] = {
          value,
          previousValue: this._props[_prop].value,
          valuesStack: [...this._props[_prop].valuesStack, value]
        };
      } // handle physical props


      this._handlePhysicalProps(); // trigger a "prop" event


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
      const eventObj = {
        prop,
        action: this._props[prop].previousValue !== null ? this._props[prop].value !== null ? 'update' : 'remove' : 'add',
        value: this._props[prop].value,
        previousValue: this._props[prop].previousValue
      };

      this._promise.trigger('prop', eventObj);

      this._promise.trigger(`prop.${prop}`, eventObj);
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
      // loop on each required props
      console.log('PH', this._settings);

      this._settings.physicalProps.forEach(prop => {
        const value = this._props[prop] && this._props[prop].value !== undefined ? this._props[prop].value : undefined;

        if (!this.getAttribute(prop)) {
          // set the attribute with the value
          this._settedAttributesStack[prop] = true;
          this.setAttribute(prop, (0, _toString.default)(value));
          delete this._settedAttributesStack[prop];
        } else {
          const currentAttributeValue = this.getAttribute(prop);
          const currentValueStringified = (0, _toString.default)(value);

          if (currentAttributeValue !== currentValueStringified) {
            console.log('UPDATED', prop);
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, currentValueStringified);
            delete this._settedAttributesStack[prop];
          }
        }
      });
    }
    /**
     * @name        _handleDefaultProps
     * @type        Function
     * @private
     *
     * This method check for props that are not been setted through attributes
     * and init them using the default props passed in the settings
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_handleDefaultProps",
    value: function _handleDefaultProps() {
      // loop on each required props
      Object.keys(this._settings.defaultProps).forEach(prop => {
        if (this._props[prop] === undefined || this._props[prop].value === undefined) {
          if (this._props[prop] === undefined) this._props[prop] = {
            value: this._settings.defaultProps[prop],
            previousValue: null,
            valuesStack: [this._settings.defaultProps[prop]]
          };
        }
      });
    }
    /**
     * @name        _checkRequiredProps
     * @type        Function
     * @private
     *
     * This method simply check if the required props specified in the settings
     * are passed
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_checkRequiredProps",
    value: function _checkRequiredProps() {
      // loop on each required props
      this._settings.requiredProps.forEach(prop => {
        // check if the prop is missing
        if (this._props[prop] === undefined || this._props[prop].value === undefined) {
          throw new Error(`The property named "${prop}" on the "${this.constructor.name}" webcomponent is required but missing...`);
        }
      });
    }
  }]);

  return SWebComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

exports.default = SWebComponent;

_defineProperty(SWebComponent, "_componentsStack", {});

module.exports = exports.default;