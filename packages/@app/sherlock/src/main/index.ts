import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import { join } from 'path';
import icon from '../../resources/icon.png?asset.js';

import __SherlockApp from './ShelockApp.js';

import { execSync } from 'child_process';
import { ISherlockSpace, ISherlockTask, ISherlockTaskResult } from '../shared/SherlockTypes.js';

console.log('Rebuilding "canvas" module...');
execSync('npm rebuild canvas');

let sherlockApp = new __SherlockApp();

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
    // ipcMain.handle('spaces:get', sherlockApp.adapter.getSpaces.bind(sherlockApp.adapter))

    ipcMain.handle('spaces:set', (e, space: ISherlockSpace) => {
        return sherlockApp.setSpace(space);
    });
    ipcMain.handle('spaces:get', (e) => {
        return sherlockApp.getSpaces();
    });
    ipcMain.handle('spaces:new', (e, space: ISherlockSpace) => {
        return sherlockApp.newSpace(space);
    });
    ipcMain.handle('clients:get', (e, spaceUid: string) => {
        return sherlockApp.adapters[spaceUid].getClients();
    });
    ipcMain.handle('services:get', (e, spaceUid: string, clientUid: string) => {
        return sherlockApp.adapters[spaceUid].getServices(clientUid);
    });
    ipcMain.handle('tasks:new', (e, task: ISherlockTask, poolUid: string) => {
        return sherlockApp.newTask(task, poolUid);
    });
    ipcMain.handle('tasks:result', (e, spaceUid: string, taskResult: ISherlockTaskResult) => {
        return sherlockApp.adapters[spaceUid].taskResult(taskResult);
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
