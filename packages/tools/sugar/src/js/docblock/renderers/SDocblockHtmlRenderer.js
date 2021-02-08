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
        define(["require", "exports", "../../object/deepMerge", "./SDocblockRenderer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SDocblockRenderer_1 = __importDefault(require("./SDocblockRenderer"));
    // @ts-ignore
    var SDocblockHtmlRenderer = /** @class */ (function (_super) {
        __extends(SDocblockHtmlRenderer, _super);
        /**
         * @name
         */
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
        function SDocblockHtmlRenderer(docblockInstance, settings) {
            var _this = _super.call(this, docblockInstance, deepMerge_1.default({
                docblockHtmlRenderer: {},
                docblockRenderer: {}
            }, settings || {})) || this;
            // Templates
            _this.registerTemplate('default', '@coffeekraken/sugar/js/docblock/renderers/html/templates/default.hbs');
            _this.registerTemplate('class', '@coffeekraken/sugar/js/docblock/renderers/html/templates/class.hbs');
            _this.registerTemplate('function', '@coffeekraken/sugar/js/docblock/renderers/html/templates/function.hbs');
            // Blocks
            _this.registerBlock('default', '@coffeekraken/sugar/js/docblock/renderers/html/blocks/default.hbs');
            _this.registerBlock('class', '@coffeekraken/sugar/js/docblock/renderers/html/blocks/class.hbs');
            _this.registerBlock('function', '@coffeekraken/sugar/js/docblock/renderers/html/blocks/function.hbs');
            // Partials
            _this.registerPartial('author', '@coffeekraken/sugar/js/docblock/renderers/html/partials/author.hbs');
            _this.registerPartial('heading', '@coffeekraken/sugar/js/docblock/renderers/html/partials/heading.hbs');
            _this.registerPartial('example', '@coffeekraken/sugar/js/docblock/renderers/html/partials/example.hbs');
            _this.registerPartial('params', '@coffeekraken/sugar/js/docblock/renderers/html/partials/params.hbs');
            _this.registerPartial('sharings', '@coffeekraken/sugar/js/docblock/renderers/html/partials/sharings.hbs');
            return _this;
        }
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
        SDocblockHtmlRenderer.supportedTags = [
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
        ];
        return SDocblockHtmlRenderer;
    }(SDocblockRenderer_1.default));
    exports.default = SDocblockHtmlRenderer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixxRUFBaUQ7SUFDakQsMEVBQXNEO0lBbUV0RCxhQUFhO0lBQ2I7UUFDVSx5Q0FBbUI7UUEwQjNCOztXQUVHO1FBRUg7Ozs7Ozs7OztXQVNHO1FBQ0gsK0JBQ0UsZ0JBQTRCLEVBQzVCLFFBQTZDO1lBRi9DLFlBSUUsa0JBQ0UsZ0JBQWdCLEVBQ2hCLG1CQUFXLENBQ1Q7Z0JBQ0Usb0JBQW9CLEVBQUUsRUFBRTtnQkFDeEIsZ0JBQWdCLEVBQUUsRUFBRTthQUNyQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixTQW1ERjtZQWpEQyxZQUFZO1lBQ1osS0FBSSxDQUFDLGdCQUFnQixDQUNuQixTQUFTLEVBQ1Qsc0VBQXNFLENBQ3ZFLENBQUM7WUFDRixLQUFJLENBQUMsZ0JBQWdCLENBQ25CLE9BQU8sRUFDUCxvRUFBb0UsQ0FDckUsQ0FBQztZQUNGLEtBQUksQ0FBQyxnQkFBZ0IsQ0FDbkIsVUFBVSxFQUNWLHVFQUF1RSxDQUN4RSxDQUFDO1lBRUYsU0FBUztZQUNULEtBQUksQ0FBQyxhQUFhLENBQ2hCLFNBQVMsRUFDVCxtRUFBbUUsQ0FDcEUsQ0FBQztZQUNGLEtBQUksQ0FBQyxhQUFhLENBQ2hCLE9BQU8sRUFDUCxpRUFBaUUsQ0FDbEUsQ0FBQztZQUNGLEtBQUksQ0FBQyxhQUFhLENBQ2hCLFVBQVUsRUFDVixvRUFBb0UsQ0FDckUsQ0FBQztZQUVGLFdBQVc7WUFDWCxLQUFJLENBQUMsZUFBZSxDQUNsQixRQUFRLEVBQ1Isb0VBQW9FLENBQ3JFLENBQUM7WUFDRixLQUFJLENBQUMsZUFBZSxDQUNsQixTQUFTLEVBQ1QscUVBQXFFLENBQ3RFLENBQUM7WUFDRixLQUFJLENBQUMsZUFBZSxDQUNsQixTQUFTLEVBQ1QscUVBQXFFLENBQ3RFLENBQUM7WUFDRixLQUFJLENBQUMsZUFBZSxDQUNsQixRQUFRLEVBQ1Isb0VBQW9FLENBQ3JFLENBQUM7WUFDRixLQUFJLENBQUMsZUFBZSxDQUNsQixVQUFVLEVBQ1Ysc0VBQXNFLENBQ3ZFLENBQUM7O1FBQ0osQ0FBQztRQXRHRDs7Ozs7Ozs7O1dBU0c7UUFDSSxtQ0FBYSxHQUFHO1lBQ3JCLE9BQU87WUFDUCxZQUFZO1lBQ1osT0FBTztZQUNQLFNBQVM7WUFDVCxNQUFNO1lBQ04sTUFBTTtZQUNOLFFBQVE7WUFDUixjQUFjO1lBQ2QsUUFBUTtZQUNSLFVBQVU7WUFDVixTQUFTO1NBQ1YsQ0FBQztRQWlGSiw0QkFBQztLQUFBLEFBMUdELENBQ1UsMkJBQW1CLEdBeUc1QjtJQUVELGtCQUFlLHFCQUFxQixDQUFDIn0=