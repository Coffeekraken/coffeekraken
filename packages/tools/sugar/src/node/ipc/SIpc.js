"use strict";
const __uniqid = require('../string/uniqid');
const __SPromise = require('../promise/SPromise');
const __IPC = require('node-ipc').IPC;
const __deepMerge = require('../object/deepMerge');
const __isChildProcess = require('../is/childProcess');
const __onProcessExit = require('../process/onProcessExit');
const __getFreePort = require('../network/getFreePort');
/**
 * @name            SIpc
 * @namespace       sugar.node.ipc
 * @type            Class
 *
 * This script check if a global ipc server exists aulready and if it is not the case,
 * it will start one that you can use to communicate between your child process, etc...
 *
 * @param
 *
 * @see             https://www.npmjs.com/package/node-ipc
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let __globalIpcInstance = null;
class SIpc {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        /**
         * @name                  _settings
         * @type                  Object
         * @private
         *
         * Store the settings of this instance. Here's the available settings:
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._settings = {};
        /**
         * @name            _ipcInstance
         * @type            IPC
         * @private
         *
         * Store the IPC instance
         *
         * @see             https://www.npmjs.com/package/node-ipc
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._ipcInstance = null;
        /**
         * @name        _socketsByProcesses
         * @type        Object
         * @private
         *
         * Store all the sockets by processes
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._socketsByProcesses = {};
        /**
         * @name              serverId
         * @type              String
         * @get
         *
         * Access the server id. This id will be either the ipcInstance.config.id or the id of the server the client is connected to
         *
         * @since             2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._serverId = null;
        /**
         * @name          on
         * @type           Function
         * @override
         *
         * Override the ```on``` SPromise method to be able to listen for events emited through the ipc server and clients
         *
         * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
         * @param           {Function}        callback        The callback function to register
         * @return          {SPromise}                  The SPromise instance to maintain chainability
         *
         * @since         2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._callbacksStack = {};
        this._settings = __deepMerge({
            id: `SIpc.${process.pid}`,
            silent: true
        }, settings);
        // create the new ipc instance
        this._ipcInstance = new __IPC();
        Object.assign(this._ipcInstance.config, this._settings);
    }
    /**
     * @name      isServer
     * @type      Function
     * @static
     *
     * This static method return true if the global ipc instance is the main server, false if not
     *
     * @return    {Boolean}       true if the global ipc instance is the server, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static async isServer() {
        const globalIpcInstance = await SIpc.getGlobalIpcInstance();
        return globalIpcInstance.isServer();
    }
    /**
     * @name              getGlobalServerId
     * @type              Function
     * @static
     *
     * This static method returns you the global ipc server id
     *
     * @return    {String}      The global ipc server id
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getGlobalServerId() {
        if (!process.env.GLOBAL_IPC_SERVER_ID) {
            process.env.GLOBAL_IPC_SERVER_ID = `SIpc.${process.pid}`;
        }
        return process.env.GLOBAL_IPC_SERVER_ID;
    }
    /**
     * @name          initGlobalInstance
     * @type          Function
     * @async
     * @static
     *
     * This static method ensure that the global IPC instance is correctly inited
     * to be available later quickly
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static initGlobalInstance() {
        return SIpc.getGlobalIpcInstance();
    }
    /**
     * @name              getGlobalIpcInstance
     * @type              Function
     * @async
     * @static
     *
     * This static method check if a global IPC client/server instance exists.
     * If not, it will create and return it by resolving the returned SPromise instance
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static getGlobalIpcInstance(settings = {}) {
        return new __SPromise(async (resolve, reject) => {
            if (__globalIpcInstance) {
                return resolve(__globalIpcInstance);
            }
            const globalServerId = SIpc.getGlobalServerId();
            // if (!__getGlobalIpcInstancePromises.length) {
            const ipcInstance = new SIpc(__deepMerge({}, settings));
            __globalIpcInstance = ipcInstance;
            if (__isChildProcess()) {
                await ipcInstance.connect(globalServerId);
            }
            else {
                await ipcInstance.start();
            }
            resolve(ipcInstance);
        }, {
            id: 'SIpc'
        });
    }
    /**
     * @name              trigger
     * @type              Function
     * @static
     *
     * This static method is a shortcut to call the ```global.globalIpcServer.trigger``` method
     *
     * @param         {String|Array}        what            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
     * @param         {Mixed}         arg         The argument you want to pass to the callback
     * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static async trigger(what, arg) {
        const ipcInstance = await SIpc.getGlobalIpcInstance();
        ipcInstance.trigger(what, arg);
        return ipcInstance;
    }
    /**
     * @name              on
     * @type              Function
     * @static
     *
     * This static method is a shortcut to call the ```global.globalIpcServer.on``` method
     *
     * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static async on(stacks, callback) {
        const ipcInstance = await SIpc.getGlobalIpcInstance();
        ipcInstance.on(stacks, callback);
        return ipcInstance;
    }
    /**
     * @name              isServer
     * @type              Function
     *
     * This method simply return true if this SIpc instance represent a server
     *
     * @return        {Boolean}           ```true``` if this instance represent a server, ```false``` if not
     *
     * @since             2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isServer() {
        return this._ipcInstance.config.id === this.serverId;
    }
    /**
     * @name              isClient
     * @type              Function
     *
     * This method simply return true if this SIpc instance represent a client
     *
     * @return        {Boolean}           ```true``` if this instance represent a client, ```false``` if not
     *
     * @since             2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isClient() {
        return this._ipcInstance.config.id !== this.serverId;
    }
    /**
     * @name              id
     * @type              String
     * @get
     *
     * Access the id.
     *
     * @since             2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get id() {
        return this._ipcInstance.config.id;
    }
    get serverId() {
        return this._serverId || this._ipcInstance.config.id;
    }
    /**
     * @name              start
     * @type              Function
     *
     * This method simply start the server to let other clients connect to it
     *
     * @param         {String|Object}         [params=null]       Some parameters to start your server. Can be:
     * - null if you just want to start a simple local server
     * - An object containing: host, port, UDPType(udp4,udp6) to start your TCP, TLS or UDP socket server
     * @return        {SPromise}          An SPromise instance that will be resolved once the server is ready
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(params = null) {
        return new __SPromise(async (resolve, reject) => {
            // make sure the passed port is free
            let port = await __getFreePort(params && typeof params === 'object'
                ? params.port || this._ipcInstance.config.port
                : this._ipcInstance.config.port);
            if (!params || typeof params === 'string') {
                this._ipcInstance.serve(() => {
                    this._ipcInstance.server.on('_handshake', (processId, socket) => {
                        if (this._socketsByProcesses[processId])
                            return;
                        this._socketsByProcesses[processId] = socket;
                    });
                    resolve();
                });
            }
            else if (typeof params === 'object') {
                this._ipcInstance.serveNet(params.host || 'localhost', port, params.UDPType || 'upd4', () => {
                    // this.trigger('server.ready', {});
                    resolve();
                });
            }
            this._ipcInstance.server.start();
            __onProcessExit(() => {
                return this.stop();
            });
        }, {
            id: `${this.id}.start`
        });
    }
    /**
     * @name              stop
     * @type              Function
     *
     * This method simply stop the server
     *
     * @return        {SPromise}          An SPromise instance that will be resolved once the server is ready
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    stop() {
        return new __SPromise((resolve, reject) => {
            this._ipcInstance.server.stop();
            resolve();
        }, {
            id: `${this.id}.stop`
        });
    }
    /**
     * @name          connect
     * @type          Function
     *
     * This method can be used to connect to a running server using his id.
     *
     * @param         {String|Object}        params            The server to connect to. Can be:
     * - A serverId in String
     * - An object containing: id, host, port to connect to a net server
     * -
     * @return        {SPromise}                          An SPromise instance that will be resolved once the client is correctly connected
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    connect(params) {
        return new __SPromise((resolve, reject) => {
            if (typeof params === 'string') {
                this._ipcInstance.connectTo(params, () => {
                    this._serverId = params;
                    this._ipcInstance.of[this.serverId].on('connect', () => {
                        // this.trigger('connected');
                        resolve();
                    });
                    this._ipcInstance.of[this.serverId].on('disconnect', () => {
                        // this.trigger('disconnected');
                    });
                });
            }
            else if (typeof params === 'object' && params.id) {
                this._ipcInstance.connectToNet(params.id, params.host || 'localhost', params.port || 3435, () => {
                    this._serverId = params.id;
                    this._ipcInstance.of[this.serverId].on('connect', () => {
                        // this.trigger('connected');
                        resolve();
                    });
                    this._ipcInstance.of[this.serverId].on('disconnect', () => {
                        // this.trigger('disconnected');
                    });
                });
            }
        }, {
            id: `${this.id}.connect`
        });
    }
    /**
     * @name          trigger
     * @type          Function
     * @override
     *
     * This method override the SPromise one to add the ipc "emit" functionality to it.
     *
     * @param         {String|Array}        what            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
     * @param         {Mixed}         arg         The argument you want to pass to the callback
     * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    trigger(what, arg, metas = {}) {
        if (this.isServer()) {
            if (this._callbacksStack[what]) {
                this._callbacksStack[what].forEach((callbackFn) => {
                    callbackFn(arg, false);
                });
            }
            Object.keys(this._socketsByProcesses).forEach((processId) => {
                this._ipcInstance.server.emit(this._socketsByProcesses[processId], what, arg);
            });
        }
        else {
            this._ipcInstance.of[this.serverId].emit(what, arg);
        }
        return this;
    }
    on(stacks, callback) {
        if (typeof stacks === 'string')
            stacks = stacks.split(',').map((l) => l.trim());
        if (this.isServer()) {
            stacks.forEach((stack) => {
                if (!this._callbacksStack[stack])
                    this._callbacksStack[stack] = [];
                this._callbacksStack[stack].push(callback);
                this._ipcInstance.server.on(stack, callback);
            });
        }
        else {
            this.trigger('_handshake', process.pid);
            stacks.forEach((stack) => {
                this._ipcInstance.of[this.serverId].on(stack, callback);
            });
        }
        return this;
    }
}
module.exports = SIpc;
