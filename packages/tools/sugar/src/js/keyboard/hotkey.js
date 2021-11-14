// @ts-nocheck
import hotkeys from 'hotkeys-js/dist/hotkeys.common';
import __SPromise from '@coffeekraken/s-promise';
hotkeys.filter = function () {
    return true;
};
function hotkey(hotkey, settings = {}) {
    return new __SPromise(({ resolve, reject, emit, cancel }) => {
        // merge default settings with passed ones:
        settings = Object.assign({ element: null, keyup: false, keydown: true, once: false, splitKey: '+' }, settings);
        // init the hotkey
        hotkeys(hotkey, settings, (e, h) => {
            // call the handler function
            emit('press', e);
            // unsubscribe if once is truc
            if (settings.once)
                cancel();
        });
    }, {
        id: 'hotkey',
    }).on('finally', () => {
        hotkeys.unbind(hotkey);
    });
}
export default hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG90a2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLENBQUMsTUFBTSxHQUFHO0lBQ2IsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBcURGLFNBQVMsTUFBTSxDQUNYLE1BQWMsRUFDZCxXQUFxQyxFQUFFO0lBRXZDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLDJDQUEyQztRQUMzQyxRQUFRLG1CQUNKLE9BQU8sRUFBRSxJQUFJLEVBQ2IsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLEVBQUUsSUFBSSxFQUNiLElBQUksRUFBRSxLQUFLLEVBQ1gsUUFBUSxFQUFFLEdBQUcsSUFDVixRQUFRLENBQ2QsQ0FBQztRQUVGLGtCQUFrQjtRQUNsQixPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQiw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQiw4QkFBOEI7WUFDOUIsSUFBSSxRQUFRLENBQUMsSUFBSTtnQkFBRSxNQUFNLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSxRQUFRO0tBQ2YsQ0FDSixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxNQUFNLENBQUMifQ==