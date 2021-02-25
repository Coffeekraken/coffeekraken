// @ts-nocheck
import __SWebComponent from './SWebComponent';
import { render, html } from 'lit-html';
import __throttle from '../function/throttle';
import __insertAfter from '../dom/insertAfter';
import __deepMerge from '../object/deepMerge';
import { asyncReplace } from 'lit-html/directives/async-replace.js';
import { asyncAppend } from 'lit-html/directives/async-append.js';
import { cache } from 'lit-html/directives/cache.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { styleMap } from 'lit-html/directives/style-map.js';
import { templateContent } from 'lit-html/directives/template-content';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { until } from 'lit-html/directives/until.js';
import __canHaveChildren from '../dom/canHaveChildren';
/**
 * @name              SLitHtmlWebComponent
 * @namespace           sugar.js.webcomponent
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
function SLitHtmlWebComponentGenerator(extendSettings = {}) {
    var _a;
    return _a = class SLitHtmlWebComponent extends __SWebComponent(extendSettings) {
            /**
             * @name        constructor
             * @type        Function
             * @constructor
             *
             * Constructor
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            constructor(settings = {}) {
                super(__deepMerge({}, settings));
                /**
                 * @name        lit
                 * @type        Object
                 *
                 * Store all the litHtml functions that you may need
                 *
                 * @see       https://lit-html.polymer-project.org/guide/template-reference
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                this.lit = {
                    html,
                    render,
                    asyncReplace,
                    asyncAppend,
                    cache,
                    classMap,
                    ifDefined,
                    guard,
                    repeat,
                    styleMap,
                    templateContent,
                    unsafeHTML,
                    unsafeSVG,
                    until
                };
                this.render = __throttle(() => {
                    this._render();
                }, 50);
                // wait until mounted to render the component first time
                this.on('mounted', (e) => {
                    // insert the container in the document
                    if (__canHaveChildren(this)) {
                        this.$container = this;
                        this.addClass('', this);
                    }
                    else {
                        this.$container = document.createElement('div');
                        this.addClass('', this.$container);
                        __insertAfter(this.$container, this);
                    }
                    this.update();
                    // dispatch a ready event
                    this.dispatch('ready', this, {
                        bubbles: true
                    });
                    // listen for media query change to update the view
                    this._mediaQuery.on('match', (media) => {
                        this.render();
                    });
                });
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
                return this.$container || this;
            }
            /**
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
            update() {
                // render
                this._render();
                // update parent
                super.update();
            }
            /**
             * @name          render
             * @type          Function
             *
             * This method is called every time an update has been made in the state object
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _render() {
                if (!this.$container)
                    return;
                const tplFn = this.constructor.template.bind(this);
                const tpl = tplFn(this.props, this._settings, this.lit);
                render(tpl, this.$container);
            }
        },
        /**
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
        _a.template = (props, settings, lit) => lit.html `
      <p>
        You need to specify a static template property for your component...
      </p>
    `,
        _a;
}
export default SLitHtmlWebComponentGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpdEh0bWxXZWJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTGl0SHRtbFdlYkNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEMsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckQsT0FBTyxpQkFBaUIsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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