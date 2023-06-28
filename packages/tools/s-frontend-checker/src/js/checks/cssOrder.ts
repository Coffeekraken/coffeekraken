import type { ISFrontendChecker } from '../types';

/**
 * @name            cssOrder
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the cssOrder is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'cssOrder',
        name: 'CSS Order',
        description: 'All css must be loaded before any js in the head',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $styles = $context.querySelectorAll(
                    'head link[rel="stylesheet"]',
                ),
                $scripts = $context.querySelectorAll('head script');

            if (!$styles.length || !$scripts.length) {
                return {
                    status: 'success',
                };
            }
            let $lastStyle = $styles[$styles.length - 1],
                $firstScript = $scripts[0];

            let highestStylesIndex = Array.prototype.indexOf.call(
                    $lastStyle.parentNode.children,
                    $lastStyle,
                ),
                lowestScriptsIndex = Array.prototype.indexOf.call(
                    $firstScript.parentNode.children,
                    $firstScript,
                );

            // // @ts-ignore
            if (lowestScriptsIndex > highestStylesIndex) {
                return {
                    status: 'warning',
                    message: "It's better to have link tags before scrips ones",
                    example:
                        '<link rel="stylesheet" href="..." />\n<script src="..."></script>',
                    moreLink:
                        'https://stackoverflow.com/questions/9271276/should-css-always-precede-javascript',
                    elements: $styles,
                };
            }
            return {
                status: 'success',
                elements: $styles,
            };
        },
    };
}
