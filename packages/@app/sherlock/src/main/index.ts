import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import { join } from 'path';
import icon from '../../resources/icon.png?asset.js';

import { crashReporter } from 'electron';

import __SSherlock from '@coffeekraken/s-sherlock';

import type { ISherlockSpace, ISherlockTask, ISherlockTaskResult } from '@coffeekraken/s-sherlock';
import { execSync } from 'child_process';

console.log('Rebuilding "canvas" module...');
execSync('npm rebuild canvas');

app.commandLine.appendSwitch('trace-warnings');

let sherlock = new __SSherlock.default();

crashReporter.start({ uploadToServer: false });
console.error('Storing dumps inside', app.getPath('crashDumps'));

function createWindow(): void {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            // webSecurity: false
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be',
            height: 20,
        },
    });

    mainWindow.webContents.openDevTools();

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // exposes API
    // ipcMain.handle('spaces:get', sherlock.adapter.getSpaces.bind(sherlock.adapter))

    // ipcMain.handle('spaces:set', (e, space: ISherlockSpace) => {
    //     return sherlock.setSpace(space);
    // });

    ipcMain.handle('userInfo:save', (e, spaceUid: string, userInfo: any) => {
        return sherlock.saveUserInfo(spaceUid, userInfo);
    });

    ipcMain.handle('pools:reporters:get', (e, poolUid: string) => {
        return sherlock.getReporters(poolUid);
    });

    ipcMain.handle('pools:add', (e, poolMetas: any) => {
        return sherlock.addPool(poolMetas);
    });
    ipcMain.handle('space:get', (e, spaceUid: string) => {
        return sherlock.getSpace(spaceUid);
    });
    ipcMain.handle('spaces:get', (e) => {
        return sherlock.getSpaces();
    });
    ipcMain.handle('spaces:add', (e, space: ISherlockSpace) => {
        console.log('ÂDD', space);
        return sherlock.addSpace(space);
    });
    ipcMain.handle('tasks:get', (e, spaceUid: string, callbackId: string) => {
        return sherlock.tasks(spaceUid, callbackId);
    });
    ipcMain.handle('tasks:start', (e, spaceUid: string, taskUid: string) => {
        return sherlock.startTask(spaceUid, taskUid);
    });
    ipcMain.handle('tasks:pause', (e, spaceUid: string, taskUid: string) => {
        return sherlock.pauseTask(spaceUid, taskUid);
    });
    ipcMain.handle('tasks:add', (e, spaceUid: string, task: ISherlockTask) => {
        return sherlock.addTask(spaceUid, task);
    });
    ipcMain.handle('clients:get', (e, spaceUid: string, callbackId: string) => {
        return sherlock.clients(spaceUid, callbackId);
    });
    ipcMain.handle('service:get', (e, spaceUid: string, serviceUid: string, callbackId: string) => {
        return sherlock.service(spaceUid, serviceUid, callbackId);
    });
    ipcMain.handle(
        'clients:services:get',
        (e, spaceUid: string, clientUid: string, callbackId: string) => {
            return sherlock.clientServices(spaceUid, clientUid, callbackId);
        },
    );
    ipcMain.handle(
        'services:tasks:get',
        (e, spaceUid: string, serviceUid: string, callbackId: string) => {
            return sherlock.serviceTasks(spaceUid, serviceUid, callbackId);
        },
    );
    ipcMain.handle(
        'tasks:results:get',
        (e, spaceUid: string, taskUid: string, callbackId: string) => {
            return sherlock.taskResults(spaceUid, taskUid, callbackId);
        },
    );
    ipcMain.handle('tasks:results:set', (e, spaceUid: string, taskResult: ISherlockTaskResult) => {
        return sherlock.adapters[spaceUid].setTaskResult(taskResult);
    });

    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
