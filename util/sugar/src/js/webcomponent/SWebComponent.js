import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __parse from '../string/parse';
import __toString from '../string/toString';

/**
 * @name              SWebComponent
 * @namespace         sugar.js.webcomponent
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
 * - **Full lifecycle management**:
 * 	- componentCreated
 * 	- componentWillMount
 * 	- componentMount
 * 	- componentWillReceiveProp
 * 	- componentWillReceiveProps
 * 	- render
 * 	- componentUnmount
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
export default class SWebComponent extends HTMLElement {
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
   * @param       {String}        name        Your component name
   * @param       {SWebComponent}     cls       Your webcomponent class
   * @param       {Object}        [defaultProps={}]     Some default props that you want for this webcomponent
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static define(name, cls, defaultProps = {}) {
    SWebComponent._componentsStack[name] = {
      class: cls,
      defaultProps
    };

    if (window.customElements) {
      window.customElements.define(name, cls);
    } else if (document.registerElement) {
      document.registerElement(name, {
        prototype: cls.prototype
      });
    } else {
      throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
    }
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
        defaultProps: {},
        physicalProps: [],
        requiredProps: []
      },
      settings
    );
    // create the SPromise instance
    this._promise = new __SPromise(() => {}).start();

    setTimeout(() => {
      // init the default props
      this._handleDefaultProps();

      // check the required props
      this._checkRequiredProps();

      // handle physical props
      this._handlePhysicalProps();

      console.log(this._props);
    });
  }

  /**
   * @name          on
   * @type          Function
   *
   * Method used to subscribe to the "events" dispatched
   * during the lifecycle of the component. Here's the list of events:
   * - attach: Dispatched when the component is attached to the DOM
   * - detach: Dosèatched when the component is detached from the DOM
   */

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
    this._promise.trigger('attach');
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

    // save the old value and the new value
    const newPropObj = {
      value: __parse(newVal),
      previousValue: __parse(oldVal),
      valuesStack: currentPropObj
        ? [...currentPropObj.valuesStack, __parse(newVal)]
        : [__parse(newVal)]
    };

    // save the prop
    this._props[attrName] = newPropObj;

    console.log(this._props);
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

    return value;
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
}
