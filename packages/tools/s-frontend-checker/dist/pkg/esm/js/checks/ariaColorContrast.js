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
            var _a, _b, _c, _d, _e;
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
                    const str = (_b = (_a = textNode.data) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
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
                    if ($scrollable && !$scrollables.includes($scrollable)) {
                        if ($scrollable.style.scrollSnapType) {
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
                    while ($elm !== ((_c = $context.ownerDocument) !== null && _c !== void 0 ? _c : $context).body &&
                        i <= 200) {
                        $elm = ((_d = $context.ownerDocument) !== null && _d !== void 0 ? _d : $context)
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
                        rootNode: (_e = $context.head) !== null && _e !== void 0 ? _e : $context,
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