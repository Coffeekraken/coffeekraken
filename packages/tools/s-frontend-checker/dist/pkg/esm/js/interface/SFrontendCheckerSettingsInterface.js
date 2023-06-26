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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sa0JBQWtCLE1BQU0sWUFBWSxDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsWUFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELE9BQU8sRUFBRTtvQkFDTCxrQkFBa0IsQ0FBQyxTQUFTO29CQUM1QixrQkFBa0IsQ0FBQyxZQUFZO29CQUMvQixrQkFBa0IsQ0FBQyxVQUFVO2lCQUNoQzthQUNKO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSw0Q0FBNEM7Z0JBQ3pELE9BQU8sRUFBRTtvQkFDTCxrQkFBa0IsQ0FBQyxzQkFBc0I7b0JBQ3pDLGtCQUFrQixDQUFDLHVCQUF1QjtvQkFDMUMsa0JBQWtCLENBQUMscUJBQXFCO29CQUN4QyxrQkFBa0IsQ0FBQyxvQkFBb0I7b0JBQ3ZDLGtCQUFrQixDQUFDLFlBQVk7b0JBQy9CLGtCQUFrQixDQUFDLGVBQWU7aUJBQ3JDO2FBQ0o7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGtDQUFrQztnQkFDL0MsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsT0FBTztnQkFDYixXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxPQUFPLEVBQUU7b0JBQ0wsa0JBQWtCLENBQUMsWUFBWTtvQkFDL0Isa0JBQWtCLENBQUMsY0FBYztvQkFDakMsa0JBQWtCLENBQUMsY0FBYztpQkFDcEM7YUFDSjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxPQUFPLEVBQUU7b0JBQ0wsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFDM0IsMENBQTBDO29CQUM5QyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUM3QiwwQ0FBMEM7b0JBQzlDLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQzFCLDZDQUE2QztvQkFDakQsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFDL0Isb0RBQW9EO29CQUN4RCxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUMvQiwrREFBK0Q7b0JBQ25FLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEVBQzdCLDJEQUEyRDtvQkFDL0QsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN2Qyw4Q0FBOEM7b0JBQ2xELENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsRUFDeEMseUNBQXlDO29CQUM3QyxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQ3RDLHVDQUF1QztvQkFDM0MsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUNyQyx3Q0FBd0M7b0JBQzVDLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEVBQzdCLDBDQUEwQztvQkFDOUMsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsRUFDaEMseUNBQXlDO2lCQUNoRDthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9