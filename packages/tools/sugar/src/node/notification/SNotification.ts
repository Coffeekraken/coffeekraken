import __SNotification from './_SNotification';
import __nodeSNotificationAdapter from './adapters/nodeSNotificationAdapter';
import __blessedSNotificationAdapter from './adapters/blessedSNotificationAdapter';

__SNotification.registerAdapter(__nodeSNotificationAdapter);
__SNotification.registerAdapter(__blessedSNotificationAdapter);

export * from './_SNotification';
export default __SNotification;
