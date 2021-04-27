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
        define(["require", "exports", "hotkeys-js/dist/hotkeys.common", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const hotkeys_common_1 = __importDefault(require("hotkeys-js/dist/hotkeys.common"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    hotkeys_common_1.default.filter = function (event) {
        return true;
    };
    /**
     * @name 		hotkey
     * @namespace            js.keyboard
     * @type      Function
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
     * promise.on('press', (e) => {
     *    // do something...
     * });
     * promise.cancel();
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function hotkey(hotkey, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, emit, cancel }) => {
            // merge default settings with passed ones:
            settings = Object.assign({ element: null, keyup: false, keydown: true, once: false, splitKey: '+' }, settings);
            // init the hotkey
            hotkeys_common_1.default(hotkey, settings, (e, h) => {
                // call the handler function
                emit('press', e);
                // unsubscribe if once is truc
                if (settings.once)
                    cancel();
            });
        }, {
            id: 'hotkey'
        }).on('finally', () => {
            hotkeys_common_1.default.unbind(hotkey);
        });
    }
    exports.default = hotkey;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG90a2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9GQUFxRDtJQUNyRCx3RUFBaUQ7SUFDakQsd0JBQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxLQUFLO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0lBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0NHO0lBQ0gsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ25DLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNwQywyQ0FBMkM7WUFDM0MsUUFBUSxtQkFDTixPQUFPLEVBQUUsSUFBSSxFQUNiLEtBQUssRUFBRSxLQUFLLEVBQ1osT0FBTyxFQUFFLElBQUksRUFDYixJQUFJLEVBQUUsS0FBSyxFQUNYLFFBQVEsRUFBRSxHQUFHLElBQ1YsUUFBUSxDQUNaLENBQUM7WUFFRixrQkFBa0I7WUFDbEIsd0JBQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqQyw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLDhCQUE4QjtnQkFDOUIsSUFBSSxRQUFRLENBQUMsSUFBSTtvQkFBRSxNQUFNLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxRQUFRO1NBQ2IsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLHdCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLE1BQU0sQ0FBQyJ9