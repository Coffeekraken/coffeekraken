import type { ISFrontendChecker } from '../types.js';

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
            const $manifest = $context.querySelector('link[rel="manifest"]');
            if (!$manifest) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the app manifest',
                    example:
                        '<link rel="manifest" href="/dist/favicon/manifest.json">',
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $manifest,
            };
        },
    };
}
