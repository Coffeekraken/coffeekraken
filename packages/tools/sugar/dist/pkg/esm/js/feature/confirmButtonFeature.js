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
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
/**
 * @name 		confirmButtonFeature
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add support for "confirm" attribute on any button, link, etc...
 * This will maintain a property on the element itself called "needConfirmation".
 * In your "pointerup" handler, you can then check if the button has been confirmed by using
 * `e.currentTarget.needConfirmation`. You can then make whatever you need with that...
 * Note that the `@sugar.ui.button` postcss mixin support this `confirm="Confirm?" attribute visually.
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __confirmButtonFeature()
 *
 * @example       js
 * import { __confirmButtonFeature } from '@coffeekraken/sugar/feature';
 * __confirmButtonFeature();
 *
 * @example    html
 * <button class="s-btn" confirm="Confirm?">
 *    Do something...
 * </button>
 *
 * @example     js
 * $myButton.addEventListener('pointerup', e => {
 *   if (e.needConfirmation) {
 *      return;
 *   }
 *   // handle your action here...
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function confirmButtonFeature() {
    __querySelectorLive('[confirm]', ($btn) => __awaiter(this, void 0, void 0, function* () {
        if ($btn.needConfirmation !== undefined) {
            return;
        }
        $btn._isConfirmedStatus = undefined;
        $btn.needConfirmation = true;
        yield __wait(100); // avoid css issues
        const buttonElmStyle = window.getComputedStyle($btn), buttonWidth = buttonElmStyle.width, confirmElmStyle = window.getComputedStyle($btn, ':after'), confirmWidth = `${parseInt(confirmElmStyle.width) + 10}px`; // add 4 just in case
        // set size
        $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);
        $btn.addEventListener('pointerdown', (e) => {
            if ($btn._isConfirmedStatus === undefined) {
                $btn._isConfirmedStatus = false;
                $btn.style.setProperty('--s-btn-confirm-width', confirmWidth);
            }
            else if ($btn._isConfirmedStatus === false) {
                setTimeout(() => {
                    $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);
                }, 100);
                $btn._isConfirmedStatus = true;
                $btn.needConfirmation = false;
            }
        });
        $btn.addEventListener('blur', (e) => {
            setTimeout(() => {
                $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);
            }, 100);
            $btn._isConfirmedStatus = undefined;
        });
        $btn.addEventListener('pointerup', (e) => {
            setTimeout(() => {
                if ($btn._isConfirmedStatus === true) {
                    $btn.blur();
                    $btn._isConfirmedStatus = undefined;
                    $btn.needConfirmation = true;
                }
            });
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFFSCxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQjtJQUN4QyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUM1QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7WUFDckMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRTdCLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsbUJBQW1CO1FBRXRDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFDaEQsV0FBVyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQ2xDLGVBQWUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUN6RCxZQUFZLEdBQUcsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMscUJBQXFCO1FBRXJGLFdBQVc7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNqRTtpQkFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLEVBQUU7Z0JBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQ2xCLHVCQUF1QixFQUN2QixXQUFXLENBQ2QsQ0FBQztnQkFDTixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzthQUNqQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2hDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDakUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtvQkFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7aUJBQ2hDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=