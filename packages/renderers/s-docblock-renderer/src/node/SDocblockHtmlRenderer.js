"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SDocblockRenderer_1 = __importDefault(require("./SDocblockRenderer"));
const classname_1 = __importDefault(require("./html/helpers/classname"));
const gravatar_1 = __importDefault(require("./html/helpers/gravatar"));
const section_1 = __importDefault(require("./html/helpers/section"));
const heading_1 = __importDefault(require("./html/partials/heading"));
const sharings_1 = __importDefault(require("./html/partials/sharings"));
const author_1 = __importDefault(require("./html/tags/author"));
const description_1 = __importDefault(require("./html/tags/description"));
const example_1 = __importDefault(require("./html/tags/example"));
const name_1 = __importDefault(require("./html/tags/name"));
const namespace_1 = __importDefault(require("./html/tags/namespace"));
const param_1 = __importDefault(require("./html/tags/param"));
const since_1 = __importDefault(require("./html/tags/since"));
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
            docblockRenderer: {},
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
SDocblockHtmlRenderer.registerHelper(classname_1.default);
SDocblockHtmlRenderer.registerHelper(gravatar_1.default);
SDocblockHtmlRenderer.registerHelper(section_1.default);
SDocblockHtmlRenderer.registerPartial(heading_1.default);
SDocblockHtmlRenderer.registerPartial(sharings_1.default);
SDocblockHtmlRenderer.registerTag(author_1.default);
SDocblockHtmlRenderer.registerTag(description_1.default);
SDocblockHtmlRenderer.registerTag(example_1.default);
SDocblockHtmlRenderer.registerTag(name_1.default);
SDocblockHtmlRenderer.registerTag(namespace_1.default);
SDocblockHtmlRenderer.registerTag(param_1.default);
SDocblockHtmlRenderer.registerTag(since_1.default);
exports.default = SDocblockHtmlRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLDRFQUFzRDtBQUl0RCx5RUFBdUQ7QUFDdkQsdUVBQXFEO0FBQ3JELHFFQUFtRDtBQUVuRCxzRUFBcUQ7QUFDckQsd0VBQXVEO0FBRXZELGdFQUEyQztBQUMzQywwRUFBcUQ7QUFDckQsa0VBQTZDO0FBQzdDLDREQUF1QztBQUN2QyxzRUFBaUQ7QUFDakQsOERBQXlDO0FBQ3pDLDhEQUF5QztBQWdEekMsYUFBYTtBQUNiLE1BQU0scUJBQ0osU0FBUSwyQkFBbUI7SUEwQjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsZ0JBQTRCLEVBQzVCLFFBQTZDO1FBRTdDLEtBQUssQ0FDSCxnQkFBZ0IsRUFDaEIsbUJBQVcsQ0FDVDtZQUNFLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsb0JBQW9CLEVBQUUsRUFBRTtTQUN6QixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7QUFoREQ7Ozs7Ozs7OztHQVNHO0FBQ0ksbUNBQWEsR0FBRztJQUNyQixPQUFPO0lBQ1AsWUFBWTtJQUNaLE9BQU87SUFDUCxTQUFTO0lBQ1QsTUFBTTtJQUNOLE1BQU07SUFDTixRQUFRO0lBQ1IsY0FBYztJQUNkLFFBQVE7SUFDUixVQUFVO0lBQ1YsU0FBUztDQUNWLENBQUM7QUE2QkoscUJBQXFCLENBQUMsY0FBYyxDQUFDLG1CQUFlLENBQUMsQ0FBQztBQUN0RCxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsa0JBQWMsQ0FBQyxDQUFDO0FBQ3JELHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxpQkFBYSxDQUFDLENBQUM7QUFFcEQscUJBQXFCLENBQUMsZUFBZSxDQUFDLGlCQUFjLENBQUMsQ0FBQztBQUN0RCxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsa0JBQWUsQ0FBQyxDQUFDO0FBRXZELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxnQkFBUyxDQUFDLENBQUM7QUFDN0MscUJBQXFCLENBQUMsV0FBVyxDQUFDLHFCQUFjLENBQUMsQ0FBQztBQUNsRCxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsaUJBQVUsQ0FBQyxDQUFDO0FBQzlDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxjQUFPLENBQUMsQ0FBQztBQUMzQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsbUJBQVksQ0FBQyxDQUFDO0FBQ2hELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxlQUFRLENBQUMsQ0FBQztBQUM1QyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLENBQUM7QUFFNUMsa0JBQWUscUJBQXFCLENBQUMifQ==