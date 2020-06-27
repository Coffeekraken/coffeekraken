import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __parse from '../string/parse';
import __toString from '../string/toString';
import __when from '../dom/when';
import __camelize from '../string/camelize';
import __paramCase from '../string/paramCase';
import __uncamelize from '../string/uncamelize';

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
export default function SWebComponent(extend = HTMLElement) {
  return class SWebComponent extends extend {
    /**
     * @name          _componentsStack
     * @type          Object
     * @private
     * @static
     *
     * Store all the registered components using the "define" static SWebComponent method
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static _componentsStack = {};

    /**
     * @name          define
     * @type          Function
     * @static
     *
     * This method can be used to define your component the same way
     * as the "customElements.define" function but with some additional
     * features like passing default props, etc...
     *
     * @param       {SWebComponent}     cls       Your webcomponent class
     * @param       {Object}        [defaultProps={}]     Some default props that you want for this webcomponent
     * @param       {String}        [name=ull        Your component name
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static define(name, cls, settings = {}) {
      // static define(cls, defaultProps = {}, name = null) {
      name = name;
      let extend = settings.extends;

      if (!name)
        throw new Error(
          `SWebComponent: You must define a name for your webcomponent by setting either a static "name" property on your class, of by passing a name as first parameter of the static "define" function...`
        );

      const uncamelizedName = __uncamelize(name);

      SWebComponent._componentsStack[uncamelizedName] = {
        name,
        class: cls,
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

      console.log(SWebComponent._componentsStack);
    }

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
      // save the settings
      this._settings = __deepMerge(
        {
          name: null,
          defaultProps: this.constructor.defaultProps || {},
          requiredProps: this.constructor.requiredProps || [],
          physicalProps: this.constructor.physicalProps || []
        },
        settings
      );
      // create the SPromise instance
      this._promise = new __SPromise(() => {}).start();

      console.log(this._settings);

      // launch the mounting process
      setTimeout(this._mount.bind(this));
    }

    /**
     * @name          _mount
     * @type          Function
     * @private
     * @async
     *
     * This method handle the mounting of the component
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    async _mount() {
      this._promise.trigger('mounting');

      // wait until the component match the mountDependencies and mountWhen status
      await this._mountDependencies();

      // init the default props
      this._handleDefaultProps();

      // check the required props
      this._checkRequiredProps();

      // handle physical props
      this._handlePhysicalProps();

      this._promise.trigger('mounted');
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
     */
    on(event, callback) {
      return this._promise.on(event, callback);
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
        if (this._settings._mountDependencies) {
          const depsFns = [...this._settings._mountDependencies];
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
      console.log('CONNEE');
      setTimeout(() => {
        this._promise.trigger('attach');
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
      this._promise.trigger('detach');
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
      if (this._settedAttributesStack[attrName]) return;

      // try to get the property
      const currentPropObj = this._props[attrName];

      const previousValue = __parse(oldVal);
      const newValue = __parse(newVal);

      // save the old value and the new value
      const newPropObj = {
        value: newValue,
        previousValue,
        valuesStack: currentPropObj
          ? [...currentPropObj.valuesStack, newValue]
          : [newValue]
      };

      // save the prop
      this._props[__camelize(attrName)] = newPropObj;

      // trigger a "prop" event
      this._triggerPropsEvents(__camelize(attrName));
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
      if (value === undefined) {
        return this._props[prop] ? this._props[prop].value : undefined;
      }

      if (!this._props[prop]) {
        this._props[prop] = {
          value,
          previousValue: null,
          valuesStack: [value]
        };
      } else {
        this._props[prop] = {
          value,
          previousValue: this._props[prop].value,
          valuesStack: [...this._props[prop].valuesStack, value]
        };
      }

      // handle physical props
      this._handlePhysicalProps();

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
              ? 'update'
              : 'remove'
            : 'add',
        value: this._props[prop].value,
        previousValue: this._props[prop].previousValue
      };
      this._promise.trigger('prop', eventObj);
      this._promise.trigger(`prop.${prop}`, eventObj);
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
    _handlePhysicalProps() {
      // loop on each required props
      console.log('PH', this._settings);
      this._settings.physicalProps.forEach((prop) => {
        const value =
          this._props[prop] && this._props[prop].value !== undefined
            ? this._props[prop].value
            : undefined;
        if (!this.getAttribute(prop)) {
          // set the attribute with the value
          this._settedAttributesStack[prop] = true;
          this.setAttribute(prop, __toString(value));
          delete this._settedAttributesStack[prop];
        } else {
          const currentAttributeValue = this.getAttribute(prop);
          const currentValueStringified = __toString(value);
          if (currentAttributeValue !== currentValueStringified) {
            console.log('UPDATED', prop);
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, currentValueStringified);
            delete this._settedAttributesStack[prop];
          }
        }
      });
    }

    /**
     * @name        _handleDefaultProps
     * @type        Function
     * @private
     *
     * This method check for props that are not been setted through attributes
     * and init them using the default props passed in the settings
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _handleDefaultProps() {
      // loop on each required props
      Object.keys(this._settings.defaultProps).forEach((prop) => {
        if (
          this._props[prop] === undefined ||
          this._props[prop].value === undefined
        ) {
          if (this._props[prop] === undefined)
            this._props[prop] = {
              value: this._settings.defaultProps[prop],
              previousValue: null,
              valuesStack: [this._settings.defaultProps[prop]]
            };
        }
      });
    }

    /**
     * @name        _checkRequiredProps
     * @type        Function
     * @private
     *
     * This method simply check if the required props specified in the settings
     * are passed
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _checkRequiredProps() {
      // loop on each required props
      this._settings.requiredProps.forEach((prop) => {
        // check if the prop is missing
        if (
          this._props[prop] === undefined ||
          this._props[prop].value === undefined
        ) {
          throw new Error(
            `The property named "${prop}" on the "${this.constructor.name}" webcomponent is required but missing...`
          );
        }
      });
    }
  };
}
