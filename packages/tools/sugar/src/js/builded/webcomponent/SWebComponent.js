// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
        define(["require", "exports", "../../shared/error/SError", "../../shared/object/deepMerge", "@coffeekraken/s-promise", "../../shared/string/parse", "../../shared/string/toString", "../dom/when", "../validation/value/validateValue", "../../shared/string/uniqid", "../../shared/string/uncamelize", "../dom/domready", "../html/getTagNameFromHtmlClass", "../responsive/SMediaQuery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SError_1 = __importDefault(require("../../shared/error/SError"));
    var deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    var parse_1 = __importDefault(require("../../shared/string/parse"));
    var toString_1 = __importDefault(require("../../shared/string/toString"));
    var when_1 = __importDefault(require("../dom/when"));
    var validateValue_1 = __importDefault(require("../validation/value/validateValue"));
    var uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
    var uncamelize_1 = __importDefault(require("../../shared/string/uncamelize"));
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
                            var depsFns = __spreadArray([], _this._settings.mountDependencies);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dlYkNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3dlYmNvbXBvbmVudC9TV2ViQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxxRUFBaUQ7SUFFakQsNEVBQXdEO0lBQ3hELHNFQUFpRDtJQUNqRCxvRUFBZ0Q7SUFDaEQsMEVBQXNEO0lBQ3RELHFEQUFpQztJQUdqQyxvRkFBZ0U7SUFFaEUsc0VBQWtEO0lBS2xELDhFQUEwRDtJQUUxRCw2REFBeUM7SUFDekMsNEZBQXdFO0lBRXhFLDBFQUFzRDtJQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0RHO0lBRUgsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLG1CQUFVLENBQUM7UUFDM0MsRUFBRSxFQUFFLHNCQUFzQjtLQUMzQixDQUFDLENBQUM7SUFDSCxJQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztJQUUvQixTQUFTLHNCQUFzQixDQUFDLGVBQW9COztRQUFwQixnQ0FBQSxFQUFBLG9CQUFvQjtRQUNsRCxlQUFlLEdBQUcsbUJBQVcsQ0FDM0I7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixJQUFJLEVBQUUsSUFBSTtTQUNYLEVBQ0QsZUFBZSxDQUNoQixDQUFDO1FBRUY7Z0JBQW1DLGlDQUF1QjtnQkFxTHhEOzs7Ozs7OzttQkFRRztnQkFDSCx1QkFBWSxRQUFhO29CQUFiLHlCQUFBLEVBQUEsYUFBYTtvQkFBekI7b0JBQ0UseUJBQXlCO29CQUN6QixpQkFBTyxTQXFGUjtvQkFwUkQsNEJBQXNCLEdBQUcsRUFBRSxDQUFDO29CQUM1QixzQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBRXhCOzs7Ozs7Ozs7dUJBU0c7b0JBQ0gsYUFBTyxH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