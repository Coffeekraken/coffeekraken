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
const plainObject_1 = __importDefault(require("../is/plainObject"));
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
 * @todo      {Feature}         Integrate the "on" feature
 *
 * @see             https://www.npmjs.com/package/node-ipc
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SIpcClient {
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
        this._settings = deepMerge_1.default({
            id: `SIpcClient.${process.pid}.${uniqid_1.default()}`,
            silent: true
        }, settings);
        // create the new ipc instance
        this._ipcInstance = new node_ipc_1.IPC();
        Object.assign(this._ipcInstance.config, this._settings);
    }
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
    static connectToParent() {
        return __awaiter(this, void 0, void 0, function* () {
            if (SIpcClient.hasParentServer() === false) {
                throw `Sorry but no parent process SIpcServer instance is available... Make use of the "<yellow>SIpcClient.hasParentServer</yellow>" method if needed...`;
            }
            // parse the data server informations
            const serverData = JSON.parse(process.env.S_IPC_SERVER);
            // instanciate a new SIpcClient
            const ipcClient = new SIpcClient();
            // connect to the server
            yield ipcClient.connect(serverData);
            // return the new client
            return ipcClient;
        });
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
    static hasParentServer() {
        return __awaiter(this, void 0, void 0, function* () {
            return process.env.S_IPC_SERVER !== undefined;
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
        return new SPromise_1.default((resolve, reject) => {
            // check if params have only 1 id
            if (plainObject_1.default(params) === true &&
                Object.keys(params).length === 1 &&
                params.id) {
                params = params.id;
            }
            if (typeof params === 'string') {
                this._ipcInstance.connectTo(params, () => {
                    this.serverId = params;
                    this._ipcInstance.of[this.serverId].on('connect', () => {
                        // this.trigger('connected');
                        resolve({
                            server: {
                                id: this.serverId
                            }
                        });
                    });
                    // this._ipcInstance.of[this.serverId].on('disconnect', () => {
                    //   // this.trigger('disconnected');
                    // });
                });
            }
            else if (typeof params === 'object' && params.id) {
                this._ipcInstance.connectToNet(params.id, params.host || 'localhost', params.port || 3435, () => {
                    this.serverId = params.id;
                    this._ipcInstance.of[this.serverId].on('connect', () => {
                        // this.trigger('connected');
                        resolve({
                            server: {
                                id: this.serverId,
                                host: params.host || 'localhost',
                                port: params.port || 3435
                            }
                        });
                    });
                    // this._ipcInstance.of[this.serverId].on('disconnect', () => {
                    //   // this.trigger('disconnected');
                    // });
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
     * @param         {String|Array}        stack            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
     * @param         {Mixed}         data         The argument you want to pass to the callback
     * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    trigger(stack, data) {
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
}
module.exports = SIpcClient;
//# sourceMappingURL=module.js.map