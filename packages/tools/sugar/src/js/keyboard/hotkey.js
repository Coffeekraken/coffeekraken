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
        id: 'hotkey'
    }).on('finally', () => {
        hotkeys.unbind(hotkey);
    });
}
export default hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG90a2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLENBQUMsTUFBTSxHQUFHO0lBQ2YsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFzREYsU0FBUyxNQUFNLENBQUMsTUFBYyxFQUFFLFdBQXFDLEVBQUU7SUFDckUsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDcEMsMkNBQTJDO1FBQzNDLFFBQVEsbUJBQ04sT0FBTyxFQUFFLElBQUksRUFDYixLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sRUFBRSxJQUFJLEVBQ2IsSUFBSSxFQUFFLEtBQUssRUFDWCxRQUFRLEVBQUUsR0FBRyxJQUNWLFFBQVEsQ0FDWixDQUFDO1FBRUYsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLDhCQUE4QjtZQUM5QixJQUFJLFFBQVEsQ0FBQyxJQUFJO2dCQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUNEO1FBQ0UsRUFBRSxFQUFFLFFBQVE7S0FDYixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9