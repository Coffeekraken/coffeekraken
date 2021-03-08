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
const plainObject_1 = __importDefault(require("../is/plainObject"));
/**
 * @name            SIpcClient
 * @namespace       sugar.node.ipc
 * @type            Class
 * @status              wip
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
        return new s_promise_1.default(({ resolve, reject }) => {
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
            }
            else if (typeof params === 'object' && params.id) {
                this._ipcInstance.connectToNet(params.id, params.host || 'localhost', params.port || 3435, () => {
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
                });
            }
        }, {
            id: `${this.id}.connect`
        });
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
}
exports.default = SIpcClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lwY0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJcGNDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsOERBQXdDO0FBQ3hDLHdFQUFpRDtBQUNqRCx1Q0FBd0M7QUFDeEMsb0VBQThDO0FBSTlDLG9FQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLFVBQVU7SUFzRWQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQS9FekI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7Ozs7V0FVRztRQUNILGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBMERsQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO1lBQ0UsRUFBRSxFQUFFLGNBQWMsT0FBTyxDQUFDLEdBQUcsSUFBSSxnQkFBUSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxFQUFFLElBQUk7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxjQUFLLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBbkVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQU8sZUFBZTs7WUFDMUIsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUMxQyxNQUFNLG1KQUFtSixDQUFDO2FBQzNKO1lBQ0QscUNBQXFDO1lBQ3JDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN4RCwrQkFBK0I7WUFDL0IsTUFBTSxTQUFTLEdBQUcs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