// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import hotkeys from 'hotkeys-js/dist/hotkeys.common';
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
 * @event           hotkeys.update           Dispatched from the rootNode(s) to notify when an hotkey has been added or removed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __hotkey($1)
 * __hotkey($1).on('press', e => {
 *      $2
 * });
 *
 * @example    js
 * import { __hotkey } from '@coffeekraken/sugar/keyboard'
 * const promise = __hotkey('ctrl+a');
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
    rootNode?: (HTMLElement | Document)[] | HTMLElement | Document;
    keyup?: boolean;
    keydown?: boolean;
    once?: boolean;
    splitKey?: string;
    title?: string;
    description?: string;
    private?: boolean;
}

export default function __hotkey(
    hotkey: string,
    settings: Partial<IHotkeySettings> = {},
): __SPromise<any> {
    // merge default settings with passed ones:
    settings = {
        rootNode: [document],
        keyup: false,
        keydown: true,
        once: false,
        splitKey: '+',
        title: hotkey,
        description: null,
        private: false,
        ...settings,
    };

    if (!Array.isArray(settings.rootNode)) {
        settings.rootNode = [settings.rootNode];
    }

    return new __SPromise(
        ({ resolve, reject, emit, cancel }) => {
            settings.rootNode.forEach((rootNode: HTMLElement) => {
                const documentElement = rootNode.ownerDocument ?? rootNode;
                // handle storing in "env.KOTKEYS" stack
                if (!settings.private) {
                    if (!documentElement?.env) {
                        documentElement.env = {};
                    }
                    if (!documentElement.env.HOTKEYS) {
                        documentElement.env.HOTKEYS = {};
                    }
                    if (!documentElement.env.HOTKEYS[hotkey]) {
                        setTimeout(() => {
                            rootNode.dispatchEvent(
                                new CustomEvent('hotkeys.update', {
                                    bubbles: true,
                                    detail: documentElement.env?.HOTKEYS,
                                }),
                            );
                        });
                    }
                    documentElement.env.HOTKEYS[hotkey] = {
                        title: settings.title,
                        description: settings.description,
                        hotkey,
                    };
                }

                // init the hotkey
                hotkeys(
                    hotkey,
                    {
                        element: rootNode,
                        ...settings,
                    },
                    (e, h) => {
                        // call the handler function
                        emit('press', e);
                        // unsubscribe if once is truc
                        if (settings.once) cancel();
                    },
                );
            });
        },
        {
            id: 'hotkey',
        },
    ).on('finally', () => {
        settings.rootNode.forEach((rootNode: HTMLElement) => {
            const documentElement = rootNode.ownerDocument ?? rootNode;
            delete documentElement.env?.HOTKEYS[hotkey];
            rootNode.dispatchEvent(
                new CustomEvent('hotkeys.update', {
                    bubbles: true,
                    detail: documentElement.env?.HOTKEYS,
                }),
            );
        });

        hotkeys.unbind(hotkey);
    });
}
