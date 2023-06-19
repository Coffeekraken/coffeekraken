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
        if ((0, isChildProcess_1.default)()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsb0ZBQThEO0FBK0M5RCxNQUFhLHVCQUF3QixTQUFRLHFCQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsT0FBTyxFQUFFLEdBQUc7YUFDZjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFoQkQsMERBZ0JDO0FBU21DLG9EQUFpQjtBQVByRCx3REFBa0M7QUFDbEMsa0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFN0MsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7SUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbEM7QUFJRCxTQUF3QixRQUFRLENBQUMsR0FBRyxFQUFFLFFBQW1DO0lBQ3JFLE1BQU0sR0FBRyxHQUFvQix1QkFBdUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDO1FBQzNCLEVBQUUsRUFBRSxRQUFRO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLElBQUksSUFBQSx3QkFBZ0IsR0FBRSxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDbEUsSUFBSSxNQUFNLENBQUMsS0FBSztZQUFFLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDcEUsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFFakUsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEdBQUcsRUFBRSxVQUFVO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ2xDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxxQkFBcUI7SUFDckIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQW5DRCwyQkFtQ0MifQ==