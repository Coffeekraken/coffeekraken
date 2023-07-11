import __SInterface from '@coffeekraken/s-interface';
import __SFrontendChecker from '../SFrontendChecker.js';

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
                description:
                    'Specify an icon for each levels, categories and status',
                default: {
                    [__SFrontendChecker.LEVEL_HIGH]:
                        '<i class="fa-solid fa-battery-full"></i>',
                    [__SFrontendChecker.LEVEL_MEDIUM]:
                        '<i class="fa-solid fa-battery-half"></i>',
                    [__SFrontendChecker.LEVEL_LOW]:
                        '<i class="fa-solid fa-battery-quarter"></i>',
                    [__SFrontendChecker.STATUS_SUCCESS]:
                        '<i class="fa-solid fa-thumbs-up s-tc:success"></i>',
                    [__SFrontendChecker.STATUS_WARNING]:
                        '<i class="fa-solid fa-triangle-exclamation s-tc:warning"></i>',
                    [__SFrontendChecker.STATUS_ERROR]:
                        '<i class="fa-solid fa-circle-exclamation s-tc:error"></i>',
                    [__SFrontendChecker.CATEGORY_ACCESSIBILITY]:
                        '<i class="fa-solid fa-universal-access"></i>',
                    [__SFrontendChecker.CATEGORY_BEST_PRACTICES]:
                        '<i class="fa-regular fa-thumbs-up"></i>',
                    [__SFrontendChecker.CATEGORY_NICE_TO_HAVE]:
                        '<i class="fa-solid fa-ice-cream"></i>',
                    [__SFrontendChecker.CATEGORY_PERFORMANCE]:
                        '<i class="fa-solid fa-gauge-high"></i>',
                    [__SFrontendChecker.CATEGORY_SEO]:
                        '<i class="fa-brands fa-searchengin"></i>',
                    [__SFrontendChecker.CATEGORY_SOCIAL]:
                        '<i class="fa-solid fa-share-nodes"></i>',
                },
            },
        };
    }
}
