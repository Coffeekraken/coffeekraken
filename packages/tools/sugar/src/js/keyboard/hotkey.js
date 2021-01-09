// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "hotkeys-js/dist/hotkeys.common", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var hotkeys_common_1 = __importDefault(require("hotkeys-js/dist/hotkeys.common"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    hotkeys_common_1.default.filter = function (event) {
        return true;
    };
    /**
     * @name 		hotkey
     * @namespace           sugar.js.keyboard
     * @type      Function
     * @beta
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
     * @param        {String}       hotkey          The hotkey to detect
     * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
     * - element (null) {HTMLElement}: Specify an HTMLElement to detect keyboard events from
     * - keyup (false) {Boolean}: Detect on keyup
     * - keydown (true) {Boolean}: Detect on keydown
     * - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
     * - splitKey (*) {String}: Specify the split key to use in the sequences like "ctrl+a"
     * @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import hotkey from '@coffeekraken/sugar/js/keyboard/hotkey'
     * const promise = hotkey('ctrl+a');
     * promise.on('ctrl+a', (e) => {
     *    // do something...
     * });
     * promise.cancel();
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function hotkey(hotkey, settings) {
        if (settings === void 0) { settings = {}; }
        return new SPromise_1.default(function (resolve, reject, trigger, promiseApi) {
            // merge default settings with passed ones:
            settings = __assign({ element: null, keyup: false, keydown: true, once: false, splitKey: '+' }, settings);
            // init the hotkey
            hotkeys_common_1.default(hotkey, settings, function (e, h) {
                // call the handler function
                trigger('press', e);
                // unsubscribe if once is truc
                if (settings.once)
                    promiseApi.cancel();
            });
        }, {
            id: 'hotkey'
        }).on('finally', function () {
            hotkeys_common_1.default.unbind(hotkey);
        });
    }
    return hotkey;
});
//# sourceMappingURL=hotkey.js.map