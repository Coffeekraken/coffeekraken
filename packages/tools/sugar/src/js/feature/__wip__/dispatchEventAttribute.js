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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hFdmVudEF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3BhdGNoRXZlbnRBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNkVBQXlEO0lBQ3pELGtGQUE4RDtJQUU5RDs7Ozs7Ozs7Ozs7OztPQWFHO0lBRUgsb0RBQThCO0lBQzlCLDBFQUFzRDtJQUV0RCxTQUFTLDZCQUE2QixDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRXJDLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWhFLGlDQUFpQztRQUNqQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDMUIsSUFBSSxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztRQUMzQyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4QyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQU0sUUFBUSxHQUFHO1lBQ2YsU0FBUyxFQUFFLENBQUM7WUFDWixHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxJQUFJLEVBQUUsRUFBRTtZQUNSLEdBQUcsRUFBRSxFQUFFO1lBQ1AsVUFBVSxFQUFFLEVBQUU7WUFDZCxRQUFRLEVBQUUsRUFBRTtZQUNaLEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsRUFBRTtZQUNWLFFBQVEsRUFBRSxFQUFFO1lBQ1osR0FBRyxFQUFFLEVBQUU7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtZQUNkLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFLEVBQUU7WUFDVixNQUFNLEVBQUUsRUFBRTtZQUNWLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNM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