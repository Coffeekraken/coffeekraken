import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
// import __SIpc from '../ipc/SIpc';
import { __isChildProcess } from '@coffeekraken/sugar/is';
export class HotkeySettingsInterface extends __SInterface {
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
import __readline from 'readline';
__readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) {
    process.stdin.setRawMode(true);
}
export { HotkeySettingsInterface as SettingsInterface };
export default function __hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings);
    const promise = new __SPromise({
        id: 'hotkey',
    });
    process.stdin.on('keypress', (str, keyObj) => {
        if (__isChildProcess()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELG9DQUFvQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXlDMUQsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFlBQVk7SUFDckQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AscURBQXFEO2dCQUN6RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxPQUFPLEVBQUUsR0FBRzthQUNmO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTdDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO0lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xDO0FBRUQsT0FBTyxFQUFFLHVCQUF1QixJQUFJLGlCQUFpQixFQUFFLENBQUM7QUFFeEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQW1DO0lBQ3JFLE1BQU0sR0FBRyxHQUFvQix1QkFBdUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7UUFDM0IsRUFBRSxFQUFFLFFBQVE7S0FDZixDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekMsSUFBSSxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDbEUsSUFBSSxNQUFNLENBQUMsS0FBSztZQUFFLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDcEUsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFFakUsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEdBQUcsRUFBRSxVQUFVO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ2xDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxxQkFBcUI7SUFDckIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9