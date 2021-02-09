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
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = SIpcServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lwY1NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJcGNTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsOERBQXdDO0FBQ3hDLG1FQUE2QztBQUM3Qyx1Q0FBd0M7QUFDeEMsb0VBQThDO0FBRTlDLDZFQUF1RDtBQUN2RCx5RUFBbUQ7QUFDbkQsb0VBQWdEO0FBQ2hELDJFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFXLFNBQVEsa0JBQVU7SUF3RmpDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsY0FBYyxPQUFPLENBQUMsR0FBRyxJQUFJLGdCQUFRLEVBQUUsRUFBRTtZQUM3QyxNQUFNLEVBQUUsSUFBSTtTQUNiLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQTFHSjs7Ozs7Ozs7OztXQVVHO1FBQ0ssaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFNUI7Ozs7Ozs7OztXQVNHO1FBQ0ssd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBRWpDOzs7Ozs7OztXQVFHO1FBQ0gsb0JBQWUsR0FBRyxTQUFTLENBQUM7UUEwRTFCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQS9ERDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxlQUFlO1FBQ3BCLE9BQU8sVUFBVSxDQUFDLHFCQUFxQixLQUFLLFNBQVMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBTyxlQUFlOztZQUMxQixJQUFJ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