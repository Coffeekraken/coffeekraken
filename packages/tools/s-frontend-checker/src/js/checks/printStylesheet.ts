import type { ISFrontendChecker } from '../types';

/**
 * @name            printStylesheet
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a print stylesheet is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'printStylesheet',
        name: 'Print Stylesheet',
        description:
            "It's a good practice to provide a print stylesheet for youor document",
        category: __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
        level: 2,
        check({ $context }) {
            const $printStyle = $context.querySelector(
                'link[rel="stylesheet"][media="print"]',
            );

            if (!$printStyle) {
                return {
                    status: 'warning',
                    message:
                        'Your page does not provide any `print` stylesheet',
                    example:
                        '<link rel="stylesheet" media="print" href="print.css" />',
                    moreLink:
                        'https://www.sitepoint.com/css-printer-friendly-pages/',
                };
            }
            return {
                status: 'success',
                elements: $printStyle,
            };
        },
    };
}
