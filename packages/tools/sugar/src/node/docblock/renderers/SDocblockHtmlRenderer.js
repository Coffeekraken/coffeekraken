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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLHVFQUFpRDtBQUNqRCw0RUFBc0Q7QUFrRHRELGFBQWE7QUFDYixNQUFNLHFCQUNKLFNBQVEsMkJBQW1CO0lBMEIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGdCQUE0QixFQUM1QixRQUE2QztRQUU3QyxLQUFLLENBQ0gsZ0JBQWdCLEVBQ2hCLG1CQUFXLENBQ1Q7WUFDRSxnQkFBZ0IsRUFBRTtnQkFDaEIsT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPO2FBQzdCO1lBQ0Qsb0JBQW9CLEVBQUUsRUFBRTtTQUN6QixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7QUFsREQ7Ozs7Ozs7OztHQVNHO0FBQ0ksbUNBQWEsR0FBRztJQUNyQixPQUFPO0lBQ1AsWUFBWTtJQUNaLE9BQU87SUFDUCxTQUFTO0lBQ1QsTUFBTTtJQUNOLE1BQU07SUFDTixRQUFRO0lBQ1IsY0FBYztJQUNkLFFBQVE7SUFDUixVQUFVO0lBQ1YsU0FBUztDQUNWLENBQUM7QUErQkosa0JBQWUscUJBQXFCLENBQUMifQ==