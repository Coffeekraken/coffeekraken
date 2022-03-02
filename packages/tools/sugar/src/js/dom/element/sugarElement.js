import __visibleSurface from './visibleSurface';
/**
 * @name            sugarElement
 * @namespace       js.dom.element
 * @type            Function
 * @platform          js
 * @status          betas
 *
 * This function takes a standard HTMLElement and enhance it with some sugar like `element.visibleSurface`, `element.relTop`, `element.parentBounds`, etc...
 *
 * @feature         `element.visibleSurface` to get some surface info like `percentage`, `percentageX`, etc...
 *
 * @param       {HTMLElement}       elm             The element you want to enhance
 * @return      {HTMLElement}                  The enhanced element
 *
 * @example         js
 * import sugarElement from '@coffeekraken/sugar/js/dom/element/sugarElement';
 * const $myElement = document.querySelector('#my-element');
 * sugarElement($myElement);
 * $myElement.visibleSurface.percentage; // => 50
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function sugarElement($elm) {
    // visibleSurface
    let visibleSurface;
    // @ts-ignore
    if (!$elm.visibleSurface) {
        Object.defineProperty($elm, 'visibleSurface', {
            get() {
                // if (visibleSurface) return visibleSurface;
                visibleSurface = __visibleSurface($elm);
                return visibleSurface;
            }
        });
        Object.defineProperty($elm, 'resetVisibleSurface', {
            get() {
                return function () {
                    visibleSurface = null;
                };
            }
        });
    }
    function resetVisibleSurface() {
        // @ts-ignore
        visibleSurface = null;
    }
    document.addEventListener('scroll', resetVisibleSurface);
    document.addEventListener('resize', resetVisibleSurface);
    // relTop
    // @ts-ignore
    if (!$elm.relTop) {
        Object.defineProperty($elm, 'relTop', {
            get() {
                var _a, _b;
                const parentBounds = (_a = $elm.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                const bounds = $elm.getBoundingClientRect();
                return bounds.top - ((_b = parentBounds === null || parentBounds === void 0 ? void 0 : parentBounds.top) !== null && _b !== void 0 ? _b : 0);
            }
        });
    }
    // relLeft
    // @ts-ignore
    if (!$elm.relLeft) {
        Object.defineProperty($elm, 'relLeft', {
            get() {
                var _a, _b;
                const parentBounds = (_a = $elm.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                const bounds = $elm.getBoundingClientRect();
                return bounds.left - ((_b = parentBounds === null || parentBounds === void 0 ? void 0 : parentBounds.left) !== null && _b !== void 0 ? _b : 0);
            }
        });
    }
    // originRelTop
    // @ts-ignore
    if (!$elm.originRelTop) {
        const originRelTop = $elm.relTop;
        Object.defineProperty($elm, 'originRelTop', {
            get() {
                return originRelTop;
            }
        });
    }
    // originRelLeft
    // @ts-ignore
    if (!$elm.originRelLeft) {
        const originRelLeft = $elm.relLeft;
        Object.defineProperty($elm, 'originRelLeft', {
            get() {
                return originRelLeft;
            }
        });
    }
    return $elm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxJQUFpQjtJQUNsRCxpQkFBaUI7SUFDakIsSUFBSSxjQUFjLENBQUM7SUFDbkIsYUFBYTtJQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzFDLEdBQUc7Z0JBQ0MsNkNBQTZDO2dCQUM3QyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sY0FBYyxDQUFDO1lBQzFCLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUMvQyxHQUFHO2dCQUNDLE9BQU87b0JBQ0gsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDMUIsQ0FBQyxDQUFBO1lBQ0wsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNOO0lBQ0QsU0FBUyxtQkFBbUI7UUFDeEIsYUFBYTtRQUNiLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUN6RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFFekQsU0FBUztJQUNULGFBQWE7SUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNkLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNsQyxHQUFHOztnQkFDQyxNQUFNLFlBQVksR0FBRyxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLHFCQUFxQixFQUFFLENBQUM7Z0JBQ2pFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUM1QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxHQUFHLG1DQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pELENBQUM7U0FDSixDQUFDLENBQUM7S0FDTjtJQUNELFVBQVU7SUFDVixhQUFhO0lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDZixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbkMsR0FBRzs7Z0JBQ0MsTUFBTSxZQUFZLEdBQUcsTUFBQSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxxQkFBcUIsRUFBRSxDQUFDO2dCQUNqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDNUMsT0FBTyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBSSxtQ0FBSSxDQUFDLENBQUMsQ0FBQztZQUNuRCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0tBQ047SUFFRCxlQUFlO0lBQ2YsYUFBYTtJQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ3BCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3hDLEdBQUc7Z0JBQ0MsT0FBTyxZQUFZLENBQUM7WUFDeEIsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNOO0lBQ0QsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNyQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6QyxHQUFHO2dCQUNDLE9BQU8sYUFBYSxDQUFDO1lBQ3pCLENBQUM7U0FDSixDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==