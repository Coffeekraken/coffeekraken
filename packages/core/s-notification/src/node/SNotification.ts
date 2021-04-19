import __SNotification from '../shared/SNotification';
import __nodeSNotificationAdapter from './adapters/nodeSNotificationAdapter';
import __blessedSNotificationAdapter from './adapters/blessedSNotificationAdapter';

__SNotification.registerAdapter(__nodeSNotificationAdapter);
__SNotification.registerAdapter(__blessedSNotificationAdapter);

export * from '../shared/SNotification';
export default __SNotification;
