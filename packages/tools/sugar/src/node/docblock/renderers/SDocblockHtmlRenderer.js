"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDocblockRenderer_1 = __importDefault(require("./SDocblockRenderer"));
// @ts-ignore
class SDocblockHtmlRenderer extends SDocblockRenderer_1.default {
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
    constructor(docblockInstance, settings) {
        super(docblockInstance, deepMerge_1.default({
            docblockHtmlRenderer: {}
        }, settings || {}));
        // Templates
        this.registerTemplate('default', `${__dirname}/html/templates/default.hbs`);
        this.registerTemplate('class', `${__dirname}/html/templates/class.hbs`);
        this.registerTemplate('function', `${__dirname}/html/templates/function.hbs`);
        // Blocks
        this.registerBlock('default', `${__dirname}/html/blocks/default.hbs`);
        this.registerBlock('class', `${__dirname}/html/blocks/class.hbs`);
        this.registerBlock('function', `${__dirname}/html/blocks/function.hbs`);
        // Partials
        this.registerPartial('author', `${__dirname}/html/partials/author.hbs`);
        this.registerPartial('heading', `${__dirname}/html/partials/heading.hbs`);
        this.registerPartial('example', `${__dirname}/html/partials/example.hbs`);
        this.registerPartial('params', `${__dirname}/html/partials/params.hbs`);
        this.registerPartial('sharings', `${__dirname}/html/partials/sharings.hbs`);
    }
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
exports.default = SDocblockHtmlRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLHVFQUFpRDtBQUNqRCw0RUFBc0Q7QUFtRHRELGFBQWE7QUFDYixNQUFNLHFCQUNKLFNBQVEsMkJBQW1CO0lBMEIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGdCQUE0QixFQUM1QixRQUE2QztRQUU3QyxLQUFLLENBQ0gsZ0JBQWdCLEVBQ2hCLG1CQUFXLENBQ1Q7WUFDRSxvQkFBb0IsRUFBRSxFQUFFO1NBQ3pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFFRixZQUFZO1FBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsNkJBQTZCLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsQ0FDbkIsVUFBVSxFQUNWLEdBQUcsU0FBUyw4QkFBOEIsQ0FDM0MsQ0FBQztRQUVGLFNBQVM7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsMEJBQTBCLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsd0JBQXdCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxHQUFHLFNBQVMsMkJBQTJCLENBQUMsQ0FBQztRQUV4RSxXQUFXO1FBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLDJCQUEyQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLDRCQUE0QixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLDRCQUE0QixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLDJCQUEyQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxTQUFTLDZCQUE2QixDQUFDLENBQUM7SUFDOUUsQ0FBQzs7QUFuRUQ7Ozs7Ozs7OztHQVNHO0FBQ0ksbUNBQWEsR0FBRztJQUNyQixPQUFPO0lBQ1AsWUFBWTtJQUNaLE9BQU87SUFDUCxTQUFTO0lBQ1QsTUFBTTtJQUNOLE1BQU07SUFDTixRQUFRO0lBQ1IsY0FBYztJQUNkLFFBQVE7SUFDUixVQUFVO0lBQ1YsU0FBUztDQUNWLENBQUM7QUFnREosa0JBQWUscUJBQXFCLENBQUMifQ==