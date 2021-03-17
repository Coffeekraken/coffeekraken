// @ts-nocheck

import __uniqid from '../../shared/string/uniqid';
import __SPromise from '@coffeekraken/s-promise';
import { IPC as __IPC } from 'node-ipc';
import __deepMerge from '../../shared/object/deepMerge';
import __isChildProcess from '../is/childProcess';
import __onProcessExit from '../process/onProcessExit';
import __getFreePort from '../network/getFreePort';
import __isPlainObject from '../../shared/is/plainObject';
import __treatAsValue from '../promise/treatAsValue'; // @NEXT

/**
 * @name            SIpc
 * @namespace       sugar.node.ipc
 * @type            Class
 * @extends         SPromise
 * @status              wip
 *
 * This script check if a global ipc server exists aulready and if it is not the case,
 * it will start one that you can use to communicate between your child process, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Feature}       Integrate the "emit" feature that let the server send messages to the clients
 *
 * @see             https://www.npmjs.com/package/node-ipc
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SIpcServer extends __SPromise {
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
  private _ipcInstance = null;

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
  private _socketsByProcesses = {};

  /**
   * @name           connexionParams
   * @type            Object
   *
   * Store the server connexion params like "port", "hostname", "id", etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  connexionParams = undefined;

  /**
   * @name            _globalServerInstance
   * @type            SIpcServer
   * @static
   *
   * Store the global server instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _globalServerInstance = undefined;

  /**
   * @name            hasGlobalServer
   * @type            Function
   * @static
   *
   * This static method check if a global server exists or not
   *
   * @return      {Boolean}         true if a global server exists, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static hasGlobalServer() {
    return SIpcServer._globalServerInstance !== undefined;
  }

  /**
   * @name            getGlobalServer
   * @type            Function
   * @static
   * @async
   *
   * This method simply create a global server instance and returns it
   * if needed, otherwise simply returns it
   *
   * @return      {SIpcServer}            An SIpcServer instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static async getGlobalServer() {
    if (SIpcServer.hasGlobalServer() === true) {
      return SIpcServer._globalServerInstance;
    }
    SIpcServer._globalServerInstance = new SIpcServer();
    await SIpcServer._globalServerInstance.start();
    return __treatAsValue(SIpcServer._globalServerInstance);
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
    super(
      __deepMerge(
        {
          id: `SIpcServer.${process.pid}.${__uniqid()}`,
          silent: true
        },
        settings
      )
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
  async start(params = null) {
    // start the actual server
    const serverData = await this._start(params);
    // listen for events
    this._ipcInstance.server.on('event', (data, socket) => {
      // emit the event using the SPromise method
      this.emit(`${data.stack}`, data.data);
    });
    // save the connexion params
    this.connexionParams = serverData;
    // return the server data
    return serverData;
  }
  _start(params = null) {
    return new Promise(async ({ resolve, reject }) => {
      // check if params have only 1 id
      if (
        __isPlainObject(params) === true &&
        Object.keys(params).length === 1 &&
        params.id
      ) {
        params = params.id;
      }

      // make sure the passed port is free
      const port = await __getFreePort(
        params && typeof params === 'object'
          ? params.port || this._ipcInstance.config.port
          : this._ipcInstance.config.port
      );

      if (!params || typeof params === 'string') {
        this._ipcInstance.serve(() => {
          this._ipcInstance.server.on('_handshake', (processId, socket) => {
            if (this._socketsByProcesses[processId]) return;
            this._socketsByProcesses[processId] = socket;
          });

          return resolve({
            id: this.id
          });
        });
      } else if (typeof params === 'object') {
        this._ipcInstance.serveNet(
          params.host || 'localhost',
          port,
          params.UDPType || 'upd4',
          () => {
            // this.emit('server.ready', {});
            return resolve({
              id: this.id,
              host: params.host || 'localhost',
              port,
              UDPType: params.UPDType || 'udp4'
            });
          }
        );
      }
      this._ipcInstance.server.start();
      __onProcessExit(() => {
        return this.stop();
      });

      return true;
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
    return new __SPromise(
      ({ resolve, reject }) => {
        this._ipcInstance.server.stop();
        resolve();
      },
      {
        id: `${this.id}.stop`
      }
    );
  }

  // /**
  //  * @name          emit
  //  * @type          Function
  //  * @override
  //  *
  //  * This method override the SPromise one to add the ipc "emit" functionality to it.
  //  *
  //  * @param         {String|Array}        what            The callbacks that you want to emit. Can be "then", "catch", "finally" or "cancel". You can emit multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
  //  * @param         {Mixed}         arg         The argument you want to pass to the callback
  //  * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
  //  *
  //  * @since         2.0.0
  //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
  //  */
  // emit(what, arg, metas = {}) {
  //   if (this._callbacksStack[what]) {
  //     this._callbacksStack[what].forEach((callbackFn) => {
  //       callbackFn(arg, false);
  //     });
  //   }
  //   Object.keys(this._socketsByProcesses).forEach((processId) => {
  //     this._ipcInstance.server.emit(
  //       this._socketsByProcesses[processId],
  //       what,
  //       arg
  //     );
  //   });
  //   return this;
  // }
}

export default SIpcServer;
