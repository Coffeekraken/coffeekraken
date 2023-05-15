"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const string_1 = require("@coffeekraken/sugar/string");
const hotkey_1 = __importDefault(require("./hotkey"));
const _escapeQueue = [];
let _isEscaping = false;
function escapeQueue(callback, settings) {
    return new s_promise_1.default(({ resolve, reject, on }) => {
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
            id: (_a = finalSettings.id) !== null && _a !== void 0 ? _a : (0, string_1.__uniqid)(),
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
exports.default = escapeQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELHVEQUFzRDtBQUN0RCxzREFBZ0M7QUF1RGhDLE1BQU0sWUFBWSxHQUF1QixFQUFFLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLFNBQXdCLFdBQVcsQ0FDL0IsUUFBbUIsRUFDbkIsUUFBK0I7SUFFL0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7UUFDOUMsTUFBTSxhQUFhLG1CQUNmLFFBQVEsRUFBRSxRQUFRLElBQ2YsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUMvQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVE7WUFDeEIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNwQiwyQ0FBMkM7WUFDM0MsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUNwQixPQUFPO2FBQ1Y7WUFDRCxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUUxQixJQUFBLGdCQUFRLEVBQUMsUUFBUSxFQUFFO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTs7Z0JBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLFdBQVcsRUFBRTtvQkFDckMsT0FBTztpQkFDVjtnQkFFRCx5Q0FBeUM7Z0JBQ3pDLFVBQVU7Z0JBQ1YsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDbkIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDWixXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixDQUFDLENBQUMsQ0FBQztnQkFFSCxNQUFNLFNBQVMsR0FBcUIsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN2RCxNQUFBLFNBQVMsQ0FBQyxRQUFRLHlEQUFJLENBQUM7Z0JBQ3ZCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsb0NBQW9DO1FBQ3BDLE1BQU0sU0FBUyxHQUFxQjtZQUNoQyxFQUFFLEVBQUUsTUFBQSxhQUFhLENBQUMsRUFBRSxtQ0FBSSxJQUFBLGlCQUFRLEdBQUU7WUFDbEMsUUFBUTtZQUNSLE9BQU87U0FDVixDQUFDO1FBRUYsSUFBSSxhQUFhLENBQUMsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sUUFBUSxHQUFxQixDQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FDdEQsQ0FBQztZQUNGLElBQUksUUFBUSxFQUFFO2dCQUNWLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUM3QixRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUM5QjtpQkFBTTtnQkFDSCxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7YUFBTTtZQUNILG1CQUFtQjtZQUNuQixZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsMkJBQTJCO1FBQzNCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBcEVELDhCQW9FQyJ9