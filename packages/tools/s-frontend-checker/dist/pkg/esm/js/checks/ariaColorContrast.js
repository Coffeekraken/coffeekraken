var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SColor from '@coffeekraken/s-color';
/**
 * @name            ariaColorContrast
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check all the text elements to see if they are on a background that make suffisent contrast or not
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function textNodesUnder(el) {
    var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while ((n = walk.nextNode()))
        a.push(n);
    return a;
}
export default function (__SFrontendChecker) {
    return {
        id: 'ariaColorContrast',
        name: 'Aria color contrast',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check all the text elements to see if they are on a background that make suffisent contrast or not',
        level: 1,
        check({ $context }) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const textNodes = textNodesUnder($context);
                // const $canvas = await __html2canvas($context.body ?? $context);CNF.t
                // document.body.appendChild($canvas);
                window.parent.document.querySelector('iframe').style.display =
                    'none';
                let j = 0;
                for (let [i, textNode] of textNodes.entries()) {
                    const $container = textNode.parentElement;
                    const range = document.createRange();
                    range.selectNodeContents(textNode);
                    const rects = range.getClientRects();
                    // handle only text with at least 1 character
                    if (!rects.length) {
                        continue;
                    }
                    $container.style.pointerEvents = 'none';
                    let $elm, elmStyle, i = 0, stack = [];
                    while (!(elmStyle === null || elmStyle === void 0 ? void 0 : elmStyle.backgroundColor) &&
                        !(elmStyle === null || elmStyle === void 0 ? void 0 : elmStyle.backgroundImage) &&
                        $elm !== ((_a = $context.ownerDocument) !== null && _a !== void 0 ? _a : $context).body &&
                        i <= 200) {
                        $elm = ((_b = $context.ownerDocument) !== null && _b !== void 0 ? _b : $context).elementFromPoint(Math.round(rects[0].x), Math.round(rects[0].y));
                        if (!$elm) {
                            break;
                        }
                        $elm.style.pointerEvents = 'none';
                        elmStyle = $elm.style;
                        // add the element in the stack to reset it
                        stack.push($elm);
                        // update the secure index
                        i++;
                        // _console.log('ELNM', $elm);
                    }
                    if (!$elm) {
                        continue;
                    }
                    // reset the pointer events of the stack
                    stack.forEach(($elmToReset) => {
                        $elmToReset.style.pointerEvents = 'unset';
                    });
                    const computedStyle = window.getComputedStyle($elm), textColor = window.getComputedStyle($container).color;
                    _console.log('Elm', textNode.data, $elm);
                    __SColor.getContrastInfo(textColor, computedStyle.backgroundColor);
                    $container.style.pointerEvents = 'unset';
                    j++;
                    if (j >= 500) {
                        break;
                    }
                    // _console.log(textNode.data, rects);
                }
                window.parent.document.querySelector('iframe').style.display =
                    'initial';
                // const $buttons = Array.from(
                //     $context.querySelectorAll(
                //         'button, input, select, p, h1, h2, h3, h4, h5, h6, span, ',
                //     ) ?? [],
                // );
                // if ($buttons.length) {
                //     // @ts-ignore
                //     for (let [idx, $button] of $buttons.entries()) {
                //         if (!$button.hasAttribute('aria-label')) {
                //             const innerText = $button.innerText.trim();
                //             if (
                //                 innerText === '' ||
                //                 (innerText.split(' ') === 1 && innerText.length < 3)
                //             ) {
                //                 return {
                //                     status: 'warning',
                //                     message: `Your \`${$button.outerHTML}\` button does not have a proper descriptive label or content`,
                //                     example: '<button>Send my info</button>',
                //                     moreLink:
                //                         'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                //                     action: {
                //                         label: () =>
                //                             `Log them (${$buttons.length})`,
                //                         handler: () => {
                //                             $buttons.forEach(($button) => {
                //                                 console.log($button);
                //                             });
                //                         },
                //                     },
                //                 };
                //             }
                //         }
                //     }
                // }
                return {
                    status: 'success',
                    // action: {
                    //     label: () => `Log them (${$buttons.length})`,
                    //     handler: () => {
                    //         $buttons.forEach(($button) => {
                    //             console.log($button);
                    //         });
                    //     },
                    // },
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILFNBQVMsY0FBYyxDQUFDLEVBQUU7SUFDdEIsSUFBSSxDQUFDLEVBQ0QsQ0FBQyxHQUFHLEVBQUUsRUFDTixJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RSxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxrQkFBcUM7SUFDMUQsT0FBTztRQUNILEVBQUUsRUFBRSxtQkFBbUI7UUFDdkIsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixRQUFRLEVBQUUsa0JBQWtCLENBQUMsc0JBQXNCO1FBQ25ELFdBQVcsRUFDUCxvR0FBb0c7UUFDeEcsS0FBSyxFQUFFLENBQUM7UUFDRixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7OztnQkFDcEIsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUzQyx1RUFBdUU7Z0JBRXZFLHNDQUFzQztnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPO29CQUN4RCxNQUFNLENBQUM7Z0JBRVgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVWLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVB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