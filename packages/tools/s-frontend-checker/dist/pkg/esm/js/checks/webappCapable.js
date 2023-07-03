var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export default function (__SFrontendChecker) {
    return {
        id: 'webappCapable',
        name: 'Webapp capable',
        description: 'Check that our website is webapp capable with all the required metas',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            return __awaiter(this, void 0, void 0, function* () {
                const $webappCapableMeta = $context.querySelector('meta[name="mobile-web-app-capable"][content="yes"]');
                const $appleWebappCapableMeta = $context.querySelector('meta[name="apple-mobile-web-app-capable"][content="yes"]');
                const $appleMobileWebappStatus = $context.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
                const $appleMobileWebappTitle = $context.querySelector('meta[name="apple-mobile-web-app-title"]');
                if (!$webappCapableMeta ||
                    !$appleWebappCapableMeta ||
                    !$appleMobileWebappStatus ||
                    !$appleMobileWebappTitle) {
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
                const $themeColorMeta = $context.querySelector('link[rel="theme-color"]');
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
                    const $size = $context.querySelector(`link[rel="apple-touch-icon"][sizes="${size}"]`);
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
                const $appleTouchStartupImages = $context.querySelectorAll(`link[rel="apple-touch-startup-image"]`);
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
                const $applicationNameMeta = $context.querySelector('meta[name="application-name"]');
                if (!$applicationNameMeta) {
                    return {
                        status: __SFrontendChecker.STATUS_ERROR,
                        message: 'The `application-name` meta is missing',
                        example: `<meta name="application-name" content="...">`,
                        moreLink: 'https://github.com/itgalaxy/favicons',
                    };
                }
                // ms metas
                const $msApplicationTileColor = $context.querySelector('meta[name="msapplication-TileColor"]'), $msApplicationTileImage = $context.querySelector('meta[name="msapplication-TileImage"]'), $msApplicationConfig = $context.querySelector('meta[name="msapplication-config"]');
                if (!$msApplicationTileColor ||
                    !$msApplicationTileImage ||
                    !$msApplicationConfig) {
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
                    status: __SFrontendChecker.STATUS_SUCCESS,
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsZUFBZTtRQUNuQixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFDUCxzRUFBc0U7UUFDMUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUNoQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7O2dCQUNwQixNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdDLG9EQUFvRCxDQUN2RCxDQUFDO2dCQUNGLE1BQU0sdUJBQXVCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEQsMERBQTBELENBQzdELENBQUM7Z0JBQ0YsTUFBTSx3QkFBd0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNuRCxvREFBb0QsQ0FDdkQsQ0FBQztnQkFDRixNQUFNLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xELHlDQUF5QyxDQUM1QyxDQUFDO2dCQUNGLElBQ0ksQ0FBQyxrQkFBa0I7b0JBQ25CLENBQUMsdUJBQXVCO29CQUN4QixDQUFDLHdCQUF3QjtvQkFDekIsQ0FBQyx1QkFBdUIsRUFDMUI7b0JBQ0UsT0FBTzt3QkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYzt3QkFDekMsT0FBTyxFQUFFLG9DQUFvQzt3QkFDN0MsT0FBTyxFQUFFOzs7cUVBR3dDO3dCQUNqRCxRQUFRLEVBQUUsc0NBQXNDO3FCQUNuRCxDQUFDO2lCQUNMO2dCQUVELGNBQWM7Z0JBQ2QsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDMUMseUJBQXlCLENBQzVCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGVBQWUsRUFB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