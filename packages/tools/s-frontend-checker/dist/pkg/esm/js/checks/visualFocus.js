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
import { __injectStyle } from '@coffeekraken/sugar/dom';
import { __uniqid } from '@coffeekraken/sugar/string';
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
let _$styles = [];
export default function (__SFrontendChecker) {
    return {
        id: 'visualFocus',
        name: 'Visual focus',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check that all focusable elements have a visual state setted',
        lazy: true,
        level: __SFrontendChecker.LEVEL_HIGH,
        check({ $context }) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const $focusables = Array.from((_a = $context.querySelectorAll(':is([tabindex], button, input, select, a[href]):not([tabindex="-1"])')) !== null && _a !== void 0 ? _a : []);
                const $nonVisualFocusElements = [];
                // remove old styles
                _$styles = _$styles.filter(($style) => {
                    $style.remove();
                    return false;
                });
                yield __wait(100);
                // @ts-ignore
                for (let [idx, $focusable] of $focusables.entries()) {
                    // await __wait(100);
                    // make sure the container has a s-frontend-checker-id
                    if (!$focusable.hasAttribute('s-frontend-checker-id')) {
                        $focusable.setAttribute('s-frontend-checker-id', __uniqid());
                    }
                    const style = JSON.stringify(window.getComputedStyle($focusable)), styleAfter = JSON.stringify(window.getComputedStyle($focusable, ':after')), styleBefore = JSON.stringify(window.getComputedStyle($focusable, ':before'));
                    $focusable.focus();
                    yield __wait(100);
                    const focusStyle = JSON.stringify(window.getComputedStyle($focusable)), focusStyleAfter = JSON.stringify(window.getComputedStyle($focusable, ':after')), focusStyleBefore = JSON.stringify(window.getComputedStyle($focusable, ':before'));
                    if (focusStyle === style &&
                        focusStyleBefore === styleBefore &&
                        focusStyleAfter === styleAfter) {
                        $nonVisualFocusElements.push($focusable);
                        const id = $focusable.getAttribute('s-frontend-checker-id');
                        const $style = __injectStyle(`
                    [s-frontend-checker-id="${id}"] {
                        position: ${$focusable.style.position !== ''
                            ? $focusable.style.position
                            : 'relative'}
                    }
                    [s-frontend-checker-id="${id}"]:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        border: 5px dotted #ff0000;
                    }
                    `, {
                            // @ts-ignore
                            rootNode: (_b = $context.head) !== null && _b !== void 0 ? _b : $context,
                        });
                        // add this style tag to the styles stack to remove them at each check start
                        _$styles.push($style);
                    }
                }
                // restore focus
                // @ts-ignore
                // $focusdElement?.focus?.();
                window.parent.scrollTo(0, 0);
                if ($nonVisualFocusElements.length) {
                    return {
                        status: __SFrontendChecker.STATUS_WARNING,
                        message: `Some interactive elements does not have any focused visual display`,
                        example: null,
                        moreLink: 'https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/',
                        elements: $nonVisualFocusElements,
                    };
                }
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                    elements: $focusables,
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUl0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXREOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILElBQUksUUFBUSxHQUF1QixFQUFFLENBQUM7QUFFdEMsTUFBTSxDQUFDLE9BQU8sV0FBVyxrQkFBcUM7SUFDMUQsT0FBTztRQUNILEVBQUUsRUFBRSxhQUFhO1FBQ2pCLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLDhEQUE4RDtRQUNsRSxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxVQUFVO1FBQzlCLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7O2dCQUNwQixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUMxQixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDckIsc0VBQXNFLENBQ3pFLG1DQUFJLEVBQUUsQ0FDVixDQUFDO2dCQUVGLE1BQU0sdUJBQXVCLEdBQWtCLEVBQUUsQ0FBQztnQkFFbEQsb0JBQW9CO2dCQUNwQixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNsQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2hCLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztnQkFFSCxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFbEIsYUFBYTtnQkFDYixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksV0FBVyxD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