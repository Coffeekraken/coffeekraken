// @ts-nocheck

import { __dispatchEvent } from '@coffeekraken/sugar/dom';

/**
 * @name 		handleInputAttributes
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status        beta
 *
 * Add some events on some DOM Elements. Here's the list:
 * - enter (onenter): Triggered when user tap ```enter``` on his keyboard from a **input*** or **textarea** element
 * - escape (onescape): Triggered when user tap ```escape``` on his keyboard from a **input*** or **textarea** element
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Boolean}       [enter=true]        Specify if you want to "enter" keyboard event
 * @setting       {Boolean}       [escape=true]        Specify if you want to "escape" keyboard event
 *
 * @event       enter           Dispatched when the user tap the enter key in an input/textarea
 * @event       escape          Dispatches when the user tap the escape key in an input/textarea
 *
 * @todo        interface
 * @todo        doc
 * @todo        tests
 * @todo        add setting to specify on which elements you want to enable the feature
 *
 * @example 	js
 * import { __inputAdditionalEvents } from '@coffeekraken/sugar/feature';
 * __inputAdditionalEvents();
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IInputAdditionalEventsSettings {
    enter: boolean;
    escape: boolean;
}

export default function __inputAdditionalEvents(
    settings: Partial<IInputAdditionalEventsSettings> = {},
): void {
    settings = {
        enter: true,
        escape: true,
        ...settings,
    };

    function handleInputAttributes(e) {
        const field = e.target ? e.target : e;
        if (!field || !field.tagName) return;
        switch (field.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
                if (e.keyCode) {
                    switch (e.keyCode) {
                        case 13: // enter
                            if (settings.enter) {
                                __dispatchEvent(field, 'enter');
                            }
                            break;
                        case 27: // escape
                            if (settings.escape) {
                                __dispatchEvent(field, 'escape');
                            }
                            break;
                    }
                }
                break;
        }
    }

    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
}
