var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __elementsInViewport } from '@coffeekraken/sugar/dom';
import { __wait } from '@coffeekraken/sugar/datetime';
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
        level: __SFrontendChecker.LEVEL_HIGH,
        check({ $context }) {
            var _a, _b, _c, _d, _e;
            return __awaiter(this, void 0, void 0, function* () {
                // scroll to top to make sure
                ((_a = window.parent) !== null && _a !== void 0 ? _a : window).scrollTo(0, 0);
                yield __wait();
                // get all elements in the viewport
                const $assets = __elementsInViewport({
                    rootNode: $context,
                }), medias = [], $elms = [];
                for (let [i, $elm] of $assets.entries()) {
                    let mediaUrl;
                    switch ((_b = $elm.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) {
                        case 'img':
                            mediaUrl =
                                (_c = $elm.getAttribute('src')) !== null && _c !== void 0 ? _c : $elm.getAttribute('lazy-src');
                            medias.push({
                                url: mediaUrl,
                                type: 'image',
                            });
                            $elms.push($elm);
                            break;
                        case 'audio':
                            mediaUrl =
                                (_d = $elm.getAttribute('src')) !== null && _d !== void 0 ? _d : $elm.getAttribute('lazy-src');
                            medias.push({
                                url: mediaUrl,
                                type: 'audio',
                            });
                            $elms.push($elm);
                            break;
                        case 'video':
                            mediaUrl =
                                (_e = $elm.getAttribute('src')) !== null && _e !== void 0 ? _e : $elm.getAttribute('lazy-src');
                            medias.push({
                                url: mediaUrl,
                                type: 'video',
                            });
                            $elms.push($elm);
                            break;
                        default:
                            const style = window.getComputedStyle($elm);
                            if (style.backgroundImage !== 'none') {
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
                        moreLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload',
                        elements: $elms,
                    };
                }
                return {
                    status: 'success',
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUl0RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLGtCQUFxQztJQUMxRCxPQUFPO1FBQ0gsRUFBRSxFQUFFLHVCQUF1QjtRQUMzQixJQUFJLEVBQUUseUJBQXlCO1FBQy9CLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxvQkFBb0I7UUFDakQsV0FBVyxFQUNQLGtIQUFrSDtRQUN0SCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsVUFBVTtRQUM5QixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7OztnQkFDcEIsNkJBQTZCO2dCQUM3QixDQUFDLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxNQUFNLEVBQUUsQ0FBQztnQkFFZixtQ0FBbUM7Z0JBQ25DLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDO29CQUM3QixRQUFRLEVBQUUsUUFBUTtpQkFDckIsQ0FBQyxFQUNGLE1BQU0sR0FBVSxFQUFFLEVBQ2xCLEtBQUssR0FBa0IsRUFBRSxDQUFDO2dCQUU5QixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNyQyxJQUFJLFFBQVEsQ0FBQztvQkFDYixRQUFRLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsV0FBVyxFQUFFLEVBQUU7d0JBQ2pDLEtBQUssS0FBSzs0QkFDTixRQUFRO2dDQUNKLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsbUNBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0NBQ1IsR0FBRyxFQUFFLFFBQVE7Z0NBQ2IsSUFBSSxFQUFFLE9BQU87NkJBQ2hCLENBQUMsQ0FBQzs0QkFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNqQixNQUFNO3dCQUNWLEtBQUssT0FBTzs0QkFDUixRQUFRO2dDQUNKLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsbUNBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0NBQ1IsR0FBRyxFQUFFLFFBQVE7Z0NBQ2IsSUFBSSxFQUFFLE9BQU87NkJBQ2hCLENBQUMsQ0FBQzs0QkFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNqQixNQUFNO3dCQUNWLEtBQUssT0FBTzs0QkFDUixRQUFRO2dDQUNKLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsbUNBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0NBQ1IsR0FBRyxFQUFFLFFBQVE7Z0NBQ2IsSUFBSSxFQUFFLE9BQU87NkJBQ2hCLENBQUMsQ0FBQzs0QkFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNqQixNQUFNO3dCQUNWOzRCQUNJLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDNUMsSUFBSSxLQUFLLENBQUMsZUFBZSxLQUFLLE1BQU0sRUFBRTtnQ0FDbEMsUUFBUSxHQUFHLEtBQUssQ0FBQyxlQUFlO3FDQUMzQixJQUFJLEVBQUU7cUNBQ04sT0FBTyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO29DQUNSLEdBQUcsRUFBRSxRQUFRO29DQUNiLElBQUksRUFBRSxPQUFPO2lDQUNoQixDQUFDLENBQUM7Z0NBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDcEI7NEJBQ0QsTUFBTTtxQkFDYjtpQkFDSjtnQkFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ2YsT0FBTzt3QkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYzt3QkFDekMsT0FBTyxFQUFFLHFHQUFxRzt3QkFDOUcsT0FBTyxFQUFFLEdBQUcsTUFBTTs2QkFDYixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDWCxPQUFPLDZCQUE2QixLQUFLLENBQUMsR0FBRyxTQUFTLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQzt3QkFDM0UsQ0FBQyxDQUFDOzZCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDakIsUUFBUSxFQUNKLDBFQUEwRTt3QkFDOUUsUUFBUSxFQUFFLEtBQUs7cUJBQ2xCLENBQUM7aUJBQ0w7Z0JBRUQsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztpQkFDcEIsQ0FBQzs7U0FDTDtLQUNKLENBQUM7QUFDTixDQUFDIn0=