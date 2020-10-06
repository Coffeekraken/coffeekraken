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
    _promise = null;

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
    _props = {};

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
    static componentName = extendsSettings.name;

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
     * @name					register
     * @type 					Function
     * @static
     *
     * This method allows you to register your component as a webcomponent recognized by the browser
     *
     * @param       {String}      [name=extendsSettings.name]     The component name in camelcase
     * @param       {Class|Object}    [clsOrSettings={}]          Either the component class you want to register, either an object of settings
     * @param       {Object}        [settings={}]                 An object of settings to configure your component
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static register(
      name = extendsSettings.name,
      clsOrSettings = {},
      settings = null
    ) {
      if (!name)
        throw new Error(
          `SWebComponent: You must define a name for your webcomponent by setting either a static "name" property on your class, of by passing a name as first parameter of the static "define" function...`
        );
      let cls = this;
      if (__isClass(clsOrSettings)) cls = clsOrSettings;
      else if (typeof clsOrSettings === 'object' && !settings) {
        settings = clsOrSettings;
      }

      let extend = null;
      for (let key in __htmlTagToHtmlClassMap) {
        if (cls.prototype instanceof __htmlTagToHtmlClassMap[key]) {
          extend = key;
          break;
        }
      }

      const uncamelizedName = __uncamelize(name);

      cls.componentName = name;

      _sWebComponentStack[uncamelizedName] = {
        name,
        dashName: uncamelizedName,
        class: cls,
        extends: extend,
        settings
      };

      if (window.customElements) {
        window.customElements.define(uncamelizedName, cls, {
          extends: extend
        });
      } else if (document.registerElement) {
        document.registerElement(uncamelizedName, {
          prototype: cls.prototype,
          extends: extend
        });
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
          props: this.constructor.props || {}
        },
        this._metas.settings || {},
        settings
      );

      // create the SPromise instance
      this._promise = new __SPromise({
        id: this._settings.id
      });

      // apply the $node class
      const currentClassName = this.getAttribute('class') || '';
      this.setAttribute(
        'class',
        `${currentClassName} ${this.selector(`node`)}`
      );

      this.on('mounted:1', () => {
        // dispatch a ready event
        if (!this.lit) {
          // the Lit HTML class dispatch the ready event after having rendering the template the first time
          this.dispatch('ready', this);
        }
      });

      // launch the mounting process
      setTimeout(this._mount.bind(this));
    }

    /**
     * @name					$
     * @type 					Function
     *
     * This method is a shortcut to the ```querySelector``` function
     *
     * @param         {String}        path      The selector path
     * @param         {Object}      [settings={}]     An object of settings to configure your query
     * @return        {HTMLElement}             The html element getted
     *
     * @setting     {HTMLElement}     [$root=this]     The root element from which to make the query
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    $(path, settings = {}) {
      const $root = settings.$root || this;
      path = this.selector(path);
      let $result = $root.querySelector(path);
      if (!$result && !path.includes(`.${this.metas.dashName}__`)) {
        path = path.replace(/^\./, `.${this.metas.dashName}__`);
        $result = $root.querySelector(path);
      }
      return $result;
    }

    /**
     * @name					$$
     * @type 					Function
     *
     * This method is a shortcut to the ```querySelectorAll``` function
     *
     * @param         {String}        path      The selector path
     * @param         {Object}      [settings={}]     An object of settings to configure your query
     * @return        {HTMLElement}             The html element(s) getted
     *
     * @setting     {HTMLElement}     [$root=this]     The root element from which to make the query
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    $$(path, settings = {}) {
      const $root = settings.$root || this;
      path = this.selector(path);
      let $result = $root.querySelectorAll(path);
      if (!$result && !path.includes(`.${this.metas.dashName}__`)) {
        path = path.replace(/^\./, `.${this.metas.dashName}__`);
        $result = $root.querySelectorAll(path);
      }
      return $result;
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

      // handle props
      for (const key in this._settings.props) {
        let attr = this.getAttribute(__uncamelize(key));
        if (!attr && this.hasAttribute(__uncamelize(key))) {
          attr = true;
        }
        this._props[key] = {
          ...this._settings.props[key],
          value: attr ? __parse(attr) : this._settings.props[key].default,
          previousValue: undefined
        };
      }

      // handle props
      for (const key in this._settings.props) {
        // if need to be watches deeply
        if (this._props[key].watch) {
          this._props[key] = __watch(this._props[key], {
            deep: this._props[key].watch === 'deep'
          });
          this._props[key].on('value.*:+(set|delete|push|pop)', (update) => {
            if (update.path.split('.').length === 1) {
              this.prop(update.path, update.value);
            } else {
              this.handleProp(update.path, this._props[key]);
            }
          });
        }
      }

      // wait until the component match the mountDependencies and mountWhen status
      await this._mountDependencies();

      // check props definition
      this._checkPropsDefinition();

      // handle physical props
      this._handlePhysicalProps();

      // dispatch mounted event
      this._isMounted = true;
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
    handleProp(prop, descriptionObj) {
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
    on(event, callback) {
      return this._promise.on(event, callback);
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
      return this._promise.off(event, callback);
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
    dispatch(name, value) {
      // dispatch event through the SPromise internal instance
      this._promise.trigger(name, value || this);
      // dispatch a general event
      __dispatch(`${this.metas.dashName}.${name}`, {
        target: this,
        value
      });
      __dispatch(`${this.metas.dashName}#${this._settings.id}.${name}`, {
        target: this,
        value
      });
      setTimeout(() => {
        // dispatch an SWebComponent level event
        _sWebComponentPromise.trigger(`${this.metas.dashName}.${name}`, {
          target: this,
          value
        });
        _sWebComponentPromise.trigger(
          `${this.metas.dashName}#${this._settings.id}.${name}`,
          {
            target: this,
            value
          }
        );
      });
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
      this.prop(attrName, newValue);
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
      if (cls.includes(this.metas.dashName)) {
        return cls;
      }

      const hasDot = cls.match(/^\./);
      cls = cls.replace('.', '');

      let finalCls;
      if (cls.match(/^(--)/)) finalCls = `${this.metas.dashName}${cls}`;
      else if (cls !== '') finalCls = `${this.metas.dashName}__${cls}`;
      else finalCls = this.metas.dashName;

      if (hasDot) finalCls = `.${finalCls}`;

      // if (cls.match(/^(--)/)) {
      //   finalCls = `${hasDot ? '.' : ''}${originalName}-bare${cls} ${
      //     hasDot ? '.' : ''
      //   }${finalCls}`;
      // } else if (cls !== '') {
      //   finalCls = `${hasDot ? '.' : ''}${originalName}-bare__${cls} ${
      //     hasDot ? '.' : ''
      //   }${finalCls}`;
      // } else {
      //   finalCls = `${hasDot ? '.' : ''}${originalName}-bare ${
      //     hasDot ? '.' : ''
      //   }${finalCls}`;
      // }

      return finalCls;
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
    prop(prop, value = undefined) {
      // camelize the attribute name
      prop = __camelize(prop);

      if (value === undefined) {
        return this._props[prop] ? this._props[prop].value : undefined;
      }
      this._props[prop].previousValue = this._props[prop]
        ? this._props[prop].value
        : undefined;
      this._props[prop].value = value;

      this.handleProp(prop, this._props[prop]);

      // handle physical props
      this._handlePhysicalProps(prop);

      // trigger a "prop" event
      this._triggerPropsEvents(prop);

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
        previousValue: this._props[prop].previousValue
      };

      this.dispatch(`prop.${prop}.${eventObj.action}`, eventObj);
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
      if (!props || props.length === 0) props = Object.keys(this._props);
      props.forEach((prop) => {
        const propObj = this._props[prop];

        const validationResult = __validateValue(propObj.value, propObj, {
          name: `${this.constructor.name}.props.${prop}`,
          throw: true
        });
        if (validationResult !== true) throw new Error(validationResult);
      });
    }
  };
}

// /**
//  * @name        on
//  * @type        Function
//  * @static
//  *
//  * This method can be used to subscribe to some SWebComponent instances events
//  * like "SFiltrableInput.ready", etc...
//  *
//  * @param       {String}      name        The event name to subscribe to
//  * @param       {Function}    callback    The callback function to call
//  * @return      {Function}                A function that you can use to unsubscribe to this particular event
//  *
//  * @since       2.0.0
//  * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//  */
// SWebComponentGenerator.on = function (name, callback) {
//   _sWebComponentPromise.on(name, callback);
//   return () => {
//     _sWebComponentPromise.off(name, callback);
//   };
// };

export default SWebComponentGenerator;
