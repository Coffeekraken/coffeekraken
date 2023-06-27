
import { __querySelectorAll } from '@coffeekraken/sugar/dom';

import type { ISFrontendChecker } from '../types';


/**
 * @name            preloadViewportAssets
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all important viewport visible assets like images, videos, etc preloaded using the rel="preload" link
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'preloadViewportAssets',
        name: 'Preload viewport assets',
        category: __SFrontendChecker.CATEGORY_PERFORMANCE,
        description:
            'Check that all important viewport visible assets like images, videos, etc preloaded using the rel="preload" link',
        lazy: true,
        level: __SFrontendChecker.LEVEL_HIGH,
        async check({ $context }) {

            const $assets = __querySelectorAll('img, video', {
                inViewport: true
            })

            _console.log('ass', $assets);

            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$assets.length})`,
                    handler: () => console.log($assets),
                },
            };
        },
    };
}
