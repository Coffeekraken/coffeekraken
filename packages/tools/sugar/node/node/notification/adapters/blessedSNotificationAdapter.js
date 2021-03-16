"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBlessedNotification_1 = __importDefault(require("../../blessed/notification/SBlessedNotification"));
const uniqid_1 = __importDefault(require("../../string/uniqid"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxlc3NlZFNOb3RpZmljYXRpb25BZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvbm90aWZpY2F0aW9uL2FkYXB0ZXJzL2JsZXNzZWRTTm90aWZpY2F0aW9uQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDJHQUFxRjtBQUNyRixpRUFBMkM7QUFDM0Msd0VBQWlEO0FBRWpEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxXQUFXLEdBQTBCO0lBQ3pDLEVBQUUsRUFBRSxTQUFTO0lBQ2IsSUFBSSxFQUFFLDhCQUE4QjtJQUNwQyxNQUFNLEVBQUUsQ0FBQyxlQUFrQyxFQUFFLFFBQWEsRUFBRSxFQUFFO1FBQzVELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUFFLGVBQWUsQ0FBQyxFQUFFLEdBQUcsZ0JBQVEsRUFBRSxDQUFDO1lBRXpELE1BQU0sWUFBWSxHQUFHLElBQUksOEJBQXNCLENBQzdDLGVBQWUsQ0FBQyxLQUFLLEVBQ3JCLGVBQWUsQ0FBQyxPQUFPLEVBQ3ZCO2dCQUNFLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSTtnQkFDMUIsU0FBUyxFQUFFLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDakMsQ0FBQzthQUNGLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBTyxZQUFhLENBQUMsTUFBTTtnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FDYixvSEFBb0gsQ0FDckgsQ0FBQztZQUVFLFlBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBaUIsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFdBQVcsQ0FBQyJ9