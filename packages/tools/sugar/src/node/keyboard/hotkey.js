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
        define(["require", "exports", "../promise/SPromise", "../string/uniqid", "keypress", "../core/activeSpace", "../ipc/SIpc", "../is/childProcess"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var uniqid_1 = __importDefault(require("../string/uniqid"));
    var keypress_1 = __importDefault(require("keypress"));
    var activeSpace_1 = __importDefault(require("../core/activeSpace"));
    var SIpc_1 = __importDefault(require("../ipc/SIpc"));
    var childProcess_1 = __importDefault(require("../is/childProcess"));
    /**
     * @name                hotkey
     * @namespace           sugar.node.keyboard
     * @type                Function
     * @beta
     *
     * This function allows you to add keyboard listening process and subscribe to some sequences
     * using the SPromise instance returned.
     *
     * @param        {String}       hotkey          The hotkey to detect
     * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
     * - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
     * - splitKey (+) {String}: Specify the split key to use in the sequences like "ctrl+a"
     * - systemWide (false) {Boolean}: Specify if the listener have to listen for the application only events, or for the system level ones
     * @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import hotkey from '@coffeekraken/sugar/node/keyboard/hotkey';
     * const promise = hotkey('ctrl+a').on('key', (e) => {
     *    // do something...
     * });
     * promise.cancel();
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var hotkeyStack = {};
    var isListenerAlreadyAdded = false;
    var isSystemWideAlreadyAdded = false;
    function _handleKeypress(ch, keyObj) {
        if (keyObj && keyObj.ctrl && keyObj.name == 'c') {
            // process.stdin.pause();
            process.emit('custom_exit');
        }
        // loop on each promises registered
        Object.keys(hotkeyStack).forEach(function (id) {
            var obj = hotkeyStack[id];
            if (!obj || !obj.key)
                return;
            // check if an activeSpace is specified
            if (obj.settings.disableWhenEditingForm) {
                if (activeSpace_1.default.is('**.form.*'))
                    return;
            }
            if (obj.settings.activeSpace) {
                if (!activeSpace_1.default.is(obj.settings.activeSpace))
                    return;
            }
            // check if an "active" function exists
            if (obj.settings.active && typeof obj.settings.active === 'function') {
                if (!obj.settings.active(obj.key))
                    return;
            }
            obj.key
                .toString()
                .split(',')
                .map(function (m) { return m.trim(); })
                .forEach(function (key) {
                if (ch && ch.toString() === key) {
                    obj.promise.trigger('key', {
                        key: key,
                        ctrl: keyObj ? keyObj.ctrl : false,
                        meta: keyObj ? keyObj.meta : false,
                        shift: keyObj ? keyObj.shift : false
                    });
                    obj.promise.trigger('press', {
                        key: key,
                        ctrl: keyObj ? keyObj.ctrl : false,
                        meta: keyObj ? keyObj.meta : false,
                        shift: keyObj ? keyObj.shift : false
                    });
                    return;
                }
                if (!keyObj)
                    return;
                var pressedKey = keyObj.name;
                if (keyObj.ctrl)
                    pressedKey = "ctrl" + obj.settings.splitKey + pressedKey;
                if (keyObj.shift)
                    pressedKey = "shift" + obj.settings.splitKey + pressedKey;
                if (keyObj.meta)
                    pressedKey = "alt" + obj.settings.splitKey + pressedKey;
                if (pressedKey === key) {
                    obj.promise.trigger('key', {
                        key: key,
                        ctrl: keyObj ? keyObj.ctrl : false,
                        meta: keyObj ? keyObj.meta : false,
                        shift: keyObj ? keyObj.shift : false
                    });
                    obj.promise.trigger('press', {
                        key: key,
                        ctrl: keyObj ? keyObj.ctrl : false,
                        meta: keyObj ? keyObj.meta : false,
                        shift: keyObj ? keyObj.shift : false
                    });
                }
            });
        });
    }
    function hotkey(key, settings) {
        if (settings === void 0) { settings = {}; }
        // extends the settings
        settings = __assign({ once: false, splitKey: '+', systemWide: false, activeSpace: null, disableWhenEditingForm: true, ipc: true }, settings);
        if (!childProcess_1.default()) {
            var uniqid_2 = "hotkey." + uniqid_1.default();
            if (!isListenerAlreadyAdded || !isSystemWideAlreadyAdded) {
                if (settings.systemWide && !isSystemWideAlreadyAdded) {
                    isSystemWideAlreadyAdded = true;
                    // @TODO      implement system wide hotkeys
                    throw "System wide hotkeys are not implemented yet...";
                    // console.log('CCC');
                    // // __ioHook.on('keydown', function (event) {
                    // //   console.log(event);
                    // //   __ioHook.start();
                    // // });
                    // __ioHook.registerShortcut([30], (keys) => {
                    //   console.log('SOM', keys);
                    // });
                    __ioHook.start();
                }
                else if (!isListenerAlreadyAdded) {
                    isListenerAlreadyAdded = true;
                    keypress_1.default(process.stdin);
                    process.stdin.on('keypress', _handleKeypress);
                    // process.stdin.setRawMode(true);
                    // process.stdin.resume();
                }
            }
            var promise_1 = new SPromise_1.default({
                id: 'hotkey'
            })
                .on('press', function (key) {
                if (settings.once) {
                    promise_1.cancel();
                }
            })
                .on('finally', function () {
                // delete the callback from the stack
                delete hotkeyStack[uniqid_2];
            });
            // save the trigger function in the stack
            hotkeyStack[uniqid_2] = {
                key: key,
                promise: promise_1,
                settings: settings
            };
            // return the promise
            return promise_1;
        }
        else if (settings.ipc) {
            var promise_2 = new SPromise_1.default({
                id: 'hotkey'
            });
            // child process
            SIpc_1.default.on("keypress." + key, function (keyObj) {
                promise_2.trigger('key', keyObj);
                promise_2.trigger('press', keyObj);
            });
            setTimeout(function () {
                SIpc_1.default.trigger("keypress", {
                    key: key,
                    settings: settings
                });
            }, 2000);
            return promise_2;
        }
    }
    if (!childProcess_1.default()) {
        SIpc_1.default.on('keypress', function (keyObj) {
            hotkey(keyObj.key).on('press', function (pressedKeyObj) {
                SIpc_1.default.trigger("keypress." + keyObj.key, pressedKeyObj);
            });
        });
    }
    return hotkey;
});
