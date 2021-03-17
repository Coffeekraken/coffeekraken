"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_notifier_1 = __importDefault(require("node-notifier"));
const uniqid_1 = __importDefault(require("../../../shared/string/uniqid"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZVNOb3RpZmljYXRpb25BZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9kZVNOb3RpZmljYXRpb25BZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esa0VBQXVDO0FBQ3ZDLDJFQUFxRDtBQUNyRCx3RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCxNQUFNLEtBQUssR0FBUSxFQUFFLENBQUM7QUFDdEIsdUJBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsY0FBYyxFQUFFLE9BQU8sRUFBRSxLQUFLO0lBQzdELElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDSCx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxjQUFjLEVBQUUsT0FBTyxFQUFFLEtBQUs7SUFDL0QsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUEwQjtJQUN6QyxFQUFFLEVBQUUsTUFBTTtJQUNWLElBQUksRUFBRSwyQkFBMkI7SUFDakMsTUFBTSxFQUFFLENBQUMsZUFBa0MsRUFBRSxRQUFhLEVBQUUsRUFBRTtRQUM1RCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFBRSxlQUFlLENBQUMsRUFBRSxHQUFHLGdCQUFRLEVBQUUsQ0FBQztZQUV6RCxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHO2dCQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQztnQkFDRCxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQzthQUNGLENBQUM7WUFFRixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksSUFBSSxlQUFlLENBQUMsSUFBSTtnQkFDdkQsZUFBZSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3RELHVCQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBaUIsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFdBQVcsQ0FBQyJ9