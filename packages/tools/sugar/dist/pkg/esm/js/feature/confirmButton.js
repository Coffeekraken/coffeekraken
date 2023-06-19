var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __wait from '../../shared/datetime/wait';
import __querySelectorLive from '../dom/query/querySelectorLive';
/**
 * @name 		confirmButton
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hELE9BQU8sbUJBQW1CLE1BQU0sZ0NBQWdDLENBQUM7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBRUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0I7SUFDeEMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDNUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxFQUFFO1lBQ3JDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU3QixNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtRQUV0QyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQ2hELFdBQVcsR0FBRyxjQUFjLENBQUMsS0FBSyxFQUNsQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFDekQsWUFBWSxHQUFHLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLHFCQUFxQjtRQUVyRixXQUFXO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDakU7aUJBQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssS0FBSyxFQUFFO2dCQUMxQyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUNsQix1QkFBdUIsRUFDdkIsV0FBVyxDQUNkLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDakM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNoQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2pFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNSLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDckMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO29CQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2lCQUNoQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9