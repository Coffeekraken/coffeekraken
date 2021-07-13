/**
*
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
/**
*
* @name          constructor
* @type          Function
* @constructor
*
* Constructor
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          promise
* @type          SPromise
* @private
*
* Store the SPromise instance used to "dispatch" some events
* that you can subscribe using the "on" exposed method
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          _props
* @type          Object
* @private
*
* Store all the properties (attributes)
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          _settings
* @type          Object
* @private
*
* Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
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
/**
*
* @name        _contexts
* @type        Array
* @private
*
* Store all the contexts this component will be aware of
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
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
/**
*
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
/**
*
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
/**
*
* @name          settings
* @type          Function
* @get
*
* Get the settings object
*
* @since         2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          $root
* @type          Function
* @get
*
* Access the root element of the webcomponent from which the requests like ```$``` and ```$$``` will be executed
*
* @since         2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        update
* @type        Function
*
* This method allows you to update your component manually if needed
*
* @since       2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
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
/**
*
* @name          connectedCallback
* @type          Function
*
* Called when the component is attached to the dom
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          disconnectedCallback
* @type          Function
*
* Called when the component is detached from the dom
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
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
/**
*
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
/**
*
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
/**
*
* @name        _handlePhysicalProps
* @type        Function
* @private
*
* This method make sure that all the defined physical props are
* setted as attribute on the DOM element
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
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
/**
*
* @name					componentName
* @type 					String
* @static
*
* Store the name of the component in camelcase
*
* @since 					2.0.0
* @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/