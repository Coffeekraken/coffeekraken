import __SNotification from './_SNotification';
import __nodeSNotificationAdapter from './adapters/nodeSNotificationAdapter';

__SNotification.registerAdapter(__nodeSNotificationAdapter);

export * from './_SNotification';
export default __SNotification;
