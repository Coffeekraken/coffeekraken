import __SBlessedNotification from '@coffeekraken/sugar/node/blessed/notification/SBlessedNotification';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __SPromise from '@coffeekraken/s-promise';
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
        return new __SPromise(({ resolve, reject, emit }) => {
            if (!notificationObj.id)
                notificationObj.id = __uniqid();
            const notification = new __SBlessedNotification(notificationObj.title, notificationObj.message, {
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
export default nodeAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxlc3NlZFNOb3RpZmljYXRpb25BZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxlc3NlZFNOb3RpZmljYXRpb25BZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sc0JBQXNCLE1BQU0sb0VBQW9FLENBQUM7QUFDeEcsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUFDaEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLFdBQVcsR0FBMEI7SUFDekMsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUUsOEJBQThCO0lBQ3BDLE1BQU0sRUFBRSxDQUFDLGVBQWtDLEVBQUUsUUFBYSxFQUFFLEVBQUU7UUFDNUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFBRSxlQUFlLENBQUMsRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBRXpELE1BQU0sWUFBWSxHQUFHLElBQUksc0JBQXNCLENBQzdDLGVBQWUsQ0FBQyxLQUFLLEVBQ3JCLGVBQWUsQ0FBQyxPQUFPLEVBQ3ZCO2dCQUNFLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSTtnQkFDMUIsU0FBUyxFQUFFLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDakMsQ0FBQzthQUNGLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBTyxZQUFhLENBQUMsTUFBTTtnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FDYixvSEFBb0gsQ0FDckgsQ0FBQztZQUVFLFlBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBaUIsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsV0FBVyxDQUFDIn0=