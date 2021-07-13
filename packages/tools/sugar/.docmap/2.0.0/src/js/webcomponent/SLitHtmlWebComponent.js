/**
*
* @name              SLitHtmlWebComponent
* @namespace            js.webcomponent
* @type              Class
* @extends           SWebComponent
* @status              wip
*
* // TODO: example
*
* Base class that you can extends to create some SWebComponent with Lit Html rendering capabilities
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
* import SLitHtmlWebComponent from '@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent';
* class MyCoolComponent extends SLitHtmlWebComponent {
*
*    constructor(settings = {}) {
*      super(settings);
*    }
*
* }
*
* @since       2.0.0
* @see       https://lit-html.polymer-project.org/
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        constructor
* @type        Function
* @constructor
*
* Constructor
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        lit
* @type        Object
*
* Store all the litHtml functions that you may need
*
* @see       https://lit-html.polymer-project.org/guide/template-reference
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

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
* @name          update
* @type          Function
*
* This method allows you to update your componment manually if needed.
* - call the ```render``` method of this class
* - call the ```update``` method of the SWebComponent parent class
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name          render
* @type          Function
*
* This method is called every time an update has been made in the state object
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
* @name        template
* @type        Function
* @static
*
* This static variable store a function that has as parameter the state object
* of your component and the lit-html ```html``` function that you can use in your template.
* This function MUST return a template string representing your component HTML depending on the state
* object at this point.
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/