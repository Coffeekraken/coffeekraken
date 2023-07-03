import type { ISFrontendChecker } from '../types';

/**
 * @name            favicon
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the favicon is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'favicon',
        name: 'Favicon',
        description: 'The page should have a favicon defined correctly',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_HIGH,
        check({ $context }) {
            // favicon
            if (!$context.querySelector('link[rel="icon"]')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the favicon',
                    example:
                        '<link rel="icon" type="image/x-icon" href="/images/favicon.ico">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            // shortcut icon
            if (!$context.querySelector('link[rel="shortcut icon"]')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the favicon',
                    example:
                        '<link rel="shortcut icon" href="/dist/favicon/favicon.ico">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            // icons sizes
            // @ts-ignore
            for (let [i, size] of ['16x16', '32x32', '48x48'].entries()) {
                if (
                    !$context.querySelector(`link[rel="icon"][sizes="${size}"]`)
                ) {
                    return {
                        status: __SFrontendChecker.STATUS_ERROR,
                        message: `The document is missing the \`${size}\` favicon`,
                        example: `<link rel="icon" type="image/png" sizes="${size}" href="/dist/favicon/favicon-${size}.png">`,
                        moreLink: 'https://github.com/itgalaxy/favicons',
                    };
                }
            }

            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
