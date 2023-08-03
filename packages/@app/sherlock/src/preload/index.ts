import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

// Expose some API
contextBridge.exposeInMainWorld('sherlock', {
    // setSpace: (space: any) => ipcRenderer.invoke('spaces:set', space),
    addPool: (poolMetas: any) => ipcRenderer.invoke('pools:add', poolMetas),
    getSpaces: () => ipcRenderer.invoke('spaces:get'),
    addSpace: (space: any) => ipcRenderer.invoke('spaces:add', space),
    getClients: (spaceUid: string) => ipcRenderer.invoke('clients:get', spaceUid),
    getServices: (spaceUid: string, clientUid: string) =>
        ipcRenderer.invoke('services:get', spaceUid, clientUid),
    newTask: (task: any, poolUid: string) => ipcRenderer.invoke('tasks:new', task, poolUid),
    setTaskResult: (spaceUid: string, taskResult: any) =>
        ipcRenderer.invoke('tasks:results:set', spaceUid, taskResult),
    getTaskResults: (spaceUid: string, taskUid: string) =>
        ipcRenderer.invoke('tasks:results:get', spaceUid, taskUid),
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
