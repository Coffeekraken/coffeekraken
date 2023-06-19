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
 * @param 		{Function} 				        $depending          The element on which your floating one depends on
 * @return 		{Function} 								An IMakeFloatApi object with properties like `update` to update the position and `cancel` to cancel the floating behavior
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __makeFloat($1, $2)
 *
 * @example  	js
 * import { __makeFloat } from '@coffeekraken/sugar/dom'
 * __makeFloat($myElement, $dependingOn);
 *
 * @see         https://floating-ui.com
 * @since           2.0.0
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

export interface IMakeFloatApi {
    update: Function;
    cancel: Function;
}

export default function __makeFloat(
    $elm: HTMLElement,
    $depending: HTMLElement,
    settings?: Partial<IMakeFloatSettings>,
): IMakeFloatApi {
    const finalSettings: IMakeFloatSettings = {
        position: 'auto',
        shift: 10,
        offset: 0,
        arrow: false,
        arrowSize: 15,
        arrowPadding: 10,
        ...(settings ?? {}),
    };

    // add base class
    $depending.classList.add('s-floating');

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
        $arrow.classList.add('s-floating_arrow');
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
            // @ts-ignore
            placement: finalSettings.position,
            middleware: middlewares,
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign($elm.style, {
                position: 'absolute',
                top: `${y}px`,
                left: `${x}px`,
            });

            if (middlewareData.arrow) {
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]];
                Object.assign($arrow.style, {
                    position: 'absolute',
                    left:
                        middlewareData.arrow.x != null
                            ? `${middlewareData.arrow.x}px`
                            : '',
                    top:
                        middlewareData.arrow.y != null
                            ? `${middlewareData.arrow.y}px`
                            : '',
                    right: '',
                    bottom: '',
                    [staticSide]: '-4px',
                });
            }
        });
    };

    // first update
    update();

    // auto update
    const cancel = autoUpdate($depending, $elm, () => {
        update();
    });

    __whenRemoved($elm).then(() => {
        cancel();
    });
    __whenRemoved($depending).then(() => {
        cancel();
    });

    $depending.addEventListener('pointerover', () => {
        update();
    });

    // return the update function
    return {
        update,
        cancel,
    };
}
