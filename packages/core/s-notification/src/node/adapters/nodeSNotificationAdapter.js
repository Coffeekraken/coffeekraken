import __notifier from 'node-notifier';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __SPromise from '@coffeekraken/s-promise';
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
__notifier.on('click', function (notifierObject, options, event) {
    if (options.id && stack[options.id]) {
        stack[options.id].click(options);
    }
});
__notifier.on('timeout', function (notifierObject, options, event) {
    if (options.id && stack[options.id]) {
        stack[options.id].timeout(options);
    }
});
const nodeAdapter = {
    id: 'node',
    name: 'Node notification adapter',
    notify: (notificationObj, settings) => {
        return new __SPromise(({ resolve, reject, emit }) => {
            if (!notificationObj.id)
                notificationObj.id = __uniqid();
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
            __notifier.notify(notificationObj);
        });
    }
};
export default nodeAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZVNOb3RpZmljYXRpb25BZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9kZVNOb3RpZmljYXRpb25BZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sVUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILE1BQU0sS0FBSyxHQUFRLEVBQUUsQ0FBQztBQUN0QixVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLGNBQWMsRUFBRSxPQUFPLEVBQUUsS0FBSztJQUM3RCxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxjQUFjLEVBQUUsT0FBTyxFQUFFLEtBQUs7SUFDL0QsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUEwQjtJQUN6QyxFQUFFLEVBQUUsTUFBTTtJQUNWLElBQUksRUFBRSwyQkFBMkI7SUFDakMsTUFBTSxFQUFFLENBQUMsZUFBa0MsRUFBRSxRQUFhLEVBQUUsRUFBRTtRQUM1RCxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUFFLGVBQWUsQ0FBQyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFFekQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDMUIsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUM7YUFDRixDQUFDO1lBRUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksZUFBZSxDQUFDLElBQUk7Z0JBQ3ZELGVBQWUsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN0RCxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBaUIsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsV0FBVyxDQUFDIn0=