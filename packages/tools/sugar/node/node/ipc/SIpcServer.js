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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
class SIpcServer extends s_promise_1.default {
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
        return new s_promise_1.default(({ resolve, reject }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lwY1NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2lwYy9TSXBjU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDhEQUF3QztBQUN4Qyx3RUFBaUQ7QUFDakQsdUNBQXdDO0FBQ3hDLG9FQUE4QztBQUU5Qyw2RUFBdUQ7QUFDdkQseUVBQW1EO0FBQ25ELG9FQUFnRDtBQUNoRCwyRUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVyxTQUFRLG1CQUFVO0lBd0ZqQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGNBQWMsT0FBTyxDQUFDLEdBQUcsSUFBSSxnQkFBUSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxFQUFFLElBQUk7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUExR0o7Ozs7Ozs7Ozs7V0FVRztRQUNLLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTVCOzs7Ozs7Ozs7V0FTRztRQUNLLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUVqQzs7Ozs7Ozs7V0FRRztRQUNILG9CQUFlLEdBQUcsU0FBUyxDQUFDO1FBMEUxQiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUEvREQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsZUFBZTtRQUNwQixPQUFPLFVBQVUsQ0FBQyxxQkFBcUIsS0FBSyxTQUFTLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFN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