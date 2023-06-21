// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import hotkeys from 'hotkeys-js/dist/hotkeys.common';
hotkeys.filter = function () {
    return true;
};
export default function __hotkey(hotkey, settings = {}) {
    // merge default settings with passed ones:
    settings = Object.assign({ rootNode: [document], keyup: false, keydown: true, once: false, splitKey: '+', title: hotkey, description: null, private: false }, settings);
    if (!Array.isArray(settings.rootNode)) {
        settings.rootNode = [settings.rootNode];
    }
    return new __SPromise(({ resolve, reject, emit, cancel }) => {
        settings.rootNode.forEach((rootNode) => {
            var _a;
            const documentElement = (_a = rootNode.ownerDocument) !== null && _a !== void 0 ? _a : rootNode;
            // handle storing in "env.KOTKEYS" stack
            if (!settings.private) {
                if (!(documentElement === null || documentElement === void 0 ? void 0 : documentElement.env)) {
                    documentElement.env = {};
                }
                if (!documentElement.env.HOTKEYS) {
                    documentElement.env.HOTKEYS = {};
                }
                if (!documentElement.env.HOTKEYS[hotkey]) {
                    setTimeout(() => {
                        var _a;
                        rootNode.dispatchEvent(new CustomEvent('hotkeys.update', {
                            bubbles: true,
                            detail: (_a = documentElement.env) === null || _a === void 0 ? void 0 : _a.HOTKEYS,
                        }));
                    });
                }
                documentElement.env.HOTKEYS[hotkey] = {
                    title: settings.title,
                    description: settings.description,
                    hotkey,
                };
            }
            // init the hotkey
            hotkeys(hotkey, Object.assign({ element: rootNode }, settings), (e, h) => {
                // call the handler function
                emit('press', e);
                // unsubscribe if once is truc
                if (settings.once)
                    cancel();
            });
        });
    }, {
        id: 'hotkey',
    }).on('finally', () => {
        settings.rootNode.forEach((rootNode) => {
            var _a, _b, _c;
            const documentElement = (_a = rootNode.ownerDocument) !== null && _a !== void 0 ? _a : rootNode;
            (_b = documentElement.env) === null || _b === void 0 ? true : delete _b.HOTKEYS[hotkey];
            rootNode.dispatchEvent(new CustomEvent('hotkeys.update', {
                bubbles: true,
                detail: (_c = documentElement.env) === null || _c === void 0 ? void 0 : _c.HOTKEYS,
            }));
        });
        hotkeys.unbind(hotkey);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE9BQU8sTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRCxPQUFPLENBQUMsTUFBTSxHQUFHO0lBQ2IsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBK0RGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUM1QixNQUFjLEVBQ2QsV0FBcUMsRUFBRTtJQUV2QywyQ0FBMkM7SUFDM0MsUUFBUSxtQkFDSixRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFDcEIsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLEVBQUUsSUFBSSxFQUNiLElBQUksRUFBRSxLQUFLLEVBQ1gsUUFBUSxFQUFFLEdBQUcsRUFDYixLQUFLLEVBQUUsTUFBTSxFQUNiLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLE9BQU8sRUFBRSxLQUFLLElBQ1gsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkMsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMzQztJQUVELE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBcUIsRUFBRSxFQUFFOztZQUNoRCxNQUFNLGVBQWUsR0FBRyxNQUFBLFFBQVEsQ0FBQyxhQUFhLG1DQUFJLFFBQVEsQ0FBQztZQUMzRCx3Q0FBd0M7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxDQUFBLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxHQUFHLENBQUEsRUFBRTtvQkFDdkIsZUFBZSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7aUJBQzVCO2dCQUNELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtvQkFDOUIsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2lCQUNwQztnQkFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3RDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O3dCQUNaLFFBQVEsQ0FBQyxhQUFhLENBQ2xCLElBQUksV0FBVyxDQUFDLGdCQUFnQixFQUFFOzRCQUM5QixPQUFPLEVBQUUsSUFBSTs0QkFDYixNQUFNLEVBQUUsTUFBQSxlQUFlLENBQUMsR0FBRywwQ0FBRSxPQUFPO3lCQUN2QyxDQUFDLENBQ0wsQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRztvQkFDbEMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO29CQUNyQixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7b0JBQ2pDLE1BQU07aUJBQ1QsQ0FBQzthQUNMO1lBRUQsa0JBQWtCO1lBQ2xCLE9BQU8sQ0FDSCxNQUFNLGtCQUVGLE9BQU8sRUFBRSxRQUFRLElBQ2QsUUFBUSxHQUVmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNMLDRCQUE0QjtnQkFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakIsOEJBQThCO2dCQUM5QixJQUFJLFFBQVEsQ0FBQyxJQUFJO29CQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ2hDLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsUUFBUTtLQUNmLENBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNqQixRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTs7WUFDaEQsTUFBTSxlQUFlLEdBQUcsTUFBQSxRQUFRLENBQUMsYUFBYSxtQ0FBSSxRQUFRLENBQUM7WUFDcEQsTUFBQSxlQUFlLENBQUMsR0FBRywrQ0FBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLGFBQWEsQ0FDbEIsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzlCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE1BQU0sRUFBRSxNQUFBLGVBQWUsQ0FBQyxHQUFHLDBDQUFFLE9BQU87YUFDdkMsQ0FBQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=