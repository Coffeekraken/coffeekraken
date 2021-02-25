// @ts-nocheck
import __getKeyByValue from '../../object/getKeyByValue';
import __querySelectorLive from '../../dom/querySelectorLive';
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
import fastdom from 'fastdom';
import __dispatchEvent from '../../dom/dispatchEvent';
function handleDispatchEventAttributes(e) {
    e.preventDefault();
    const field = e.target ? e.target : e;
    if (!field || !field.tagName)
        return;
    const dispatchEventValue = field.getAttribute('dispatch-event');
    // handle the dispatchEvent value
    let nativeEvent = 'click';
    let dispatchEventName = dispatchEventValue;
    if (dispatchEventValue.indexOf(':') > -1) {
        nativeEvent = dispatchEventValue.split(':')[0];
        dispatchEventName = dispatchEventValue.split(':')[1];
    }
    const keyCodes = {
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
    const dispatchEventData = JSON.parse(field.getAttribute('dispatch-event-data')) || {};
    fastdom.mutate(() => {
        if (e.keyCode) {
            const keyName = __getKeyByValue(keyCodes, e.keyCode);
            if (nativeEvent.toLowerCase() === keyName ||
                nativeEvent.toLowerCase() === `on${keyName.toLowerCase()}`) {
                __dispatchEvent(field, dispatchEventName, dispatchEventData);
            }
        }
        else {
            // means that we have a click
            if (nativeEvent === 'click') {
                __dispatchEvent(field, dispatchEventName, dispatchEventData);
            }
        }
    });
}
__querySelectorLive('[dispatch-event]', ($elm) => {
    $elm.addEventListener('click', handleDispatchEventAttributes);
    $elm.addEventListener('keyup', handleDispatchEventAttributes);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hFdmVudEF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3BhdGNoRXZlbnRBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZUFBZSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sbUJBQW1CLE1BQU0sNkJBQTZCLENBQUM7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUVILE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLGVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQUV0RCxTQUFTLDZCQUE2QixDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87UUFBRSxPQUFPO0lBRXJDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRWhFLGlDQUFpQztJQUNqQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUM7SUFDMUIsSUFBSSxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztJQUMzQyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN4QyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0RDtJQUVELE1BQU0sUUFBUSxHQUFHO1FBQ2YsU0FBUyxFQUFFLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQztRQUNOLEtBQUssRUFBRSxFQUFFO1FBQ1QsS0FBSyxFQUFFLEVBQUU7UUFDVCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsVUFBVSxFQUFFLEVBQUU7UUFDZCxRQUFRLEVBQUUsRUFBRTtRQUNaLEdBQUcsRUFBRSxFQUFFO1FBQ1AsS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxFQUFFO1FBQ1osR0FBRyxFQUFFLEVBQUU7UUFDUCxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsTUFBTSxFQUFFLEVBQUU7UUFDVixNQUFNLEVBQUUsRUFBRTtRQUNWLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsRUFB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