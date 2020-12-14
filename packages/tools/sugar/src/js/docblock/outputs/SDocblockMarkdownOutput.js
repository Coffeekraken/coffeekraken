// @ts-nocheck
// @shared
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
        define(["require", "exports", "../../object/deepMerge", "../SDocblockOutput", "./markdown/templates/default", "./markdown/templates/class", "./markdown/templates/function", "./markdown/blocks/default", "./markdown/blocks/class", "./markdown/blocks/function"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SDocblockOutput_1 = __importDefault(require("../SDocblockOutput"));
    var default_1 = __importDefault(require("./markdown/templates/default"));
    var class_1 = __importDefault(require("./markdown/templates/class"));
    var function_1 = __importDefault(require("./markdown/templates/function"));
    var default_2 = __importDefault(require("./markdown/blocks/default"));
    var class_2 = __importDefault(require("./markdown/blocks/class"));
    var function_2 = __importDefault(require("./markdown/blocks/function"));
    return (_a = /** @class */ (function (_super) {
            __extends(SDocblockMarkdownOutput, _super);
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
            function SDocblockMarkdownOutput(docblockInstance, settings) {
                if (settings === void 0) { settings = {}; }
                return _super.call(this, docblockInstance, deepMerge_1.default({
                    templates: {
                        default: default_1.default,
                        class: class_1.default,
                        function: function_1.default
                    },
                    blocks: {
                        default: default_2.default,
                        class: class_2.default,
                        function: function_2.default
                    }
                }, settings)) || this;
            }
            return SDocblockMarkdownOutput;
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
//# sourceMappingURL=module.js.map