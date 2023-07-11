"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SFrontendChecker_js_1 = __importDefault(require("../SFrontendChecker.js"));
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
class SFrontendCheckerSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            levels: {
                type: 'Array',
                description: 'Specify which levels you want to handle',
                default: [
                    SFrontendChecker_js_1.default.LEVEL_LOW,
                    SFrontendChecker_js_1.default.LEVEL_MEDIUM,
                    SFrontendChecker_js_1.default.LEVEL_HIGH,
                ],
            },
            categories: {
                type: 'Array',
                description: 'List all the categories you want to handle',
                default: [
                    SFrontendChecker_js_1.default.CATEGORY_ACCESSIBILITY,
                    SFrontendChecker_js_1.default.CATEGORY_BEST_PRACTICES,
                    SFrontendChecker_js_1.default.CATEGORY_NICE_TO_HAVE,
                    SFrontendChecker_js_1.default.CATEGORY_PERFORMANCE,
                    SFrontendChecker_js_1.default.CATEGORY_SEO,
                    SFrontendChecker_js_1.default.CATEGORY_SOCIAL,
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
                    SFrontendChecker_js_1.default.STATUS_ERROR,
                    SFrontendChecker_js_1.default.STATUS_WARNING,
                    SFrontendChecker_js_1.default.STATUS_SUCCESS,
                ],
            },
            icons: {
                type: 'Object',
                description: 'Specify an icon for each levels, categories and status',
                default: {
                    [SFrontendChecker_js_1.default.LEVEL_HIGH]: '<i class="fa-solid fa-battery-full"></i>',
                    [SFrontendChecker_js_1.default.LEVEL_MEDIUM]: '<i class="fa-solid fa-battery-half"></i>',
                    [SFrontendChecker_js_1.default.LEVEL_LOW]: '<i class="fa-solid fa-battery-quarter"></i>',
                    [SFrontendChecker_js_1.default.STATUS_SUCCESS]: '<i class="fa-solid fa-thumbs-up s-tc:success"></i>',
                    [SFrontendChecker_js_1.default.STATUS_WARNING]: '<i class="fa-solid fa-triangle-exclamation s-tc:warning"></i>',
                    [SFrontendChecker_js_1.default.STATUS_ERROR]: '<i class="fa-solid fa-circle-exclamation s-tc:error"></i>',
                    [SFrontendChecker_js_1.default.CATEGORY_ACCESSIBILITY]: '<i class="fa-solid fa-universal-access"></i>',
                    [SFrontendChecker_js_1.default.CATEGORY_BEST_PRACTICES]: '<i class="fa-regular fa-thumbs-up"></i>',
                    [SFrontendChecker_js_1.default.CATEGORY_NICE_TO_HAVE]: '<i class="fa-solid fa-ice-cream"></i>',
                    [SFrontendChecker_js_1.default.CATEGORY_PERFORMANCE]: '<i class="fa-solid fa-gauge-high"></i>',
                    [SFrontendChecker_js_1.default.CATEGORY_SEO]: '<i class="fa-brands fa-searchengin"></i>',
                    [SFrontendChecker_js_1.default.CATEGORY_SOCIAL]: '<i class="fa-solid fa-share-nodes"></i>',
                },
            },
        };
    }
}
exports.default = SFrontendCheckerSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlGQUF3RDtBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQixpQ0FBa0MsU0FBUSxxQkFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELE9BQU8sRUFBRTtvQkFDTCw2QkFBa0IsQ0FBQyxTQUFTO29CQUM1Qiw2QkFBa0IsQ0FBQyxZQUFZO29CQUMvQiw2QkFBa0IsQ0FBQyxVQUFVO2lCQUNoQzthQUNKO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSw0Q0FBNEM7Z0JBQ3pELE9BQU8sRUFBRTtvQkFDTCw2QkFBa0IsQ0FBQyxzQkFBc0I7b0JBQ3pDLDZCQUFrQixDQUFDLHVCQUF1QjtvQkFDMUMsNkJBQWtCLENBQUMscUJBQXFCO29CQUN4Qyw2QkFBa0IsQ0FBQyxvQkFBb0I7b0JBQ3ZDLDZCQUFrQixDQUFDLFlBQVk7b0JBQy9CLDZCQUFrQixDQUFDLGVBQWU7aUJBQ3JDO2FBQ0o7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGtDQUFrQztnQkFDL0MsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsT0FBTztnQkFDYixXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxPQUFPLEVBQUU7b0JBQ0wsNkJBQWtCLENBQUMsWUFBWTtvQkFDL0IsNkJBQWtCLENBQUMsY0FBYztvQkFDakMsNkJBQWtCLENBQUMsY0FBYztpQkFDcEM7YUFDSjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxPQUFPLEVBQUU7b0JBQ0wsQ0FBQyw2QkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFDM0IsMENBQTBDO29CQUM5QyxDQUFDLDZCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUM3QiwwQ0FBMEM7b0JBQzlDLENBQUMsNkJBQWtCLENBQUMsU0FBUyxDQUFDLEVBQzFCLDZDQUE2QztvQkFDakQsQ0FBQyw2QkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFDL0Isb0RBQW9EO29CQUN4RCxDQUFDLDZCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUMvQiwrREFBK0Q7b0JBQ25FLENBQUMsNkJBQWtCLENBQUMsWUFBWSxDQUFDLEVBQzdCLDJEQUEyRDtvQkFDL0QsQ0FBQyw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN2Qyw4Q0FBOEM7b0JBQ2xELENBQUMsNkJBQWtCLENBQUMsdUJBQXVCLENBQUMsRUFDeEMseUNBQXlDO29CQUM3QyxDQUFDLDZCQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQ3RDLHVDQUF1QztvQkFDM0MsQ0FBQyw2QkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUNyQyx3Q0FBd0M7b0JBQzVDLENBQUMsNkJBQWtCLENBQUMsWUFBWSxDQUFDLEVBQzdCLDBDQUEwQztvQkFDOUMsQ0FBQyw2QkFBa0IsQ0FBQyxlQUFlLENBQUMsRUFDaEMseUNBQXlDO2lCQUNoRDthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZFRCxvREF1RUMifQ==