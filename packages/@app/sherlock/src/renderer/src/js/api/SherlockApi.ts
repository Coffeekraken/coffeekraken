import __SWebsocketCallbackClient from '../utils/SWebsocketCallbackClient.js';

const websocketCallbackClient = new __SWebsocketCallbackClient();

export default {
    tasks(spaceUid: string, cb: Function): void {
        const callbackId = websocketCallbackClient.registerCallback(cb);
        window.sherlock.tasks(spaceUid, callbackId);
    },
    clients(spaceUid: string, cb: Function): void {
        const callbackId = websocketCallbackClient.registerCallback(cb);
        window.sherlock.clients(spaceUid, callbackId);
    },
    service(spaceUid: string, serviceUid: string, cb: Function): void {
        const callbackId = websocketCallbackClient.registerCallback(cb);
        window.sherlock.service(spaceUid, serviceUid, callbackId);
    },
    clientServices(spaceUid: string, clientUid: string, cb: Function): void {
        const callbackId = websocketCallbackClient.registerCallback(cb);
        window.sherlock.clientServices(spaceUid, clientUid, callbackId);
    },
    serviceTasks(spaceUid: string, serviceUid: string, cb: Function): void {
        const callbackId = websocketCallbackClient.registerCallback(cb);
        window.sherlock.serviceTasks(spaceUid, serviceUid, callbackId);
    },
    taskResults(spaceUid: string, taskUid: string, cb: Function): void {
        const callbackId = websocketCallbackClient.registerCallback(cb);
        window.sherlock.taskResults(spaceUid, taskUid, callbackId);
    },
};
