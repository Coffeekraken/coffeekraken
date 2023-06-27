import type { ISFrontendChecker } from '../types';

/**
 * @name            webappCapable
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that our html is webappCapable compliant
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'webappCapable',
        name: 'Webapp capable',
        description:
            'Check that our website is webapp capable with all the required metas',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        async check({ $context }) {
            const $webappCapableMeta = $context.querySelector(
                'meta[name="mobile-web-app-capable"][content="yes"]',
            );
            const $appleWebappCapableMeta = $context.querySelector(
                'meta[name="apple-mobile-web-app-capable"][content="yes"]',
            );
            const $appleMobileWebappStatus = $context.querySelector(
                'meta[name="apple-mobile-web-app-status-bar-style"]',
            );
            const $appleMobileWebappTitle = $context.querySelector(
                'meta[name="apple-mobile-web-app-title"]',
            );
            if (
                !$webappCapableMeta ||
                !$appleWebappCapableMeta ||
                !$appleMobileWebappStatus ||
                !$appleMobileWebappTitle
            ) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Your webpage is not webapp capable',
                    example: `<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="@example/01-basic">`,
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            // theme color
            const $themeColorMeta = $context.querySelector(
                'link[rel="theme-color"]',
            );
            if (!$themeColorMeta) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Missing the `theme-color` meta',
                    example: `<meta name="theme-color" content="#fff">`,
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            // apple touch icons
            const appleTouchIconSizes = [
                '57x57',
                '60x60',
                '72x72',
                '114x114',
                '120x120',
                '144x144',
                '152x152',
                '167x167',
                '180x180',
                '1024x1024',
            ];
            // @ts-ignore
            for (let [i, size] of appleTouchIconSizes.entries()) {
                const $size = $context.querySelector(
                    `link[rel="apple-touch-icon"][sizes="${size}"]`,
                );
                if (!$size) {
                    return {
                        status: __SFrontendChecker.STATUS_ERROR,
                        message: 'Some `apple-touch-icon` sizes are missing',
                        example: `${appleTouchIconSizes
                            .map((s) => {
                                return `<link rel="apple-touch-icon" sizes="${s}" href="/dist/favicon/apple-touch-icon-${s}.png">`;
                            })
                            .join('\n')}`,
                        moreLink: 'https://github.com/itgalaxy/favicons',
                    };
                }
            }

            // apple touch startup images
            const $appleTouchStartupImages = $context.querySelectorAll(
                `link[rel="apple-touch-startup-image"]`,
            );
            if (!$appleTouchStartupImages.length) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'Missing `apple-touch-startup-image` links',
                    example: `<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">
<link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="...">`,
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            // application name
            const $applicationNameMeta = $context.querySelector(
                'meta[name="application-name"]',
            );
            if (!$applicationNameMeta) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The `application-name` meta is missing',
                    example: `<meta name="application-name" content="...">`,
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            // ms metas
            const $msApplicationTileColor = $context.querySelector(
                    'meta[name="msapplication-TileColor"]',
                ),
                $msApplicationTileImage = $context.querySelector(
                    'meta[name="msapplication-TileImage"]',
                ),
                $msApplicationConfig = $context.querySelector(
                    'meta[name="msapplication-config"]',
                );
            if (
                !$msApplicationTileColor ||
                !$msApplicationTileImage ||
                !$msApplicationConfig
            ) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Missing `msapplication` metas',
                    example: `<meta name="msapplication-TileColor" content="#fff">
<meta name="msapplication-TileImage" content="/dist/favicon/mstile-144x144.png">
<meta name="msapplication-config" content="/dist/favicon/browserconfig.xml">`,
                    moreLink: 'https://github.com/itgalaxy/favicons',
                };
            }

            return {
                status: 'success',
            };
        },
    };
}
