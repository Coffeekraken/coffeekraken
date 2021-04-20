import { ISNotificationAdapter, ISNotificationObj } from '../SNotification';
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

const stack: any = {};
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

const nodeAdapter: ISNotificationAdapter = {
  id: 'node',
  name: 'Node notification adapter',
  notify: (notificationObj: ISNotificationObj, settings: any) => {
    return new __SPromise(({ resolve, reject, emit }) => {
      if (!notificationObj.id) notificationObj.id = __uniqid();

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
    }) as Promise<any>;
  }
};

export default nodeAdapter;
