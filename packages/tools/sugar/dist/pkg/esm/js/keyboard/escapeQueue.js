import __SPromise from '@coffeekraken/s-promise';
import __hotkey from './hotkey';
const _escapeQueue = [];
let _isEscaping = false;
export default function escapeQueue(callback, settings) {
    return new __SPromise(({ resolve, reject, on }) => {
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
            callback,
            resolve,
        };
        // add to the queue
        _escapeQueue.push(queueItem);
        // handle the "cancel" call
        on('cancel', () => {
            _escapeQueue.splice(_escapeQueue.indexOf(queueItem, 1));
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQWtEaEMsTUFBTSxZQUFZLEdBQXVCLEVBQUUsQ0FBQztBQUM1QyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDeEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLFFBQW1CLEVBQ25CLFFBQStCO0lBRS9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUM5QyxNQUFNLGFBQWEsbUJBQ2YsUUFBUSxFQUFFLFFBQVEsSUFDZixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUTtZQUN4QixDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3BCLDJDQUEyQztZQUMzQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BCLE9BQU87YUFDVjtZQUNELEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBRTFCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFOztnQkFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksV0FBVyxFQUFFO29CQUNyQyxPQUFPO2lCQUNWO2dCQUVELHlDQUF5QztnQkFDekMsVUFBVTtnQkFDVixXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sU0FBUyxHQUFxQixZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZELE1BQUEsU0FBUyxDQUFDLFFBQVEseURBQUksQ0FBQztnQkFDdkIsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxvQ0FBb0M7UUFDcEMsTUFBTSxTQUFTLEdBQXFCO1lBQ2hDLFFBQVE7WUFDUixPQUFPO1NBQ1YsQ0FBQztRQUVGLG1CQUFtQjtRQUNuQixZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdCLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNkLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9