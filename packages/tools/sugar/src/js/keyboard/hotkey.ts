// @ts-nocheck

import hotkeys from 'hotkeys-js/dist/hotkeys.common';
import __SPromise from '@coffeekraken/s-promise';
hotkeys.filter = function () {
    return true;
};

/**
 * @name 		hotkey
 * @namespace            js.keyboard
 * @type      Function
 * @platform          js
 * @status              beta
 *
 * Simple function to add a hotkey like "ctrl+a" and an handler function that will be called when the hotkey has been pressed
 * The following keys are supported:
 * - shift, option, alt, ctrl, control, command
 * - backspace, tab, clear, enter, return, esc, escape, space, up, down, left, right, home, end, pageup, pagedown, del, delete
 * - from f1 to f19
 * - all the letters keys
 *
 * You can pass an option object to your hotkey function call.
 *
 * @setting      {HTMLElement}      [element=null]          Specify an HTMLElement to detect keyboard events from
 * @setting      {Boolean}          [keyup=false]           Detect on keyup
 * @setting      {Boolean}          [keydown=true]          Detect on keydown
 * @setting      {Boolean}          [once=false]            Specify if you want to detect the keyboard event just once
 * @setting      {String}           [splitKey='+']           Specify the split key to use in the sequences like "ctrl+a"
 *
 * @param        {String}       hotkey          The hotkey to detect
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import hotkey from '@coffeekraken/sugar/js/keyboard/hotkey'
 * const promise = hotkey('ctrl+a');
 * promise.on('press', (e) => {
 *    // do something...
 * });
 * promise.cancel();
 *
 * @see         https://www.npmjs.com/package/hotkeys-js
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IHotkeySettings {
    element: HTMLElement;
    keyup: boolean;
    keydown: boolean;
    once: boolean;
    splitKey: string;
}

function hotkey(
    hotkey: string,
    settings: Partial<IHotkeySettings> = {},
): __SPromise<any> {
    return new __SPromise(
        ({ resolve, reject, emit, cancel }) => {
            // merge default settings with passed ones:
            settings = {
                element: null,
                keyup: false,
                keydown: true,
                once: false,
                splitKey: '+',
                ...settings,
            };

            // init the hotkey
            hotkeys(hotkey, settings, (e, h) => {
                // call the handler function
                emit('press', e);
                // unsubscribe if once is truc
                if (settings.once) cancel();
            });
        },
        {
            id: 'hotkey',
        },
    ).on('finally', () => {
        hotkeys.unbind(hotkey);
    });
}
export default hotkey;
