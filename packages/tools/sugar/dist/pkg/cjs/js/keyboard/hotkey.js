"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const hotkeys_common_1 = __importDefault(require("hotkeys-js/dist/hotkeys.common"));
hotkeys_common_1.default.filter = function () {
    return true;
};
function __hotkey(hotkey, settings = {}) {
    return new s_promise_1.default(({ resolve, reject, emit, cancel }) => {
        // merge default settings with passed ones:
        settings = Object.assign({ element: null, keyup: false, keydown: true, once: false, splitKey: '+' }, settings);
        // init the hotkey
        (0, hotkeys_common_1.default)(hotkey, settings, (e, h) => {
            // call the handler function
            emit('press', e);
            // unsubscribe if once is truc
            if (settings.once)
                cancel();
        });
    }, {
        id: 'hotkey',
    }).on('finally', () => {
        hotkeys_common_1.default.unbind(hotkey);
    });
}
exports.default = __hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCxvRkFBcUQ7QUFDckQsd0JBQU8sQ0FBQyxNQUFNLEdBQUc7SUFDYixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUEwREYsU0FBd0IsUUFBUSxDQUM1QixNQUFjLEVBQ2QsV0FBcUMsRUFBRTtJQUV2QyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDbEMsMkNBQTJDO1FBQzNDLFFBQVEsbUJBQ0osT0FBTyxFQUFFLElBQUksRUFDYixLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sRUFBRSxJQUFJLEVBQ2IsSUFBSSxFQUFFLEtBQUssRUFDWCxRQUFRLEVBQUUsR0FBRyxJQUNWLFFBQVEsQ0FDZCxDQUFDO1FBRUYsa0JBQWtCO1FBQ2xCLElBQUEsd0JBQU8sRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9CLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLDhCQUE4QjtZQUM5QixJQUFJLFFBQVEsQ0FBQyxJQUFJO2dCQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLFFBQVE7S0FDZixDQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDakIsd0JBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBOUJELDJCQThCQyJ9