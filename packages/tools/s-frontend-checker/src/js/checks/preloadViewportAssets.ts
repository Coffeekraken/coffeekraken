import { __elementsInViewport } from '@coffeekraken/sugar/dom';

import { __wait } from '@coffeekraken/sugar/datetime';

import type { ISFrontendChecker } from '../types.js';

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
        level: __SFrontendChecker.LEVEL_HIGH,
        async check({ $context }) {
            // scroll to top to make sure
            (window.parent ?? window).scrollTo(0, 0);
            await __wait();

            // get all elements in the viewport
            const $assets = __elementsInViewport({
                    rootNode: $context,
                }),
                medias: any[] = [],
                $elms: HTMLElement[] = [];

            for (let [i, $elm] of $assets.entries()) {
                let mediaUrl;
                switch ($elm.tagName?.toLowerCase()) {
                    case 'img':
                        mediaUrl =
                            $elm.getAttribute('src') ??
                            $elm.getAttribute('lazy-src');
                        medias.push({
                            url: mediaUrl,
                            type: 'image',
                        });
                        $elms.push($elm);
                        break;
                    case 'audio':
                        mediaUrl =
                            $elm.getAttribute('src') ??
                            $elm.getAttribute('lazy-src');
                        medias.push({
                            url: mediaUrl,
                            type: 'audio',
                        });
                        $elms.push($elm);
                        break;
                    case 'video':
                        mediaUrl =
                            $elm.getAttribute('src') ??
                            $elm.getAttribute('lazy-src');
                        medias.push({
                            url: mediaUrl,
                            type: 'video',
                        });
                        $elms.push($elm);
                        break;
                    default:
                        const style = window.getComputedStyle($elm);
                        if (
                            style.backgroundImage &&
                            style.backgroundImage !== 'none'
                        ) {
                            mediaUrl = style.backgroundImage
                                .trim()
                                .replace(/^url\(['"`]?(.*)['"`]?\)$/, '$1');
                            medias.push({
                                url: mediaUrl,
                                type: 'image',
                            });
                            $elms.push($elm);
                        }
                        break;
                }
            }

            if (medias.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: `Some assets should be preloaded in the \`head\` using the \`<link rel="preload" href="..." />\` tag`,
                    example: `${medias
                        .map((media) => {
                            return `<link rel="preload" href="${media.url}" as="${media.type}" />`;
                        })
                        .join('\n')}`,
                    moreLink:
                        'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload',
                    elements: $elms,
                };
            }

            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
