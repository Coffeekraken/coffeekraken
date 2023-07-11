import type { ISFrontendChecker } from '../types.js';

/**
 * @name            criticalCss
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the critical css has been injected in the page.
 * Note that this test checks if a `script` tag with the id "critical" exists...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'criticalCss',
        name: 'Critical Css',
        description: 'Check if a `style` with the id "critical" exists',
        category: __SFrontendChecker.CATEGORY_PERFORMANCE,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // canonical
            const $criticalCss = $context.querySelector('style#critical');
            if (!$criticalCss) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'Your page does not have any critical css inlined',
                    example: `<style id="critical">...</style>`,
                    moreLink: 'https://web.dev/extract-critical-css/',
                };
            }

            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $criticalCss,
            };
        },
    };
}
