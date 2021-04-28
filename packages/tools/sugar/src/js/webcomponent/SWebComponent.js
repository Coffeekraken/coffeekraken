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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dlYkNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy93ZWJjb21wb25lbnQvU1dlYkNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHZCw4RUFBd0Q7SUFDeEQsd0VBQWlEO0lBQ2pELHNFQUFnRDtJQUNoRCw0RUFBc0Q7SUFDdEQsdURBQWlDO0lBR2pDLHNGQUFnRTtJQUVoRSx3RUFBa0Q7SUFLbEQsZ0ZBQTBEO0lBRTFELCtEQUF5QztJQUN6Qyw4RkFBd0U7SUFFeEUsNEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnREc7SUFFSCxNQUFNLHFCQUFxQixHQUFHLElBQUksbUJBQVUsQ0FBQztRQUMzQyxFQUFFLEVBQUUsc0JBQXNCO0tBQzNCLENBQUMsQ0FBQztJQUNILE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBRS9CLFNBQVMsc0JBQXNCLENBQUMsZUFBZSxHQUFHLEVBQUU7O1FBQ2xELGVBQWUsR0FBRyxtQkFBVyxDQUMzQjtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLElBQUksRUFBRSxJQUFJO1NBQ1gsRUFDRCxlQUFlLENBQ2hCLENBQUM7UUFFRixZQUFPLE1BQU0sYUFBYyxTQUFRLGVBQWUsQ0FBQyxPQUFPO2dCQXFMeEQ7Ozs7Ozs7O21CQVFHO2dCQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7b0JBQ3ZCLHlCQUF5QjtvQkFDekIsS0FBSyxFQUFFLENBQUM7b0JBL0xWLDJCQUFzQixHQUFHLEVBQUUsQ0FBQztvQkFDNUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUV4Qjs7Ozs7Ozs7O3VCQVNHO29CQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7b0JBRWY7Ozs7Ozs7O3VC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