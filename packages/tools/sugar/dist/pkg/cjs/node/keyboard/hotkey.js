"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsInterface = exports.HotkeySettingsInterface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const isChildProcess_1 = __importDefault(require("../../shared/is/isChildProcess"));
class HotkeySettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            once: {
                type: 'Boolean',
                description: 'Specify if you want to capture the hotkey just once',
                default: false,
            },
            splitChar: {
                type: 'String',
                description: 'Define the character to use to split shortcuts',
                default: '+',
            },
        };
    }
}
exports.HotkeySettingsInterface = HotkeySettingsInterface;
exports.SettingsInterface = HotkeySettingsInterface;
const readline_1 = __importDefault(require("readline"));
let readline;
if (!(0, isChildProcess_1.default)()) {
    readline = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline_1.default.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }
}
let isSigInt = false;
function __hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings);
    const promise = new s_promise_1.default({
        id: 'hotkey',
    });
    if ((0, isChildProcess_1.default)()) {
        return;
    }
    readline.on('keypress', (str, keyObj) => {
        let pressedKey = keyObj.name;
        if (keyObj.ctrl)
            pressedKey = `ctrl${set.splitChar}${pressedKey}`;
        if (keyObj.shift)
            pressedKey = `shift${set.splitChar}${pressedKey}`;
        if (keyObj.meta)
            pressedKey = `alt${set.splitChar}${pressedKey}`;
        if (pressedKey !== key) {
            return;
        }
        promise.emit('press', {
            key: pressedKey,
            ctrl: keyObj ? keyObj.ctrl : false,
            meta: keyObj ? keyObj.meta : false,
            shift: keyObj ? keyObj.shift : false,
        });
        if (set.once) {
            promise.cancel();
        }
    });
    // return the promise
    return promise;
}
exports.default = __hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsb0ZBQThEO0FBK0M5RCxNQUFhLHVCQUF3QixTQUFRLHFCQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsT0FBTyxFQUFFLEdBQUc7YUFDZjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFoQkQsMERBZ0JDO0FBbUJtQyxvREFBaUI7QUFqQnJELHdEQUFrQztBQUVsQyxJQUFJLFFBQVEsQ0FBQztBQUViLElBQUksQ0FBQyxJQUFBLHdCQUFnQixHQUFFLEVBQUU7SUFDckIsUUFBUSxHQUFHLGtCQUFVLENBQUMsZUFBZSxDQUFDO1FBQ2xDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztRQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07S0FDekIsQ0FBQyxDQUFDO0lBQ0gsa0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQztDQUNKO0FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBSXJCLFNBQXdCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBbUM7SUFDckUsTUFBTSxHQUFHLEdBQW9CLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyRSxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQUM7UUFDM0IsRUFBRSxFQUFFLFFBQVE7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLElBQUEsd0JBQWdCLEdBQUUsRUFBRTtRQUNwQixPQUFPO0tBQ1Y7SUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNwQyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxVQUFVLEdBQUcsT0FBTyxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBQ2xFLElBQUksTUFBTSxDQUFDLEtBQUs7WUFBRSxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBQ3BFLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxVQUFVLEdBQUcsTUFBTSxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBRWpFLElBQUksVUFBVSxLQUFLLEdBQUcsRUFBRTtZQUNwQixPQUFPO1NBQ1Y7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNsQixHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLO1NBQ3ZDLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgscUJBQXFCO0lBQ3JCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFuQ0QsMkJBbUNDIn0=