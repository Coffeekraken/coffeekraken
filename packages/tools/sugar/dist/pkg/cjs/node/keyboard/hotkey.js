"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsInterface = exports.HotkeySettingsInterface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
// import __SIpc from '../ipc/SIpc';
const is_1 = require("@coffeekraken/sugar/is");
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
readline_1.default.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) {
    process.stdin.setRawMode(true);
}
function __hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings);
    const promise = new s_promise_1.default({
        id: 'hotkey',
    });
    process.stdin.on('keypress', (str, keyObj) => {
        if ((0, is_1.__isChildProcess)()) {
            return;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsb0NBQW9DO0FBQ3BDLCtDQUEwRDtBQXlDMUQsTUFBYSx1QkFBd0IsU0FBUSxxQkFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELE9BQU8sRUFBRSxHQUFHO2FBQ2Y7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBaEJELDBEQWdCQztBQVNtQyxvREFBaUI7QUFQckQsd0RBQWtDO0FBQ2xDLGtCQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTdDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO0lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xDO0FBSUQsU0FBd0IsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFtQztJQUNyRSxNQUFNLEdBQUcsR0FBb0IsdUJBQXVCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsQ0FBQztRQUMzQixFQUFFLEVBQUUsUUFBUTtLQUNmLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxJQUFJLElBQUEscUJBQWdCLEdBQUUsRUFBRTtZQUNwQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxVQUFVLEdBQUcsT0FBTyxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBQ2xFLElBQUksTUFBTSxDQUFDLEtBQUs7WUFBRSxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBQ3BFLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxVQUFVLEdBQUcsTUFBTSxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBRWpFLElBQUksVUFBVSxLQUFLLEdBQUcsRUFBRTtZQUNwQixPQUFPO1NBQ1Y7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNsQixHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLO1NBQ3ZDLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgscUJBQXFCO0lBQ3JCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFuQ0QsMkJBbUNDIn0=