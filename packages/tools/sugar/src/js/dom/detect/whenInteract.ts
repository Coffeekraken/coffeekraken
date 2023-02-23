// @ts-nocheck

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
 * Wait that an interaction is made with the passed element like "focus", "focusIn", "pointerover", etc...
 *
 * @param 		{HTMLElement} 		elm 	        The html element you want to monitor
 * @param       {Partial<IInteractionSettings>}     [settings={}]           Some settings to configure your interaction detection
 * @return 		{Promise<HTMLElement>} 					A promise that will be resolved when an interaction has been made
 *
 * @setting         {boolean}           [pointerover=true]          Specify if you want to detect the pointerover or not
 * @setting         {boolean}           [pointerout=true]          Specify if you want to detect the pointerout or not
 * @setting         {boolean}           [pointerdown=true]          Specify if you want to detect the pointerdown or not
 * @setting         {boolean}           [touchstart=true]          Specify if you want to detect the touchstart or not
 * @setting         {boolean}           [touchend=true]          Specify if you want to detect the touchend or not
 * @setting         {boolean}           [focus=true]          Specify if you want to detect the focus or not
 *
 * @snippet         __whenInteract($1);
 * __whenInteract($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __whenInteract } from '@coffeekraken/sugar/js/dom/detect/whenInteract'
 * __whenInteract(myCoolElement).then($elm => {
 *      // do something...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWhenInteractSettings {
    pointerover: boolean;
    pointerout: boolean;
    pointerdown: boolean;
    touchstart: boolean;
    touchend: boolean;
    focus: boolean;
}

export default function __whenInteract(
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

            elm.removeEventListener('pointerover', pointerover);
            elm.removeEventListener('pointerout', pointerout);
            elm.removeEventListener('pointerdown', pointerdown);
            elm.removeEventListener('touchstart', touchstart);
            elm.removeEventListener('touchend', touchend);
            elm.removeEventListener('focus', focus);
            elm.removeEventListener('focusin', focus);
        }

        function pointerover(e) {
            interacted('pointerover');
        }
        if (settings.pointerover) {
            elm.addEventListener('pointerover', pointerover);
        }

        function pointerout(e) {
            interacted('pointerout');
        }
        if (settings.pointerout) {
            elm.addEventListener('pointerout', pointerout);
        }

        function pointerdown(e) {
            interacted('pointerdown');
        }
        if (settings.pointerdown) {
            elm.addEventListener('pointerdown', pointerdown);
        }

        function touchstart(e) {
            interacted('touchstart');
        }
        if (settings.touchstart) {
            elm.addEventListener('touchstart', touchstart, {
                passive: true,
            });
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
