import type { ISFrontendChecker } from '../types';

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
    var n,
        a = [],
        walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while ((n = walk.nextNode())) a.push(n);
    return a;
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

                let $elm,
                    elmStyle,
                    i = 0,
                    stack = [];

                while (
                    !elmStyle?.backgroundColor &&
                    !elmStyle?.backgroundImage &&
                    $elm !== ($context.ownerDocument ?? $context).body &&
                    i <= 200
                ) {
                    $elm = (
                        $context.ownerDocument ?? $context
                    ).elementFromPoint(
                        Math.round(rects[0].x),
                        Math.round(rects[0].y),
                    );

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

                const computedStyle = window.getComputedStyle($elm),
                    textColor = window.getComputedStyle($container).color;

                _console.log('Elm', textNode.data, $elm);
                __SColor.getContrastInfo(
                    textColor,
                    computedStyle.backgroundColor,
                );

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
