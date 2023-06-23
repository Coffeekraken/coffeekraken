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
import __html2canvas from 'html2canvas';
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
function averageData(data) {
    const length = data.data.length, blockSize = 1, rgb = { r: 0, g: 0, b: 0 };
    let count = 0, i = -4;
    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }
    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    return rgb;
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
                let j = 0, computedStyle, elmColor;
                for (let [i, textNode] of textNodes.entries()) {
                    const $container = textNode.parentElement;
                    if (textNode.data !== '°') {
                        continue;
                    }
                    const range = document.createRange();
                    range.selectNodeContents(textNode);
                    const rects = range.getClientRects(), rect = rects[0];
                    // handle only text with at least 1 character
                    if (!rects.length) {
                        continue;
                    }
                    $container.style.pointerEvents = 'none';
                    let $elm, elmStyle, i = 0, stack = [];
                    while ($elm !== ((_a = $context.ownerDocument) !== null && _a !== void 0 ? _a : $context).body &&
                        i <= 200) {
                        $elm = ((_b = $context.ownerDocument) !== null && _b !== void 0 ? _b : $context).elementFromPoint(Math.round(rect.x), Math.round(rect.y));
                        if (!$elm) {
                            break;
                        }
                        computedStyle = window.getComputedStyle($elm);
                        if (computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                            computedStyle.backgroundImage !== 'none') {
                            break;
                        }
                        $elm.style.pointerEvents = 'none';
                        elmStyle = $elm.style;
                        // add the element in the stack to reset it
                        stack.push($elm);
                        // update the secure index
                        i++;
                    }
                    if (!$elm) {
                        continue;
                    }
                    // reset the pointer events of the stack
                    stack.forEach(($elmToReset) => {
                        $elmToReset.style.pointerEvents = 'unset';
                    });
                    if (computedStyle.backgroundImage !== 'none') {
                        const $canvas = yield __html2canvas($elm);
                        const ctx = $canvas.getContext('2d');
                        // ctx.fillStyle = 'red';
                        const portionData = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
                        const average = averageData(portionData);
                        // set the element color
                        elmColor = `rgb(${average.r}, ${average.g}, ${average.b})`;
                        // ctx.fillStyle = `rgb(${average.r}, ${average.g}, ${average.b})`;
                        // ctx.fillRect(
                        //     rect.x,
                        //     rect.y,
                        //     rect.width,
                        //     rect.height,
                        // );
                        // document.body.appendChild($canvas);
                    }
                    else if (computedStyle.backgroundColor) {
                        elmColor = computedStyle.backgroundColor;
                    }
                    // if we don't have any element color, cannot make the contrast check...
                    if (!elmColor) {
                        continue;
                    }
                    const textColor = window.getComputedStyle($container).color;
                    __SColor.getContrastInfo(textColor, elmColor);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUd4Qzs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxTQUFTLGNBQWMsQ0FBQyxFQUFFO0lBQ3RCLElBQUksQ0FBQyxFQUNELENBQUMsR0FBRyxFQUFFLEVBQ04sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUUsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLElBQUk7SUFDckIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQzNCLFNBQVMsR0FBRyxDQUFDLEVBQ2IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMvQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRVgsT0FBTyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFO1FBQ2xDLEVBQUUsS0FBSyxDQUFDO1FBQ1IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxD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