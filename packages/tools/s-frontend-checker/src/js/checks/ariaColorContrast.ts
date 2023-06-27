import __SColor from '@coffeekraken/s-color';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __closestScrollable, __injectStyle } from '@coffeekraken/sugar/dom';
import { __uniqid } from '@coffeekraken/sugar/string';
import __html2canvas from 'html2canvas';
import type {
    ISFrontendChecker,
    ISFrontendCheckerCheckAriaColotContrastSettings,
} from '../types';

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
    var n,
        a = [],
        walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while ((n = walk.nextNode())) a.push(n);
    return a;
}

function averageData(data) {
    const length = data.data.length,
        blockSize = 1,
        rgb = { r: 0, g: 0, b: 0 };
    let count = 0,
        i = -4;

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

let _$styles: HTMLStyleElement[] = [];

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaColorContrast',
        name: 'Aria color contrast',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        lazy: true,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>',
        description:
            'Check all the text elements to see if they are on a background that make suffisent contrast or not',
        level: __SFrontendChecker.LEVEL_HIGH,
        async check({
            $context,
            settings,
        }: {
            $context: HTMLElement;
            settings: ISFrontendCheckerCheckAriaColotContrastSettings;
        }) {
            settings = {
                level: 'AA',
                ratios: {
                    error: 0,
                    A: 3.5,
                    AA: 4.5,
                    AAA: 7,
                },
                colors: {
                    error: '#FF1A1A',
                    A: '#FF951A',
                    AA: '#FFE81A',
                    AAA: '#EDFF1A',
                },
                ...settings,
            };

            // remove old styles
            _$styles = _$styles.filter(($style) => {
                $style.remove();
                return false;
            });

            const textNodes = textNodesUnder($context);
            let totalNodes = textNodes.length,
                checkedNodes = 0,
                potentialPoints = 0,
                points = 0;

            // document.body.appendChild($canvas);
            window.parent.document.querySelector('iframe').style.display =
                'none';

            let j = 0,
                computedStyle,
                elmColor,
                $scrollables: HTMLElement[] = [];

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
                const rects = range.getClientRects(),
                    rect = rects[0];

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
                        await __wait();
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
                } else {
                    wasTabindex = true;
                }

                await __wait();

                // make sure the container has a s-frontend-checker-id
                if (!$container.hasAttribute('s-frontend-checker-id')) {
                    $container.setAttribute(
                        's-frontend-checker-id',
                        __uniqid(),
                    );
                }

                let $elm,
                    elmStyle,
                    i = 0,
                    stack = [];

                while (
                    $elm !== ($context.ownerDocument ?? $context).body &&
                    i <= 200
                ) {
                    $elm = ($context.ownerDocument ?? $context)
                        // @ts-ignore
                        .elementFromPoint(
                            Math.round(rect.x),
                            Math.round(rect.y),
                        );

                    if (!$elm) {
                        break;
                    }

                    computedStyle = window.getComputedStyle($elm);
                    if (
                        computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                        computedStyle.backgroundImage !== 'none'
                    ) {
                        // check the opacity
                        if (
                            computedStyle.backgroundColor &&
                            computedStyle.backgroundImage === 'none'
                        ) {
                            const colorToCheck = new __SColor(
                                computedStyle.backgroundColor,
                            );
                            if (colorToCheck.a !== 0) {
                                break;
                            }
                        } else {
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
                    } else {
                        $canvas = await __html2canvas($elm);
                        $elm._ariaColorContrastCanvas = $canvas;
                    }
                    const ctx = $canvas.getContext('2d');

                    // get the pixels under the text node
                    const portionData = ctx.getImageData(
                        rect.x,
                        rect.y,
                        rect.width,
                        rect.height,
                    );

                    // calculate the average color from the getted pixels
                    const average = averageData(portionData);

                    // set the element color
                    elmColor = `rgb(${average.r}, ${average.g}, ${average.b})`;

                    // document.body.appendChild($canvas);
                } else if (computedStyle.backgroundColor) {
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
                const contrastInfos = __SColor.getContrastInfo(
                    textColor,
                    elmColor,
                );

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
                const $style = __injectStyle(
                    `
                    [s-frontend-checker-id="${id}"] {
                        position: ${
                            $container.style.position !== ''
                                ? $container.style.position
                                : 'relative'
                        }
                    }
                    [s-frontend-checker-id="${id}"]:hover:not([s-frontend-checker-id="${id}"]:has([s-frontend-checker-id]:hover)):after {
                        content: '${elmLevel} (${contrastInfos.value.toFixed(
                        1,
                    )})';
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
                    `,
                    {
                        // @ts-ignore
                        rootNode: $context.head ?? $context,
                    },
                );

                // add this style tag to the styles stack to remove them at each check start
                _$styles.push($style);

                await __wait();
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

            const finalStatus =
                score >= 100 ? 'success' : score >= 60 ? 'warning' : 'error';

            return {
                status: finalStatus,
                message:
                    finalStatus === 'error'
                        ? `Their's to much contrast issues into your page. Please check...`
                        : finalStatus === 'warning'
                        ? `You have some contrast issues in your page. Please check...`
                        : "All contrasts seem's to be ok. Congrats!",
            };
        },
    };
}
