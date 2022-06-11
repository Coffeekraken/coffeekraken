// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __WhenInteractSettingsInterface from './interface/WhenInteractSettingsInterface';

/**
 * @name      whenInteract
 * @namespace            js.dom.detect
 * @type      Function
 * @interface       ./interface/WhenInteractSettingsInterface.ts
 * @async
 * @platform          js
 * @status           beta
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
 * await whenInteract(myCoolElement, {});
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenInteractSettings {
    mouseover: boolean;
    mouseout: boolean;
    click: boolean;
    touchstart: boolean;
    touchend: boolean;
    focus: boolean;
}

export default function whenInteract(
    elm: HTMLElement,
    settings?: Partial<IWhenInteractSettings>,
): Promise<any> {
    return new Promise((resolve, reject) => {
        settings = <IWhenInteractSettings>(
            __WhenInteractSettingsInterface.apply(settings ?? {})
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
        if (settings.mouseover) {
            elm.addEventListener('mouseover', mouseover);
        }

        function mouseout(e) {
            interacted('mouseout');
        }
        if (settings.mouseout) {
            elm.addEventListener('mouseout', mouseout);
        }

        function click(e) {
            interacted('click');
        }
        if (settings.click) {
            elm.addEventListener('click', click);
        }

        function touchstart(e) {
            interacted('touchstart');
        }
        if (settings.touchstart) {
            elm.addEventListener('touchstart', touchstart);
        }

        function touchend(e) {
            interacted('touchend');
        }
        if (settings.touchend) {
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
