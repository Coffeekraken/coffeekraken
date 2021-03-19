import __SNotification from '../../shared/notification/_SNotification';
import __nodeSNotificationAdapter from './adapters/nodeSNotificationAdapter';
import __blessedSNotificationAdapter from './adapters/blessedSNotificationAdapter';

__SNotification.registerAdapter(__nodeSNotificationAdapter);
__SNotification.registerAdapter(__blessedSNotificationAdapter);

export * from '../../shared/notification/_SNotification';
export default __SNotification;
