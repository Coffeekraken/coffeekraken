var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __wait } from '@coffeekraken/sugar/datetime';
/**
 * @name            visualFocus
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all focusable elements have a visual state setted
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'visualFocus',
        name: 'Visual focus',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check that all focusable elements have a visual state setted',
        level: 1,
        check({ $context }) {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                const $focusdElement = ((_a = window.parent) !== null && _a !== void 0 ? _a : window).document
                    .activeElement;
                const $focusables = Array.from((_b = $context.querySelectorAll(':is([tabindex], button, input, select, a[href]):not([tabindex="-1"])')) !== null && _b !== void 0 ? _b : []);
                // @ts-ignore
                for (let [idx, $focusable] of $focusables.entries()) {
                    const style = Object.assign({}, window.getComputedStyle($focusable)), styleAfter = Object.assign({}, window.getComputedStyle($focusable, ':after')), styleBefore = Object.assign({}, window.getComputedStyle($focusable, ':before'));
                    $focusable.focus();
                    yield __wait();
                    const focusStyle = Object.assign({}, window.getComputedStyle($focusable)), focusStyleAfter = Object.assign({}, window.getComputedStyle($focusable, ':after')), focusStyleBefore = Object.assign({}, window.getComputedStyle($focusable, ':before'));
                    if (JSON.stringify(focusStyle) === JSON.stringify(style) &&
                        JSON.stringify(focusStyleBefore) ===
                            JSON.stringify(styleBefore) &&
                        JSON.stringify(focusStyleAfter) ===
                            JSON.stringify(styleAfter)) {
                        _console.log($focusable, style.animation, focusStyle.animation);
                        // restore focus
                        // @ts-ignore
                        (_c = $focusdElement === null || $focusdElement === void 0 ? void 0 : $focusdElement.focus) === null || _c === void 0 ? void 0 : _c.call($focusdElement);
                        return {
                            status: 'warning',
                            message: `The \`${$focusable.outerHTML}\` does not have any focused visual display`,
                            example: null,
                            moreLink: 'https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/',
                            action: {
                                label: () => `Log it`,
                                handler: () => console.log($focusable),
                            },
                        };
                    }
                }
                // restore focus
                // @ts-ignore
                (_d = $focusdElement === null || $focusdElement === void 0 ? void 0 : $focusdElement.focus) === null || _d === void 0 ? void 0 : _d.call($focusdElement);
                return {
                    status: 'success',
                    action: {
                        label: () => `Log them (${$focusables.length})`,
                        handler: () => console.log($focusables),
                    },
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLGtCQUFrQjtJQUN2QyxPQUFPO1FBQ0gsRUFBRSxFQUFFLGFBQWE7UUFDakIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AsOERBQThEO1FBQ2xFLEtBQUssRUFBRSxDQUFDO1FBQ0YsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOzs7Z0JBQ3BCLE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxNQUFNLENBQUMsQ0FBQyxRQUFRO3FCQUNwRCxhQUFhLENBQUM7Z0JBRW5CLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQzFCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixzRUFBc0UsQ0FDekUsbUNBQUksRUFBRSxDQUNWLENBQUM7Z0JBRUYsYUFBYTtnQkFDYixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNqRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNuQixFQUFFLEVBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUN0QyxFQUNELFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN0QixFQUFFLEVBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FDaEQsRUFDRCxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDdkIsRUFBRSxFQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQ2pELENBQUM7b0JBRU4sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNuQixNQUFNLE1BQU0sRUFBRSxDQUFDO29CQUVmLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3hCLEVBQUUsRUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQ3RDLEVBQ0QsZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQzNCLEVBQUUsRUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUNoRCxFQUNELGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQzVCLEVBQUUsRUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUNqRCxDQUFDO29CQUVOLElBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7d0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDOzRCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUNoQzt3QkFDRSxRQUFRLENBQUMsR0FBRyxDQUNSLFVBQVUsRUFDVixLQUFLLENBQUMsU0FBUyxFQUNmLFVBQVUsQ0FBQyxTQUFTLENBQ3ZCLENBQUM7d0JBRUYsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLE1BQUEsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLEtBQUssOERBQUksQ0FBQzt3QkFFMUIsT0FBTzs0QkFDSCxNQUFNLEVBQUUsU0FBUzs0QkFDakIsT0FBTyxFQUFFLFNBQVMsVUFBVSxDQUFDLFNBQVMsNkNBQTZDOzRCQUNuRixPQUFPLEVBQUUsSUFBSTs0QkFDYixRQUFRLEVBQ0osNEZBQTRGOzRCQUNoRyxNQUFNLEVBQUU7Z0NBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVE7Z0NBQ3JCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQzs2QkFDekM7eUJBQ0osQ0FBQztxQkFDTDtpQkFDSjtnQkFFRCxnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2IsTUFBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsS0FBSyw4REFBSSxDQUFDO2dCQUUxQixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsV0FBVyxDQUFDLE1BQU0sR0FBRzt3QkFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO3FCQUMxQztpQkFDSixDQUFDOztTQUNMO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==