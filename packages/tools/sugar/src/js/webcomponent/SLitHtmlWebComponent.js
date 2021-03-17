// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
    var SWebComponent_1 = __importDefault(require("./SWebComponent"));
    var lit_html_1 = require("lit-html");
    var throttle_1 = __importDefault(require("../../shared/function/throttle"));
    var insertAfter_1 = __importDefault(require("../dom/insertAfter"));
    var deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    var async_replace_js_1 = require("lit-html/directives/async-replace.js");
    var async_append_js_1 = require("lit-html/directives/async-append.js");
    var cache_js_1 = require("lit-html/directives/cache.js");
    var class_map_js_1 = require("lit-html/directives/class-map.js");
    var if_defined_1 = require("lit-html/directives/if-defined");
    var guard_1 = require("lit-html/directives/guard");
    var repeat_1 = require("lit-html/directives/repeat");
    var style_map_js_1 = require("lit-html/directives/style-map.js");
    var template_content_1 = require("lit-html/directives/template-content");
    var unsafe_html_js_1 = require("lit-html/directives/unsafe-html.js");
    var unsafe_svg_1 = require("lit-html/directives/unsafe-svg");
    var until_js_1 = require("lit-html/directives/until.js");
    var canHaveChildren_1 = __importDefault(require("../dom/canHaveChildren"));
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
    function SLitHtmlWebComponentGenerator(extendSettings) {
        var _a;
        if (extendSettings === void 0) { extendSettings = {}; }
        return _a = /** @class */ (function (_super) {
                __extends(SLitHtmlWebComponent, _super);
                /**
                 * @name        constructor
                 * @type        Function
                 * @constructor
                 *
                 * Constructor
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                function SLitHtmlWebComponent(settings) {
                    if (settings === void 0) { settings = {}; }
                    var _this = _super.call(this, deepMerge_1.default({}, settings)) || this;
                    /**
                     * @name        lit
                     * @type        Object
                     *
                     * Store all the litHtml functions that you may need
                     *
                     * @see       https://lit-html.polymer-project.org/guide/template-reference
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    _this.lit = {
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
                    _this.render = throttle_1.default(function () {
                        _this._render();
                    }, 50);
                    // wait until mounted to render the component first time
                    _this.on('mounted', function (e) {
                        // insert the container in the document
                        if (canHaveChildren_1.default(_this)) {
                            _this.$container = _this;
                            _this.addClass('', _this);
                        }
                        else {
                            _this.$container = document.createElement('div');
                            _this.addClass('', _this.$container);
                            insertAfter_1.default(_this.$container, _this);
                        }
                        _this.update();
                        // dispatch a ready event
                        _this.dispatch('ready', _this, {
                            bubbles: true
                        });
                        // listen for media query change to update the view
                        _this._mediaQuery.on('match', function (media) {
                            _this.render();
                        });
                    });
                    return _this;
                }
                Object.defineProperty(SLitHtmlWebComponent.prototype, "$root", {
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
                    get: function () {
                        return this.$container || this;
                    },
                    enumerable: false,
                    configurable: true
                });
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
                SLitHtmlWebComponent.prototype.update = function () {
                    // render
                    this._render();
                    // update parent
                    _super.prototype.update.call(this);
                };
                /**
                 * @name          render
                 * @type          Function
                 *
                 * This method is called every time an update has been made in the state object
                 *
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                SLitHtmlWebComponent.prototype._render = function () {
                    if (!this.$container)
                        return;
                    var tplFn = this.constructor.template.bind(this);
                    var tpl = tplFn(this.props, this._settings, this.lit);
                    lit_html_1.render(tpl, this.$container);
                };
                return SLitHtmlWebComponent;
            }(SWebComponent_1.default(extendSettings))),
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
            _a.template = function (props, settings, lit) { return lit.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <p>\n        You need to specify a static template property for your component...\n      </p>\n    "], ["\n      <p>\n        You need to specify a static template property for your component...\n      </p>\n    "]))); },
            _a;
    }
    exports.default = SLitHtmlWebComponentGenerator;
    var templateObject_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpdEh0bWxXZWJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTGl0SHRtbFdlYkNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsa0VBQThDO0lBQzlDLHFDQUF3QztJQUN4Qyw0RUFBd0Q7SUFDeEQsbUVBQStDO0lBQy9DLDRFQUF3RDtJQUN4RCx5RUFBb0U7SUFDcEUsdUVBQWtFO0lBQ2xFLHlEQUFxRDtJQUNyRCxpRUFBNEQ7SUFDNUQsNkRBQTJEO0lBQzNELG1EQUFrRDtJQUNsRCxxREFBb0Q7SUFDcEQsaUVBQTREO0lBQzVELHlFQUF1RTtJQUN2RSxxRUFBZ0U7SUFDaEUsNkRBQTJEO0lBQzNELHlEQUFxRDtJQUNyRCwyRUFBdUQ7SUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUNILFNBQVMsNkJBQTZCLENBQUMsY0FBbUI7O1FBQW5CLCtCQUFBLEVBQUEsbUJBQW1CO1FBQ3hEO2dCQUEwQyx3Q0FBK0I7Z0JBNkN2RTs7Ozs7Ozs7bUJBUUc7Z0JBQ0gsOEJBQVksUUFBYTtvQkFBYix5QkFBQSxFQUFBLGFBQWE7b0JBQXpCLFlBQ0Usa0JBQU0sbUJBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FzQmpDO29CQTFERDs7Ozs7Ozs7dUJBUUc7b0JBQ0gsU0FBRyxHQUFHO3dCQUNKLElBQUksaUJBQUE7d0JBQ0osTUFBTSxtQkFBQTt3QkFDTixZQUFZLGlDQUFBO3dCQUNaLFdBQVcsK0JBQUE7d0JBQ1gsS0FBSyxrQkFBQTt3QkFDTCxRQUFRLHlCQUFBO3dCQUNSLFNBQVMsd0JBQUE7d0JBQ1QsS0FBSyxlQUFBO3dCQUNMLE1BQU0saUJBQUE7d0JBQ04sUUFBUSx5QkFBQTt3QkFDUixlQUFlLG9DQUFBO3dCQUNmLFVBQVUsNkJBQUE7d0JBQ1YsU0FBUyx3QkFBQTt3QkFDVCxL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