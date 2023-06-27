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
import { __wait } from '@coffeekraken/sugar/datetime';
import { __closestScrollable, __injectStyle } from '@coffeekraken/sugar/dom';
import { __uniqid } from '@coffeekraken/sugar/string';
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
let _$styles = [];
export default function (__SFrontendChecker) {
    return {
        id: 'ariaColorContrast',
        name: 'Aria color contrast',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        lazy: true,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>',
        description: 'Check all the text elements to see if they are on a background that make suffisent contrast or not',
        level: __SFrontendChecker.LEVEL_HIGH,
        check({ $context, settings, }) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                settings = Object.assign({ level: 'AA', ratios: {
                        error: 0,
                        A: 3.5,
                        AA: 4.5,
                        AAA: 7,
                    }, colors: {
                        error: '#FF1A1A',
                        A: '#FF951A',
                        AA: '#FFE81A',
                        AAA: '#EDFF1A',
                    } }, settings);
                // remove old styles
                _$styles = _$styles.filter(($style) => {
                    $style.remove();
                    return false;
                });
                const textNodes = textNodesUnder($context);
                let totalNodes = textNodes.length, checkedNodes = 0, potentialPoints = 0, points = 0;
                // document.body.appendChild($canvas);
                window.parent.document.querySelector('iframe').style.display =
                    'none';
                let j = 0, computedStyle, elmColor, $scrollables = [];
                // @ts-ignore
                for (let [i, textNode] of textNodes.entries()) {
                    const str = textNode.data.trim();
                    // if (str === 'Get startedDD') {
                    //     break;
                    // }
                    if (str === '' || str.length < 3) {
                        continue;
                    }
                    // get text node rect
                    const range = document.createRange();
                    range.selectNodeContents(textNode);
                    const rects = range.getClientRects(), rect = rects[0];
                    // handle only text with at least 1 character
                    if (!rects.length) {
                        continue;
                    }
                    // get the container
                    const $container = textNode.parentElement;
                    // remove "scroll-snap-type" from closest scrollable
                    const $scrollable = __closestScrollable($container);
                    _console.log('SCRO', 'dd', $scrollable);
                    if ($scrollable && !$scrollables.includes($scrollable)) {
                        if ($scrollable.style.scrollSnapType) {
                            _console.log('Scroll', $scrollable);
                            $scrollable._originalScrollSnapType =
                                $scrollable.style.scrollSnapType;
                            $scrollable.style.scrollSnapType = 'none';
                            $scrollables.push($scrollable);
                            yield __wait();
                        }
                    }
                    // scroll the container into view
                    $container.scrollIntoView({
                        block: 'center',
                        behavior: 'instant',
                    });
                    // focus the element
                    let wasTabindex = false;
                    if (!$container.hasAttribute('tabindex')) {
                        $container.setAttribute('tabindex', '0');
                        $container.focus();
                    }
                    else {
                        wasTabindex = true;
                    }
                    yield __wait();
                    // make sure the container has a s-frontend-checker-id
                    if (!$container.hasAttribute('s-frontend-checker-id')) {
                        $container.setAttribute('s-frontend-checker-id', __uniqid());
                    }
                    let $elm, elmStyle, i = 0, stack = [];
                    while ($elm !== ((_a = $context.ownerDocument) !== null && _a !== void 0 ? _a : $context).body &&
                        i <= 200) {
                        $elm = ((_b = $context.ownerDocument) !== null && _b !== void 0 ? _b : $context)
                            // @ts-ignore
                            .elementFromPoint(Math.round(rect.x), Math.round(rect.y));
                        if (!$elm) {
                            break;
                        }
                        computedStyle = window.getComputedStyle($elm);
                        if (computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                            computedStyle.backgroundImage !== 'none') {
                            // check the opacity
                            if (computedStyle.backgroundColor &&
                                computedStyle.backgroundImage === 'none') {
                                const colorToCheck = new __SColor(computedStyle.backgroundColor);
                                if (colorToCheck.a !== 0) {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        $elm.style.pointerEvents = 'none';
                        elmStyle = $elm.style;
                        // add the element in the stack to reset it
                        stack.push($elm);
                        // update the secure index
                        i++;
                    }
                    // reset the pointer events of the stack
                    stack.forEach(($elmToReset) => {
                        $elmToReset.style.pointerEvents = 'unset';
                    });
                    if (!$elm) {
                        if (!wasTabindex) {
                            $container.removeAttribute('tabindex');
                        }
                        continue;
                    }
                    // render element to canvas
                    if (computedStyle.backgroundImage !== 'none') {
                        // get or generate the element "screenshot"
                        let $canvas;
                        if ($elm._ariaColorContrastCanvas) {
                            $canvas = $elm._ariaColorContrastCanvas;
                        }
                        else {
                            $canvas = yield __html2canvas($elm);
                            $elm._ariaColorContrastCanvas = $canvas;
                        }
                        const ctx = $canvas.getContext('2d');
                        // get the pixels under the text node
                        const portionData = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
                        // calculate the average color from the getted pixels
                        const average = averageData(portionData);
                        // set the element color
                        elmColor = `rgb(${average.r}, ${average.g}, ${average.b})`;
                        // document.body.appendChild($canvas);
                    }
                    else if (computedStyle.backgroundColor) {
                        elmColor = computedStyle.backgroundColor;
                    }
                    // if we don't have any element color, cannot make the contrast check...
                    if (!elmColor) {
                        if (!wasTabindex) {
                            $container.removeAttribute('tabindex');
                        }
                        continue;
                    }
                    // get the color text of the text node parent
                    const textColor = window.getComputedStyle($container).color;
                    // calculate the color
                    const contrastInfos = __SColor.getContrastInfo(textColor, elmColor);
                    // get the level of this constract
                    let elmLevel;
                    for (let [level, ratio] of Object.entries(settings.ratios)) {
                        if (contrastInfos.value < ratio) {
                            break;
                        }
                        elmLevel = level;
                    }
                    // update checked Nodes
                    checkedNodes++;
                    // update points
                    potentialPoints += 3;
                    points +=
                        elmLevel === 'A'
                            ? 1
                            : elmLevel === 'AA'
                                ? 2
                                : elmLevel === 'AAA'
                                    ? 3
                                    : 0;
                    const id = $container.getAttribute('s-frontend-checker-id');
                    const $style = __injectStyle(`
                    [s-frontend-checker-id="${id}"] {
                        position: ${$container.style.position !== ''
                        ? $container.style.position
                        : 'relative'}
                    }
                    [s-frontend-checker-id="${id}"]:hover:not([s-frontend-checker-id="${id}"]:has([s-frontend-checker-id]:hover)):after {
                        content: '${elmLevel} (${contrastInfos.value.toFixed(1)})';
                        text-transform: uppercase;
                        white-space: nowrap;
                        padding: 7px 9px;
                        position: absolute;
                        line-height: 1;
                        border-radius: 0;
                        top: 0;
                        right: 0;
                        background: ${settings.colors[elmLevel]};
                        color: black;
                        font-size: 12px !important;
                        font-weight: bold;
                        transform: translate(0, -100%);
                    }
                    [s-frontend-checker-id="${id}"]:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        border: 1px dashed ${settings.colors[elmLevel]};
                    }
                    `, {
                        // @ts-ignore
                        rootNode: (_c = $context.head) !== null && _c !== void 0 ? _c : $context,
                    });
                    // add this style tag to the styles stack to remove them at each check start
                    _$styles.push($style);
                    yield __wait();
                }
                // back to top
                window.parent.scrollTo(0, 0);
                // display iframe
                window.parent.document.querySelector('iframe').style.display =
                    'initial';
                // restore scroll snap types
                $scrollables.forEach(($scrollable) => {
                    $scrollable.style.removeProperty('scroll-snap-type');
                });
                const score = Math.round((100 / potentialPoints) * points);
                const finalStatus = score >= 100 ? 'success' : score >= 60 ? 'warning' : 'error';
                return {
                    status: finalStatus,
                    message: finalStatus === 'error'
                        ? `Their's to much contrast issues into your page. Please check...`
                        : finalStatus === 'warning'
                            ? `You have some contrast issues in your page. Please check...`
                            : "All contrasts seem's to be ok. Congrats!",
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQU14Qzs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxTQUFTLGNBQWMsQ0FBQyxFQUFFO0lBQ3RCLElBQUksQ0FBQyxFQUNELENBQUMsR0FBRyxFQUFFLEVBQ04sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUUsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLElBQUk7SUFDckIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQzNCLFNBQVMsR0FBRyxDQUFDLEVBQ2IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMvQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRVgsT0FBTyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFO1FB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