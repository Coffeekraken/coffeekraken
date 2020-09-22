const __uniqid = require('../string/uniqid');
const __SPromise = require('../promise/SPromise');
const __IPC = require('node-ipc').IPC;
const __deepMerge = require('../object/deepMerge');
const __isChildProcess = require('../is/childProcess');

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
class SIpc {
  /**
   * @name                  _settings
   * @type                  Object
   * @private
   *
   * Store the settings of this instance. Here's the available settings:
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _settings = {};

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
  _ipcInstance = null;

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
      if (global.globalIpcInstance) {
        return resolve(global.globalIpcInstance);
      }

      if (!process.env.GLOBAL_SIPC_INSTANCE_ID) {
        process.env.GLOBAL_SIPC_INSTANCE_ID = `globalSIpcInstance.${__uniqid()}`;
      }

      const ipcInstance = new SIpc(
        __deepMerge(
          {
            id: process.env.GLOBAL_SIPC_INSTANCE_ID
          },
          settings
        )
      );

      if (__isChildProcess()) {
        // await ipcInstance.connect(process.env.GLOBAL_SIPC_INSTANCE_ID);
      } else {
        await ipcInstance.start();
      }

      global.ipcInstance = ipcInstance;
      resolve(ipcInstance);
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
    this._settings = __deepMerge({}, settings);

    // create the new ipc instance
    this._ipcInstance = new __IPC();
    Object.assign(this._ipcInstance.config, this._settings);
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
   * @name              serverId
   * @type              String
   * @get
   *
   * Access the server id. This id will be either the ipcInstance.config.id or the id of the server the client is connected to
   *
   * @since             2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _serverId = null;
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
    return new __SPromise(
      (resolve, reject) => {
        if (!params || typeof params === 'string') {
          this._ipcInstance.serve(() => {
            // this.trigger('server.ready', {});
            resolve();
          });
        } else if (typeof params === 'object') {
          // this._ipcInstance.serveNet(
          //   params.host || 'localhost',
          //   params.port || 3435,
          //   params.UDPType || 'upd4',
          //   () => {
          //     // this.trigger('server.ready', {});
          //     resolve();
          //   }
          // );
        }
        this._ipcInstance.server.start();
      },
      {
        id: 'SIpc.start'
      }
    );
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
    return new __SPromise(
      (resolve, reject) => {
        this._ipcInstance.server.stop();
        resolve();
      },
      {
        id: 'SIpc.stop'
      }
    );
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
    return new __SPromise(
      (resolve, reject) => {
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
        } else if (typeof params === 'object' && params.id) {
          this._ipcInstance.connectToNet(
            params.id,
            params.host || 'localhost',
            params.port || 3435,
            () => {
              this._serverId = params.id;
              this._ipcInstance.of[this.serverId].on('connect', () => {
                // this.trigger('connected');
                resolve();
              });
              this._ipcInstance.of[this.serverId].on('disconnect', () => {
                // this.trigger('disconnected');
              });
            }
          );
        }
      },
      {
        id: 'SIpc.connect'
      }
    );
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
    this._ipcInstance.of[this.serverId].emit(what, arg);
    return this;
  }

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
  on(stacks, callback) {
    if (typeof stacks === 'string')
      stacks = stacks.split(',').map((l) => l.trim());
    if (this.isServer()) {
      stacks.forEach((stack) => {
        this._ipcInstance.server.on(stack, callback);
      });
    } else {
      stacks.forEach((stack) => {
        this._ipcInstance.of[this.serverId].on(stack, callback);
      });
    }
    return this;
  }
}

SIpc.getGlobalIpcInstance();

module.exports = SIpc;
