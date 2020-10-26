import __SError from '../error/SError';
import __isClass from '../is/class';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __parse from '../string/parse';
import __toString from '../string/toString';
import __when from '../dom/when';
import __camelize from '../string/camelize';
import __paramCase from '../string/paramCase';
import __validateValue from '../validation/value/validateValue';
import __watch from '../object/watch';
import __uniqid from '../string/uniqid';
import __dispatch from '../event/dispatch';
import __on from '../event/on';
import __SLitHtmlWebComponent from './SLitHtmlWebComponent';
import __htmlTagToHtmlClassMap from '../html/htmlTagToHtmlClassMap';
import __uncamelize from '../string/uncamelize';
import __getHtmlClassFromTagName from '../html/getHtmlClassFromTagName';
import __domReady from '../dom/domReady';
import __getTagNameFromHtmlClass from '../html/getTagNameFromHtmlClass';
import __mediaQuery from '../responsive/mediaQuery';
import __SMediaQuery from '../responsive/SMediaQuery';

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

const _sWebComponentPromise = new __SPromise({
  id: 'SWebComponentPromise'
});
const _sWebComponentStack = {};

function SWebComponentGenerator(extendsSettings = {}) {
  extendsSettings = __deepMerge(
    {
      extends: HTMLElement,
      name: null
    },
    extendsSettings
  );

  return class SWebComponent extends extendsSettings.extends {
    _settedAttributesStack = {};
    _isSWebComponent = true;

    /**
     * @name          promise
     * @type          SPromise
     * @private
     *
     * Store the SPromise instance used to "dispatch" some events
     * that you can subscribe using the "on" exposed method
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    promise = null;

    /**
     * @name          _props
     * @type          Object
     * @private
     *
     * Store all the properties (attributes)
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _props = {};
    props = {};

    /**
     * @name          _settings
     * @type          Object
     * @private
     *
     * Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _settings = {};

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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _metas = {};

    /**
     * @name        _contexts
     * @type        Array
     * @private
     *
     * Store all the contexts this component will be aware of
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _contexts = [this];

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
    static get observedAttributes() {
      return Object.keys(this.props).map((name) => __uncamelize(name));
    }

    static customEvents = {};

    /**
     * @name					componentName
     * @type 					String
     * @static
     *
     * Store the name of the component in camelcase
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static componentName = undefined;

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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @setting     {String}        [name=null]                   Specify the component name in CamelCase. MyCoolComponent => <my-cool-component />
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static define(settings = {}) {
      const name = (settings.name || this.componentName || this.name).replace(
        'WebComponent',
        ''
      );

      const uncamelizedName = __uncamelize(name);

      // avoid multi define of the same component
      if (customElements.get(uncamelizedName)) return;

      this.componentName = name;

      if (_sWebComponentStack[uncamelizedName]) return;

      _sWebComponentStack[uncamelizedName] = {
        name,
        dashName: uncamelizedName,
        class: this,
        extends: extendsSettings.extends,
        settings
      };

      const defineSettings = {};
      if (extendsSettings.extends !== HTMLElement)
        defineSettings.extends = __getTagNameFromHtmlClass(
          extendsSettings.extends
        );

      if (window.customElements) {
        try {
          window.customElements.define(uncamelizedName, this, defineSettings);
        } catch (e) {
          // @TODO      find why the component is registeres twice...
          // console.log(e);
        }
      } else if (document.registerElement) {
        try {
          defineSettings.prototype = this.prototype;
          document.registerElement(uncamelizedName, defineSettings);
        } catch (e) {
          // @TODO      find why the component is registeres twice...
          // console.log(e);
        }
      } else {
        throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
      }
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
    constructor(settings = {}) {
      // init base html element
      super();

      // make sure the component has a componentName static prop
      if (!this.constructor.componentName)
        throw `Your MUST define a static "componentName" camelcase property like "SFiltrableInput" for your component to work properly...`;
      // get component metas
      this._metas = this.constructor.getComponentMetas(
        this.constructor.componentName
      );

      // save the settings
      this._settings = __deepMerge(
        {
          id: this.getAttribute('id') || __uniqid(),
          props: {}
        },
        this._metas.settings || {},
        settings
      );

      // add the "this" into the contexts stack
      this.registerContext(this);

      // create the SPromise instance
      this.promise = new __SPromise({
        id: this._settings.id
      });

      // init props proxy
      this._initPropsProxy();

      this.on('ready', (e) => {
        if (e.target === this) return;
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
            if (
              !this._props[prop].responsive ||
              this._props[prop].responsiveValues[media.name] !== undefined
            )
              return;

            if (this.hasAttribute(`${__uncamelize(prop)}-${media.name}`)) {
              const value = __parse(
                this.getAttribute(`${__uncamelize(prop)}-${media.name}`)
              );
              this.setProp(prop, value, media.name);
            }
          });
        });

        // apply the $node class
        const currentClassName = this.getAttribute('class') || '';
        this.setAttribute(
          'class',
          `${currentClassName} ${this.selector(`node`)}`
        );

        // launch the mounting process
        this._mount();
      });
    }

    /**
     * @name          settings
     * @type          Function
     * @get
     *
     * Get the settings object
     *
     * @since         2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @param         {String}        path      The selector path
     * @return        {HTMLElement}             The html element getted
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    $(path) {
      const tries = [this.selector(path), path];
      for (let i = 0; i < tries.length; i++) {
        const $tryRes = this.$root.querySelector(tries[i]);
        if ($tryRes) return $tryRes;
      }
      return null;
    }

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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    $$(path) {
      const tries = [this.selector(path), path];
      for (let i = 0; i < tries.length; i++) {
        const $tryRes = this.$root.querySelectorAll(tries[i]);
        if ($tryRes) return $tryRes;
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerContext(context) {
      if (this._contexts.indexOf(context) !== -1) return;
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
     * @param       {Mixed}       value       The value to set
     * @param       {String}    [media=null]    The media for which you want to set the property. Work only on "responsive" defined props
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setProp(prop, value, media = null) {
      if (!media) return (this.props[prop] = value);
      if (!this._props[prop].responsive) {
        throw new __SError(
          `You try to set the responsive property "${prop}" for the media "${media}" but this property is not defined as "responsive"...`
        );
      }
      this._props[prop].responsiveValues[media] = value;
      // trigger a "prop" event
      this._triggerPropsEvents(prop);
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    getProp(prop, media = null) {
      if (!media) return this._props[prop].value;
      if (!this._props[prop].responsive) {
        throw new __SError(
          `You try to get the responsive property "${prop}" for the media "${media}" but this property is not defined as "responsive"...`
        );
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setSettings(settings = {}, reactive = true) {
      // set the new settings
      this._settings = __deepMerge(this._settings, settings);
      // check if is reactive
      if (reactive) this.update();
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get metas() {
      return {
        instance: this,
        $node: this,
        ...this._metas
      };
    }

    _refreshIdReferences() {
      const $refs = this.$root.querySelectorAll('[id]');
      Array.from($refs).forEach(($item) => {
        if (this[`$${$item.id}`] === $item) return;
        this[`$${$item.id}`] = $item;
      });
    }

    _initPropsProxy() {
      for (const prop in this.constructor.props) {
        let originalProp;
        if (this[prop] !== undefined) originalProp = this[prop];
        Object.defineProperty(this._props, prop, {
          enumerable: false,
          writable: true,
          configurable: false,
          value: {
            ...this.constructor.props[prop],
            previousValue: undefined,
            value: undefined,
            responsiveValues: {}
          }
        });
        Object.defineProperty(this.props, prop, {
          enumerable: true,
          configurable: false,
          get: () => {
            let returnValue =
              this._props[prop].value !== undefined
                ? this._props[prop].value
                : this._settings.props[prop] !== undefined
                ? this._settings.props[prop]
                : this.constructor.props[prop].default;
            if (
              this._props[prop].responsive &&
              this._props[prop].responsiveValues
            ) {
              if (
                this._props[prop].responsiveValues[
                  __SMediaQuery.getActiveMedia()
                ] !== undefined
              ) {
                returnValue = this._props[prop].responsiveValues[
                  __SMediaQuery.getActiveMedia()
                ];
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
              Object.getOwnPropertyDescriptor(this.prototype, prop).set.call(
                this,
                value
              );
            }
            // trigger a "prop" event
            this._triggerPropsEvents(prop);
          }
        });
        this.promise.on(`props.${prop}.*`, (update) => {
          console.log('updated', prop);
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

        if (!attr) continue;

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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    async _mount() {
      // dispatch mounting event
      this.dispatch('mounting', this);

      // wait until the component match the mountDependencies and mountWhen status
      await this._mountDependencies();

      // check props definition
      this._checkPropsDefinition();

      // update
      this.update();

      // dispatch mounted event
      this._isMounted = true;
      this.dispatch('mounted', this);
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
     * @param       {String}        event         The event you want to unsubscribe for
     * @param       {Function}      callback      The callback function that has to be called
     * @return      {SPromise}                    The SPromise used in this instance
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @param       {String}        name          The event name to dispatch
     * @param       {Mixed}         value         The value to attach to the event
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    dispatch(name, value, settings = {}) {
      const event = new CustomEvent(name, {
        ...settings,
        detail: value
      });
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
    _mountDependencies() {
      return new Promise((resolve, reject) => {
        let promises = [];

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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @param     {String}      attrName      The attribute name
     * @param     {Mixed}       oldVal        The old attribute value
     * @param     {Mixed}       newVal        The new attribute value
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (!this._isMounted) return;
      if (this._settedAttributesStack[attrName]) return;

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
     * @return      {String}                  The generated class name
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    selector(cls = '') {
      const split = cls.split(' ');
      const finalSelectorArray = [];

      split.forEach((part) => {
        const hasDot = part.match(/^\./),
          hasHash = part.match(/^\#/);
        part = part.replace('.', '').replace('#', '');

        let finalClsPart;
        if (part.match(/^(--)/)) finalClsPart = `${this.metas.dashName}${part}`;
        else if (part !== '') finalClsPart = `${this.metas.dashName}__${part}`;
        else finalClsPart = this.metas.dashName;
        if (hasDot) finalClsPart = `.${finalClsPart}`;
        if (hasHash) finalClsPart = `#${finalClsPart}`;

        // add the base class if needed
        if (this.constructor.cssName) {
          let baseCls = __uncamelize(this.constructor.cssName).replace(
            '-web-component',
            ''
          );
          if (!finalClsPart.includes(baseCls)) {
            let finalBaseCls = '';
            if (part.match(/^(--)/)) finalBaseCls = `${baseCls}${part}`;
            else if (part !== '') finalBaseCls = `${baseCls}__${part}`;
            else finalBaseCls = baseCls;
            if (hasDot) {
              finalBaseCls = `.${finalBaseCls}`;
            } else if (hasHash) {
              finalBaseCls = `#${finalBaseCls}`;
            } else {
              finalClsPart += ` ${finalBaseCls}`;
            }
          }
        }

        finalSelectorArray.push(finalClsPart);
      });

      return finalSelectorArray.join(' ');
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
    _triggerPropsEvents(prop) {
      // trigger a "prop" event
      const eventObj = {
        prop,
        action:
          this._props[prop].previousValue !== null
            ? this._props[prop].value !== null
              ? 'set'
              : 'delete'
            : 'set',
        value: this._props[prop].value,
        previousValue: this._props[prop].previousValue,
        media: __SMediaQuery.getActiveMedia()
      };

      this.promise.trigger(`props.${prop}.${eventObj.action}`, eventObj);
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
    _handlePhysicalProps(...props) {
      if (!props || props.length === 0) props = Object.keys(this._props);

      // loop on each required props
      props.forEach((prop) => {
        if (!this._props[prop].physical) return;

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
        } else {
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
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
  };
}

export default SWebComponentGenerator;
