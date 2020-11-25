// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
        define(["require", "exports", "./SWebComponent", "lit-html", "../function/throttle", "../dom/insertAfter", "../object/deepMerge", "lit-html/directives/async-replace.js", "lit-html/directives/async-append.js", "lit-html/directives/cache.js", "lit-html/directives/class-map.js", "lit-html/directives/if-defined", "lit-html/directives/guard", "lit-html/directives/repeat", "lit-html/directives/style-map.js", "lit-html/directives/template-content", "lit-html/directives/unsafe-html.js", "lit-html/directives/unsafe-svg", "lit-html/directives/until.js", "../dom/canHaveChildren"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SWebComponent_1 = __importDefault(require("./SWebComponent"));
    var lit_html_1 = require("lit-html");
    var throttle_1 = __importDefault(require("../function/throttle"));
    var insertAfter_1 = __importDefault(require("../dom/insertAfter"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
     * @wip
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
    var templateObject_1;
    return SLitHtmlWebComponentGenerator;
});
