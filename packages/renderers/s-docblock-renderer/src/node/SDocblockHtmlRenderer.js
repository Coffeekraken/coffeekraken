import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDocblockRenderer from './SDocblockRenderer';
import classnameHelper from './html/helpers/classname';
import gravatarHelper from './html/helpers/gravatar';
import sectionHelper from './html/helpers/section';
import headingPartial from './html/partials/heading';
import sharingsPartial from './html/partials/sharings';
import authorTag from './html/tags/author';
import descriptionTag from './html/tags/description';
import exampleTag from './html/tags/example';
import nameTag from './html/tags/name';
import namespaceTag from './html/tags/namespace';
import paramTag from './html/tags/param';
import sinceTag from './html/tags/since';
// @ts-ignore
class SDocblockHtmlRenderer extends __SDocblockRenderer {
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
        super(docblockInstance, __deepMerge({
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
SDocblockHtmlRenderer.registerHelper(classnameHelper);
SDocblockHtmlRenderer.registerHelper(gravatarHelper);
SDocblockHtmlRenderer.registerHelper(sectionHelper);
SDocblockHtmlRenderer.registerPartial(headingPartial);
SDocblockHtmlRenderer.registerPartial(sharingsPartial);
SDocblockHtmlRenderer.registerTag(authorTag);
SDocblockHtmlRenderer.registerTag(descriptionTag);
SDocblockHtmlRenderer.registerTag(exampleTag);
SDocblockHtmlRenderer.registerTag(nameTag);
SDocblockHtmlRenderer.registerTag(namespaceTag);
SDocblockHtmlRenderer.registerTag(paramTag);
SDocblockHtmlRenderer.registerTag(sinceTag);
export default SDocblockHtmlRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrSHRtbFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sbUJBQW1CLE1BQU0scUJBQXFCLENBQUM7QUFJdEQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFFbkQsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsT0FBTyxTQUFTLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxVQUFVLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sa0JBQWtCLENBQUM7QUFDdkMsT0FBTyxZQUFZLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFnRHpDLGFBQWE7QUFDYixNQUFNLHFCQUNKLFNBQVEsbUJBQW1CO0lBMEIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGdCQUE0QixFQUM1QixRQUE2QztRQUU3QyxLQUFLLENBQ0gsZ0JBQWdCLEVBQ2hCLFdBQVcsQ0FDVDtZQUNFLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsb0JBQW9CLEVBQUUsRUFBRTtTQUN6QixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7QUFoREQ7Ozs7Ozs7OztHQVNHO0FBQ0ksbUNBQWEsR0FBRztJQUNyQixPQUFPO0lBQ1AsWUFBWTtJQUNaLE9BQU87SUFDUCxTQUFTO0lBQ1QsTUFBTTtJQUNOLE1BQU07SUFDTixRQUFRO0lBQ1IsY0FBYztJQUNkLFFBQVE7SUFDUixVQUFVO0lBQ1YsU0FBUztDQUNWLENBQUM7QUE2QkoscUJBQXFCLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3RELHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNyRCxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFcEQscUJBQXFCLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RELHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUV2RCxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0MscUJBQXFCLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MscUJBQXFCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2hELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFNUMsZUFBZSxxQkFBcUIsQ0FBQyJ9