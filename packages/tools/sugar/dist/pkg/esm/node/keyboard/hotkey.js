import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import __isChildProcess from '../../shared/is/isChildProcess';
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
let readline;
if (!__isChildProcess()) {
    readline = __readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    __readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }
}
let isSigInt = false;
export { HotkeySettingsInterface as SettingsInterface };
export default function __hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings);
    const promise = new __SPromise({
        id: 'hotkey',
    });
    if (__isChildProcess()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUErQzlELE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxZQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsT0FBTyxFQUFFLEdBQUc7YUFDZjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFFbEMsSUFBSSxRQUFRLENBQUM7QUFFYixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtJQUNyQixRQUFRLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUNsQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7UUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0tBQ3pCLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQztDQUNKO0FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBRXJCLE9BQU8sRUFBRSx1QkFBdUIsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0FBRXhELE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFtQztJQUNyRSxNQUFNLEdBQUcsR0FBb0IsdUJBQXVCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO1FBQzNCLEVBQUUsRUFBRSxRQUFRO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsSUFBSSxnQkFBZ0IsRUFBRSxFQUFFO1FBQ3BCLE9BQU87S0FDVjtJQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3BDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLFVBQVUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDbEUsSUFBSSxNQUFNLENBQUMsS0FBSztZQUFFLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDcEUsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFFakUsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEdBQUcsRUFBRSxVQUFVO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ2xDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxxQkFBcUI7SUFDckIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9