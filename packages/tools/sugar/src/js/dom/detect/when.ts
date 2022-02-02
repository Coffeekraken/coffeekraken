// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __whenInViewport, { IWhenInViewportSettings } from './whenInViewport';
import __whenNearViewport, { IWhenNearViewportSettings } from './whenNearViewport';
import __whenOutOfViewport, { IWhenOutOfViewportSettings } from './whenOutOfViewport';
import __whenInteract, { IWhenInteractSettings } from './whenInteract';
import __whenDomReady from './whenDomReady';
import __whenVisible, { IWhenVisibleSettings } from './whenVisible';
import __whenStylesheetsReady, { IWhenStyleSheetsReadySettings } from './whenStylesheetsReady';

/**
 * @name            when
 * @namespace       js.dom.detect
 * @type            Function
 * @async
 * @platform          js
 * @status        beta
 *
 * This function listen for passed `trigger(s)` on the passed `HTMLElement` and resolve the promise once one of them has reached his state.
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {String|String[]}       trigger     The trigger(s) to listen on
 * @param       {Function}              callback        The function to call when a trigger has reached his state
 * @param       {IwhenSettings}      [settings={}]       Some settings like offset, etc...
 *
 * @todo      tests
 *
 * @example         js
 * import when from '@coffeekraken/sugar/js/dom/detect/when';
 * when($elm, 'inViewport', () => {
 *      // do something
 * }, {
 *    whenInViewport: {
 *       offset: 50
 *    }
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IwhenSettings {
    whenInViewport?: IWhenInViewportSettings;
    whenNearViewport?: IWhenNearViewportSettings;
    whenOutOfViewport?: IWhenOutOfViewportSettings;
    whenInteract?: IWhenInteractSettings;
    whenVisible?: IWhenVisibleSettings;
    whenStylesheetsReady?: IWhenStyleSheetsReadySettings;
}

export type TWhenTrigger = 'direct' | 'directly' | 'inViewport' | 'nearViewport' | 'outOfViewport' | 'interact' | 'visible' | 'stylesheetsReady';

export const triggers = ['direct', 'directly', 'inViewport', 'nearViewport', 'outOfViewport', 'interact', 'visible', 'stylesheetsReady'];

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
                    promises.push(__whenInViewport($elm, finalSettings.whenInViewport));
                    break;
                case 'nearViewport':
                    promises.push(__whenNearViewport($elm, finalSettings.whenNearViewport));
                    break;
                case 'outOfViewport':
                    promises.push(__whenOutOfViewport($elm, finalSettings.whenOutOfViewport));
                    break;
                case 'interact':
                    promises.push(__whenInteract($elm, finalSettings.whenInteract));
                    break;
                case 'visible':
                    promises.push(__whenVisible($elm, finalSettings.whenVisible));
                    break;
                case 'domReady':
                    promises.push(__whenDomReady());
                    break;
                case 'stylesheetsReady':
                    promises.push(__whenStylesheetsReady($elm ? [$elm] : null));
                    break;
            }
        });

        // if no times setted, execute directly
        if (
            !trigger.length ||
            trigger.includes('direct') ||
            trigger.includes('directly')
        ) {
            resolve();
            return;
        }

        // listen for at least 1 promise resolved
        await Promise.race(promises);

        resolve();
    });
}
