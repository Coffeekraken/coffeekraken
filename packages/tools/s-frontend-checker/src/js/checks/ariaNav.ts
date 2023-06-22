import type { ISFrontendChecker } from '../types';

/**
 * @name            ariaNav
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * When multiple <main> tags are present, check that all are labelled
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaNav',
        name: 'Aria nav',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'When multiple <nav> tags are used, they must have a `aria-label` or `arian-labelledby` attribute',
        level: 1,
        check({ $context }) {
            const $navs = $context.querySelectorAll('main');

            if ($navs.length <= 1) {
                return {
                    status: 'success',
                };
            }

            const $navsNotLabelled = $context.querySelectorAll(
                'main:not([aria-label],[aria-labelledby])',
            );

            if ($navsNotLabelled) {
                return {
                    status: 'warning',
                    message: 'Some <nav> tags are not labelled',
                    example:
                        '<nav aria-label="Why Elon Musk is such a nice/bad guy">...</nav>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html',
                    action: {
                        label: () => `Log them (${$navsNotLabelled.length})`,
                        handler: () => console.log($navsNotLabelled),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
