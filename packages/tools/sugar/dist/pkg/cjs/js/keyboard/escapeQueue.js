"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const hotkey_1 = __importDefault(require("./hotkey"));
const _escapeQueue = [];
let _isEscaping = false;
function escapeQueue(callback, settings) {
    return new s_promise_1.default(({ resolve, reject, on }) => {
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
            (0, hotkey_1.default)('escape', {
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
exports.default = escapeQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELHNEQUFnQztBQWtEaEMsTUFBTSxZQUFZLEdBQXVCLEVBQUUsQ0FBQztBQUM1QyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDeEIsU0FBd0IsV0FBVyxDQUMvQixRQUFtQixFQUNuQixRQUErQjtJQUUvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQzlDLE1BQU0sYUFBYSxtQkFDZixRQUFRLEVBQUUsUUFBUSxJQUNmLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFFRixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDL0MsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRO1lBQ3hCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEIsMkNBQTJDO1lBQzNDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDcEIsT0FBTzthQUNWO1lBQ0QsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFMUIsSUFBQSxnQkFBUSxFQUFDLFFBQVEsRUFBRTtnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7O2dCQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxXQUFXLEVBQUU7b0JBQ3JDLE9BQU87aUJBQ1Y7Z0JBRUQseUNBQXlDO2dCQUN6QyxVQUFVO2dCQUNWLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxTQUFTLEdBQXFCLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDdkQsTUFBQSxTQUFTLENBQUMsUUFBUSx5REFBSSxDQUFDO2dCQUN2QixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILG9DQUFvQztRQUNwQyxNQUFNLFNBQVMsR0FBcUI7WUFDaEMsUUFBUTtZQUNSLE9BQU87U0FDVixDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsMkJBQTJCO1FBQzNCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBdkRELDhCQXVEQyJ9