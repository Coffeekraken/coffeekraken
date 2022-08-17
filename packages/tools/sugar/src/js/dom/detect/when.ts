// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';

import type { IWhenInViewportSettings } from './whenInViewport';
import __whenInViewport from './whenInViewport';

import type { IWhenNearViewportSettings } from './whenNearViewport';
import __whenNearViewport from './whenNearViewport';

import type { IWhenEntersViewportSettings } from './whenEntersViewport';
import __whenEntersViewport from './whenEntersViewport';

import type { IWhenOutOfViewportSettings } from './whenOutOfViewport';
import __whenOutOfViewport from './whenOutOfViewport';

import type { IWhenInteractSettings } from './whenInteract';
import __whenInteract from './whenInteract';

import __whenDomReady from './whenDomReady';

import type { IWhenVisibleSettings } from './whenVisible';
import __whenVisible from './whenVisible';

import type { IWhenStyleSheetsReadySettings } from './whenStylesheetsReady';
import __whenStylesheetsReady from './whenStylesheetsReady';

import __whenAnimationEnd from './whenAnimationEnd';

/**
 * @name            when
 * @namespace       js.dom.detect
 * @type            Function
 * @platform          js
 * @status        stable
 * @async
 *
 * This function listen for passed `trigger(s)` on the passed `HTMLElement` and resolve the promise once one of them has reached his state.
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
 * @todo      tests
 *
 * @example         js
 * import __when from '@coffeekraken/sugar/js/dom/detect/when';
 * __when($elm, 'inViewport', () => {
 *      // do something
 * }, {
 *    whenInViewport: {
 *       offset: 50
 *    }
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
    | 'animationEnd';

export const triggers = [
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
];

export default function when(
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

    return new __SPromise(async ({ resolve, reject }) => {
        // ensure we work with an array of time(s)
        if (!Array.isArray(trigger))
            trigger = trigger.split(',').map((t) => t.trim());

        const promises: Promise = [];

        // adding watchers
        trigger.forEach((t) => {
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
                        __whenVisible($elm, finalSettings.whenVisible),
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
