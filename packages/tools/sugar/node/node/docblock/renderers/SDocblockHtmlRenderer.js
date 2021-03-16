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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvZG9jYmxvY2svcmVuZGVyZXJzL1NEb2NibG9ja0h0bWxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7QUFFVix1RUFBaUQ7QUFDakQsNEVBQXNEO0FBa0R0RCxhQUFhO0FBQ2IsTUFBTSxxQkFDSixTQUFRLDJCQUFtQjtJQTBCM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxnQkFBNEIsRUFDNUIsUUFBNkM7UUFFN0MsS0FBSyxDQUNILGdCQUFnQixFQUNoQixtQkFBVyxDQUNUO1lBQ0UsZ0JBQWdCLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxHQUFHLFNBQVMsT0FBTzthQUM3QjtZQUNELG9CQUFvQixFQUFFLEVBQUU7U0FDekIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7O0FBbEREOzs7Ozs7Ozs7R0FTRztBQUNJLG1DQUFhLEdBQUc7SUFDckIsT0FBTztJQUNQLFlBQVk7SUFDWixPQUFPO0lBQ1AsU0FBUztJQUNULE1BQU07SUFDTixNQUFNO0lBQ04sUUFBUTtJQUNSLGNBQWM7SUFDZCxRQUFRO0lBQ1IsVUFBVTtJQUNWLFNBQVM7Q0FDVixDQUFDO0FBK0JKLGtCQUFlLHFCQUFxQixDQUFDIn0=