import {
    arrow,
    autoPlacement,
    autoUpdate,
    computePosition,
    flip,
    inline,
    offset,
    shift,
} from '@floating-ui/dom';

import __whenRemoved from '../detect/whenRemoved';

/**
 * @name        makeFloat
 * @namespace            js.dom.ui
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * This function allows you to make an element float depending on another one.
 * It will make sure the element is placed as best as possible dependong on the page position,
 * surroundings, etc...
 * This make use of the AMAZING [Floating UI](https://floating-ui.com) library.
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{Function} 				        callback 	The callback function to call on each element. If this returns on an element, it will be the returned element
 * @return 		{Function} 								A function to
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import up from '@coffeekraken/sugar/js/dom/traverse/up'
 * const $elm = up($myElement, elm => {
 *      return elm.classList.contains('my-class')
 * });
 *
 * @see         https://floating-ui.com
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IMakeFloatSettings {
    position:
        | 'top'
        | 'right'
        | 'bottom'
        | 'left'
        | 'top-start'
        | 'top-end'
        | 'right-start'
        | 'right-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'left-start'
        | 'left-end'
        | 'auto';
    shift: number;
    offset: number;
    arrow: boolean;
    arrowSize: number;
    arrowPadding: number;
}

export default function makeFloat(
    $elm: HTMLElement,
    $depending: HTMLElement,
    settings?: Partial<IMakeFloatSettings>,
): void {
    const finalSettings: IMakeFloatSettings = {
        position: 'auto',
        shift: 10,
        offset: 0,
        arrow: false,
        arrowSize: 15,
        arrowPadding: 10,
        ...(settings ?? {}),
    };

    // preparing middlewares
    const middlewares = [
        offset(finalSettings.offset),
        shift({
            padding: finalSettings.shift,
        }),
        inline(),
    ];

    // check the placement
    if (finalSettings.position !== 'auto') {
        middlewares.push(flip());
    } else {
        middlewares.push(autoPlacement());
    }

    // handling arrow injection
    let $arrow;
    if (finalSettings.arrow) {
        $arrow = document.createElement('div');
        $arrow.classList.add('s-floating__arrow');
        $elm.append($arrow);
        middlewares.push(
            arrow({
                element: $arrow,
                padding: finalSettings.arrowPadding,
            }),
        );
    }

    // setting the arrow size through a css property
    if (finalSettings.arrowSize) {
        $elm.style.setProperty(`--arrow-size`, `${finalSettings.arrowSize}px`);
    }

    const update = async () => {
        const { x, y, placement, middlewareData } = await computePosition(
            $depending,
            $elm,
            {
                // @ts-ignore
                placement: finalSettings.position,
                middleware: middlewares,
            },
        );

        computePosition($depending, $elm, {
            placement: 'top',
            middleware: [flip(), shift()],
        }).then(({ x, y }) => {
            Object.assign($elm.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        });
    };

    // first update
    update();

    // auto update
    const cleanup = autoUpdate($depending, $elm, () => {
        update();
    });

    __whenRemoved($elm).then(() => {
        cleanup();
    });
    __whenRemoved($depending).then(() => {
        cleanup();
    });
}
