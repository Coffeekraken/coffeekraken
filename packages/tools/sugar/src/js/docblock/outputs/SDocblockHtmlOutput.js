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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../object/deepMerge", "../SDocblockOutput"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var deepMerge_2 = __importDefault(require("../../object/deepMerge"));
    var SDocblockOutput_1 = __importDefault(require("../SDocblockOutput"));
    return (_a = /** @class */ (function (_super) {
            __extends(SDocblockHtmlOutput, _super);
            /**
             * @name        constructor
             * @type        Function
             * @constructor
             *
             * Constructor
             *
             * @since     2.0.0
             * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            function SDocblockHtmlOutput(docblockInstance, settings) {
                if (settings === void 0) { settings = {}; }
                return _super.call(this, docblockInstance, deepMerge_2.default({
                    templates: {
                        default: '@coffeekraken/sugar/js/docblock/outputs/html/templates/default.js',
                        class: '@coffeekraken/sugar/js/docblock/outputs/html/templates/class.js',
                        function: '@coffeekraken/sugar/js/docblock/outputs/html/templates/function.js'
                    },
                    blocks: {
                        default: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/default.js',
                        class: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/class.js',
                        function: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/function.js'
                    },
                    partials: {
                        author: '@coffeekraken/sugar/js/docblock/outputs/html/partials/author.js',
                        heading: '@coffeekraken/sugar/js/docblock/outputs/html/partials/heading.js',
                        example: '@coffeekraken/sugar/js/docblock/outputs/html/partials/example.js',
                        params: '@coffeekraken/sugar/js/docblock/outputs/html/partials/params.js',
                        sharings: '@coffeekraken/sugar/js/docblock/outputs/html/partials/sharings.js'
                    }
                }, settings)) || this;
            }
            return SDocblockHtmlOutput;
        }(SDocblockOutput_1.default)),
        /**
         * @name        supportedTags
         * @type        Array<String>
         * @static
         *
         * Store the list of supported docblock tags
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _a.supportedTags = [
            '@type',
            '@namespace',
            '@name',
            '@static',
            '@get',
            '@set',
            '@since',
            '@description',
            '@param',
            '@example',
            '@author'
        ],
        _a);
});
