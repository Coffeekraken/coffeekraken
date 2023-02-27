// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import hotkeys from 'hotkeys-js/dist/hotkeys.common';
hotkeys.filter = function () {
    return true;
};
export default function __hotkey(hotkey, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE9BQU8sTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRCxPQUFPLENBQUMsTUFBTSxHQUFHO0lBQ2IsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBMERGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUM1QixNQUFjLEVBQ2QsV0FBcUMsRUFBRTtJQUV2QyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNsQywyQ0FBMkM7UUFDM0MsUUFBUSxtQkFDSixPQUFPLEVBQUUsSUFBSSxFQUNiLEtBQUssRUFBRSxLQUFLLEVBQ1osT0FBTyxFQUFFLElBQUksRUFDYixJQUFJLEVBQUUsS0FBSyxFQUNYLFFBQVEsRUFBRSxHQUFHLElBQ1YsUUFBUSxDQUNkLENBQUM7UUFFRixrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsOEJBQThCO1lBQzlCLElBQUksUUFBUSxDQUFDLElBQUk7Z0JBQUUsTUFBTSxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsUUFBUTtLQUNmLENBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9