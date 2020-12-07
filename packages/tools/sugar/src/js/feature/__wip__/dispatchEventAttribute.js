// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../object/getKeyByValue", "../../dom/querySelectorLive", "fastdom", "../../dom/dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getKeyByValue_1 = __importDefault(require("../../object/getKeyByValue"));
    var querySelectorLive_1 = __importDefault(require("../../dom/querySelectorLive"));
    /**
     * @name 		dispatchEventAttribute
     * @namespace           sugar.js.feature
     * @type      Feature
     *
     * Add the possibility to dispatch an event named as you want
     * when the native event is listened. By default the feature listen for
     * the click event unless you specify another one by using the format "{event}:{eventNameToDispach}"
     *
     * @example 	js
     * import '@coffeekraken/sugar/js/feature/dispatchEventAttribute'
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var fastdom_1 = __importDefault(require("fastdom"));
    var dispatchEvent_1 = __importDefault(require("../../dom/dispatchEvent"));
    function handleDispatchEventAttributes(e) {
        e.preventDefault();
        var field = e.target ? e.target : e;
        if (!field || !field.tagName)
            return;
        var dispatchEventValue = field.getAttribute('dispatch-event');
        // handle the dispatchEvent value
        var nativeEvent = 'click';
        var dispatchEventName = dispatchEventValue;
        if (dispatchEventValue.indexOf(':') > -1) {
            nativeEvent = dispatchEventValue.split(':')[0];
            dispatchEventName = dispatchEventValue.split(':')[1];
        }
        var keyCodes = {
            backspace: 8,
            tab: 9,
            enter: 13,
            shift: 16,
            ctrl: 17,
            alt: 18,
            pausebreak: 19,
            capslock: 20,
            esc: 27,
            space: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            leftarrow: 37,
            uparrow: 38,
            rightarrow: 39,
            downarrow: 40,
            insert: 45,
            delete: 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            leftwindowkey: 91,
            rightwindowkey: 92,
            selectkey: 93,
            numpad0: 96,
            numpad1: 97,
            numpad2: 98,
            numpad3: 99,
            numpad4: 100,
            numpad5: 101,
            numpad6: 102,
            numpad7: 103,
            numpad8: 104,
            numpad9: 105,
            multiply: 106,
            add: 107,
            subtract: 109,
            decimalpoint: 110,
            divide: 111,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            numlock: 144,
            scrolllock: 145,
            semicolon: 186,
            equalsign: 187,
            comma: 188,
            dash: 189,
            period: 190,
            forwardslash: 191,
            graveaccent: 192,
            openbracket: 219,
            backslash: 220,
            closebracket: 221,
            singlequote: 222
        };
        var dispatchEventData = JSON.parse(field.getAttribute('dispatch-event-data')) || {};
        fastdom_1.default.mutate(function () {
            if (e.keyCode) {
                var keyName = getKeyByValue_1.default(keyCodes, e.keyCode);
                if (nativeEvent.toLowerCase() === keyName ||
                    nativeEvent.toLowerCase() === "on" + keyName.toLowerCase()) {
                    dispatchEvent_1.default(field, dispatchEventName, dispatchEventData);
                }
            }
            else {
                // means that we have a click
                if (nativeEvent === 'click') {
                    dispatchEvent_1.default(field, dispatchEventName, dispatchEventData);
                }
            }
        });
    }
    querySelectorLive_1.default('[dispatch-event]', function ($elm) {
        $elm.addEventListener('click', handleDispatchEventAttributes);
        $elm.addEventListener('keyup', handleDispatchEventAttributes);
    });
});
//# sourceMappingURL=dispatchEventAttribute.js.map