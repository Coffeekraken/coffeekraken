import __SPromise from '@coffeekraken/s-promise';
import { __uniqid } from '@coffeekraken/sugar/string';
import __hotkey from './hotkey';
const _escapeQueue = [];
let _isEscaping = false;
export default function escapeQueue(callback, settings) {
    return new __SPromise(({ resolve, reject, on }) => {
        var _a;
        const finalSettings = Object.assign({ rootNode: document }, (settings !== null && settings !== void 0 ? settings : {}));
        const roots = Array.isArray(finalSettings.rootNode)
            ? finalSettings.rootNode
            : [finalSettings.rootNode];
        roots.forEach(($root) => {
            // make sure we only register 1 by rootNode
            if ($root._escapeQueue) {
                return;
            }
            $root._escapeQueue = true;
            __hotkey('escape', {
                element: $root,
            }).on('press', () => {
                var _a;
                if (!_escapeQueue.length || _isEscaping) {
                    return;
                }
                // make sure to not escape multiple times
                // at once
                _isEscaping = true;
                setTimeout(() => {
                    _isEscaping = false;
                });
                const queueItem = _escapeQueue.pop();
                (_a = queueItem.callback) === null || _a === void 0 ? void 0 : _a.call(queueItem);
                queueItem.resolve();
            });
        });
        // create the queue item to register
        const queueItem = {
            id: (_a = finalSettings.id) !== null && _a !== void 0 ? _a : __uniqid(),
            callback,
            resolve,
        };
        if (finalSettings.id) {
            const existing = (_escapeQueue.find((i) => i.id === finalSettings.id));
            if (existing) {
                existing.callback = callback;
                existing.resolve = resolve;
            }
            else {
                _escapeQueue.push(queueItem);
            }
        }
        else {
            // add to the queue
            _escapeQueue.push(queueItem);
        }
        // handle the "cancel" call
        on('cancel', () => {
            _escapeQueue.splice(_escapeQueue.indexOf(queueItem, 1));
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUF1RGhDLE1BQU0sWUFBWSxHQUF1QixFQUFFLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixRQUFtQixFQUNuQixRQUErQjtJQUUvQixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O1FBQzlDLE1BQU0sYUFBYSxtQkFDZixRQUFRLEVBQUUsUUFBUSxJQUNmLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFFRixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDL0MsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRO1lBQ3hCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEIsMkNBQTJDO1lBQzNDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDcEIsT0FBTzthQUNWO1lBQ0QsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFMUIsUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7O2dCQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxXQUFXLEVBQUU7b0JBQ3JDLE9BQU87aUJBQ1Y7Z0JBRUQseUNBQXlDO2dCQUN6QyxVQUFVO2dCQUNWLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxTQUFTLEdBQXFCLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDdkQsTUFBQSxTQUFTLENBQUMsUUFBUSx5REFBSSxDQUFDO2dCQUN2QixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILG9DQUFvQztRQUNwQyxNQUFNLFNBQVMsR0FBcUI7WUFDaEMsRUFBRSxFQUFFLE1BQUEsYUFBYSxDQUFDLEVBQUUsbUNBQUksUUFBUSxFQUFFO1lBQ2xDLFFBQVE7WUFDUixPQUFPO1NBQ1YsQ0FBQztRQUVGLElBQUksYUFBYSxDQUFDLEVBQUUsRUFBRTtZQUNsQixNQUFNLFFBQVEsR0FBcUIsQ0FDL0IsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQ3RELENBQUM7WUFDRixJQUFJLFFBQVEsRUFBRTtnQkFDVixRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDN0IsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoQztTQUNKO2FBQU07WUFDSCxtQkFBbUI7WUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNoQztRQUVELDJCQUEyQjtRQUMzQixFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNkLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9