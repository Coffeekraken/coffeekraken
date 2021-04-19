"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLDRFQUFzRDtBQWtEdEQsYUFBYTtBQUNiLE1BQU0scUJBQ0osU0FBUSwyQkFBbUI7SUEwQjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsZ0JBQTRCLEVBQzVCLFFBQTZDO1FBRTdDLEtBQUssQ0FDSCxnQkFBZ0IsRUFDaEIsbUJBQVcsQ0FDVDtZQUNFLGdCQUFnQixFQUFFO2dCQUNoQixPQUFPLEVBQUUsR0FBRyxTQUFTLE9BQU87YUFDN0I7WUFDRCxvQkFBb0IsRUFBRSxFQUFFO1NBQ3pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDOztBQWxERDs7Ozs7Ozs7O0dBU0c7QUFDSSxtQ0FBYSxHQUFHO0lBQ3JCLE9BQU87SUFDUCxZQUFZO0lBQ1osT0FBTztJQUNQLFNBQVM7SUFDVCxNQUFNO0lBQ04sTUFBTTtJQUNOLFFBQVE7SUFDUixjQUFjO0lBQ2QsUUFBUTtJQUNSLFVBQVU7SUFDVixTQUFTO0NBQ1YsQ0FBQztBQStCSixrQkFBZSxxQkFBcUIsQ0FBQyJ9