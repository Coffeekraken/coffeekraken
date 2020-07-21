"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SWebComponent;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _parse = _interopRequireDefault(require("../string/parse"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _when = _interopRequireDefault(require("../dom/when"));

var _camelize = _interopRequireDefault(require("../string/camelize"));

var _paramCase = _interopRequireDefault(require("../string/paramCase"));

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

var _validateWithDefinitionObject = _interopRequireDefault(require("../value/validateWithDefinitionObject"));

var _watch = _interopRequireDefault(require("../object/watch"));

var _register = require("./register");

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _dispatch = _interopRequireDefault(require("../event/dispatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @namespace           js.webcomponent
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
function SWebComponent(extend = HTMLElement) {
  var _temp;

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
      get: function () {
        return Object.keys(this.props);
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

    function SWebComponent(settings = {}) {
      var _this;

      _classCallCheck(this, SWebComponent);

      // init base html element
      _this = _super.call(this); // get component metas

      _defineProperty(_assertThisInitialized(_this), "_settedAttributesStack", {});

      _defineProperty(_assertThisInitialized(_this), "_promise", null);

      _defineProperty(_assertThisInitialized(_this), "_props", {});

      _defineProperty(_assertThisInitialized(_this), "_settings", {});

      _this._metas = (0, _register.getComponentMetas)(_this.constructor.componentName); // save the settings

      _this._settings = (0, _deepMerge.default)({
        id: (0, _uniqid.default)(),
        props: _this.constructor.props || {}
      }, _this._metas.settings || {}, settings); // create the SPromise instance

      _this._promise = new _SPromise.default(() => {}).start(); // apply the $node class

      _this.classList.add(`${_this.metas.dashName}__node`); // launch the mounting process


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
      value: async function _mount() {
        // dispatch mounting event
        this.dispatch('mounting', this); // handle props

        for (const key in this._settings.props) {
          const attr = this.getAttribute((0, _uncamelize.default)(key));
          this._props[key] = { ...this._settings.props[key],
            value: attr ? (0, _parse.default)(attr) : this._settings.props[key].default,
            previousValue: undefined
          }; // if need to be watches deeply

          if (this._props[key].watch) {
            this._props[key] = (0, _watch.default)(this._props[key]);

            this._props[key].on('value.*:+(set|delete|push|pop)', update => {
              if (update.path.split('.').length === 1) {
                this.prop(update.path, update.value);
              } else {
                this.handleProp(update.path, this._props[key]);
              }
            });
          }
        } // wait until the component match the mountDependencies and mountWhen status


        await this._mountDependencies(); // check props definition

        this._checkPropsDefinition(); // handle physical props


        this._handlePhysicalProps(); // dispatch mounted event


        this.dispatch('mounted', this);
      }
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


        (0, _dispatch.default)(`${this.metas.dashName}.${name}`, value || this);
        (0, _dispatch.default)(`${this.metas.dashName}#${this._settings.id}.${name}`, value || this);
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
          let promises = []; // check if we have a "mountWhen" setting specified

          if (this._settings.mountWhen) {
            promises.push((0, _when.default)(this._settings.mountWhen));
          } // check if we have one/some "mountDependencies" setting specified


          if (this._settings.mountDependencies) {
            const depsFns = [...this._settings.mountDependencies];
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
        if (this._settedAttributesStack[attrName]) return; // const previousValue = __parse(oldVal);

        const newValue = (0, _parse.default)(newVal) || false; // set the value into the props

        this.prop(attrName, newValue); // trigger a "prop" event

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

        this._props[_prop].previousValue = this._props[_prop].value;
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
        const eventObj = {
          prop,
          action: this._props[prop].previousValue !== null ? this._props[prop].value !== null ? 'set' : 'delete' : 'set',
          value: this._props[prop].value,
          previousValue: this._props[prop].previousValue
        };
        this.dispatch(`prop.${prop}:${eventObj.action}`, eventObj);
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
      value: function _handlePhysicalProps(...props) {
        if (!props || props.length === 0) props = Object.keys(this._props); // loop on each required props

        props.forEach(prop => {
          if (!this._props[prop].physical) return;
          const value = this._props[prop].value; // if the value is false, remove the attributee from the dom node

          if (!value) {
            this.removeAttribute(prop);
            return;
          }

          if (!this.getAttribute(prop)) {
            // set the attribute with the value
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, (0, _toString.default)(value));
            delete this._settedAttributesStack[prop];
          } else {
            const currentAttributeValue = this.getAttribute(prop);
            const currentValueStringified = (0, _toString.default)(value);

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
      value: function _checkPropsDefinition(...props) {
        if (!props || props.length === 0) props = Object.keys(this._props);
        props.forEach(prop => {
          const propObj = this._props[prop];
          const validationResult = (0, _validateWithDefinitionObject.default)(propObj.value, propObj, `${this.constructor.name}.props.${prop}`);
          if (validationResult !== true) throw new Error(validationResult);
        });
      }
    }, {
      key: "metas",
      get: function () {
        return {
          instance: this,
          $node: this,
          ...this._metas
        };
      }
    }]);

    return SWebComponent;
  }(extend), _temp;
}

module.exports = exports.default;