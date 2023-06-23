import __SColor from '@coffeekraken/s-color';
import __html2canvas from 'html2canvas';
import type { ISFrontendChecker } from '../types';

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

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaColorContrast',
        name: 'Aria color contrast',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Check all the text elements to see if they are on a background that make suffisent contrast or not',
        level: 1,
        async check({ $context }) {
            const textNodes = textNodesUnder($context);

            // const $canvas = await __html2canvas($context.body ?? $context);CNF.t

            // document.body.appendChild($canvas);
            window.parent.document.querySelector('iframe').style.display =
                'none';

            let j = 0,
                computedStyle,
                elmColor;

            for (let [i, textNode] of textNodes.entries()) {
                const $container = textNode.parentElement;

                if (textNode.data !== '°') {
                    continue;
                }

                const range = document.createRange();
                range.selectNodeContents(textNode);
                const rects = range.getClientRects(),
                    rect = rects[0];

                // handle only text with at least 1 character
                if (!rects.length) {
                    continue;
                }

                $container.style.pointerEvents = 'none';

                let $elm,
                    elmStyle,
                    i = 0,
                    stack = [];

                while (
                    $elm !== ($context.ownerDocument ?? $context).body &&
                    i <= 200
                ) {
                    $elm = (
                        $context.ownerDocument ?? $context
                    ).elementFromPoint(Math.round(rect.x), Math.round(rect.y));

                    if (!$elm) {
                        break;
                    }

                    computedStyle = window.getComputedStyle($elm);
                    if (
                        computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                        computedStyle.backgroundImage !== 'none'
                    ) {
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
                    const $canvas = await __html2canvas($elm);

                    const ctx = $canvas.getContext('2d');
                    // ctx.fillStyle = 'red';
                    const portionData = ctx.getImageData(
                        rect.x,
                        rect.y,
                        rect.width,
                        rect.height,
                    );

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
                } else if (computedStyle.backgroundColor) {
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
        },
    };
}
