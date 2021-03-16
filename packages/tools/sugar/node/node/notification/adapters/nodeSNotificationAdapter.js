"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_notifier_1 = __importDefault(require("node-notifier"));
const uniqid_1 = __importDefault(require("../../string/uniqid"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name            nodeSNotificationAdapter
 * @namespace       sugar.node.notification.adapters
 * @type            ISNotificationAdapter
 *
 * This represent the node notification adapter for the SNotification class.
 * It uses the awesome node-notifier package behind the scene.
 *
 * @event       click       Emitted when the user click on the notification
 * @event       timeout     Emitted when the notification has ended
 *
 * @see             https://www.npmjs.com/package/node-notifier
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const stack = {};
node_notifier_1.default.on('click', function (notifierObject, options, event) {
    if (options.id && stack[options.id]) {
        stack[options.id].click(options);
    }
});
node_notifier_1.default.on('timeout', function (notifierObject, options, event) {
    if (options.id && stack[options.id]) {
        stack[options.id].timeout(options);
    }
});
const nodeAdapter = {
    id: 'node',
    name: 'Node notification adapter',
    notify: (notificationObj, settings) => {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            if (!notificationObj.id)
                notificationObj.id = uniqid_1.default();
            stack[notificationObj.id] = {
                timeout: () => {
                    emit('timeout');
                    resolve();
                },
                click: (options) => {
                    emit('click', options);
                    resolve();
                }
            };
            if (!notificationObj.contentImage && notificationObj.icon)
                notificationObj.contentImage = notificationObj.icon;
            node_notifier_1.default.notify(notificationObj);
        });
    }
};
exports.default = nodeAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZVNOb3RpZmljYXRpb25BZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvbm90aWZpY2F0aW9uL2FkYXB0ZXJzL25vZGVTTm90aWZpY2F0aW9uQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGtFQUF1QztBQUN2QyxpRUFBMkM7QUFDM0Msd0VBQWlEO0FBRWpEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsTUFBTSxLQUFLLEdBQVEsRUFBRSxDQUFDO0FBQ3RCLHVCQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLGNBQWMsRUFBRSxPQUFPLEVBQUUsS0FBSztJQUM3RCxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0gsdUJBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsY0FBYyxFQUFFLE9BQU8sRUFBRSxLQUFLO0lBQy9ELElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFdBQVcsR0FBMEI7SUFDekMsRUFBRSxFQUFFLE1BQU07SUFDVixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLE1BQU0sRUFBRSxDQUFDLGVBQWtDLEVBQUUsUUFBYSxFQUFFLEVBQUU7UUFDNUQsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQUUsZUFBZSxDQUFDLEVBQUUsR0FBRyxnQkFBUSxFQUFFLENBQUM7WUFFekQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDMUIsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUM7YUFDRixDQUFDO1lBRUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksZUFBZSxDQUFDLElBQUk7Z0JBQ3ZELGVBQWUsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN0RCx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQWlCLENBQUM7SUFDckIsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxXQUFXLENBQUMifQ==