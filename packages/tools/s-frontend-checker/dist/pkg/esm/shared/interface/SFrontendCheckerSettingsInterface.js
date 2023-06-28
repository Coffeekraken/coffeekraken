import __SInterface from '@coffeekraken/s-interface';
import __SFrontendChecker from '../SFrontendChecker';
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
            levels: {
                type: 'Array',
                description: 'Specify which levels you want to handle',
                default: [
                    __SFrontendChecker.LEVEL_LOW,
                    __SFrontendChecker.LEVEL_MEDIUM,
                    __SFrontendChecker.LEVEL_HIGH,
                ],
            },
            categories: {
                type: 'Array',
                description: 'List all the categories you want to handle',
                default: [
                    __SFrontendChecker.CATEGORY_ACCESSIBILITY,
                    __SFrontendChecker.CATEGORY_BEST_PRACTICES,
                    __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
                    __SFrontendChecker.CATEGORY_PERFORMANCE,
                    __SFrontendChecker.CATEGORY_SEO,
                    __SFrontendChecker.CATEGORY_SOCIAL,
                ],
            },
            checks: {
                type: 'Object',
                description: 'Specify settings for each checks',
                default: {},
            },
            statuses: {
                type: 'Array',
                description: 'List all the statuses you want to handle',
                default: [
                    __SFrontendChecker.STATUS_ERROR,
                    __SFrontendChecker.STATUS_WARNING,
                    __SFrontendChecker.STATUS_SUCCESS,
                ],
            },
            icons: {
                type: 'Object',
                description: 'Specify an icon for each levels, categories and status',
                default: {
                    [__SFrontendChecker.LEVEL_HIGH]: '<i class="fa-solid fa-battery-full"></i>',
                    [__SFrontendChecker.LEVEL_MEDIUM]: '<i class="fa-solid fa-battery-half"></i>',
                    [__SFrontendChecker.LEVEL_LOW]: '<i class="fa-solid fa-battery-quarter"></i>',
                    [__SFrontendChecker.STATUS_SUCCESS]: '<i class="fa-solid fa-thumbs-up s-tc:success"></i>',
                    [__SFrontendChecker.STATUS_WARNING]: '<i class="fa-solid fa-triangle-exclamation s-tc:warning"></i>',
                    [__SFrontendChecker.STATUS_ERROR]: '<i class="fa-solid fa-circle-exclamation s-tc:error"></i>',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sa0JBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3ZFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUFFLHlDQUF5QztnQkFDdEQsT0FBTyxFQUFFO29CQUNMLGtCQUFrQixDQUFDLFNBQVM7b0JBQzVCLGtCQUFrQixDQUFDLFlBQVk7b0JBQy9CLGtCQUFrQixDQUFDLFVBQVU7aUJBQ2hDO2FBQ0o7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUFFLDRDQUE0QztnQkFDekQsT0FBTyxFQUFFO29CQUNMLGtCQUFrQixDQUFDLHNCQUFzQjtvQkFDekMsa0JBQWtCLENBQUMsdUJBQXVCO29CQUMxQyxrQkFBa0IsQ0FBQyxxQkFBcUI7b0JBQ3hDLGtCQUFrQixDQUFDLG9CQUFvQjtvQkFDdkMsa0JBQWtCLENBQUMsWUFBWTtvQkFDL0Isa0JBQWtCLENBQUMsZUFBZTtpQkFDckM7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELE9BQU8sRUFBRTtvQkFDTCxrQkFBa0IsQ0FBQyxZQUFZO29CQUMvQixrQkFBa0IsQ0FBQyxjQUFjO29CQUNqQyxrQkFBa0IsQ0FBQyxjQUFjO2lCQUNwQzthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELE9BQU8sRUFBRTtvQkFDTCxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUMzQiwwQ0FBMEM7b0JBQzlDLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEVBQzdCLDBDQUEwQztvQkFDOUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFDMUIsNkNBQTZDO29CQUNqRCxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUMvQixvREFBb0Q7b0JBQ3hELENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLEVBQy9CLCtEQUErRDtvQkFDbkUsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsRUFDN0IsMkRBQTJEO29CQUMvRCxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLEVBQ3ZDLDhDQUE4QztvQkFDbEQsQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxFQUN4Qyx5Q0FBeUM7b0JBQzdDLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsRUFDdEMsdUNBQXVDO29CQUMzQyxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLEVBQ3JDLHdDQUF3QztvQkFDNUMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsRUFDN0IsMENBQTBDO29CQUM5QyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxFQUNoQyx5Q0FBeUM7aUJBQ2hEO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=