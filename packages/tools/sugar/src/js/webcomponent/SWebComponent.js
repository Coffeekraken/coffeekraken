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
        define(["require", "exports", "../error/SError", "../object/deepMerge", "../promise/SPromise", "../string/parse", "../string/toString", "../dom/when", "../validation/value/validateValue", "../string/uniqid", "../string/uncamelize", "../dom/domready", "../html/getTagNameFromHtmlClass", "../responsive/SMediaQuery"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SError_2 = __importDefault(require("../error/SError"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
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
     * @wip
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
    var _sWebComponentPromise = new SPromise_1.default({
        id: 'SWebComponentPromise'
    });
    var _sWebComponentStack = {};
    function SWebComponentGenerator(extendsSettings) {
        var _a;
        if (extendsSettings === void 0) { extendsSettings = {}; }
        extendsSettings = deepMerge_2.default({
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
                    _this._settings = deepMerge_2.default({
                        id: _this.getAttribute('id') || uniqid_1.default(),
                        props: {}
                    }, _this._metas.settings || {}, settings);
                    // add the "this" into the contexts stack
                    _this.registerContext(_this);
                    // create the SPromise instance
                    _this.promise = new SPromise_1.default({
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
                            // console.log(e);
                        }
                    }
                    else if (document.registerElement) {
                        try {
                            defineSettings.prototype = this.prototype;
                            document.registerElement(uncamelizedName, defineSettings);
                        }
                        catch (e) {
                            // @TODO      find why the component is registeres twice...
                            // console.log(e);
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
                        throw new SError_2.default("You try to set the responsive property \"" + prop + "\" for the media \"" + media + "\" but this property is not defined as \"responsive\"...");
                    }
                    this._props[prop].responsiveValues[media] = value;
                    // trigger a "prop" event
                    this._triggerPropsEvents(prop);
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
                        throw new SError_2.default("You try to get the responsive property \"" + prop + "\" for the media \"" + media + "\" but this property is not defined as \"responsive\"...");
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
                    this._settings = deepMerge_2.default(this._settings, settings);
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
                                _this._triggerPropsEvents(prop);
                            }
                        });
                        this_1.promise.on("props." + prop + ".*", function (update) {
                            console.log('up', prop, update);
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
                 * @name        _triggerPropsEvents
                 * @type        Function
                 * @private
                 *
                 * This method simply trigger a prop|prop.{name} event through the SPromise instance.
                 *
                 * @param     {String}      prop      The property name to trigger event for
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SWebComponent.prototype._triggerPropsEvents = function (prop) {
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
                    this.promise.trigger("props." + prop + "." + eventObj.action, eventObj);
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
    return SWebComponentGenerator;
});
