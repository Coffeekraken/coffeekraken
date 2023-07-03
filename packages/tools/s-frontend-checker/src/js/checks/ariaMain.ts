import type { ISFrontendChecker } from '../types';

/**
 * @name            ariaMain
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
        id: 'ariaMain',
        name: 'Aria main',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'When multiple <main> tags are used, they must have a `aria-label` or `arian-labelledby` attribute',
        level: 1,
        check({ $context }) {
            const $mains = $context.querySelectorAll('main');

            if ($mains.length <= 1) {
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                    elements: $mains,
                };
            }

            const $mainsNotLabelled = $context.querySelectorAll(
                'main:not([aria-label],[aria-labelledby])',
            );

            if ($mainsNotLabelled) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Some <main> tags are not labelled',
                    example:
                        '<main aria-label="Why Elon Musk is such a nice/bad guy">...</main>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html',
                    elements: $mainsNotLabelled,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $mainsNotLabelled,
            };
        },
    };
}
