var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __querySelectorAll } from '@coffeekraken/sugar/dom';
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
export default function (__SFrontendChecker) {
    return {
        id: 'preloadViewportAssets',
        name: 'Preload viewport assets',
        category: __SFrontendChecker.CATEGORY_PERFORMANCE,
        description: 'Check that all important viewport visible assets like images, videos, etc preloaded using the rel="preload" link',
        lazy: true,
        level: __SFrontendChecker.LEVEL_HIGH,
        check({ $context }) {
            return __awaiter(this, void 0, void 0, function* () {
                const $assets = __querySelectorAll('img, video', {
                    inViewport: true
                });
                _console.log('ass', $assets);
                return {
                    status: 'success',
                    action: {
                        label: () => `Log them (${$assets.length})`,
                        handler: () => console.log($assets),
                    },
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzdEOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsdUJBQXVCO1FBQzNCLElBQUksRUFBRSx5QkFBeUI7UUFDL0IsUUFBUSxFQUFFLGtCQUFrQixDQUFDLG9CQUFvQjtRQUNqRCxXQUFXLEVBQ1Asa0hBQWtIO1FBQ3RILElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFVBQVU7UUFDOUIsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztnQkFFcEIsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxFQUFFO29CQUM3QyxVQUFVLEVBQUUsSUFBSTtpQkFDbkIsQ0FBQyxDQUFBO2dCQUVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUU3QixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsT0FBTyxDQUFDLE1BQU0sR0FBRzt3QkFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO3FCQUN0QztpQkFDSixDQUFDO1lBQ04sQ0FBQztTQUFBO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==