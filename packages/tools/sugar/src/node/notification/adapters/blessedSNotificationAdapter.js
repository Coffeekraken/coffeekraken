"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedNotification_1 = __importDefault(require("../../blessed/notification/SBlessedNotification"));
const uniqid_1 = __importDefault(require("../../../shared/string/uniqid"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name            blessedSNotificationAdapter
 * @namespace       sugar.node.notification.adapters
 * @type            ISNotificationAdapter
 *
 * This represent the blessed notification adapter for the SNotification class.
 * It uses the awesome blessed package behind the scene.
 *
 * @event       click       Emitted when the user click on the notification
 * @event       timeout     Emitted when the notification has ended
 *
 * @see             https://www.npmjs.com/package/blessed
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const nodeAdapter = {
    id: 'blessed',
    name: 'Blessed notification adapter',
    notify: (notificationObj, settings) => {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            if (!notificationObj.id)
                notificationObj.id = uniqid_1.default();
            const notification = new SBlessedNotification_1.default(notificationObj.title, notificationObj.message, {
                type: notificationObj.type,
                onTimeout: () => {
                    emit('timeout', notificationObj);
                },
                onClick: () => {
                    emit('click', notificationObj);
                }
            });
            if (!notification.screen)
                throw new Error(`You try to use the "<yellow>blessed</yellow>" SNotification adapter but you are not in a blessed ready environment`);
            notification.screen.append(notification);
        });
    }
};
exports.default = nodeAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxlc3NlZFNOb3RpZmljYXRpb25BZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxlc3NlZFNOb3RpZmljYXRpb25BZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMkdBQXFGO0FBQ3JGLDJFQUFxRDtBQUNyRCx3RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLFdBQVcsR0FBMEI7SUFDekMsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsOEJBQThCO0lBQ3BDLE1BQU0sRUFBRSxDQUFDLGVBQWtDLEVBQUUsUUFBYSxFQUFFLEVBQUU7UUFDNUQsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQUUsZUFBZSxDQUFDLEVBQUUsR0FBRyxnQkFBUSxFQUFFLENBQUM7WUFFekQsTUFBTSxZQUFZLEdBQUcsSUFBSSw4QkFBc0IsQ0FDN0MsZUFBZSxDQUFDLEtBQUssRUFDckIsZUFBZSxDQUFDLE9BQU8sRUFDdkI7Z0JBQ0UsSUFBSSxFQUFFLGVBQWUsQ0FBQyxJQUFJO2dCQUMxQixTQUFTLEVBQUUsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2FBQ0YsQ0FDRixDQUFDO1lBRUYsSUFBSSxDQUFPLFlBQWEsQ0FBQyxNQUFNO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUNiLG9IQUFvSCxDQUNySCxDQUFDO1lBRUUsWUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFpQixDQUFDO0lBQ3JCLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsV0FBVyxDQUFDIn0=