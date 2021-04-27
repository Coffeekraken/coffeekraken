// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
        define(["require", "exports", "../../shared/object/deepMerge", "@coffeekraken/s-promise", "../../shared/string/parse", "../../shared/string/toString", "../dom/when", "../validation/value/validateValue", "../../shared/string/uniqid", "../../shared/string/uncamelize", "../dom/domready", "../html/getTagNameFromHtmlClass", "../responsive/SMediaQuery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const parse_1 = __importDefault(require("../../shared/string/parse"));
    const toString_1 = __importDefault(require("../../shared/string/toString"));
    const when_1 = __importDefault(require("../dom/when"));
    const validateValue_1 = __importDefault(require("../validation/value/validateValue"));
    const uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
    const uncamelize_1 = __importDefault(require("../../shared/string/uncamelize"));
    const domready_1 = __importDefault(require("../dom/domready"));
    const getTagNameFromHtmlClass_1 = __importDefault(require("../html/getTagNameFromHtmlClass"));
    const SMediaQuery_1 = __importDefault(require("../responsive/SMediaQuery"));
    /**
     * @name              SWebComponent
     * @namespace            js.webcomponent
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
    const _sWebComponentPromise = new s_promise_1.default({
        id: 'SWebComponentPromise'
    });
    const _sWebComponentStack = {};
    function SWebComponentGenerator(extendsSettings = {}) {
        var _a;
        extendsSettings = deepMerge_1.default({
            extends: HTMLElement,
            name: null
        }, extendsSettings);
        return _a = class SWebComponent extends extendsSettings.extends {
                /**
                 * @name          constructor
                 * @type          Function
                 * @constructor
                 *
                 * Constructor
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                constructor(settings = {}) {
                    // init base html element
                    super();
                    this._settedAttributesStack = {};
                    this._isSWebComponent = true;
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
                    this.promise = null;
                    /**
                     * @name          _props
                     * @type          Object
                     * @private
                     *
                     * Store all the properties (attributes)
                     *
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    this._props = {};
                    this.props = {};
                    /**
                     * @name          _settings
                     * @type          Object
                     * @private
                     *
                     * Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
                     *
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    this._settings = {};
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
                    this._metas = {};
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
                    this._contexts = [this];
                    // make sure the component has a componentName static prop
                    if (!this.constructor.componentName)
                        throw `Your MUST define a static "componentName" camelcase property like "SFiltrableInput" for your component to work properly...`;
                    // get component metas
                    this._metas = this.constructor.getComponentMetas(this.constructor.componentName);
                    // save the settings
                    this._settings = deepMerge_1.default({
                        id: this.getAttribute('id') || uniqid_1.default(),
                        props: {}
                    }, this._metas.settings || {}, settings);
                    // add the "this" into the contexts stack
                    this.registerContext(this);
                    // create the SPromise instance
                    this.promise = new s_promise_1.default({
                        id: this._settings.id
                    });
                    // init props proxy
                    this._initPropsProxy();
                    this.on('ready', (e) => {
                        if (e.target === this)
                            return;
                        if (e.target._isSWebComponent) {
                            e.stopImmediatePropagation();
                            e.target.registerContext(this);
                        }
                    });
                    this.on('mounted', () => {
                        // dispatch a ready event
                        if (!this.lit) {
                            this.update();
                            // the Lit HTML class dispatch the ready event after having rendering the template the first time
                            this.dispatch('ready', this, {
                                bubbles: true
                            });
                        }
                    });
                    domready_1.default(() => {
                        // get the inital content
                        // this._$initialContent =
                        // handle props
                        this._initDomProps();
                        this._mediaQuery = new SMediaQuery_1.default('*');
                        this._mediaQuery.on('match', (media) => {
                            Object.keys(this.constructor.props).forEach((prop) => {
                                if (!this._props[prop].responsive ||
                                    this._props[prop].responsiveValues[media.name] !== undefined)
                                    return;
                                if (this.hasAttribute(`${uncamelize_1.default(prop)}-${media.name}`)) {
                                    const value = parse_1.default(this.getAttribute(`${uncamelize_1.default(prop)}-${media.name}`));
                                    this.setProp(prop, value, media.name);
                                }
                            });
                        });
                        // apply the $node class
                        const currentClassName = this.getAttribute('class') || '';
                        this.setAttribute('class', `${currentClassName} ${this.selector(`node`)}`);
                        // launch the mounting process
                        this._mount();
                    });
                }
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
                static get observedAttributes() {
                    return Object.keys(this.props).map((name) => uncamelize_1.default(name));
                }
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
                static getComponentMetas(name) {
                    return _sWebComponentStack[uncamelize_1.default(name)] || {};
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
                 * @setting     {String}        [name=null]                   Specify the component name in CamelCase. MyCoolComponent => <my-cool-component />
                 *
                 * @since 					2.0.0
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                static define(settings = {}) {
                    const name = (settings.name || this.componentName || this.name).replace('WebComponent', '');
                    const uncamelizedName = uncamelize_1.default(name);
                    // avoid multi define of the same component
                    if (customElements.get(uncamelizedName))
                        return;
                    this.componentName = name;
                    if (_sWebComponentStack[uncamelizedName])
                        return;
                    _sWebComponentStack[uncamelizedName] = {
                        name,
                        dashName: uncamelizedName,
                        class: this,
                        extends: extendsSettings.extends,
                        settings
                    };
                    const defineSettings = {};
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
                        throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
                    }
                }
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
                get settings() {
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                get $root() {
                    return this;
                }
                /**
                 * @name        update
                 * @type        Function
                 *
                 * This method allows you to update your component manually if needed
                 *
                 * @since       2.0.0
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                update() {
                    // refresh references
                    this._refreshIdReferences();
                    // physical props
                    this._handlePhysicalProps();
                }
                /**
                 * @name					$
                 * @type 					Function
                 *
                 * This method is a shortcut to the ```querySelector``` function
                 *
                 * @param         {String}        path      The selector path
                 * @return        {HTMLElement}             The html element getted
                 *
                 * @since 					2.0.0
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                $(path) {
                    const tries = [this.selector(path), path];
                    for (let i = 0; i < tries.length; i++) {
                        const $tryRes = this.$root.querySelector(tries[i]);
                        if ($tryRes)
                            return $tryRes;
                    }
                    return null;
                }
                /**
                 * @name					$$
                 * @type 					Function
                 *
                 * This method is a shortcut to the ```querySelectorAll``` function
                 *
                 * @param         {String}        path      The selector path
                 * @return        {HTMLElement}             The html element(s) getted
                 *
                 * @since 					2.0.0
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                $$(path) {
                    const tries = [this.selector(path), path];
                    for (let i = 0; i < tries.length; i++) {
                        const $tryRes = this.$root.querySelectorAll(tries[i]);
                        if ($tryRes)
                            return $tryRes;
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                registerContext(context) {
                    if (this._contexts.indexOf(context) !== -1)
                        return;
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
                 * @param       {Mixed}       value       The value to set
                 * @param       {String}    [media=null]    The media for which you want to set the property. Work only on "responsive" defined props
                 *
                 * @since       2.0.0
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                setProp(prop, value, media = null) {
                    if (!media)
                        return (this.props[prop] = value);
                    if (!this._props[prop].responsive) {
                        throw new Error(`You try to set the responsive property "${prop}" for the media "${media}" but this property is not defined as "responsive"...`);
                    }
                    this._props[prop].responsiveValues[media] = value;
                    // trigger a "prop" event
                    this._emitPropsEvents(prop);
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                getProp(prop, media = null) {
                    if (!media)
                        return this._props[prop].value;
                    if (!this._props[prop].responsive) {
                        throw new Error(`You try to get the responsive property "${prop}" for the media "${media}" but this property is not defined as "responsive"...`);
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                setSettings(settings = {}, reactive = true) {
                    // set the new settings
                    this._settings = deepMerge_1.default(this._settings, settings);
                    // check if is reactive
                    if (reactive)
                        this.update();
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                addClass(cls, $elm = this) {
                    // split the cls
                    const clsArray = cls.split(' ');
                    clsArray.forEach((className) => {
                        // build the selector
                        const selector = this.selector(className);
                        // split the selector
                        selector.split(' ').forEach((sel) => {
                            // add the class to the element
                            $elm.classList.add(sel);
                        });
                    });
                    // maintain chainability
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
                 * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                removeClass(cls, $elm = this) {
                    // split the cls
                    const clsArray = cls.split(' ');
                    clsArray.forEach((className) => {
                        // build the selector
                        const selector = this.selector(className);
                        // split the selector
                        selector.split(' ').forEach((sel) => {
                            // add the class to the element
                            $elm.classList.remove(sel);
                        });
                    });
                    // maintain chainability
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                get metas() {
                    return Object.assign({ instance: this, $node: this }, this._metas);
                }
                _refreshIdReferences() {
                    const $refs = this.$root.querySelectorAll('[id]');
                    Array.from($refs).forEach(($item) => {
                        if (this[`$${$item.id}`] === $item)
                            return;
                        this[`$${$item.id}`] = $item;
                    });
                }
                _initPropsProxy() {
                    for (const prop in this.constructor.props) {
                        let originalProp;
                        if (this[prop] !== undefined)
                            originalProp = this[prop];
                        Object.defineProperty(this._props, prop, {
                            enumerable: false,
                            writable: true,
                            configurable: false,
                            value: Object.assign(Object.assign({}, this.constructor.props[prop]), { previousValue: undefined, value: undefined, responsiveValues: {} })
                        });
                        Object.defineProperty(this.props, prop, {
                            enumerable: true,
                            configurable: false,
                            get: () => {
                                let returnValue = this._props[prop].value !== undefined
                                    ? this._props[prop].value
                                    : this._settings.props[prop] !== undefined
                                        ? this._settings.props[prop]
                                        : this.constructor.props[prop].default;
                                if (this._props[prop].responsive &&
                                    this._props[prop].responsiveValues) {
                                    if (this._props[prop].responsiveValues[SMediaQuery_1.default.getActiveMedia()] !== undefined) {
                                        returnValue = this._props[prop].responsiveValues[SMediaQuery_1.default.getActiveMedia()];
                                    }
                                }
                                // js expression or references
                                if (prop.substr(0, 1) === ':') {
                                    if (typeof returnValue !== 'string') {
                                        return returnValue;
                                    }
                                    for (let i = 0; i < this._contexts.length; i++) {
                                        const context = this._contexts[i];
                                        // check if is a reference in the current component
                                        if (context[returnValue] !== undefined)
                                            return context[returnValue];
                                    }
                                }
                                return returnValue;
                            },
                            set: (value) => {
                                this._props[prop].previousValue = this._props[prop].value;
                                this._props[prop].value = value;
                                if (originalProp) {
                                    Object.getOwnPropertyDescriptor(this.prototype, prop).set.call(this, value);
                                }
                                // trigger a "prop" event
                                this._emitPropsEvents(prop);
                            }
                        });
                        this.promise.on(`props.${prop}.*`, (update) => {
                            // console.log('up', prop, update);
                            this.update();
                        });
                    }
                }
                _initDomProps() {
                    // handle props
                    for (const prop in this.constructor.props) {
                        let attr = this.getAttribute(uncamelize_1.default(prop));
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                _mount() {
                    return __awaiter(this, void 0, void 0, function* () {
                        // dispatch mounting event
                        this.dispatch('mounting', this);
                        // wait until the component match the mountDependencies and mountWhen status
                        yield this._mountDependencies();
                        // check props definition
                        this._checkPropsDefinition();
                        // update
                        this.update();
                        // dispatch mounted event
                        this._isMounted = true;
                        this.dispatch('mounted', this);
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
                 * @param       {String}        event         The event you want to subscribe to
                 * @param       {Function}      callback      The callback function that has to be called
                 * @return      {SPromise}                    The SPromise used in this instance
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                on(event, callback) {
                    this.addEventListener(event, (e) => {
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
                }
                /**
                 * @name          off
                 * @type          Function
                 *
                 * Method used to unsubscribe to a previously subscribed event
                 *
                 * @param       {String}        event         The event you want to unsubscribe for
                 * @param       {Function}      callback      The callback function that has to be called
                 * @return      {SPromise}                    The SPromise used in this instance
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                off(event, callback) {
                    // return this.promise.off(event, callback);
                }
                /**
                 * @name          dispatch
                 * @type          Function
                 * @private
                 *
                 * This method is used to dispatch events simultaneously through the SPromise internal instance on which you can subscribe using the "on" method,
                 * and through the global "sugar.js.event.dispatch" function on which you can subscribe using the function "sugar.js.event.on"
                 *
                 * @param       {String}        name          The event name to dispatch
                 * @param       {Mixed}         value         The value to attach to the event
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                dispatch(name, value, settings = {}) {
                    const event = new CustomEvent(name, Object.assign(Object.assign({}, settings), { detail: value }));
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                _mountDependencies() {
                    return new Promise((resolve, reject) => {
                        const promises = [];
                        // check if we have a "mountWhen" setting specified
                        if (this._settings.mountWhen) {
                            promises.push(when_1.default(this._settings.mountWhen));
                        }
                        // check if we have one/some "mountDependencies" setting specified
                        if (this._settings.mountDependencies) {
                            const depsFns = [...this._settings.mountDependencies];
                            depsFns.forEach((fn) => {
                                promises.push(fn());
                            });
                        }
                        // wait until all promises are resolved
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                connectedCallback() {
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                disconnectedCallback() {
                    // dispatch "event"
                    this.dispatch('detach', this);
                }
                /**
                 * @name            attributeChangedCallback
                 * @type            Function
                 *
                 * Called when an attribute is removed, added or updated
                 *
                 * @param     {String}      attrName      The attribute name
                 * @param     {Mixed}       oldVal        The old attribute value
                 * @param     {Mixed}       newVal        The new attribute value
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this._isMounted)
                        return;
                    if (this._settedAttributesStack[attrName])
                        return;
                    // const previousValue = __parse(oldVal);
                    const newValue = parse_1.default(newVal) || false;
                    // set the value into the props
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
                 * @return      {String}                  The generated class name
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                selector(cls = '') {
                    const split = cls.split(' ');
                    const finalSelectorArray = [];
                    split.forEach((part) => {
                        const hasDot = part.match(/^\./), hasHash = part.match(/^\#/);
                        part = part.replace('.', '').replace('#', '');
                        let finalClsPart;
                        if (part.match(/^(--)/))
                            finalClsPart = `${this.metas.dashName}${part}`;
                        else if (part !== '')
                            finalClsPart = `${this.metas.dashName}__${part}`;
                        else
                            finalClsPart = this.metas.dashName;
                        if (hasDot)
                            finalClsPart = `.${finalClsPart}`;
                        if (hasHash)
                            finalClsPart = `#${finalClsPart}`;
                        // add the base class if needed
                        if (this.constructor.cssName) {
                            const baseCls = uncamelize_1.default(this.constructor.cssName).replace('-web-component', '');
                            if (!finalClsPart.includes(baseCls)) {
                                let finalBaseCls = '';
                                if (part.match(/^(--)/))
                                    finalBaseCls = `${baseCls}${part}`;
                                else if (part !== '')
                                    finalBaseCls = `${baseCls}__${part}`;
                                else
                                    finalBaseCls = baseCls;
                                if (hasDot) {
                                    finalBaseCls = `.${finalBaseCls}`;
                                }
                                else if (hasHash) {
                                    finalBaseCls = `#${finalBaseCls}`;
                                }
                                else {
                                    finalClsPart += ` ${finalBaseCls}`;
                                }
                            }
                        }
                        finalSelectorArray.push(finalClsPart);
                    });
                    return finalSelectorArray.join(' ');
                }
                /**
                 * @name        _emitPropsEvents
                 * @type        Function
                 * @private
                 *
                 * This method simply trigger a prop|prop.{name} event through the SPromise instance.
                 *
                 * @param     {String}      prop      The property name to trigger event for
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                _emitPropsEvents(prop) {
                    // trigger a "prop" event
                    const eventObj = {
                        prop,
                        action: this._props[prop].previousValue !== null
                            ? this._props[prop].value !== null
                                ? 'set'
                                : 'delete'
                            : 'set',
                        value: this._props[prop].value,
                        previousValue: this._props[prop].previousValue,
                        media: SMediaQuery_1.default.getActiveMedia()
                    };
                    this.promise.emit(`props.${prop}.${eventObj.action}`, eventObj);
                }
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
                _handlePhysicalProps(...props) {
                    if (!props || props.length === 0)
                        props = Object.keys(this._props);
                    // loop on each required props
                    props.forEach((prop) => {
                        if (!this._props[prop].physical)
                            return;
                        const value = this._props[prop].value;
                        // if the value is false, remove the attributee from the dom node
                        if (value === undefined || value === null || value === false) {
                            this.removeAttribute(prop);
                            return;
                        }
                        if (!this.getAttribute(prop)) {
                            // set the attribute with the value
                            this._settedAttributesStack[prop] = true;
                            this.setAttribute(prop, toString_1.default(value));
                            delete this._settedAttributesStack[prop];
                        }
                        else {
                            const currentAttributeValue = this.getAttribute(prop);
                            const currentValueStringified = toString_1.default(value);
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                _checkPropsDefinition(...props) {
                    if (!props || props.length === 0)
                        props = Object.keys(this.constructor.props);
                    props.forEach((prop) => {
                        const propObj = this._props[prop];
                        const validationResult = validateValue_1.default(propObj.value, propObj, {
                            name: `${this.constructor.name}.props.${prop}`,
                            throw: true
                        });
                        // if (validationResult !== true) throw new Error(validationResult);
                    });
                }
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dlYkNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNXZWJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR2QsOEVBQXdEO0lBQ3hELHdFQUFpRDtJQUNqRCxzRUFBZ0Q7SUFDaEQsNEVBQXNEO0lBQ3RELHVEQUFpQztJQUdqQyxzRkFBZ0U7SUFFaEUsd0VBQWtEO0lBS2xELGdGQUEwRDtJQUUxRCwrREFBeUM7SUFDekMsOEZBQXdFO0lBRXhFLDRFQUFzRDtJQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0RHO0lBRUgsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLG1CQUFVLENBQUM7UUFDM0MsRUFBRSxFQUFFLHNCQUFzQjtLQUMzQixDQUFDLENBQUM7SUFDSCxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztJQUUvQixTQUFTLHNCQUFzQixDQUFDLGVBQWUsR0FBRyxFQUFFOztRQUNsRCxlQUFlLEdBQUcsbUJBQVcsQ0FDM0I7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixJQUFJLEVBQUUsSUFBSTtTQUNYLEVBQ0QsZUFBZSxDQUNoQixDQUFDO1FBRUYsWUFBTyxNQUFNLGFBQWMsU0FBUSxlQUFlLENBQUMsT0FBTztnQkFxTHhEOzs7Ozs7OzttQkFRRztnQkFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO29CQUN2Qix5QkFBeUI7b0JBQ3pCLEtBQUssRUFBRSxDQUFDO29CQS9MViwyQkFBc0IsR0FBRyxFQUFFLENBQUM7b0JBQzVCLHFCQUFnQixHQUFHLElBQUksQ0FBQztvQkFFeEI7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxZQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVmOzs7Ozs7Ozt1QkFRRztvQkFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNaLFVBQUssR0FBRyxFQUFFLENBQUM7b0JBRVg7Ozs7Ozs7O3VC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