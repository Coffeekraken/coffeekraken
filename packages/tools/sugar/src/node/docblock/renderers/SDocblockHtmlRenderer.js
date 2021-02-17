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
            docblockRenderer: {
                rootDir: `${__dirname}/html`
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLHVFQUFpRDtBQUNqRCw0RUFBc0Q7QUFrRHRELGFBQWE7QUFDYixNQUFNLHFCQUNKLFNBQVEsMkJBQW1CO0lBMEIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGdCQUE0QixFQUM1QixRQUE2QztRQUU3QyxLQUFLLENBQ0gsZ0JBQWdCLEVBQ2hCLG1CQUFXLENBQ1Q7WUFDRSxnQkFBZ0IsRUFBRTtnQkFDaEIsT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPO2FBQzdCO1lBQ0Qsb0JBQW9CLEVBQUUsRUFBRTtTQUN6QixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYsWUFBWTtRQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLDZCQUE2QixDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsMkJBQTJCLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLENBQ25CLFVBQVUsRUFDVixHQUFHLFNBQVMsOEJBQThCLENBQzNDLENBQUM7UUFFRixTQUFTO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLDBCQUEwQixDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLHdCQUF3QixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxTQUFTLDJCQUEyQixDQUFDLENBQUM7UUFFeEUsV0FBVztRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLEdBQUcsU0FBUyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzlFLENBQUM7O0FBdEVEOzs7Ozs7Ozs7R0FTRztBQUNJLG1DQUFhLEdBQUc7SUFDckIsT0FBTztJQUNQLFlBQVk7SUFDWixPQUFPO0lBQ1AsU0FBUztJQUNULE1BQU07SUFDTixNQUFNO0lBQ04sUUFBUTtJQUNSLGNBQWM7SUFDZCxRQUFRO0lBQ1IsVUFBVTtJQUNWLFNBQVM7Q0FDVixDQUFDO0FBbURKLGtCQUFlLHFCQUFxQixDQUFDIn0=