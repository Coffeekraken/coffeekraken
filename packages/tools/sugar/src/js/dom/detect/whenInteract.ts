// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

/**
 * @name      whenInteract
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @platform          ts
 * @stable
 *
 * Wait that an interaction is made with the passed element like "focus", "focusIn", "mouseover", etc...
 *
 * @param 		{HTMLElement} 		elm 	        The html element you want to monitor
 * @param       {Partial<IInteractionSettings>}     [settings={}]           Some settings to configure your interaction detection
 * @return 		{Promise} 					A promise that will be resolved when an interaction has been made
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import whenInteract from '@coffeekraken/sugar/js/dom/detect/whenInteract'
 * await whenInteract(myCoolElement, {
 *  focus: true,
 *  touch: false,
 *  mouse: true
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IWhenInteractTouchSettings {
    start: boolean;
    end: boolean;
}

export interface IWhenInteractMouseSettings {
    over: boolean;
    out: boolean;
    click: boolean;
}

export interface IWhenInteractSettings {
    touch: boolean | Partial<IWhenInteractTouchSettings>;
    mouse: booleam | Partial<IWhenInteractMouseSettings>;
}

export default function whenInteract(elm: HTMLElement, settings?: Partial<IWhenInteractSettings>): Promise<any> {
    return new Promise((resolve, reject) => {
        settings = <IWhenInteractSettings>__deepMerge(
            {
                mouse: {
                    over: true,
                    out: true,
                    click: true,
                },
                touch: {
                    start: true,
                    end: true,
                },
                focus: true,
            },
            settings ?? {},
        );

        function interacted(interaction) {
            // resolving the promise
            resolve(interaction);

            elm.removeEventListener('mouseover', mouseover);
            elm.removeEventListener('mouseout', mouseout);
            elm.removeEventListener('click', click);
            elm.removeEventListener('touchstart', touchstart);
            elm.removeEventListener('touchend', touchend);
            elm.removeEventListener('focus', focus);
            elm.removeEventListener('focusin', focus);
        }

        function mouseover(e) {
            interacted('mouseover');
        }
        if (settings.mouse === true || settings.mouse.over) {
            elm.addEventListener('mouseover', mouseover);
        }

        function mouseout(e) {
            interacted('mouseout');
        }
        if (settings.mouse === true || settings.mouse.out) {
            elm.addEventListener('mouseout', mouseout);
        }

        function click(e) {
            interacted('click');
        }
        if (settings.mouse === true || settings.mouse.click) {
            elm.addEventListener('click', click);
        }

        function touchstart(e) {
            interacted('touchstart');
        }
        if (settings.touch === true || settings.touch.start) {
            elm.addEventListener('touchstart', touchstart);
        }

        function touchend(e) {
            interacted('touchend');
        }
        if (settings.touch === true || settings.touch.start) {
            elm.addEventListener('touchend', touchend);
        }

        function focus(e) {
            interacted('focus');
        }
        if (settings.focus === true) {
            elm.addEventListener('focus', focus);
            elm.addEventListener('focusin', focus);
        }
    });
}
