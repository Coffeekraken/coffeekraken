// @ts-nocheck

import __uniqid from '../string/uniqid';
import __SPromise from '../promise/SPromise';
import { IPC as __IPC } from 'node-ipc';
import __deepMerge from '../object/deepMerge';
import __isChildProcess from '../is/childProcess';
import __onProcessExit from '../process/onProcessExit';
import __getFreePort from '../network/getFreePort';
import __isPlainObject from '../is/plainObject';

/**
 * @name            SIpcClient
 * @namespace       sugar.node.ipc
 * @type            Class
 * @wip
 *
 * This script check if a global ipc server exists aulready and if it is not the case,
 * it will start one that you can use to communicate between your child process, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @feature         Integrate the "on" feature
 *
 * @see             https://www.npmjs.com/package/node-ipc
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SIpcClient {
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
   * @name           connectToParent
   * @type          Function
   * @async
   * @static
   *
   * This static function allows you to connect to the parent process
   * if their's one.
   *
   * @return      {SIpcClient}      An SIpcClient instance connected to the client
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static async connectToParent() {
    if (SIpcClient.hasParentServer() === false) {
      throw `Sorry but no parent process SIpcServer instance is available... Make use of the "<yellow>SIpcClient.hasParentServer</yellow>" method if needed...`;
    }
    // parse the data server informations
    const serverData = JSON.parse(process.env.S_IPC_SERVER);
    // instanciate a new SIpcClient
    const ipcClient = new SIpcClient();
    // connect to the server
    await ipcClient.connect(serverData);
    // return the new client
    return ipcClient;
  }

  /**
   * @name           hasParentServer
   * @type          Function
   * @async
   * @static
   *
   * This static function allows you to check if a parent server exists
   *
   * @return      {Boolean}               true if a parent server is accessible, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static async hasParentServer() {
    return process.env.S_IPC_SERVER !== undefined;
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
    this._settings = __deepMerge(
      {
        id: `SIpcClient.${process.pid}.${__uniqid()}`,
        silent: true
      },
      settings
    );

    // create the new ipc instance
    this._ipcInstance = new __IPC();
    Object.assign(this._ipcInstance.config, this._settings);
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
      ({ resolve, reject }) => {
        // check if params have only 1 id
        if (
          __isPlainObject(params) === true &&
          Object.keys(params).length === 1 &&
          params.id
        ) {
          params = params.id;
        }

        if (typeof params === 'string') {
          this._ipcInstance.connectTo(params, () => {
            this.serverId = params;
            this._ipcInstance.of[this.serverId].on('connect', () => {
              // this.emit('connected');
              resolve({
                server: {
                  id: this.serverId
                }
              });
            });
            // this._ipcInstance.of[this.serverId].on('disconnect', () => {
            //   // this.emit('disconnected');
            // });
          });
        } else if (typeof params === 'object' && params.id) {
          this._ipcInstance.connectToNet(
            params.id,
            params.host || 'localhost',
            params.port || 3435,
            () => {
              this.serverId = params.id;
              this._ipcInstance.of[this.serverId].on('connect', () => {
                // this.emit('connected');
                resolve({
                  server: {
                    id: this.serverId,
                    host: params.host || 'localhost',
                    port: params.port || 3435
                  }
                });
              });
              // this._ipcInstance.of[this.serverId].on('disconnect', () => {
              //   // this.emit('disconnected');
              // });
            }
          );
        }
      },
      {
        id: `${this.id}.connect`
      }
    );
  }

  /**
   * @name          emit
   * @type          Function
   * @override
   *
   * This method override the SPromise one to add the ipc "emit" functionality to it.
   *
   * @param         {String|Array}        stack            The callbacks that you want to emit. Can be "then", "catch", "finally" or "cancel". You can emit multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
   * @param         {Mixed}         data         The argument you want to pass to the callback
   * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  emit(stack, data) {
    // preparing the object to send
    const eventObj = {
      stack: process.env.S_IPC_SPAWN_ID
        ? `${process.env.S_IPC_SPAWN_ID}.${stack}`
        : stack,
      data
    };

    this._ipcInstance.of[this.serverId].emit('event', eventObj);
    return this;
  }

  // /**
  //  * @name          on
  //  * @type           Function
  //  * @override
  //  *
  //  * Override the ```on``` SPromise method to be able to listen for events emited through the ipc server and clients
  //  *
  //  * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
  //  * @param           {Function}        callback        The callback function to register
  //  * @return          {SPromise}                  The SPromise instance to maintain chainability
  //  *
  //  * @since         2.0.0
  //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
  //  */
  // _callbacksStack = {};
  // on(stacks, callback) {
  //   if (typeof stacks === 'string')
  //     stacks = stacks.split(',').map((l) => l.trim());
  //   this.emit('_handshake', process.pid);
  //   stacks.forEach((stack) => {
  //     this._ipcInstance.of[this.serverId].on(stack, callback);
  //   });
  //   return this;
  // }
}

export = SIpcClient;
