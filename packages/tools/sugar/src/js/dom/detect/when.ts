// @ts-nocheck

import type { IWhenEntersViewportSettings } from './whenEntersViewport.js';
import type { IWhenInteractSettings } from './whenInteract.js';
import type { IWhenInViewportSettings } from './whenInViewport.js';
import type { IWhenNearViewportSettings } from './whenNearViewport.js';
import type { IWhenOutOfViewportSettings } from './whenOutOfViewport.js';
import type { IWhenStyleSheetsReadySettings } from './whenStylesheetsReady.js';
import type { IWhenVisibleSettings } from './whenVisible.js';

import __whenAnimationEnd from './whenAnimationEnd.js';
import __whenEntersViewport from './whenEntersViewport.js';
import __whenInteract from './whenInteract.js';
import __whenInViewport from './whenInViewport.js';
import __whenLod from './whenLod.js';
import __whenNearViewport from './whenNearViewport.js';
import __whenOutOfViewport from './whenOutOfViewport.js';
import __whenStylesheetsReady from './whenStylesheetsReady.js';
import __whenVisible from './whenVisible.js';

/**
 * @name            when
 * @namespace       js.dom.detect
 * @type            Function
 * @platform          js
 * @status        stable
 * @async
 *
 * This function listen for passed `trigger(s)` on the passed `HTMLElement` and resolve the promise once one of them has reached his state.
 * Available triggers:
 * - direct|directly        : Resolve promise directly
 * - inViewport             : Resolved when element in is viewport
 * - nearViewport           : Resolved when element is near the viewport
 * - enterViewport          : Resolved when element enter the viewport
 * - outOfViewport          : Resolved when element exit the viewport
 * - interact               : Resolved when the user interact with the element (hover, click, focus, etc...)
 * - visible                : Resolved when the element became visible
 * - domReady               : Resolved when the dom is ready
 * - stylesheetsReady       : Resolved when all the stylesheets are ready
 * - animationEnd           : Resolved when the animation on the element is ended
 * - timeout:%ms            : Resolved after the specified timeout
 * - event:%eventName       : Resolved when the specified event is detected
 * - lod:%lod               : Resolved when the lod (level of details) is reached
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {String|String[]}       trigger     The trigger(s) to listen on
 * @param       {IwhenSettings}      [settings={}]       Some settings like offset, etc...
 * @return      {SPromise<HTMLElement>}                 A promise resolved when all the triggers are fulfilled
 *
 * @setting         {Partial<IWhenInViewportSettings>}          [whenInViewport={}]            Some settings for the whenInViewport function
 * @setting         {Partial<IWhenNearViewportSettings>}        [whenNearViewport={}]           Some settings for the whenNearViewport function
 * @setting         {Partial<IWhenEntersViewportSettubgs>}      [whenEntersViewport={}]         Some settings for the whenEntersViewport function
 * @setting         {Partial<IWhenOutOfViewportSettings>}      [whenOutOfViewport={}]         Some settings for the whenOutOfViewport function
 * @setting         {Partial<IWhenInteractSettings>}      [whenInteract={}]         Some settings for the whenInteract function
 * @setting         {Partial<IWhenVisibleSettings>}      [whenVisible={}]         Some settings for the whenVisible function
 * @setting         {Partial<IWhenStyleSheetsReadySettings>}      [whenStylesheetsReady={}]         Some settings for the whenStylesheetsReady function
 *
 * @snippet         __when($1, $2, $3)
 * __when($1, $2).then(() => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example         js
 * import { __when } from '@coffeekraken/sugar/dom';
 * __when($elm, 'inViewport', {
 *    whenInViewport: {
 *       offset: 50
 *    }
 * }).then(() => {
 *      // do something
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IwhenSettings {
    whenInViewport?: IWhenInViewportSettings;
    whenNearViewport?: IWhenNearViewportSettings;
    whenEntersViewport?: IWhenEntersViewportSettings;
    whenOutOfViewport?: IWhenOutOfViewportSettings;
    whenInteract?: IWhenInteractSettings;
    whenVisible?: IWhenVisibleSettings;
    whenStylesheetsReady?: IWhenStyleSheetsReadySettings;
}

export type TWhenTrigger =
    | 'direct'
    | 'directly'
    | 'inViewport'
    | 'nearViewport'
    | 'enterViewport'
    | 'outOfViewport'
    | 'interact'
    | 'visible'
    | 'domReady'
    | 'stylesheetsReady'
    | 'animationEnd'
    | 'lod:0'
    | 'lod:1'
    | 'lod:2'
    | 'lod:3'
    | 'lod:4';

export const WhenTriggers = [
    'direct',
    'directly',
    'inViewport',
    'nearViewport',
    'enterViewport',
    'outOfViewport',
    'interact',
    'visible',
    'stylesheetsReady',
    'domReady',
    'animationEnd',
    'lod:0',
    'lod:1',
    'lod:2',
    'lod:3',
    'lod:4',
];

export default function __when(
    $elm: HTMLElement,
    trigger: TWhenTrigger[],
    settings?: IwhenSettings,
): Promise<any> {
    const finalSettings: IwhenSettings = {
        whenInViewport: {},
        whenNearViewport: {},
        whenOutOfViewport: {},
        whenInteract: {},
        whenVisible: {},
        whenStylesheetsReady: {},
        ...(settings ?? {}),
    };

    return new Promise(async (resolve, reject) => {
        // ensure we work with an array of time(s)
        if (!Array.isArray(trigger))
            trigger = trigger.split(',').map((t) => t.trim());

        const promises: Promise = [];

        // adding watchers
        trigger.forEach((t) => {
            // lod (level of defails)
            const lodMatches = t.match(/^lod\:([0-9]{1,2})/);
            if (lodMatches && lodMatches[1]) {
                const level = parseInt(lodMatches[1]);
                promises.push(__whenLod(level));
                return;
            }

            // timeout
            const timeoutMatches = t.match(/^timeout\:([0-9]+)/);
            if (timeoutMatches && timeoutMatches[1]) {
                const timeout = parseInt(timeoutMatches[1]);
                const promise = new Promise((resolve) => {
                    setTimeout(resolve, timeout);
                });
                promises.push(promise);
                return;
            }

            // event
            const eventMatches = t.match(/^event\:[a-zA-Z0-9-_\.]/);
            if (eventMatches && eventMatches[1]) {
                const promise = new Promise((resolve) => {
                    $elm.addEventListener(eventMatches[1], (e) => {
                        resolve();
                    });
                });
                promises.push(promise);
                return;
            }

            switch (t) {
                case 'inViewport':
                    promises.push(
                        __whenInViewport($elm, finalSettings.whenInViewport),
                    );
                    break;
                case 'nearViewport':
                    promises.push(
                        __whenNearViewport(
                            $elm,
                            finalSettings.whenNearViewport,
                        ),
                    );
                    break;
                case 'entersViewport':
                    promises.push(
                        __whenEntersViewport(
                            $elm,
                            finalSettings.whenEntersViewport,
                        ),
                    );
                    break;
                case 'outOfViewport':
                    promises.push(
                        __whenOutOfViewport(
                            $elm,
                            finalSettings.whenOutOfViewport,
                        ),
                    );
                    break;
                case 'interact':
                    promises.push(
                        __whenInteract($elm, finalSettings.whenInteract),
                    );
                    break;
                case 'visible':
                    promises.push(
                        __whenVisible($elm, {
                            whenVisible: finalSettings.whenVisible,
                            once: true,
                        }),
                    );
                    break;
                case 'domReady':
                    promises.push(__whenDomReady());
                    break;
                case 'stylesheetsReady':
                    promises.push(__whenStylesheetsReady($elm ? [$elm] : null));
                    break;
                case 'animationEnd':
                    promises.push(__whenAnimationEnd($elm));
                    break;
            }
        });

        // if no times setted, execute directly
        if (
            !trigger.length ||
            trigger.includes('direct') ||
            trigger.includes('directly')
        ) {
            resolve($elm);
            return;
        }

        // listen for at least 1 promise resolved
        await Promise.race(promises);

        resolve($elm);
    });
}
