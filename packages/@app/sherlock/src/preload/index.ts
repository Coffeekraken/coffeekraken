import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

// Expose some API
contextBridge.exposeInMainWorld('sherlock', {
    getReporters: (poolUid: string) => ipcRenderer.invoke('pools:reporters:get', poolUid),
    addPool: (poolMetas: any) => ipcRenderer.invoke('pools:add', poolMetas),
    getSpace: (spaceUid: string) => ipcRenderer.invoke('space:get', spaceUid),
    getSpaces: () => ipcRenderer.invoke('spaces:get'),
    addSpace: (space: any) => ipcRenderer.invoke('spaces:add', space),
    saveUserInfo: (spaceUid: string, userInfo: any, callbackId: string) =>
        ipcRenderer.invoke('userInfo:save', spaceUid, userInfo, callbackId),
    startTask: (spaceUid: string, taskUid: string) =>
        ipcRenderer.invoke('tasks:start', spaceUid, taskUid),
    pauseTask: (spaceUid: string, taskUid: string) =>
        ipcRenderer.invoke('tasks:pause', spaceUid, taskUid),
    tasks: (spaceUid: string, callbackId: string) =>
        ipcRenderer.invoke('tasks:get', spaceUid, callbackId),
    addTask: (spaceUid: string, task: any) => ipcRenderer.invoke('tasks:add', spaceUid, task),
    clients: (spaceUid: string, callbackId: string) =>
        ipcRenderer.invoke('clients:get', spaceUid, callbackId),
    service: (spaceUid: string, serviceUid: string, callbackId: string) =>
        ipcRenderer.invoke('service:get', spaceUid, serviceUid, callbackId),
    clientServices: (spaceUid: string, clientUid: string, callbackId: string) =>
        ipcRenderer.invoke('clients:services:get', spaceUid, clientUid, callbackId),
    serviceTasks: (spaceUid: string, serviceUid: string, callbackId: string) =>
        ipcRenderer.invoke('services:tasks:get', spaceUid, serviceUid, callbackId),
    taskResults: (spaceUid: string, taskUid: string, callbackId: string) =>
        ipcRenderer.invoke('tasks:results:get', spaceUid, taskUid, callbackId),
    setTaskResult: (spaceUid: string, taskResult: any) =>
        ipcRenderer.invoke('tasks:results:set', spaceUid, taskResult),
});

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
    window.api = api;
}
