// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../error/SError", "../object/deepMerge", "@coffeekraken/s-promise", "../string/parse", "../string/toString", "../dom/when", "../validation/value/validateValue", "../string/uniqid", "../string/uncamelize", "../dom/domready", "../html/getTagNameFromHtmlClass", "../responsive/SMediaQuery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SError_1 = __importDefault(require("../error/SError"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    var parse_1 = __importDefault(require("../string/parse"));
    var toString_1 = __importDefault(require("../string/toString"));
    var when_1 = __importDefault(require("../dom/when"));
    var validateValue_1 = __importDefault(require("../validation/value/validateValue"));
    var uniqid_1 = __importDefault(require("../string/uniqid"));
    var uncamelize_1 = __importDefault(require("../string/uncamelize"));
    var domready_1 = __importDefault(require("../dom/domready"));
    var getTagNameFromHtmlClass_1 = __importDefault(require("../html/getTagNameFromHtmlClass"));
    var SMediaQuery_1 = __importDefault(require("../responsive/SMediaQuery"));
    /**
     * @name              SWebComponent
     * @namespace           sugar.js.webcomponent
     * @type              Class
     * @extends           HTMLElement
     * @status              wip
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
     * @todo      interface
     * @todo      doc
     * @todo      tests
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var _sWebComponentPromise = new s_promise_1.default({
        id: 'SWebComponentPromise'
    });
    var _sWebComponentStack = {};
    function SWebComponentGenerator(extendsSettings) {
        var _a;
        if (extendsSettings === void 0) { extendsSettings = {}; }
        extendsSettings = deepMerge_1.default({
            extends: HTMLElement,
            name: null
        }, extendsSettings);
        return _a = /** @class */ (function (_super) {
                __extends(SWebComponent, _super);
                /**
                 * @name          constructor
                 * @type          Function
                 * @constructor
                 *
                 * Constructor
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                function SWebComponent(settings) {
                    if (settings === void 0) { settings = {}; }
                    var _this = 
                    // init base html element
                    _super.call(this) || this;
                    _this._settedAttributesStack = {};
                    _this._isSWebComponent = true;
                    /**
                     * @name          promise
                     * @type          SPromise
                     * @private
                     *
                     * Store the SPromise instance used to "dispatch" some events
                     * that you can subscribe using the "on" exposed method
                     *
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    _this.promise = null;
                    /**
                     * @name          _props
                     * @type          Object
                     * @private
                     *
                     * Store all the properties (attributes)
                     *
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    _this._props = {};
                    _this.props = {};
                    /**
                     * @name          _settings
                     * @type          Object
                     * @private
                     *
                     * Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
                     *
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    _this._settings = {};
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    _this._metas = {};
                    /**
                     * @name        _contexts
                     * @type        Array
                     * @private
                     *
                     * Store all the contexts this component will be aware of
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    _this._contexts = [_this];
                    // make sure the component has a componentName static prop
                    if (!_this.constructor.componentName)
                        throw "Your MUST define a static \"componentName\" camelcase property like \"SFiltrableInput\" for your component to work properly...";
                    // get component metas
                    _this._metas = _this.constructor.getComponentMetas(_this.constructor.componentName);
                    // save the settings
                    _this._settings = deepMerge_1.default({
                        id: _this.getAttribute('id') || uniqid_1.default(),
                        props: {}
                    }, _this._metas.settings || {}, settings);
                    // add the "this" into the contexts stack
                    _this.registerContext(_this);
                    // create the SPromise instance
                    _this.promise = new s_promise_1.default({
                        id: _this._settings.id
                    });
                    // init props proxy
                    _this._initPropsProxy();
                    _this.on('ready', function (e) {
                        if (e.target === _this)
                            return;
                        if (e.target._isSWebComponent) {
                            e.stopImmediatePropagation();
                            e.target.registerContext(_this);
                        }
                    });
                    _this.on('mounted', function () {
                        // dispatch a ready event
                        if (!_this.lit) {
                            _this.update();
                            // the Lit HTML class dispatch the ready event after having rendering the template the first time
                            _this.dispatch('ready', _this, {
                                bubbles: true
                            });
                        }
                    });
                    domready_1.default(function () {
                        // get the inital content
                        // this._$initialContent =
                        // handle props
                        _this._initDomProps();
                        _this._mediaQuery = new SMediaQuery_1.default('*');
                        _this._mediaQuery.on('match', function (media) {
                            Object.keys(_this.constructor.props).forEach(function (prop) {
                                if (!_this._props[prop].responsive ||
                                    _this._props[prop].responsiveValues[media.name] !== undefined)
                                    return;
                                if (_this.hasAttribute(uncamelize_1.default(prop) + "-" + media.name)) {
                                    var value = parse_1.default(_this.getAttribute(uncamelize_1.default(prop) + "-" + media.name));
                                    _this.setProp(prop, value, media.name);
                                }
                            });
                        });
                        // apply the $node class
                        var currentClassName = _this.getAttribute('class') || '';
                        _this.setAttribute('class', currentClassName + " " + _this.selector("node"));
                        // launch the mounting process
                        _this._mount();
                    });
                    return _this;
                }
                Object.defineProperty(SWebComponent, "observedAttributes", {
                    /**
                     * @name        observedAttributes
                     * @type        Function
                     * @get
                     * @static
                     *
                     * This medhod simply return the list of props that will be
                     * observed by the customElements under the hood system.
                     *
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    get: function () {
                        return Object.keys(this.props).map(function (name) { return uncamelize_1.default(name); });
                    },
                    enumerable: false,
                    configurable: true
                });
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.getComponentMetas = function (name) {
                    return _sWebComponentStack[uncamelize_1.default(name)] || {};
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.define = function (settings) {
                    if (settings === void 0) { settings = {}; }
                    var name = (settings.name || this.componentName || this.name).replace('WebComponent', '');
                    var uncamelizedName = uncamelize_1.default(name);
                    // avoid multi define of the same component
                    if (customElements.get(uncamelizedName))
                        return;
                    this.componentName = name;
                    if (_sWebComponentStack[uncamelizedName])
                        return;
                    _sWebComponentStack[uncamelizedName] = {
                        name: name,
                        dashName: uncamelizedName,
                        class: this,
                        extends: extendsSettings.extends,
                        settings: settings
                    };
                    var defineSettings = {};
                    if (extendsSettings.extends !== HTMLElement)
                        defineSettings.extends = getTagNameFromHtmlClass_1.default(extendsSettings.extends);
                    if (window.customElements) {
                        try {
                            window.customElements.define(uncamelizedName, this, defineSettings);
                        }
                        catch (e) {
                            // @TODO      find why the component is registeres twice...
                        }
                    }
                    else if (document.registerElement) {
                        try {
                            defineSettings.prototype = this.prototype;
                            document.registerElement(uncamelizedName, defineSettings);
                        }
                        catch (e) {
                            // @TODO      find why the component is registeres twice...
                        }
                    }
                    else {
                        throw "Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...";
                    }
                };
                Object.defineProperty(SWebComponent.prototype, "settings", {
                    /**
                     * @name          settings
                     * @type          Function
                     * @get
                     *
                     * Get the settings object
                     *
                     * @since         2.0.0
                     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    get: function () {
                        return this._settings;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(SWebComponent.prototype, "$root", {
                    /**
                     * @name          $root
                     * @type          Function
                     * @get
                     *
                     * Access the root element of the webcomponent from which the requests like ```$``` and ```$$``` will be executed
                     *
                     * @since         2.0.0
                     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    get: function () {
                        return this;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * @name        update
                 * @type        Function
                 *
                 * This method allows you to update your component manually if needed
                 *
                 * @since       2.0.0
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.update = function () {
                    // refresh references
                    this._refreshIdReferences();
                    // physical props
                    this._handlePhysicalProps();
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.$ = function (path) {
                    var tries = [this.selector(path), path];
                    for (var i = 0; i < tries.length; i++) {
                        var $tryRes = this.$root.querySelector(tries[i]);
                        if ($tryRes)
                            return $tryRes;
                    }
                    return null;
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.$$ = function (path) {
                    var tries = [this.selector(path), path];
                    for (var i = 0; i < tries.length; i++) {
                        var $tryRes = this.$root.querySelectorAll(tries[i]);
                        if ($tryRes)
                            return $tryRes;
                    }
                    return null;
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.registerContext = function (context) {
                    if (this._contexts.indexOf(context) !== -1)
                        return;
                    this._contexts.push(context);
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.setProp = function (prop, value, media) {
                    if (media === void 0) { media = null; }
                    if (!media)
                        return (this.props[prop] = value);
                    if (!this._props[prop].responsive) {
                        throw new SError_1.default("You try to set the responsive property \"" + prop + "\" for the media \"" + media + "\" but this property is not defined as \"responsive\"...");
                    }
                    this._props[prop].responsiveValues[media] = value;
                    // trigger a "prop" event
                    this._emitPropsEvents(prop);
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.getProp = function (prop, media) {
                    if (media === void 0) { media = null; }
                    if (!media)
                        return this._props[prop].value;
                    if (!this._props[prop].responsive) {
                        throw new SError_1.default("You try to get the responsive property \"" + prop + "\" for the media \"" + media + "\" but this property is not defined as \"responsive\"...");
                    }
                    return this._props[prop].responsiveValues[media];
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.setSettings = function (settings, reactive) {
                    if (settings === void 0) { settings = {}; }
                    if (reactive === void 0) { reactive = true; }
                    // set the new settings
                    this._settings = deepMerge_1.default(this._settings, settings);
                    // check if is reactive
                    if (reactive)
                        this.update();
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.addClass = function (cls, $elm) {
                    var _this = this;
                    if ($elm === void 0) { $elm = this; }
                    // split the cls
                    var clsArray = cls.split(' ');
                    clsArray.forEach(function (className) {
                        // build the selector
                        var selector = _this.selector(className);
                        // split the selector
                        selector.split(' ').forEach(function (sel) {
                            // add the class to the element
                            $elm.classList.add(sel);
                        });
                    });
                    // maintain chainability
                    return this;
                };
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.removeClass = function (cls, $elm) {
                    var _this = this;
                    if ($elm === void 0) { $elm = this; }
                    // split the cls
                    var clsArray = cls.split(' ');
                    clsArray.forEach(function (className) {
                        // build the selector
                        var selector = _this.selector(className);
                        // split the selector
                        selector.split(' ').forEach(function (sel) {
                            // add the class to the element
                            $elm.classList.remove(sel);
                        });
                    });
                    // maintain chainability
                    return this;
                };
                Object.defineProperty(SWebComponent.prototype, "metas", {
                    /**
                     * @name          metas
                     * @type          Object
                     * @get
                     *
                     * This property store all the component metas informations like the name,
                     * the type, what it is extending, etc...
                     *
                     * @since       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    get: function () {
                        return __assign({ instance: this, $node: this }, this._metas);
                    },
                    enumerable: false,
                    configurable: true
                });
                SWebComponent.prototype._refreshIdReferences = function () {
                    var _this = this;
                    var $refs = this.$root.querySelectorAll('[id]');
                    Array.from($refs).forEach(function ($item) {
                        if (_this["$" + $item.id] === $item)
                            return;
                        _this["$" + $item.id] = $item;
                    });
                };
                SWebComponent.prototype._initPropsProxy = function () {
                    var _this = this;
                    var _loop_1 = function (prop) {
                        var originalProp;
                        if (this_1[prop] !== undefined)
                            originalProp = this_1[prop];
                        Object.defineProperty(this_1._props, prop, {
                            enumerable: false,
                            writable: true,
                            configurable: false,
                            value: __assign(__assign({}, this_1.constructor.props[prop]), { previousValue: undefined, value: undefined, responsiveValues: {} })
                        });
                        Object.defineProperty(this_1.props, prop, {
                            enumerable: true,
                            configurable: false,
                            get: function () {
                                var returnValue = _this._props[prop].value !== undefined
                                    ? _this._props[prop].value
                                    : _this._settings.props[prop] !== undefined
                                        ? _this._settings.props[prop]
                                        : _this.constructor.props[prop].default;
                                if (_this._props[prop].responsive &&
                                    _this._props[prop].responsiveValues) {
                                    if (_this._props[prop].responsiveValues[SMediaQuery_1.default.getActiveMedia()] !== undefined) {
                                        returnValue = _this._props[prop].responsiveValues[SMediaQuery_1.default.getActiveMedia()];
                                    }
                                }
                                // js expression or references
                                if (prop.substr(0, 1) === ':') {
                                    if (typeof returnValue !== 'string') {
                                        return returnValue;
                                    }
                                    for (var i = 0; i < _this._contexts.length; i++) {
                                        var context = _this._contexts[i];
                                        // check if is a reference in the current component
                                        if (context[returnValue] !== undefined)
                                            return context[returnValue];
                                    }
                                }
                                return returnValue;
                            },
                            set: function (value) {
                                _this._props[prop].previousValue = _this._props[prop].value;
                                _this._props[prop].value = value;
                                if (originalProp) {
                                    Object.getOwnPropertyDescriptor(_this.prototype, prop).set.call(_this, value);
                                }
                                // trigger a "prop" event
                                _this._emitPropsEvents(prop);
                            }
                        });
                        this_1.promise.on("props." + prop + ".*", function (update) {
                            // console.log('up', prop, update);
                            _this.update();
                        });
                    };
                    var this_1 = this;
                    for (var prop in this.constructor.props) {
                        _loop_1(prop);
                    }
                };
                SWebComponent.prototype._initDomProps = function () {
                    // handle props
                    for (var prop in this.constructor.props) {
                        var attr = this.getAttribute(uncamelize_1.default(prop));
                        if (!attr && this.hasAttribute(uncamelize_1.default(prop))) {
                            attr = true;
                        }
                        if (!attr)
                            continue;
                        this._props[prop].value = attr
                            ? parse_1.default(attr)
                            : this._props[prop].value !== undefined
                                ? this._props[prop].value
                                : this._settings.props[prop] !== undefined
                                    ? this._settings.props[prop]
                                    : this.constructor.props[prop].default;
                    }
                };
                /**
                 * @name          _mount
                 * @type          Function
                 * @private
                 * @async
                 *
                 * This method handle the mounting of the component
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype._mount = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // dispatch mounting event
                                    this.dispatch('mounting', this);
                                    // wait until the component match the mountDependencies and mountWhen status
                                    return [4 /*yield*/, this._mountDependencies()];
                                case 1:
                                    // wait until the component match the mountDependencies and mountWhen status
                                    _a.sent();
                                    // check props definition
                                    this._checkPropsDefinition();
                                    // update
                                    this.update();
                                    // dispatch mounted event
                                    this._isMounted = true;
                                    this.dispatch('mounted', this);
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.on = function (event, callback) {
                    this.addEventListener(event, function (e) {
                        // if (
                        //   e.detail &&
                        //   e.detail.settings &&
                        //   e.detail.settings.preventSameTarget
                        // ) {
                        //   if (e.target === this) return;
                        // }
                        callback(e);
                    });
                    // return this.promise.on(event, callback);
                };
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.off = function (event, callback) {
                    // return this.promise.off(event, callback);
                };
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.dispatch = function (name, value, settings) {
                    if (settings === void 0) { settings = {}; }
                    var event = new CustomEvent(name, __assign(__assign({}, settings), { detail: value }));
                    this.dispatchEvent(event);
                    // // dispatch event through the SPromise internal instance
                    // this.promise.emit(name, value || this);
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
                    //   _sWebComponentPromise.emit(`${this.metas.dashName}.${name}`, {
                    //     target: this,
                    //     value
                    //   });
                    //   _sWebComponentPromise.emit(
                    //     `${this.metas.dashName}#${this._settings.id}.${name}`,
                    //     {
                    //       target: this,
                    //       value
                    //     }
                    //   );
                    // });
                };
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype._mountDependencies = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var promises = [];
                        // check if we have a "mountWhen" setting specified
                        if (_this._settings.mountWhen) {
                            promises.push(when_1.default(_this._settings.mountWhen));
                        }
                        // check if we have one/some "mountDependencies" setting specified
                        if (_this._settings.mountDependencies) {
                            var depsFns = __spreadArrays(_this._settings.mountDependencies);
                            depsFns.forEach(function (fn) {
                                promises.push(fn());
                            });
                        }
                        // wait until all promises are resolved
                        Promise.all(promises).then(function () {
                            resolve();
                        });
                    });
                };
                /**
                 * @name          connectedCallback
                 * @type          Function
                 *
                 * Called when the component is attached to the dom
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.connectedCallback = function () {
                    var _this = this;
                    // dispatch "event"
                    setTimeout(function () {
                        _this.dispatch('attach', _this);
                    });
                };
                /**
                 * @name          disconnectedCallback
                 * @type          Function
                 *
                 * Called when the component is detached from the dom
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.disconnectedCallback = function () {
                    // dispatch "event"
                    this.dispatch('detach', this);
                };
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.attributeChangedCallback = function (attrName, oldVal, newVal) {
                    if (!this._isMounted)
                        return;
                    if (this._settedAttributesStack[attrName])
                        return;
                    // const previousValue = __parse(oldVal);
                    var newValue = parse_1.default(newVal) || false;
                    // set the value into the props
                    this[attrName] = newValue;
                };
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype.selector = function (cls) {
                    var _this = this;
                    if (cls === void 0) { cls = ''; }
                    var split = cls.split(' ');
                    var finalSelectorArray = [];
                    split.forEach(function (part) {
                        var hasDot = part.match(/^\./), hasHash = part.match(/^\#/);
                        part = part.replace('.', '').replace('#', '');
                        var finalClsPart;
                        if (part.match(/^(--)/))
                            finalClsPart = "" + _this.metas.dashName + part;
                        else if (part !== '')
                            finalClsPart = _this.metas.dashName + "__" + part;
                        else
                            finalClsPart = _this.metas.dashName;
                        if (hasDot)
                            finalClsPart = "." + finalClsPart;
                        if (hasHash)
                            finalClsPart = "#" + finalClsPart;
                        // add the base class if needed
                        if (_this.constructor.cssName) {
                            var baseCls = uncamelize_1.default(_this.constructor.cssName).replace('-web-component', '');
                            if (!finalClsPart.includes(baseCls)) {
                                var finalBaseCls = '';
                                if (part.match(/^(--)/))
                                    finalBaseCls = "" + baseCls + part;
                                else if (part !== '')
                                    finalBaseCls = baseCls + "__" + part;
                                else
                                    finalBaseCls = baseCls;
                                if (hasDot) {
                                    finalBaseCls = "." + finalBaseCls;
                                }
                                else if (hasHash) {
                                    finalBaseCls = "#" + finalBaseCls;
                                }
                                else {
                                    finalClsPart += " " + finalBaseCls;
                                }
                            }
                        }
                        finalSelectorArray.push(finalClsPart);
                    });
                    return finalSelectorArray.join(' ');
                };
                /**
                 * @name        _emitPropsEvents
                 * @type        Function
                 * @private
                 *
                 * This method simply trigger a prop|prop.{name} event through the SPromise instance.
                 *
                 * @param     {String}      prop      The property name to trigger event for
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype._emitPropsEvents = function (prop) {
                    // trigger a "prop" event
                    var eventObj = {
                        prop: prop,
                        action: this._props[prop].previousValue !== null
                            ? this._props[prop].value !== null
                                ? 'set'
                                : 'delete'
                            : 'set',
                        value: this._props[prop].value,
                        previousValue: this._props[prop].previousValue,
                        media: SMediaQuery_1.default.getActiveMedia()
                    };
                    this.promise.emit("props." + prop + "." + eventObj.action, eventObj);
                };
                /**
                 * @name        _handlePhysicalProps
                 * @type        Function
                 * @private
                 *
                 * This method make sure that all the defined physical props are
                 * setted as attribute on the DOM element
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype._handlePhysicalProps = function () {
                    var _this = this;
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    if (!props || props.length === 0)
                        props = Object.keys(this._props);
                    // loop on each required props
                    props.forEach(function (prop) {
                        if (!_this._props[prop].physical)
                            return;
                        var value = _this._props[prop].value;
                        // if the value is false, remove the attributee from the dom node
                        if (value === undefined || value === null || value === false) {
                            _this.removeAttribute(prop);
                            return;
                        }
                        if (!_this.getAttribute(prop)) {
                            // set the attribute with the value
                            _this._settedAttributesStack[prop] = true;
                            _this.setAttribute(prop, toString_1.default(value));
                            delete _this._settedAttributesStack[prop];
                        }
                        else {
                            var currentAttributeValue = _this.getAttribute(prop);
                            var currentValueStringified = toString_1.default(value);
                            if (currentAttributeValue !== currentValueStringified) {
                                _this._settedAttributesStack[prop] = true;
                                _this.setAttribute(prop, currentValueStringified);
                                delete _this._settedAttributesStack[prop];
                            }
                        }
                    });
                };
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype._checkPropsDefinition = function () {
                    var _this = this;
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    if (!props || props.length === 0)
                        props = Object.keys(this.constructor.props);
                    props.forEach(function (prop) {
                        var propObj = _this._props[prop];
                        var validationResult = validateValue_1.default(propObj.value, propObj, {
                            name: _this.constructor.name + ".props." + prop,
                            throw: true
                        });
                        // if (validationResult !== true) throw new Error(validationResult);
                    });
                };
                return SWebComponent;
            }(extendsSettings.extends)),
            _a.customEvents = {},
            /**
             * @name					componentName
             * @type 					String
             * @static
             *
             * Store the name of the component in camelcase
             *
             * @since 					2.0.0
             * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _a.componentName = undefined,
            _a;
    }
    exports.default = SWebComponentGenerator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dlYkNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNXZWJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDJEQUF1QztJQUV2QyxrRUFBOEM7SUFDOUMsc0VBQWlEO0lBQ2pELDBEQUFzQztJQUN0QyxnRUFBNEM7SUFDNUMscURBQWlDO0lBR2pDLG9GQUFnRTtJQUVoRSw0REFBd0M7SUFLeEMsb0VBQWdEO0lBRWhELDZEQUF5QztJQUN6Qyw0RkFBd0U7SUFFeEUsMEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnREc7SUFFSCxJQUFNLHFCQUFxQixHQUFHLElBQUksbUJBQVUsQ0FBQztRQUMzQyxFQUFFLEVBQUUsc0JBQXNCO0tBQzNCLENBQUMsQ0FBQztJQUNILElBQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBRS9CLFNBQVMsc0JBQXNCLENBQUMsZUFBb0I7O1FBQXBCLGdDQUFBLEVBQUEsb0JBQW9CO1FBQ2xELGVBQWUsR0FBRyxtQkFBVyxDQUMzQjtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLElBQUksRUFBRSxJQUFJO1NBQ1gsRUFDRCxlQUFlLENBQ2hCLENBQUM7UUFFRjtnQkFBbUMsaUNBQXVCO2dCQXFMeEQ7Ozs7Ozs7O21CQVFHO2dCQUNILHVCQUFZLFFBQWE7b0JBQWIseUJBQUEsRUFBQSxhQUFhO29CQUF6QjtvQkFDRSx5QkFBeUI7b0JBQ3pCLGlCQUFPLFNBcUZSO29CQXBSRCw0QkFBc0IsR0FBRyxFQUFFLENBQUM7b0JBQzVCLHNCQUFnQixHQUFHLElBQUksQ0FBQztvQkFFeEI7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxhQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVmOzs7Ozs7Ozt1QkFRRztvQkFDSCxZQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNaLFdBQUssR0FBRyxFQUFFLENBQUM7b0JBRVg7Ozs7Ozs7O3VCQVFHO29CQUNILGVBQVMsR0FBRyxFQUFFLENBQUM7b0JBRWY7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBZ0JHO29CQUNILFlBQU0sR0FBRyxFQUFFLENBQUM7b0JBRVo7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxlQUFTLEdBQUcsQ0FBQyxLQUFJLENBQUMsQ0FBQztvQkE4SGpCLDBEQUEwRDtvQkFDMUQsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYTt3QkFDakMsTUFBTSxnSUFBNEgsQ0FBQztvQkFDckksc0JBQXNCO29CQUN0QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQzlDLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUMvQixDQUFDO29CQUVGLG9CQUFvQjtvQkFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjt3QkFDRSxFQUFFLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBUSxFQUFFO3dCQUN6QyxLQUFLLEVBQUUsRUFBRTtxQkFDVixFQUNELEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFDMUIsUUFBUSxDQUNULENBQUM7b0JBRUYseUNBQXlDO29CQUN6QyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxDQUFDO29CQUUzQiwrQkFBK0I7b0JBQy9CLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDO3dCQUM1QixFQUFFLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO3FCQUN0QixDQUFDLENBQUM7b0JBRUgsbUJBQW1CO29CQUNuQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBRXZCLEtBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQzt3QkFDakIsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUk7NEJBQUUsT0FBTzt3QkFDOUIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFOzRCQUM3QixDQUFDLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzs0QkFDN0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLENBQUM7eUJBQ2hDO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUVILEtBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO3dCQUNqQix5QkFBeUI7d0JBQ3pCLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFOzRCQUNiLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDZCxpR0FBaUc7NEJBQ2pHLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUksRUFBRTtnQ0FDM0IsT0FBTyxFQUFFLElBQUk7NkJBQ2QsQ0FBQyxDQUFDO3lCQUNKO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUVILGtCQUFVLENBQUM7d0JBQ1QseUJBQXlCO3dCQUN6QiwwQkFBMEI7d0JBRTFCLGVBQWU7d0JBQ2YsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUVyQixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDMUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSzs0QkFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0NBQy9DLElBQ0UsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7b0NBQzdCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7b0NBRTVELE9BQU87Z0NBRVQsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFJLG9CQUFZLENBQUMsSUFBSSxDQUFDLFNBQUksS0FBSyxDQUFDLElBQU0sQ0FBQyxFQUFFO29DQUM1RCxJQUFNLEtBQUssR0FBRyxlQUFPLENBQ25CLEtBQUksQ0FBQyxZQUFZLENBQUksb0JBQVksQ0FBQyxJQUFJLENBQUMsU0FBSSxLQUFLLENBQUMsSUFBTSxDQUFDLENBQ3pELENBQUM7b0NBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQ0FDdkM7NEJBQ0gsQ0FBQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBRUgsd0JBQXdCO3dCQUN4QixJQUFNLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUMxRCxLQUFJLENBQUMsWUFBWSxDQUNmLE9BQU8sRUFDSixnQkFBZ0IsU0FBSSxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBRyxDQUMvQyxDQUFDO3dCQUVGLDhCQUE4Qjt3QkFDOUIsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNoQixDQUFDLENBQUMsQ0FBQzs7Z0JBQ0wsQ0FBQztnQkFwTUQsc0JBQVcsbUNBQWtCO29CQVg3Qjs7Ozs7Ozs7Ozt1QkFVRzt5QkFDSDt3QkFDRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLG9CQUFZLENBQUMsSUFBSSxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztvQkFDbkUsQ0FBQzs7O21CQUFBO2dCQWdCRDs7Ozs7Ozs7Ozs7Ozs7OzttQkFnQkc7Z0JBQ0ksK0JBQWlCLEdBQXhCLFVBQXlCLElBQUk7b0JBQzNCLE9BQU8sbUJBQW1CLENBQUMsb0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdkQsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7OzttQkFhRztnQkFDSSxvQkFBTSxHQUFiLFVBQWMsUUFBYTtvQkFBYix5QkFBQSxFQUFBLGFBQWE7b0JBQ3pCLElBQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQ3JFLGNBQWMsRUFDZCxFQUFFLENBQ0gsQ0FBQztvQkFFRixJQUFNLGVBQWUsR0FBRyxvQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUUzQywyQ0FBMkM7b0JBQzNDLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7d0JBQUUsT0FBTztvQkFFaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBRTFCLElBQUksbUJBQW1CLENBQUMsZUFBZSxDQUFDO3dCQUFFLE9BQU87b0JBRWpELG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxHQUFHO3dCQUNyQyxJQUFJLE1BQUE7d0JBQ0osUUFBUSxFQUFFLGVBQWU7d0JBQ3pCLEtBQUssRUFBRSxJQUFJO3dCQUNYLE9BQU8sRUFBRSxlQUFlLENBQUMsT0FBTzt3QkFDaEMsUUFBUSxVQUFBO3FCQUNULENBQUM7b0JBRUYsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO29CQUMxQixJQUFJLGVBQWUsQ0FBQyxPQUFPLEtBQUssV0FBVzt3QkFDekMsY0FBYyxDQUFDLE9BQU8sR0FBRyxpQ0FBeUIsQ0FDaEQsZUFBZSxDQUFDLE9BQU8sQ0FDeEIsQ0FBQztvQkFFSixJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUU7d0JBQ3pCLElBQUk7NEJBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzt5QkFDckU7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1YsMkRBQTJEO3lCQUM1RDtxQkFDRjt5QkFBTSxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUU7d0JBQ25DLElBQUk7NEJBQ0YsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDOzRCQUMxQyxRQUFRLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQzt5QkFDM0Q7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1YsMkRBQTJEO3lCQUM1RDtxQkFDRjt5QkFBTTt3QkFDTCxNQUFNLDhIQUE4SCxDQUFDO3FCQUN0STtnQkFDSCxDQUFDO2dCQThHRCxzQkFBSSxtQ0FBUTtvQkFWWjs7Ozs7Ozs7O3VCQVNHO3lCQUNIO3dCQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDeEIsQ0FBQzs7O21CQUFBO2dCQVlELHNCQUFJLGdDQUFLO29CQVZUOzs7Ozs7Ozs7dUJBU0c7eUJBQ0g7d0JBQ0UsT0FBTyxJQUFJLENBQUM7b0JBQ2QsQ0FBQzs7O21CQUFBO2dCQUVEOzs7Ozs7OzttQkFRRztnQkFDSCw4QkFBTSxHQUFOO29CQUNFLHFCQUFxQjtvQkFDckIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7b0JBQzVCLGlCQUFpQjtvQkFDakIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILHlCQUFDLEdBQUQsVUFBRSxJQUFJO29CQUNKLElBQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3JDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRCxJQUFJLE9BQU87NEJBQUUsT0FBTyxPQUFPLENBQUM7cUJBQzdCO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILDBCQUFFLEdBQUYsVUFBRyxJQUFJO29CQUNMLElBQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3JDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RELElBQUksT0FBTzs0QkFBRSxPQUFPLE9BQU8sQ0FBQztxQkFDN0I7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7O21CQVlHO2dCQUNILHVDQUFlLEdBQWYsVUFBZ0IsT0FBTztvQkFDckIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUUsT0FBTztvQkFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7Ozs7bUJBYUc7Z0JBQ0gsK0JBQU8sR0FBUCxVQUFRLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBWTtvQkFBWixzQkFBQSxFQUFBLFlBQVk7b0JBQy9CLElBQUksQ0FBQyxLQUFLO3dCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7d0JBQ2pDLE1BQU0sSUFBSSxnQkFBUSxDQUNoQiw4Q0FBMkMsSUFBSSwyQkFBb0IsS0FBSyw2REFBdUQsQ0FDaEksQ0FBQztxQkFDSDtvQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDbEQseUJBQXlCO29CQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7OzttQkFZRztnQkFDSCwrQkFBTyxHQUFQLFVBQVEsSUFBSSxFQUFFLEtBQVk7b0JBQVosc0JBQUEsRUFBQSxZQUFZO29CQUN4QixJQUFJLENBQUMsS0FBSzt3QkFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7d0JBQ2pDLE1BQU0sSUFBSSxnQkFBUSxDQUNoQiw4Q0FBMkMsSUFBSSwyQkFBb0IsS0FBSyw2REFBdUQsQ0FDaEksQ0FBQztxQkFDSDtvQkFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7OzttQkFZRztnQkFDSCxtQ0FBVyxHQUFYLFVBQVksUUFBYSxFQUFFLFFBQWU7b0JBQTlCLHlCQUFBLEVBQUEsYUFBYTtvQkFBRSx5QkFBQSxFQUFBLGVBQWU7b0JBQ3hDLHVCQUF1QjtvQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3ZELHVCQUF1QjtvQkFDdkIsSUFBSSxRQUFRO3dCQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDOUIsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7Ozs7bUJBY0c7Z0JBQ0gsZ0NBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxJQUFXO29CQUF6QixpQkFjQztvQkFkYSxxQkFBQSxFQUFBLFdBQVc7b0JBQ3ZCLGdCQUFnQjtvQkFDaEIsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7d0JBQ3pCLHFCQUFxQjt3QkFDckIsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDMUMscUJBQXFCO3dCQUNyQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7NEJBQzlCLCtCQUErQjs0QkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzFCLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILHdCQUF3QjtvQkFDeEIsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7Ozs7bUJBY0c7Z0JBQ0gsbUNBQVcsR0FBWCxVQUFZLEdBQUcsRUFBRSxJQUFXO29CQUE1QixpQkFjQztvQkFkZ0IscUJBQUEsRUFBQSxXQUFXO29CQUMxQixnQkFBZ0I7b0JBQ2hCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO3dCQUN6QixxQkFBcUI7d0JBQ3JCLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzFDLHFCQUFxQjt3QkFDckIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHOzRCQUM5QiwrQkFBK0I7NEJBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCx3QkFBd0I7b0JBQ3hCLE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBYUQsc0JBQUksZ0NBQUs7b0JBWFQ7Ozs7Ozs7Ozs7dUJBVUc7eUJBQ0g7d0JBQ0Usa0JBQ0UsUUFBUSxFQUFFLElBQUksRUFDZCxLQUFLLEVBQUUsSUFBSSxJQUNSLElBQUksQ0FBQyxNQUFNLEVBQ2Q7b0JBQ0osQ0FBQzs7O21CQUFBO2dCQUVELDRDQUFvQixHQUFwQjtvQkFBQSxpQkFNQztvQkFMQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsRCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7d0JBQzlCLElBQUksS0FBSSxDQUFDLE1BQUksS0FBSyxDQUFDLEVBQUksQ0FBQyxLQUFLLEtBQUs7NEJBQUUsT0FBTzt3QkFDM0MsS0FBSSxDQUFDLE1BQUksS0FBSyxDQUFDLEVBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCx1Q0FBZSxHQUFmO29CQUFBLGlCQXlFQzs0Q0F4RVksSUFBSTt3QkFDYixJQUFJLFlBQVksQ0FBQzt3QkFDakIsSUFBSSxPQUFLLElBQUksQ0FBQyxLQUFLLFNBQVM7NEJBQUUsWUFBWSxHQUFHLE9BQUssSUFBSSxDQUFDLENBQUM7d0JBQ3hELE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBSyxNQUFNLEVBQUUsSUFBSSxFQUFFOzRCQUN2QyxVQUFVLEVBQUUsS0FBSzs0QkFDakIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsWUFBWSxFQUFFLEtBQUs7NEJBQ25CLEtBQUssd0JBQ0EsT0FBSyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUMvQixhQUFhLEVBQUUsU0FBUyxFQUN4QixLQUFLLEVBQUUsU0FBUyxFQUNoQixnQkFBZ0IsRUFBRSxFQUFFLEdBQ3JCO3lCQUNGLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQUssS0FBSyxFQUFFLElBQUksRUFBRTs0QkFDdEMsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLFlBQVksRUFBRSxLQUFLOzRCQUNuQixHQUFHLEVBQUU7Z0NBQ0gsSUFBSSxXQUFXLEdBQ2IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUztvQ0FDbkMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSztvQ0FDekIsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7d0NBQzFDLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0NBQzVCLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0NBQzNDLElBQ0UsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVO29DQUM1QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUNsQztvQ0FDQSxJQUNFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQ2hDLHFCQUFhLENBQUMsY0FBYyxFQUFFLENBQy9CLEtBQUssU0FBUyxFQUNmO3dDQUNBLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUM5QyxxQkFBYSxDQUFDLGNBQWMsRUFBRSxDQUMvQixDQUFDO3FDQUNIO2lDQUNGO2dDQUVELDhCQUE4QjtnQ0FDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0NBQzdCLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO3dDQUNuQyxPQUFPLFdBQVcsQ0FBQztxQ0FDcEI7b0NBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dDQUM5QyxJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNsQyxtREFBbUQ7d0NBQ25ELElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFNBQVM7NENBQ3BDLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FDQUMvQjtpQ0FDRjtnQ0FFRCxPQUFPLFdBQVcsQ0FBQzs0QkFDckIsQ0FBQzs0QkFDRCxHQUFHLEVBQUUsVUFBQyxLQUFLO2dDQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO2dDQUMxRCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0NBQ2hDLElBQUksWUFBWSxFQUFFO29DQUNoQixNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUM1RCxLQUFJLEVBQ0osS0FBSyxDQUNOLENBQUM7aUNBQ0g7Z0NBQ0QseUJBQXlCO2dDQUN6QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzlCLENBQUM7eUJBQ0YsQ0FBQyxDQUFDO3dCQUNILE9BQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFTLElBQUksT0FBSSxFQUFFLFVBQUMsTUFBTTs0QkFDeEMsbUNBQW1DOzRCQUNuQyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2hCLENBQUMsQ0FBQyxDQUFDOzs7b0JBdEVMLEtBQUssSUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2dDQUE5QixJQUFJO3FCQXVFZDtnQkFDSCxDQUFDO2dCQUVELHFDQUFhLEdBQWI7b0JBQ0UsZUFBZTtvQkFDZixLQUFLLElBQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO3dCQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs0QkFDbEQsSUFBSSxHQUFHLElBQUksQ0FBQzt5QkFDYjt3QkFFRCxJQUFJLENBQUMsSUFBSTs0QkFBRSxTQUFTO3dCQUVwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJOzRCQUM1QixDQUFDLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQzs0QkFDZixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUztnQ0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSztnQ0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7b0NBQzFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0NBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7cUJBQzFDO2dCQUNILENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0csOEJBQU0sR0FBWjs7Ozs7b0NBQ0UsMEJBQTBCO29DQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQ0FFaEMsNEVBQTRFO29DQUM1RSxxQkFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7b0NBRC9CLDRFQUE0RTtvQ0FDNUUsU0FBK0IsQ0FBQztvQ0FFaEMseUJBQXlCO29DQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztvQ0FFN0IsU0FBUztvQ0FDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBRWQseUJBQXlCO29DQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQ0FDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7O2lCQUNoQztnQkFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBb0JHO2dCQUNILDBCQUFFLEdBQUYsVUFBRyxLQUFLLEVBQUUsUUFBUTtvQkFDaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFDLENBQUM7d0JBQzdCLE9BQU87d0JBQ1AsZ0JBQWdCO3dCQUNoQix5QkFBeUI7d0JBQ3pCLHdDQUF3Qzt3QkFDeEMsTUFBTTt3QkFDTixtQ0FBbUM7d0JBQ25DLElBQUk7d0JBQ0osUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNkLENBQUMsQ0FBQyxDQUFDO29CQUNILDJDQUEyQztnQkFDN0MsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7O21CQVlHO2dCQUNILDJCQUFHLEdBQUgsVUFBSSxLQUFLLEVBQUUsUUFBUTtvQkFDakIsNENBQTRDO2dCQUM5QyxDQUFDO2dCQUVEOzs7Ozs7Ozs7Ozs7O21CQWFHO2dCQUNILGdDQUFRLEdBQVIsVUFBUyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQWE7b0JBQWIseUJBQUEsRUFBQSxhQUFhO29CQUNqQyxJQUFNLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLHdCQUM3QixRQUFRLEtBQ1gsTUFBTSxFQUFFLEtBQUssSUFDYixDQUFDO29CQUNILElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFCLDJEQUEyRDtvQkFDM0QsMENBQTBDO29CQUMxQyw4QkFBOEI7b0JBQzlCLGlEQUFpRDtvQkFDakQsa0JBQWtCO29CQUNsQixVQUFVO29CQUNWLE1BQU07b0JBQ04sc0VBQXNFO29CQUN0RSxrQkFBa0I7b0JBQ2xCLFVBQVU7b0JBQ1YsTUFBTTtvQkFDTixxQkFBcUI7b0JBQ3JCLDZDQUE2QztvQkFDN0MsbUVBQW1FO29CQUNuRSxvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1osUUFBUTtvQkFDUixnQ0FBZ0M7b0JBQ2hDLDZEQUE2RDtvQkFDN0QsUUFBUTtvQkFDUixzQkFBc0I7b0JBQ3RCLGNBQWM7b0JBQ2QsUUFBUTtvQkFDUixPQUFPO29CQUNQLE1BQU07Z0JBQ1IsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFtQkc7Z0JBQ0gsMENBQWtCLEdBQWxCO29CQUFBLGlCQXNCQztvQkFyQkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUNqQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBRWxCLG1EQUFtRDt3QkFDbkQsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTs0QkFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3lCQUNqRDt3QkFFRCxrRUFBa0U7d0JBQ2xFLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRTs0QkFDcEMsSUFBTSxPQUFPLGtCQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs0QkFDdEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUU7Z0NBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDdEIsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7d0JBRUQsdUNBQXVDO3dCQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDekIsT0FBTyxFQUFFLENBQUM7d0JBQ1osQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7Ozs7OzttQkFPRztnQkFDSCx5Q0FBaUIsR0FBakI7b0JBQUEsaUJBS0M7b0JBSkMsbUJBQW1CO29CQUNuQixVQUFVLENBQUM7d0JBQ1QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQ7Ozs7Ozs7bUJBT0c7Z0JBQ0gsNENBQW9CLEdBQXBCO29CQUNFLG1CQUFtQjtvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILGdEQUF3QixHQUF4QixVQUF5QixRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU07b0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTt3QkFBRSxPQUFPO29CQUM3QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUM7d0JBQUUsT0FBTztvQkFFbEQseUNBQXlDO29CQUN6QyxJQUFNLFFBQVEsR0FBRyxlQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDO29CQUUxQywrQkFBK0I7b0JBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7OzttQkFZRztnQkFDSCxnQ0FBUSxHQUFSLFVBQVMsR0FBUTtvQkFBakIsaUJBeUNDO29CQXpDUSxvQkFBQSxFQUFBLFFBQVE7b0JBQ2YsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDN0IsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7b0JBRTlCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO3dCQUNqQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBRTlDLElBQUksWUFBWSxDQUFDO3dCQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOzRCQUFFLFlBQVksR0FBRyxLQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQU0sQ0FBQzs2QkFDbkUsSUFBSSxJQUFJLEtBQUssRUFBRTs0QkFBRSxZQUFZLEdBQU0sS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLFVBQUssSUFBTSxDQUFDOzs0QkFDbEUsWUFBWSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO3dCQUN4QyxJQUFJLE1BQU07NEJBQUUsWUFBWSxHQUFHLE1BQUksWUFBYyxDQUFDO3dCQUM5QyxJQUFJLE9BQU87NEJBQUUsWUFBWSxHQUFHLE1BQUksWUFBYyxDQUFDO3dCQUUvQywrQkFBK0I7d0JBQy9CLElBQUksS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7NEJBQzVCLElBQUksT0FBTyxHQUFHLG9CQUFZLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQzFELGdCQUFnQixFQUNoQixFQUFFLENBQ0gsQ0FBQzs0QkFDRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQ0FDbkMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO2dDQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO29DQUFFLFlBQVksR0FBRyxLQUFHLE9BQU8sR0FBRyxJQUFNLENBQUM7cUNBQ3ZELElBQUksSUFBSSxLQUFLLEVBQUU7b0NBQUUsWUFBWSxHQUFNLE9BQU8sVUFBSyxJQUFNLENBQUM7O29DQUN0RCxZQUFZLEdBQUcsT0FBTyxDQUFDO2dDQUM1QixJQUFJLE1BQU0sRUFBRTtvQ0FDVixZQUFZLEdBQUcsTUFBSSxZQUFjLENBQUM7aUNBQ25DO3FDQUFNLElBQUksT0FBTyxFQUFFO29DQUNsQixZQUFZLEdBQUcsTUFBSSxZQUFjLENBQUM7aUNBQ25DO3FDQUFNO29DQUNMLFlBQVksSUFBSSxNQUFJLFlBQWMsQ0FBQztpQ0FDcEM7NkJBQ0Y7eUJBQ0Y7d0JBRUQsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN4QyxDQUFDLENBQUMsQ0FBQztvQkFFSCxPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCx3Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBSTtvQkFDbkIseUJBQXlCO29CQUN6QixJQUFNLFFBQVEsR0FBRzt3QkFDZixJQUFJLE1BQUE7d0JBQ0osTUFBTSxFQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxLQUFLLElBQUk7NEJBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJO2dDQUNoQyxDQUFDLENBQUMsS0FBSztnQ0FDUCxDQUFDLENBQUMsUUFBUTs0QkFDWixDQUFDLENBQUMsS0FBSzt3QkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLO3dCQUM5QixhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhO3dCQUM5QyxLQUFLLEVBQUUscUJBQWEsQ0FBQyxjQUFjLEVBQUU7cUJBQ3RDLENBQUM7b0JBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBUyxJQUFJLFNBQUksUUFBUSxDQUFDLE1BQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEUsQ0FBQztnQkFFRDs7Ozs7Ozs7O21CQVNHO2dCQUNILDRDQUFvQixHQUFwQjtvQkFBQSxpQkE4QkM7b0JBOUJvQixlQUFRO3lCQUFSLFVBQVEsRUFBUixxQkFBUSxFQUFSLElBQVE7d0JBQVIsMEJBQVE7O29CQUMzQixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQzt3QkFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRW5FLDhCQUE4QjtvQkFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7d0JBQ2pCLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVE7NEJBQUUsT0FBTzt3QkFFeEMsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBRXRDLGlFQUFpRTt3QkFDakUsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTs0QkFDNUQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDM0IsT0FBTzt5QkFDUjt3QkFFRCxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDNUIsbUNBQW1DOzRCQUNuQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDOzRCQUN6QyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQzNDLE9BQU8sS0FBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUMxQzs2QkFBTTs0QkFDTCxJQUFNLHFCQUFxQixHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3RELElBQU0sdUJBQXVCLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDbEQsSUFBSSxxQkFBcUIsS0FBSyx1QkFBdUIsRUFBRTtnQ0FDckQsS0FBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztnQ0FDekMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztnQ0FDakQsT0FBTyxLQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQzFDO3lCQUNGO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILDZDQUFxQixHQUFyQjtvQkFBQSxpQkFXQztvQkFYcUIsZUFBUTt5QkFBUixVQUFRLEVBQVIscUJBQVEsRUFBUixJQUFRO3dCQUFSLDBCQUFROztvQkFDNUIsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7d0JBQzlCLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO3dCQUNqQixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQyxJQUFNLGdCQUFnQixHQUFHLHVCQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7NEJBQy9ELElBQUksRUFBSyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksZUFBVSxJQUFNOzRCQUM5QyxLQUFLLEVBQUUsSUFBSTt5QkFDWixDQUFDLENBQUM7d0JBQ0gsb0VBQW9FO29CQUN0RSxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUNILG9CQUFDO1lBQUQsQ0FBQyxBQWwvQk0sQ0FBNEIsZUFBZSxDQUFDLE9BQU87WUFxRmpELGVBQVksR0FBRyxFQUFHO1lBRXpCOzs7Ozs7Ozs7ZUFTRztZQUNJLGdCQUFhLEdBQUcsU0FBVTtlQWk1QmpDO0lBQ0osQ0FBQztJQUVELGtCQUFlLHNCQUFzQixDQUFDIn0=