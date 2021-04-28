// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SWebComponent", "lit-html", "../../shared/function/throttle", "../dom/insertAfter", "../../shared/object/deepMerge", "lit-html/directives/async-replace.js", "lit-html/directives/async-append.js", "lit-html/directives/cache.js", "lit-html/directives/class-map.js", "lit-html/directives/if-defined", "lit-html/directives/guard", "lit-html/directives/repeat", "lit-html/directives/style-map.js", "lit-html/directives/template-content", "lit-html/directives/unsafe-html.js", "lit-html/directives/unsafe-svg", "lit-html/directives/until.js", "../dom/canHaveChildren"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SWebComponent_1 = __importDefault(require("./SWebComponent"));
    const lit_html_1 = require("lit-html");
    const throttle_1 = __importDefault(require("../../shared/function/throttle"));
    const insertAfter_1 = __importDefault(require("../dom/insertAfter"));
    const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    const async_replace_js_1 = require("lit-html/directives/async-replace.js");
    const async_append_js_1 = require("lit-html/directives/async-append.js");
    const cache_js_1 = require("lit-html/directives/cache.js");
    const class_map_js_1 = require("lit-html/directives/class-map.js");
    const if_defined_1 = require("lit-html/directives/if-defined");
    const guard_1 = require("lit-html/directives/guard");
    const repeat_1 = require("lit-html/directives/repeat");
    const style_map_js_1 = require("lit-html/directives/style-map.js");
    const template_content_1 = require("lit-html/directives/template-content");
    const unsafe_html_js_1 = require("lit-html/directives/unsafe-html.js");
    const unsafe_svg_1 = require("lit-html/directives/unsafe-svg");
    const until_js_1 = require("lit-html/directives/until.js");
    const canHaveChildren_1 = __importDefault(require("../dom/canHaveChildren"));
    /**
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
    function SLitHtmlWebComponentGenerator(extendSettings = {}) {
        var _a;
        return _a = class SLitHtmlWebComponent extends SWebComponent_1.default(extendSettings) {
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
                    super(deepMerge_1.default({}, settings));
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
                        html: lit_html_1.html,
                        render: lit_html_1.render,
                        asyncReplace: async_replace_js_1.asyncReplace,
                        asyncAppend: async_append_js_1.asyncAppend,
                        cache: cache_js_1.cache,
                        classMap: class_map_js_1.classMap,
                        ifDefined: if_defined_1.ifDefined,
                        guard: guard_1.guard,
                        repeat: repeat_1.repeat,
                        styleMap: style_map_js_1.styleMap,
                        templateContent: template_content_1.templateContent,
                        unsafeHTML: unsafe_html_js_1.unsafeHTML,
                        unsafeSVG: unsafe_svg_1.unsafeSVG,
                        until: until_js_1.until
                    };
                    this.render = throttle_1.default(() => {
                        this._render();
                    }, 50);
                    // wait until mounted to render the component first time
                    this.on('mounted', (e) => {
                        // insert the container in the document
                        if (canHaveChildren_1.default(this)) {
                            this.$container = this;
                            this.addClass('', this);
                        }
                        else {
                            this.$container = document.createElement('div');
                            this.addClass('', this.$container);
                            insertAfter_1.default(this.$container, this);
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
                    lit_html_1.render(tpl, this.$container);
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
    exports.default = SLitHtmlWebComponentGenerator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpdEh0bWxXZWJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvd2ViY29tcG9uZW50L1NMaXRIdG1sV2ViQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUM5Qyx1Q0FBd0M7SUFDeEMsOEVBQXdEO0lBQ3hELHFFQUErQztJQUMvQyw4RUFBd0Q7SUFDeEQsMkVBQW9FO0lBQ3BFLHlFQUFrRTtJQUNsRSwyREFBcUQ7SUFDckQsbUVBQTREO0lBQzVELCtEQUEyRDtJQUMzRCxxREFBa0Q7SUFDbEQsdURBQW9EO0lBQ3BELG1FQUE0RDtJQUM1RCwyRUFBdUU7SUFDdkUsdUVBQWdFO0lBQ2hFLCtEQUEyRDtJQUMzRCwyREFBcUQ7SUFDckQsNkVBQXVEO0lBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFDSCxTQUFTLDZCQUE2QixDQUFDLGNBQWMsR0FBRyxFQUFFOztRQUN4RCxZQUFPLE1BQU0sb0JBQXFCLFNBQVEsdUJBQWUsQ0FBQyxjQUFjLENBQUM7Z0JBNkN2RTs7Ozs7Ozs7bUJBUUc7Z0JBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtvQkFDdkIsS0FBSyxDQUFDLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBcENuQzs7Ozs7Ozs7dUJBUUc7b0JBQ0gsUUFBRyxHQUFHO3dCQUNKLElBQUksRUFBSixlQUFJO3dCQUNKLE1BQU0sRUFBTixpQkFBTTt3QkFDTixZQUFZLEVBQVosK0JBQVk7d0JBQ1osV0FBVyxFQUFYLDZCQUFXO3dCQUNYLEtBQUssRUFBTCxnQkFBSzt3QkFDTCxRQUFRLEVBQVIsdUJBQVE7d0JBQ1IsU0FBUyxFQUFULHNCQUFTO3dCQUNULEtBQUssRUFBTCxhQUFLO3dCQUNMLE1BQU0sRUFBTixlQUFNO3dCQUNOLFFBQVEsRUFBUix1QkFBUTt3QkFDUixlQUFlLEVBQWYsa0NBQWU7d0JBQ2YsVUFBVSxFQUFWLDJCQUFVO3dCQUNWLFNBQVMsRUFBVCxzQkFBUzt3QkFDVCxLQUFLLEVBQUwsZ0JBQUs7cUJBQ04sQ0FBQztvQkFrRkYsV0FBTSxHQUFHLGtCQUFVLENBQUMsR0FBRyxFQUFFO3dCQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2pCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkF2RUwsd0RBQXdEO29CQUN4RCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUN2Qix1Q0FBdUM7d0JBQ3ZDLElBQUkseUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDekI7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ25DLHFCQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDdEM7d0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNkLHlCQUF5Qjt3QkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFOzRCQUMzQixPQUFPLEVBQUUsSUFBSTt5QkFDZCxDQUFDLENBQUM7d0JBQ0gsbURBQW1EO3dCQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNoQixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVEOzs7Ozs7Ozs7bUJBU0c7Z0JBQ0gsSUFBSSxLQUFLO29CQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUM7Z0JBQ2pDLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTTtvQkFDSixTQUFTO29CQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDZixnQkFBZ0I7b0JBQ2hCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDakIsQ0FBQztnQkFFRDs7Ozs7OzttQkFPRztnQkFDSCxPQUFPO29CQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTt3QkFBRSxPQUFPO29CQUM3QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25ELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4RCxpQkFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9CLENBQUM7YUFJRjtZQS9IQzs7Ozs7Ozs7Ozs7ZUFXRztZQUNJLFdBQVEsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBOzs7O0tBSWxEO2VBK0dGO0lBQ0osQ0FBQztJQUVELGtCQUFlLDZCQUE2QixDQUFDIn0=