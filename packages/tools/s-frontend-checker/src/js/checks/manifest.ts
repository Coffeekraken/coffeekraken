import type { ISFrontendChecker } from '../types';

/**
 * @name            manifest
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the manifest is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'manifest',
        name: 'App manifest',
        description: 'The page should have an app manifest defined',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // manifest
            if (!$context.querySelector('link[rel="manifest"]')) {
                return {
                    status: 'error',
                    message: 'The document is missing the app manifest',
                    example:
                        '<link rel="manifest" href="/dist/favicon/manifest.json">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            return {
                status: 'success',
            };
        },
    };
}
