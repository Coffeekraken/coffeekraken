"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mixwith = require("../vendor/mixwith");

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

var _extend2 = _interopRequireDefault(require("lodash/extend"));

var _camelize = _interopRequireDefault(require("../string/camelize"));

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

var _fastdom = _interopRequireDefault(require("fastdom"));

var _dispatchEvent = _interopRequireDefault(require("../dom/dispatchEvent"));

var _whenInViewport = _interopRequireDefault(require("../dom/whenInViewport"));

var _whenVisible = _interopRequireDefault(require("../dom/whenVisible"));

var _prependChild = _interopRequireDefault(require("../dom/prependChild"));

var _propertyProxy = _interopRequireDefault(require("../object/propertyProxy"));

var _onChange = _interopRequireDefault(require("on-change"));

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

require("es6-object-assign").polyfill();

if (!window.sugar) window.sugar = {};
if (!window.sugar._webComponentsClasses) window.sugar._webComponentsClasses = {};
if (!window.sugar._webComponentsDefaultProps) window.sugar._webComponentsDefaultProps = {};
if (!window.sugar._webComponentsDefaultCss) window.sugar._webComponentsDefaultCss = {};
const SWebComponentMixin = (0, _mixwith.Mixin)(superclass => {
  var _temp2;

  return _temp2 = /*#__PURE__*/function (_superclass) {
    _inherits(_temp2, _superclass);

    var _super = _createSuper(_temp2);

    _createClass(_temp2, [{
      key: "defaultProps",

      /**
       * Get the default props for this particular instance
       * @type  		{Object}
       */
      get: function () {
        // check if default props in cache to avoid multiple time
        // computing
        if (this._defaultPropsCache) return this._defaultPropsCache; // compute

        let props = window.sugar._webComponentsClasses[this.componentName].defaultProps;
        let comp = window.sugar._webComponentsClasses[this.componentName];

        while (comp) {
          if (comp.defaultProps) {
            props = { ...comp.defaultProps,
              ...props
            };
          }

          if (comp._defaultProps) {
            props = { ...props,
              ...comp._defaultProps
            };
          }

          comp = Object.getPrototypeOf(comp);
        } // extend with default props stored in the component default props stack by tagname


        if (window.sugar._webComponentsDefaultProps[this.componentName]) {
          props = { ...props,
            ...window.sugar._webComponentsDefaultProps[this.componentName]
          };
        } // save in cache


        this._defaultPropsCache = Object.assign({}, props); // return props

        return props;
      }
      /**
       * Return an array of props to set on the dom
       * @return 		{Array}
       */

    }, {
      key: "physicalProps",

      /**
       * Get physical props for this particular instance
       * @return 		{Array} 			The physical props array
       */
      get: function () {
        if (this._physicalPropsCache) return this._physicalPropsCache;
        let props = window.sugar._webComponentsClasses[this.componentName].physicalProps;
        let comp = window.sugar._webComponentsClasses[this.componentName];

        while (comp) {
          if (comp.physicalProps) {
            comp.physicalProps.forEach(prop => {
              if (props.indexOf(prop) === -1) {
                props.push(prop);
              }
            });
          }

          comp = Object.getPrototypeOf(comp);
        }

        this._physicalPropsCache = props;
        return props;
      }
      /**
       * Return an array of required props to init the component
       * @return 		{Array}
       */

    }, {
      key: "requiredProps",

      /**
       * Get the required props array for this particular instance
       * @return 		{Array} 			An array of required props
       */
      get: function () {
        if (this._requiredPropsCache) return this._requiredPropsCache;
        let props = window.sugar._webComponentsClasses[this.componentName].requiredProps;
        let comp = window.sugar._webComponentsClasses[this.componentName];

        while (comp) {
          if (comp.requiredProps) {
            comp.requiredProps.forEach(prop => {
              if (props.indexOf(prop) === -1) {
                props.push(prop);
              }
            });
          }

          comp = Object.getPrototypeOf(comp);
        }

        this._requiredPropsCache = props;
        return props;
      }
      /**
       * Default state
       * Specify the default state object to start with. The state can be updated using the setState function and passing a new state object
       * that will be merged inside the actual one
       * @protected
       */

    }, {
      key: "defaultState",

      /**
       * Get the default state for this particular instance
       * @type  		{Object}
       * @protected
       */
      get: function () {
        // check if default state in cache to avoid multiple time
        // computing
        if (this._defaultStateCache) return this._defaultStateCache; // compute

        let state = window.sugar._webComponentsClasses[this.componentName].defaultState;
        let comp = window.sugar._webComponentsClasses[this.componentName];

        while (comp) {
          if (comp.defaultState) {
            state = { ...comp.defaultState,
              ...state
            };
          }

          comp = Object.getPrototypeOf(comp);
        } // save in cache


        this._defaultStateCache = Object.assign({}, state); // return state

        return state;
      }
      /**
       * Specify the default css for the component
       * @param 		{String} 		componentName 		The camelcase component name
       * @param 		{String} 		componentNameDash 	The dashcase component name
       * @return 		{String} 							The default css for the component
       */

    }, {
      key: "defaultCss",

      /**
       * Get the default css of the component
       * @type 		{String}
       */
      get: function () {
        if (this._defaultCssCache) return this._defaultCssCache;
        let css = "";
        let comp = window.sugar._webComponentsClasses[this.componentName];

        while (comp) {
          if (comp.defaultCss) {
            css += comp.defaultCss(this.componentName, this.componentNameDash);
          }

          comp = Object.getPrototypeOf(comp);
        }

        this._defaultCssCache = css;
        return css;
      }
      /**
       * Return an array of props to set on the dom
       * @type 		{Array}
       */

    }, {
      key: "mountDependencies",

      /**
       * Get an array of promises to resolve before mounting the component.
       * @type 		{Array<Promise>}
       */
      get: function () {
        let deps = [];
        let comp = window.sugar._webComponentsClasses[this.componentName];

        while (comp) {
          if (comp.mountDependencies) {
            comp.mountDependencies.forEach(dep => {
              if (deps.indexOf(dep) === -1) {
                deps.push(dep);
              }
            });
          }

          comp = Object.getPrototypeOf(comp);
        } // props mount dependencies


        deps = deps.concat(this.props.mountDependencies);
        let finalDeps = [];
        deps.forEach(dep => {
          if (typeof dep === "function") {
            dep = dep.bind(this);
            dep = dep();
          }

          finalDeps.push(dep);
        });
        return finalDeps;
      }
      /**
       * Constructor
       * @protected
       */

    }], [{
      key: "define",

      /**
       * Define the new web component
       * @param 			{String} 			name 		The name of the component
       * @param 			{Object|String} 	[componentClassOrExt=null] 	The component class or the HTML tag to extend like "input", "button", etc...
       * @param 			{Object|String}		[ext=null] 		The HTML tag to extend like "input", "button", etc...
       * @param       {Object}          [defaultProps={}]     The default props for the webcomponents
       */
      value: function define(name, componentOrExt = null, ext = null, defaultProps = {}) {
        const component = componentOrExt && typeof componentOrExt !== "string" ? componentOrExt : this;
        const componentName = (0, _upperFirst.default)((0, _camelize.default)(name));
        const componentNameDash = name;
        ext = typeof componentOrExt === "string" ? componentOrExt : ext;
        if (window.sugar._webComponentsClasses[componentName]) return;
        window.sugar._webComponentsClasses[componentName] = component;
        const tag = (0, _upperFirst.default)((0, _camelize.default)(name));
        window.sugar._webComponentsDefaultProps[tag] = { ...(window.sugar._webComponentsDefaultProps[tag] || {}),
          ...defaultProps
        }; // register the webcomponent

        if (window.customElements) {
          const extendsObj = {};

          if (ext) {
            extendsObj.extends = ext;
          }

          window.customElements.define(name, component, extendsObj);
        } else if (document.registerElement) {
          document.registerElement(name, {
            prototype: component.prototype,
            extends: ext
          });
        } else {
          throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
        } // create a proxy factory


        const webcomponent = function (props = {}) {
          if (ext) {
            return document.createElement(ext, name).setProps(props);
          }

          return document.createElement(name).setProps(props);
        }; // fix for firefox and surely other crapy browser...
        // this make sur that the (static) methods of the component
        // are present on the webcomponent itself


        let staticFns = [];
        let comp = component;

        while (comp) {
          try {
            staticFns = staticFns.concat(Object.getOwnPropertyNames(comp).filter(prop => typeof comp[prop] === "function"));
            comp = Object.getPrototypeOf(comp);
          } catch (e) {
            break;
          }
        }

        const keys = staticFns.concat(Object.keys(component));
        keys.forEach(function (key) {
          if (!webcomponent[key]) {
            webcomponent[key] = component[key];
          }
        }); // handle css

        component._injectDefaultCss(component, componentName, componentNameDash); // return the webcomponent instance


        return webcomponent;
      }
      /**
       * Inject css into html
       * @param 		{HTMLElement}	componentClass 		The component class for which to inject the base css
       * @param 		{String} 		componentName 		The component name
       * @param 		{String} 		componentNameDash 	The dash formated component name
       */

    }, {
      key: "_injectDefaultCss",
      value: function _injectDefaultCss(componentClass, componentName, componentNameDash) {
        // check if component has a css to be injected into the page
        if (window.sugar._webComponentsDefaultCss[componentName] === undefined) {
          let css = "";
          let comp = componentClass;

          while (comp) {
            if (comp.defaultCss) {
              css += comp.defaultCss(componentName, componentNameDash);
            }

            comp = Object.getPrototypeOf(comp);
          }

          if (css) {
            css = css.replace(/[\s]+/g, " ");
            window.sugar._webComponentsDefaultCss[componentName] = css;
            const styleElm = document.createElement("style");
            styleElm.setAttribute("name", componentName);
            styleElm.innerHTML = css;
            (0, _prependChild.default)(styleElm, document.head);
          } else {
            window.sugar._webComponentsDefaultCss[componentName] = false;
          }
        }
      }
      /**
       * Internal store for all the props of the component
       * Props are actual computed props with attributes
       * @type 		{Object}
       */

    }, {
      key: "setDefaultProps",

      /**
       * Set some default props for a specific component
       * @param 		{Object} 		props 			A props object to set
       * @param 		{String} 		[tagname=null] 	The tagname of the component you want to setting up
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      value: function setDefaultProps(props, tagname = null) {
        // if a tagname is specified, we store the default props for a
        // particular tagname
        if (tagname) {
          tagname = [].concat(tagname);
          tagname.forEach(tag => {
            tag = (0, _upperFirst.default)((0, _camelize.default)(tag));
            window.sugar._webComponentsDefaultProps[tag] = { ...(window.sugar._webComponentsDefaultProps[tag] || {}),
              ...props
            };
          });
        } else {
          const proto = this;
          proto._defaultProps = { ...(proto._defaultProps || {}),
            ...props
          };
        }
      }
    }, {
      key: "defaultCss",
      value: function defaultCss(componentName, componentNameDash) {
        return "";
      }
    }, {
      key: "defaultProps",

      /**
       * Return the default props for the component.
       * Need to take care of the passed props parameter and mix it at the
       * end of your default props
       *
       * @type 	{Object}
       * @example
       * getDefaultProps(props = {}) {
       * 		return super.getDefaultProps({
       * 			myCoolProp : null,
       * 			...props
       * 		});
       * }
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      get: function () {
        return {
          mountWhen: null,
          mountDependencies: [],
          unmountTimeout: 500
        };
      }
    }, {
      key: "physicalProps",
      get: function () {
        return [];
      }
    }, {
      key: "requiredProps",
      get: function () {
        return [];
      }
    }, {
      key: "defaultState",
      get: function () {
        return {};
      }
    }, {
      key: "mountDependencies",
      get: function () {
        return [];
      }
    }]);

    function _temp2(...args) {
      var _temp, _this;

      _classCallCheck(this, _temp2);

      const self = (_temp = _this = _super.call(this, ...args), _defineProperty(_assertThisInitialized(_this), "_props", {}), _defineProperty(_assertThisInitialized(_this), "props", {}), _temp);
      self.init();
      return _possibleConstructorReturn(_this, self);
    }

    _createClass(_temp2, [{
      key: "init",
      value: function init() {
        this.createdCallback();
      }
      /**
       * When the component is created.
       * This is called even if the component is not attached in the DOM tree
       * @protected
       */

    }, {
      key: "createdCallback",
      value: function createdCallback() {
        // props
        this.props = this.props || {}; // track the lifecyle

        this._lifecycle = {
          componentWillMount: false,
          componentMount: false,
          componentUnmount: false
        }; // created callback

        this.componentCreated();
      }
      /**
       * When the element is attached in the DOM tree
       * @protected
       */

    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        // if not already passed through the created process
        if (!this._lifecycle) this.createdCallback(); // update attached status

        this._componentAttached = true; // clear the unmount timeout

        clearTimeout(this._unmountTimeout); // stop here if already mounted once

        if (this._lifecycle.componentMount || this._lifecycle.componentWillMount) return; // set the componentName

        const sourceName = this.getAttribute("is") || this.tagName.toLowerCase();
        this.componentNameDash = this._componentNameDash = sourceName;
        this.componentName = this._componentName = (0, _upperFirst.default)((0, _camelize.default)(sourceName)); // default props init

        this._props = Object.assign({}, this.defaultProps, this._props || {}, this.props); // if we have some initial props, we set them now

        if (this._initialProps) this.setProps(this._initialProps); // set the state

        this._state = Object.assign({}, this.defaultState, this._state || {}, this.state || {}); // init properties proxy object

        if (window.Proxy) {
          this.props = new Proxy(this._props, {
            set: (target, property, value) => {
              // get the old value
              const oldVal = target[property]; // protect against same value assignation

              if (oldVal === value) return true; // apply the new value

              target[property] = value; // handle the new property value

              this._handleNewPropValue(property, value, oldVal); // notify the proxy that the property has been updated


              return true;
            },
            get: (target, property) => {
              // simply return the property value from the target
              return target[property];
            }
          });
        } else {
          this.props = this._props;
        } // init state proxy object


        if (window.Proxy) {
          this.state = new Proxy(this._state, {
            set: (target, property, value) => {
              // get the old value
              const oldVal = target[property]; // protect against same value assignation

              if (oldVal === value) return true; // apply the new value

              target[property] = value; // handle the new property value

              this._handleNewStateValue(property, value, oldVal); // notify the proxy that the property has been updated


              return true;
            },
            get: (target, property) => {
              // simply return the property value from the target
              return target[property];
            }
          });
        } else {
          this.state = this._state;
        } // listen for updates on the element itself
        // instead of using the attributesChangedCallback
        // cause with the attributesChangedCallback, you'll need to declare
        // at start which attributes to listen and this behavior is not suitable
        // for new attributes added after the component creation...


        const observer = new MutationObserver(mutationList => {
          const mutatedAttributes = [];
          mutationList.forEach(mutation => {
            if (mutatedAttributes.indexOf(mutation.attributeName) === -1) {
              this._attributeMutationCallback(mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName));
            }

            mutatedAttributes.push(mutation.attributeName);
          });
        });
        observer.observe(this, {
          attributes: true,
          attributeOldValue: true
        }); // internal properties

        this._nextPropsStack = {};
        this._prevPropsStack = {};
        this._nextStateStack = {};
        this._prevStateStack = {}; // compute props

        this._initInitialAttributes(); // check the required props


        this.requiredProps.forEach(prop => {
          if (!this.props[prop]) {
            throw `The "${this.componentNameDash}" component need the "${prop}" property in order to work`;
          }
        }); // component will mount only if part of the active document

        this.componentWillMount(); // wait until dependencies are ok

        this._whenMountDependenciesAreOk().then(() => {
          // if mountWhen is a function, assuming that this function return a promise
          if (this.props.mountWhen && typeof this.props.mountWhen === "function") {
            this.props.mountWhen().then(() => {
              // mount component
              this._mountComponent();
            }).catch(e => {
              throw new Error(e);
            });
          } else if (this.props.mountWhen && typeof this.props.mountWhen === "string") {
            // switch on the mountWhen prop
            switch (this.props.mountWhen) {
              case "inViewport":
              case "isInViewport":
                (0, _whenInViewport.default)(this).then(() => {
                  this._mountComponent();
                });
                break;

              case "isMouseover":
              case "mouseover":
                this.addEventListener("mouseover", this._onMouseoverComponentMount.bind(this));
                break;

              case "isVisible":
              case "visible":
                (0, _whenVisible.default)(this).then(() => {
                  this._mountComponent();
                });
                break;

              default:
                // mount component directly
                this._mountComponent();

                break;
            }
          } else {
            // mount directly
            this._mountComponent();
          }
        });
      }
    }, {
      key: "attachedCallback",
      value: function attachedCallback() {
        this.connectedCallback();
      }
      /**
       * When any of the component attribute changes
       * @param 		{String} 		attribute 		The attribute name that has changed
       * @param 		{String}		oldVal 			The previous attribute value
       * @param 		{String} 		newVal 			The new attribute value
       * @protected
       */

    }, {
      key: "_attributeMutationCallback",
      value: function _attributeMutationCallback(attribute, oldVal, newVal) {
        // stop if the attribute has not changed
        if (oldVal === newVal) return; // keep an original attribute name

        const _attribute = attribute; // process the attribute to camelCase

        attribute = (0, _camelize.default)(attribute); // if the property is not a real property

        if (!this.shouldComponentAcceptProp(attribute)) return; // cast the new val

        newVal = (0, _autoCast.default)(newVal); // handle the case when newVal is undefined (added attribute whithout any value)

        if ((newVal === undefined || newVal === null || newVal === "") && this.hasAttribute(_attribute)) {
          newVal = true;
        } else if (newVal === null && !this.hasAttribute(_attribute) && this.props[attribute] === false) {
          // the attribute has been removed and
          // the prop is already to false
          return;
        } // do nothing if the value is already the same


        if (this.props[attribute] === newVal) return; // set the new prop

        this.setProp(attribute, newVal);
      }
      /**
       * Called directly when the component is created. This act like a constructor.
       *
       * @example
       * componentCreated() {
       * 		// call parent method
       * 		super.componentCreated();
       * 		// do something here...
       * }
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "componentCreated",
      value: function componentCreated() {}
      /**
       * Method called before the component will actually mount and BEFORE the the mountDependencies to be resolved or not.
       * This is a good place to do directl when the component is attached in the DOM but before any dependencies are resolved
       *
       * @example
       * componentWillMount() {
       * 		// call parent method
       * 		super.componentWillMount();
       * 		// do something here...
       * }
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        // protect from mounting multiple times when unecessary
        if (this._lifecycle.componentWillMount) return; // update lifecycle state

        this._lifecycle.componentWillMount = true;
      }
      /**
       * Method called right after that the component has been added in the dom,
       * after and only if the mountDependencies are resolved
       * and before the initial render.
       *
       * @example
       * componentMount() {
       * 		// call parent method
       * 		super.componentMount();
       * 		// do something here...
       * }
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "componentMount",
      value: function componentMount() {
        if (this._lifecycle.componentMount) return; // update the lifecycle state

        this._lifecycle.componentMount = true; // mark the component as mounted

        this.setAttribute("mounted", true);
      }
      /**
       * Apply all the updated that you need in the dom for the component to reflect the props
       *
       * @example
       * render() {
       * 		// call the parent method
       * 		super.render();
       * 		// apply some classes, properties, styles, etc... in the dom
       * 		// in order to reflect the props object state
       * }
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "render",
      value: function render() {}
      /**
       * Method called when the component need to unmount itself cause it has been removed from the DOM tree and the props.unmountTimeout is passed.
       *
       * @example
       * componentUnmount() {
       * 		// call parent method
       * 		super.componentUnmount();
       * 		// do something here...
       * }
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "componentUnmount",
      value: function componentUnmount() {
        if (this._lifecycle.componentUnmount) return; // update lifecycle state

        this._lifecycle.componentUnmount = true; // remove the component mounted attribute

        this.removeAttribute("mounted");
      }
      /**
       * Check all the mountDependencies and try to resolve them.
       * @return 			{Promise} 				A promise that will be resolved when the dependencies are resolved
       */

    }, {
      key: "_whenMountDependenciesAreOk",
      value: function _whenMountDependenciesAreOk() {
        const promise = new Promise((resolve, reject) => {
          const deps = this.mountDependencies;

          if (!deps.length) {
            resolve();
          } else {
            // resolve all the promises
            Promise.all(deps).then(() => {
              resolve();
            });
          }
        });
        return promise;
      }
      /**
       * On mouse over
       */

    }, {
      key: "_onMouseoverComponentMount",
      value: function _onMouseoverComponentMount() {
        this._mountComponent();

        this.removeEventListener("mouseover", this._onMouseoverComponentMount);
      }
      /**
       * Internal mount component method
       */

    }, {
      key: "_mountComponent",
      value: function _mountComponent() {
        // wait next frame
        _fastdom.default.clear(this._fastDomFirstRenderTimeout);

        this._fastDomFirstRenderTimeout = this.mutate(() => {
          // sometimes, the component has been unmounted between the
          // fastdom execution, so we stop here if it's the case
          if (!this._componentAttached) return; // init

          this.componentMount(); // render

          this.render();
        });
      }
      /**
       * Detect when the component is detached from the DOM tree.
       * @protected
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        // update attached status
        this._componentAttached = false; // unmount timeout

        clearTimeout(this._unmountTimeout);
        this._unmountTimeout = setTimeout(() => {
          // wait next frame
          _fastdom.default.clear(this._fastdomSetProp);

          this._fastdomSetProp = this.mutate(() => {
            // unmount only if the component is mounted
            if (!this._lifecycle.componentMount) return; // unmount

            this.componentUnmount(); // update lifecycle

            this._lifecycle.componentMount = false;
          });
        }, this.props.unmountTimeout);
      }
    }, {
      key: "detachedCallback",
      value: function detachedCallback() {
        this.disconnectedCallback();
      }
      /**
       * Dispatch an event from the tag with namespaced event name
       * This will dispatch actually two events :
       * 1. {tagName}.{name} : example : s-datepicker.change
       * 2. {name} 		   : example : change
       *
       * @param		{String} 		name 		The event name
       * @param 		{Mixed} 		data 		Some data to attach to the event
       */

    }, {
      key: "dispatchComponentEvent",
      value: function dispatchComponentEvent(name, data = null, fromElm = this) {
        (0, _dispatchEvent.default)(fromElm, name, data);
        (0, _dispatchEvent.default)(fromElm, `${this.tagName.toLowerCase()}.${name}`, data);
      }
      /**
       * Set a bunch of properties at once
       * @param 			{Object} 		[props={}] 		An object of props to set
       */

    }, {
      key: "setProps",
      value: function setProps(props = {}) {
        // set each props
        for (let key in props) {
          this.setProp(key, props[key]);
        } // return the component


        return this;
      }
      /**
       * Set a property
       * @param 			{String} 		prop 			The property name to set
       * @param 			{Mixed} 		value 			The new property value
       */

    }, {
      key: "setProp",
      value: function setProp(prop, value, set = true) {
        // if the component is not attached to the dom, we don't have the props etc
        // so we save them inside an object that we will merge later in the props
        if (!this._componentAttached) {
          if (!this._initialProps) this._initialProps = {};
          this._initialProps[prop] = value;
          return;
        } // save the oldVal


        const oldVal = this.props[prop]; // stop if same value

        if (oldVal === value) return; // set the prop

        this._props[prop] = value; // handle new value

        this._handleNewPropValue(prop, value, oldVal); // return the component


        return this;
      }
      /**
       * Get a property
       * @param 		{String} 		prop 			The property name to get
       * @return 		{Mixed} 						The property value or null
       */

    }, {
      key: "getProp",
      value: function getProp(prop) {
        return this.props[prop];
      }
      /**
       * Handle new property
       * @param 		{String} 		prop 		The property name
       * @param 		{Mixed} 		newVal 		The new property value
       * @param 		{Mixed}			oldVal 		The old property value
       */

    }, {
      key: "_handleNewPropValue",
      value: function _handleNewPropValue(prop, newVal, oldVal) {
        // if the component is not mounted
        // we do nothing here...
        if (!this.isComponentMounted()) return; // create the stacks

        this._prevPropsStack[prop] = oldVal;
        this._nextPropsStack[prop] = newVal; // component will receive prop

        this.componentWillReceiveProp(prop, newVal, oldVal); // wait till next frame

        _fastdom.default.clear(this._fastdomSetProp);

        this._fastdomSetProp = _fastdom.default.mutate(() => {
          // create array version of each stacks
          const nextPropsArray = [];

          for (let key in this._nextPropsStack) {
            const val = this._nextPropsStack[key];
            nextPropsArray.push({
              name: key,
              value: val
            }); // handle physical props

            this._handlePhysicalProp(key, val);
          } // call the will reveiveProps if exist


          if (this.componentWillReceiveProps) {
            this.componentWillReceiveProps(this._nextPropsStack, nextPropsArray);
          } // should component update


          if (this.shouldComponentUpdate && !this.shouldComponentUpdate(this._nextPropsStack, this._prevPropsStack, this._nextStateStack, this._prevStateStack)) return; // render the component

          this.render();
        });
      }
      /**
       * Set a new state
       * @param    {Object}    newState    The new state to merge with the actual one
       * @return    {Object}    The new state computed
       */

    }, {
      key: "setState",
      value: function setState(newState) {
        // update the state
        for (const key in newState) {
          this.setStateValue(key, newState[key]);
        }
      }
      /**
       * Set a property
       * @param 			{String} 		prop 			The property name to set
       * @param 			{Mixed} 		value 			The new property value
       */

    }, {
      key: "setStateValue",
      value: function setStateValue(prop, value, set = true) {
        // if the component is not attached to the dom, we don't have the props etc
        // so we save them inside an object that we will merge later in the props
        if (!this._componentAttached) {
          if (!this._initialState) this._initialState = {};
          this._initialState[prop] = value;
          return;
        } // save the oldVal


        const oldVal = this.state[prop]; // stop if same value

        if (oldVal === value) return; // set the prop

        this._state[prop] = value; // handle new value

        this._handleNewStateValue(prop, value, oldVal); // return the component


        return this;
      }
      /**
       * Get a state property
       * @param    {String}    [prop=null]    The state property to retrieve
       * @return    {Mixed}    The requested state value or the full state object
       */

    }, {
      key: "getState",
      value: function getState(prop = null) {
        // return the full state object if no prop requested
        if (!prop) return this.state; // return the requested state prop

        return this.state[prop];
      }
      /**
       * Handle new property
       * @param 		{String} 		prop 		The property name
       * @param 		{Mixed} 		newVal 		The new property value
       * @param 		{Mixed}			oldVal 		The old property value
       */

    }, {
      key: "_handleNewStateValue",
      value: function _handleNewStateValue(prop, newVal, oldVal) {
        // if the component is not mounted
        // we do nothing here...
        if (!this.isComponentMounted()) return; // create the stacks

        this._prevStateStack[prop] = oldVal;
        this._nextStateStack[prop] = newVal; // wait till next frame

        _fastdom.default.clear(this._fastDomNewStateTimeout);

        this._fastDomNewStateTimeout = _fastdom.default.mutate(() => {
          // should component update
          if (this.shouldComponentUpdate && !this.shouldComponentUpdate(this._nextPropsStack, this._prevPropsStack, this._nextStateStack, this._prevStateStack)) return; // render the component

          this.render();
        });
      }
      /**
       * Get the previous props stack
       * @return    {Object}    The previous props stack
       */

    }, {
      key: "getPreviousPropsStack",
      value: function getPreviousPropsStack() {
        return this._prevPropsStack;
      }
      /**
       * Get the next props stack
       * @return    {Object}    The next props stack
       */

    }, {
      key: "getNextPropsStack",
      value: function getNextPropsStack() {
        return this._nextPropsStack;
      }
      /**
       * Method called when the component will receive new props
       * @param 		{String} 		prop 		The property name
       * @param 		{Mixed} 		newVal 		The new property value
       * @param 		{Mixed}			oldVal 		The old property value
       * @example 	js
       * componentWillReceiveProp(prop, newVal, oldVal) {
       *  	switch(prop) {
       *  		case ...
       *    			// do something...
       * 			break;
       *  	}
       * }
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "componentWillReceiveProp",
      value: function componentWillReceiveProp(prop, newVal, oldVal) {} // do something

      /**
       * Method that check if a property passed to the component has to be accepted or not.
       * @param 		{String} 			prop 		The property name
       * @return 		{Boolean} 						If true, the property will be accepted, if false, it will not be considered as a property
       */

    }, {
      key: "shouldComponentAcceptProp",
      value: function shouldComponentAcceptProp(prop) {
        return this.props[prop] !== undefined;
      }
      /**
       * Check if component is mounted
       * @return 			{Boolean} 			true if mounted, false if not
       */

    }, {
      key: "isComponentMounted",
      value: function isComponentMounted() {
        return this._lifecycle.componentMount;
      }
      /**
       * Handle physical props by setting or not the prop
       * on the dom element as attribute
       * @param 			{String} 			prop 			The property to handle
       * @param 			{Mixed} 			value 			The property value
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_handlePhysicalProp",
      value: function _handlePhysicalProp(prop, value) {
        // check if is a physical prop to set it in the dom
        const physicalProps = this.physicalProps;

        if (physicalProps.indexOf(prop) !== -1) {
          // set the prop on the node
          if (value !== 0 && (value === false || value === "null" || !value)) {
            this.removeAttribute((0, _uncamelize.default)(prop));
          } else if (typeof value === "object") {
            this.setAttribute((0, _uncamelize.default)(prop), JSON.stringify(value));
          } else if (typeof value === "function") {
            this.setAttribute((0, _uncamelize.default)(prop), "fn");
          } else {
            this.setAttribute((0, _uncamelize.default)(prop), value);
          }
        }
      }
      /**
       * Compute props by mixing settings with attributes presents on the component
       */

    }, {
      key: "_initInitialAttributes",
      value: function _initInitialAttributes() {
        for (let i = 0; i < this.attributes.length; i++) {
          const attr = this.attributes[i];
          const attrCamelName = (0, _camelize.default)(attr.name); // do not set if it's not an existing prop

          if (!this.shouldComponentAcceptProp(attrCamelName)) continue; // the attribute has no value but it is present
          // so we assume the prop value is true

          if (!attr.value) {
            this._props[attrCamelName] = true;
            continue;
          } // cast the value


          this._props[attrCamelName] = (0, _autoCast.default)(attr.value);
        } // handle physicalProps


        for (let key in this.props) {
          const value = this.props[key]; // handle physical props

          this._handlePhysicalProp(key, value);
        }
      }
      /**
       * Mutate the dom using an optimize requestAnimationFrame technique
       * @param 		{Function} 		cb 			The callback to exexute
       */

    }, {
      key: "mutate",
      value: function mutate(cb) {
        return _fastdom.default.mutate(cb);
      }
      /**
       * Set a class that will be construct with the componentNameDash,
       * an optional element and modifier
       * @param 	{String} 	[element=null] 		The element name
       * @param 	{String} 	[modifier=null] 	The modifier name
       * @param 	{String} 	[state=null] 		The state name
       * @return 	{String} 						The generated class
       */

    }, {
      key: "componentClassName",
      value: function componentClassName(element = null, modifier = null, state = null) {
        // if the method is BEM
        let sel = this.componentNameDash;

        if (element) {
          sel += `__${element}`;
        }

        if (modifier) {
          sel += `--${modifier}`;
        }

        if (state) {
          sel += `--${state}`;
        }

        return sel;
      }
      /**
       * Get a component selector class built with the passed element, modifier and state parameters
       * @param 	{String} 	[element=null] 		The element name
       * @param 	{String} 	[modifier=null] 	The modifier name
       * @param 	{String} 	[state=null] 		The state name
       * @return 	{String} 						The generated class
       */

    }, {
      key: "componentSelector",
      value: function componentSelector(element = null, modifier = null, state = null) {
        let sel = this.componentClassName(element, modifier, state);
        sel = `.${sel}`.replace(" ", ".");
        return sel;
      }
      /**
       * Check if the passed element has the component class generated by the element and modifier argument
       * @param 	{HTMLElement} 	elm 				The element to check
       * @param 	{String} 		[element=null] 		The element name
       * @param 	{String} 		[modifier=null] 	The modifier name
       * @param 	{String} 		[state=null] 		The state name
       * @return 	{Boolean} 							The check result
       */

    }, {
      key: "hasComponentClass",
      value: function hasComponentClass(elm, element = null, modifier = null, state = null) {
        // generate the class
        const cls = this.componentSelector(element, modifier, state);

        const _cls = cls.split(".");

        for (let i = 0; i < _cls.length; i++) {
          const cl = _cls[i];

          if (cl && cl !== "") {
            if (!elm.classList.contains(cl)) {
              return false;
            }
          }
        }

        return true;
      }
      /**
       * Add a class on the passed element that will be construct with the componentNameDash,
       * an optional element, modifier and state
       * @param 	{String} 	[element=null] 		The element name
       * @param 	{String} 	[modifier=null] 	The modifier name
       * @param 	{String} 	[state=null] 		The state name
       * @return 	{SComponent}} 			The component itself
       */

    }, {
      key: "addComponentClass",
      value: function addComponentClass(elm, element = null, modifier = null, state = null) {
        // if is an array
        if (elm instanceof Array || elm instanceof NodeList) {
          [].forEach.call(elm, el => {
            this.addComponentClass(el, element, modifier, state);
          });
          return this;
        } // get the component class


        let cls = this.componentSelector(element, modifier, state); // loop on each classes to add

        cls.split(".").forEach(cl => {
          if (cl && cl !== "") {
            this.mutate(() => {
              elm.classList.add(cl);
            });
          }
        }); // return the instance to maintain chainability

        return this;
      }
      /**
       * Remove a class on the passed element that will be construct with the componentNameDash,
       * an optional element, modifier and state
       * @param 	{String} 	[element=null] 		The element name
       * @param 	{String} 	[modifier=null] 	The modifier name
       * @param 	{String} 	[state=null] 		The state name
       * @return 	{SComponent}} 					The component itself
       */

    }, {
      key: "removeComponentClass",
      value: function removeComponentClass(elm, element = null, modifier = null, state = null) {
        // if is an array
        if (elm instanceof Array || elm instanceof NodeList) {
          [].forEach.call(elm, el => {
            this.removeComponentClass(el, element, modifier, state);
          });
          return this;
        } // get the component class


        let cls = this.componentSelector(element, modifier, state); // loop on each classes to add

        cls.split(".").forEach(cl => {
          if (cl && cl !== "") {
            this.mutate(() => {
              elm.classList.remove(cl);
            });
          }
        }); // return the instance to maintain chainability

        return this;
      }
    }]);

    return _temp2;
  }(superclass), _temp2;
}); // Export the mixin class

var _default = SWebComponentMixin;
exports.default = _default;
module.exports = exports.default;