"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotkeys_common_1 = __importDefault(require("hotkeys-js/dist/hotkeys.common"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
hotkeys_common_1.default.filter = function () {
    return true;
};
function hotkey(hotkey, settings = {}) {
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
exports.default = hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsd0JBQU8sQ0FBQyxNQUFNLEdBQUc7SUFDYixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFxREYsU0FBUyxNQUFNLENBQ1gsTUFBYyxFQUNkLFdBQXFDLEVBQUU7SUFFdkMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLDJDQUEyQztRQUMzQyxRQUFRLG1CQUNKLE9BQU8sRUFBRSxJQUFJLEVBQ2IsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLEVBQUUsSUFBSSxFQUNiLElBQUksRUFBRSxLQUFLLEVBQ1gsUUFBUSxFQUFFLEdBQUcsSUFDVixRQUFRLENBQ2QsQ0FBQztRQUVGLGtCQUFrQjtRQUNsQixJQUFBLHdCQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQiw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQiw4QkFBOEI7WUFDOUIsSUFBSSxRQUFRLENBQUMsSUFBSTtnQkFBRSxNQUFNLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSxRQUFRO0tBQ2YsQ0FDSixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLHdCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGtCQUFlLE1BQU0sQ0FBQyJ9