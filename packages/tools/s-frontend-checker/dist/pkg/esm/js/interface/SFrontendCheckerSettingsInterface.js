import __SInterface from '@coffeekraken/s-interface';
import __SFrontendChecker from '../exports';
/**
 * @name                SFrontendCheckerSettingsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe settings of the SFrontendChecker class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontendCheckerSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            icons: {
                type: 'Object',
                description: 'Specify an icon for each levels, categories and status',
                default: {
                    [__SFrontendChecker.LEVEL_HIGH]: '<i class="fa-solid fa-battery-full"></i>',
                    [__SFrontendChecker.LEVEL_MEDIUM]: '<i class="fa-solid fa-battery-half"></i>',
                    [__SFrontendChecker.LEVEL_LOW]: '<i class="fa-solid fa-battery-quarter"></i>',
                    [__SFrontendChecker.STATUS_SUCCESS]: '<i class="fa-solid fa-thumbs-up s-tc:success"></i>',
                    [__SFrontendChecker.STATUS_WARNING]: '<i class="fa-solid fa-triangle-exclamation s-tc:warning"></i>',
                    [__SFrontendChecker.STATUS_ERROR]: '<i class="fa-solid fa-xmark s-tc:error"></i>',
                    [__SFrontendChecker.CATEGORY_ACCESSIBILITY]: '<i class="fa-solid fa-universal-access"></i>',
                    [__SFrontendChecker.CATEGORY_BEST_PRACTICES]: '<i class="fa-regular fa-thumbs-up"></i>',
                    [__SFrontendChecker.CATEGORY_NICE_TO_HAVE]: '<i class="fa-solid fa-ice-cream"></i>',
                    [__SFrontendChecker.CATEGORY_PERFORMANCE]: '<i class="fa-solid fa-gauge-high"></i>',
                    [__SFrontendChecker.CATEGORY_SEO]: '<i class="fa-brands fa-searchengin"></i>',
                    [__SFrontendChecker.CATEGORY_SOCIAL]: '<i class="fa-solid fa-share-nodes"></i>',
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sa0JBQWtCLE1BQU0sWUFBWSxDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsWUFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELE9BQU8sRUFBRTtvQkFDTCxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUMzQiwwQ0FBMEM7b0JBQzlDLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEVBQzdCLDBDQUEwQztvQkFDOUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFDMUIsNkNBQTZDO29CQUNqRCxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUMvQixvREFBb0Q7b0JBQ3hELENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLEVBQy9CLCtEQUErRDtvQkFDbkUsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsRUFDN0IsOENBQThDO29CQUNsRCxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLEVBQ3ZDLDhDQUE4QztvQkFDbEQsQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxFQUN4Qyx5Q0FBeUM7b0JBQzdDLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsRUFDdEMsdUNBQXVDO29CQUMzQyxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLEVBQ3JDLHdDQUF3QztvQkFDNUMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsRUFDN0IsMENBQTBDO29CQUM5QyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxFQUNoQyx5Q0FBeUM7aUJBQ2hEO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=