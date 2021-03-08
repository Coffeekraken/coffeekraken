import { ISNotificationAdapter, ISNotificationObj } from '../SNotification';
import __SBlessedNotification from '../../blessed/notification/SBlessedNotification';
import __uniqid from '../../string/uniqid';
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
const nodeAdapter: ISNotificationAdapter = {
  id: 'blessed',
  name: 'Blessed notification adapter',
  notify: (notificationObj: ISNotificationObj, settings: any) => {
    return new __SPromise(({ resolve, reject, emit }) => {
      if (!notificationObj.id) notificationObj.id = __uniqid();

      const notification = new __SBlessedNotification(
        notificationObj.title,
        notificationObj.message,
        {
          type: notificationObj.type,
          onTimeout: () => {
            emit('timeout', notificationObj);
          },
          onClick: () => {
            emit('click', notificationObj);
          }
        }
      );

      if (!(<any>notification).screen)
        throw new Error(
          `You try to use the "<yellow>blessed</yellow>" SNotification adapter but you are not in a blessed ready environment`
        );

      (<any>notification).screen.append(notification);
    }) as Promise<any>;
  }
};

export default nodeAdapter;
