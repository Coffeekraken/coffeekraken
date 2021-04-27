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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpdEh0bWxXZWJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTGl0SHRtbFdlYkNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvRUFBOEM7SUFDOUMsdUNBQXdDO0lBQ3hDLDhFQUF3RDtJQUN4RCxxRUFBK0M7SUFDL0MsOEVBQXdEO0lBQ3hELDJFQUFvRTtJQUNwRSx5RUFBa0U7SUFDbEUsMkRBQXFEO0lBQ3JELG1FQUE0RDtJQUM1RCwrREFBMkQ7SUFDM0QscURBQWtEO0lBQ2xELHVEQUFvRDtJQUNwRCxtRUFBNEQ7SUFDNUQsMkVBQXVFO0lBQ3ZFLHVFQUFnRTtJQUNoRSwrREFBMkQ7SUFDM0QsMkRBQXFEO0lBQ3JELDZFQUF1RDtJQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNHO0lBQ0gsU0FBUyw2QkFBNkIsQ0FBQyxjQUFjLEdBQUcsRUFBRTs7UUFDeEQsWUFBTyxNQUFNLG9CQUFxQixTQUFRLHVCQUFlLENBQUMsY0FBYyxDQUFDO2dCQTZDdkU7Ozs7Ozs7O21CQVFHO2dCQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7b0JBQ3ZCLEtBQUssQ0FBQyxtQkFBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQXBDbkM7Ozs7Ozs7O3VCQVFHO29CQUNILFFBQUcsR0FBRzt3QkFDSixJQUFJLEVBQUosZUFBSTt3QkFDSixNQUFNLEVBQU4saUJBQU07d0JBQ04sWUFBWSxFQUFaLCtCQUFZO3dCQUNaLFdBQVcsRUFBWCw2QkFBVzt3QkFDWCxLQUFLLEVBQUwsZ0JBQUs7d0JBQ0wsUUFBUSxFQUFSLHVCQUFRO3dCQUNSLFNBQVMsRUFBVCxzQkFBUzt3QkFDVCxLQUFLLEVBQUwsYUFBSzt3QkFDTCxNQUFNLEVBQU4sZUFBTTt3QkFDTixRQUFRLEVBQVIsdUJBQVE7d0JBQ1IsZUFBZSxFQUFmLGtDQUFlO3dCQUNmLFVB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