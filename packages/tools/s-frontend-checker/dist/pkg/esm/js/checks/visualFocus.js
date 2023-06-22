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
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                const $focusdElement = ((_a = window.parent) !== null && _a !== void 0 ? _a : window).document
                    .activeElement;
                const $focusables = Array.from((_b = $context.querySelectorAll(':is([tabindex], button, input, select, a[href]):not([tabindex="-1"])')) !== null && _b !== void 0 ? _b : []);
                const $nonVisualFocusElements = [];
                // @ts-ignore
                for (let [idx, $focusable] of $focusables.entries()) {
                    const style = JSON.stringify(window.getComputedStyle($focusable)), styleAfter = JSON.stringify(window.getComputedStyle($focusable, ':after')), styleBefore = JSON.stringify(window.getComputedStyle($focusable, ':before'));
                    $focusable.focus();
                    yield __wait();
                    const focusStyle = JSON.stringify(window.getComputedStyle($focusable)), focusStyleAfter = JSON.stringify(window.getComputedStyle($focusable, ':after')), focusStyleBefore = JSON.stringify(window.getComputedStyle($focusable, ':before'));
                    if (focusStyle === style &&
                        focusStyleBefore === styleBefore &&
                        focusStyleAfter === styleAfter) {
                        $nonVisualFocusElements.push($focusable);
                    }
                }
                // restore focus
                // @ts-ignore
                (_c = $focusdElement === null || $focusdElement === void 0 ? void 0 : $focusdElement.focus) === null || _c === void 0 ? void 0 : _c.call($focusdElement);
                if ($nonVisualFocusElements.length) {
                    return {
                        status: 'warning',
                        message: `Some interactive elements does not have any focused visual display`,
                        example: null,
                        moreLink: 'https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/',
                        action: {
                            label: () => `Log them (${$nonVisualFocusElements.length})`,
                            handler: () => $nonVisualFocusElements.forEach(($elm) => console.log($elm)),
                        },
                    };
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUl0RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLGtCQUFxQztJQUMxRCxPQUFPO1FBQ0gsRUFBRSxFQUFFLGFBQWE7UUFDakIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AsOERBQThEO1FBQ2xFLEtBQUssRUFBRSxDQUFDO1FBQ0YsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOzs7Z0JBQ3BCLE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxNQUFNLENBQUMsQ0FBQyxRQUFRO3FCQUNwRCxhQUFhLENBQUM7Z0JBRW5CLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQzFCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixzRUFBc0UsQ0FDekUsbUNBQUksRUFBRSxDQUNWLENBQUM7Z0JBRUYsTUFBTSx1QkFBdUIsR0FBa0IsRUFBRSxDQUFDO2dCQUVsRCxhQUFhO2dCQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQ3BCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FDdEMsRUFDRCxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FDdkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FDaEQsRUFDRCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FDeEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FDakQsQ0FBQztvQkFFTixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ25CLE1BQU0sTUFBTSxFQUFFLENBQUM7b0JBRWYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FDekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUN0QyxFQUNELGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUM1QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUNoRCxFQUNELGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQzdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQ2pELENBQUM7b0JBRU4sSUFDSSxVQUFVLEtBQUssS0FBSzt3QkFDcEIsZ0JBQWdCLEtBQUssV0FBVzt3QkFDaEMsZUFBZSxLQUFLLFVBQVUsRUFDaEM7d0JBQ0UsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM1QztpQkFDSjtnQkFFRCxnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2IsTUFBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsS0FBSyw4REFBSSxDQUFDO2dCQUUxQixJQUFJLHVCQUF1QixDQUFDLE1BQU0sRUFBRTtvQkFDaEMsT0FBTzt3QkFDSCxNQUFNLEVBQUUsU0FBUzt3QkFDakIsT0FBTyxFQUFFLG9FQUFvRTt3QkFDN0UsT0FBTyxFQUFFLElBQUk7d0JBQ2IsUUFBUSxFQUNKLDRGQUE0Rjt3QkFDaEcsTUFBTSxFQUFFOzRCQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FDUixhQUFhLHVCQUF1QixDQUFDLE1BQU0sR0FBRzs0QkFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNWLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQ3BCO3lCQUNSO3FCQUNKLENBQUM7aUJBQ0w7Z0JBRUQsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLFdBQVcsQ0FBQyxNQUFNLEdBQUc7d0JBQy9DLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztxQkFDMUM7aUJBQ0osQ0FBQzs7U0FDTDtLQUNKLENBQUM7QUFDTixDQUFDIn0=