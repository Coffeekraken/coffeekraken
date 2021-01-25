"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const uniqid_1 = __importDefault(require("../string/uniqid"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const node_ipc_1 = require("node-ipc");
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
const getFreePort_1 = __importDefault(require("../network/getFreePort"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const treatAsValue_1 = __importDefault(require("../promise/treatAsValue"));
/**
 * @name            SIpc
 * @namespace       sugar.node.ipc
 * @type            Class
 * @extends         SPromise
 * @wip
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
class SIpcServer extends SPromise_1.default {
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
        super(deepMerge_1.default({
            id: `SIpcServer.${process.pid}.${uniqid_1.default()}`,
            silent: true
        }, settings));
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
         * @name           connexionParams
         * @type            Object
         *
         * Store the server connexion params like "port", "hostname", "id", etc...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.connexionParams = undefined;
        // create the new ipc instance
        this._ipcInstance = new node_ipc_1.IPC();
        Object.assign(this._ipcInstance.config, this._settings);
    }
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
    static getGlobalServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (SIpcServer.hasGlobalServer() === true) {
                return SIpcServer._globalServerInstance;
            }
            SIpcServer._globalServerInstance = new SIpcServer();
            yield SIpcServer._globalServerInstance.start();
            return treatAsValue_1.default(SIpcServer._globalServerInstance);
        });
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
    start(params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // start the actual server
            const serverData = yield this._start(params);
            // listen for events
            this._ipcInstance.server.on('event', (data, socket) => {
                // emit the event using the SPromise method
                this.emit(`${data.stack}`, data.data);
            });
            // save the connexion params
            this.connexionParams = serverData;
            // return the server data
            return serverData;
        });
    }
    _start(params = null) {
        return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            // check if params have only 1 id
            if (plainObject_1.default(params) === true &&
                Object.keys(params).length === 1 &&
                params.id) {
                params = params.id;
            }
            // make sure the passed port is free
            const port = yield getFreePort_1.default(params && typeof params === 'object'
                ? params.port || this._ipcInstance.config.port
                : this._ipcInstance.config.port);
            if (!params || typeof params === 'string') {
                this._ipcInstance.serve(() => {
                    this._ipcInstance.server.on('_handshake', (processId, socket) => {
                        if (this._socketsByProcesses[processId])
                            return;
                        this._socketsByProcesses[processId] = socket;
                    });
                    return resolve({
                        id: this.id
                    });
                });
            }
            else if (typeof params === 'object') {
                this._ipcInstance.serveNet(params.host || 'localhost', port, params.UDPType || 'upd4', () => {
                    // this.emit('server.ready', {});
                    return resolve({
                        id: this.id,
                        host: params.host || 'localhost',
                        port,
                        UDPType: params.UPDType || 'udp4'
                    });
                });
            }
            this._ipcInstance.server.start();
            onProcessExit_1.default(() => {
                return this.stop();
            });
            return true;
        }));
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
        return new SPromise_1.default(({ resolve, reject }) => {
            this._ipcInstance.server.stop();
            resolve();
        }, {
            id: `${this.id}.stop`
        });
    }
}
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
SIpcServer._globalServerInstance = undefined;
module.exports = SIpcServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lwY1NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJcGNTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUFFZCw4REFBd0M7QUFDeEMsbUVBQTZDO0FBQzdDLHVDQUF3QztBQUN4QyxvRUFBOEM7QUFFOUMsNkVBQXVEO0FBQ3ZELHlFQUFtRDtBQUNuRCxvRUFBZ0Q7QUFDaEQsMkVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVcsU0FBUSxrQkFBVTtJQXdGakM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxjQUFjLE9BQU8sQ0FBQyxHQUFHLElBQUksZ0JBQVEsRUFBRSxFQUFFO1lBQzdDLE1BQU0sRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBMUdKOzs7Ozs7Ozs7O1dBVUc7UUFDSyxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUU1Qjs7Ozs7Ozs7O1dBU0c7UUFDSyx3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFFakM7Ozs7Ozs7O1dBUUc7UUFDSCxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQTBFMUIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxjQUFLLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBL0REOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGVBQWU7UUFDcEIsT0FBTyxVQUFVLENBQUMscUJBQXFCLEtBQUssU0FBUyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFPLGVBQWU7O1lBQzFCLElBQUks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