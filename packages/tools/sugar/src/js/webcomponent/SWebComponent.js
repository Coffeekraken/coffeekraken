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
import __deepMerge from '../../shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __parse from '../../shared/string/parse';
import __toString from '../../shared/string/toString';
import __when from '../dom/detect/when';
import __validateValue from '../validation/value/validateValue';
import __uniqid from '../../shared/string/uniqid';
import __uncamelize from '../../shared/string/uncamelize';
import __domReady from '../dom/detection/domready';
import __getTagNameFromHtmlClass from '../html/getTagNameFromHtmlClass';
import __SMediaQuery from '../responsive/SMediaQuery';
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
const _sWebComponentPromise = new __SPromise({
    id: 'SWebComponentPromise'
});
const _sWebComponentStack = {};
function SWebComponentGenerator(extendsSettings = {}) {
    var _a;
    extendsSettings = __deepMerge({
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
                this._settings = __deepMerge({
                    id: this.getAttribute('id') || __uniqid(),
                    props: {}
                }, this._metas.settings || {}, settings);
                // add the "this" into the contexts stack
                this.registerContext(this);
                // create the SPromise instance
                this.promise = new __SPromise({
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
                __domReady(() => {
                    // get the inital content
                    // this._$initialContent =
                    // handle props
                    this._initDomProps();
                    this._mediaQuery = new __SMediaQuery('*');
                    this._mediaQuery.on('match', (media) => {
                        Object.keys(this.constructor.props).forEach((prop) => {
                            if (!this._props[prop].responsive ||
                                this._props[prop].responsiveValues[media.name] !== undefined)
                                return;
                            if (this.hasAttribute(`${__uncamelize(prop)}-${media.name}`)) {
                                const value = __parse(this.getAttribute(`${__uncamelize(prop)}-${media.name}`));
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
                return Object.keys(this.props).map((name) => __uncamelize(name));
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
                return _sWebComponentStack[__uncamelize(name)] || {};
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
                const uncamelizedName = __uncamelize(name);
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
                    defineSettings.extends = __getTagNameFromHtmlClass(extendsSettings.extends);
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
                this._settings = __deepMerge(this._settings, settings);
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
                                if (this._props[prop].responsiveValues[__SMediaQuery.getActiveMedia()] !== undefined) {
                                    returnValue = this._props[prop].responsiveValues[__SMediaQuery.getActiveMedia()];
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
                    let attr = this.getAttribute(__uncamelize(prop));
                    if (!attr && this.hasAttribute(__uncamelize(prop))) {
                        attr = true;
                    }
                    if (!attr)
                        continue;
                    this._props[prop].value = attr
                        ? __parse(attr)
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
                        promises.push(__when(this._settings.mountWhen));
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
                const newValue = __parse(newVal) || false;
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
                        const baseCls = __uncamelize(this.constructor.cssName).replace('-web-component', '');
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
                    media: __SMediaQuery.getActiveMedia()
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
                        this.setAttribute(prop, __toString(value));
                        delete this._settedAttributesStack[prop];
                    }
                    else {
                        const currentAttributeValue = this.getAttribute(prop);
                        const currentValueStringified = __toString(value);
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
                    const validationResult = __validateValue(propObj.value, propObj, {
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
export default SWebComponentGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dlYkNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNXZWJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hELE9BQU8sVUFBVSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sTUFBTSxNQUFNLG9CQUFvQixDQUFDO0FBR3hDLE9BQU8sZUFBZSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sUUFBUSxNQUFNLDRCQUE0QixDQUFDO0FBS2xELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBRTFELE9BQU8sVUFBVSxNQUFNLDJCQUEyQixDQUFDO0FBQ25ELE9BQU8seUJBQXlCLE1BQU0saUNBQWlDLENBQUM7QUFFeEUsT0FBTyxhQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUVILE1BQU0scUJBQXFCLEdBQUcsSUFBSSxVQUFVLENBQUM7SUFDM0MsRUFBRSxFQUFFLHNCQUFzQjtDQUMzQixDQUFDLENBQUM7QUFDSCxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztBQUUvQixTQUFTLHNCQUFzQixDQUFDLGVBQWUsR0FBRyxFQUFFOztJQUNsRCxlQUFlLEdBQUcsV0FBVyxDQUMzQjtRQUNFLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLElBQUksRUFBRSxJQUFJO0tBQ1gsRUFDRCxlQUFlLENBQ2hCLENBQUM7SUFFRixZQUFPLE1BQU0sYUFBYyxTQUFRLGVBQWUsQ0FBQyxPQUFPO1lBcUx4RDs7Ozs7Ozs7ZUFRRztZQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7Z0JBQ3ZCLHlCQUF5QjtnQkFDekIsS0FB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