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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lwY0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2lwYy9TSXBjQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDhEQUF3QztBQUN4Qyx3RUFBaUQ7QUFDakQsdUNBQXdDO0FBQ3hDLG9FQUE4QztBQUk5QyxvRUFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxVQUFVO0lBc0VkOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUEvRXpCOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7O1dBVUc7UUFDSCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQTBEbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLEVBQUUsRUFBRSxjQUFjLE9BQU8sQ0FBQyxHQUFHLElBQUksZ0JBQVEsRUFBRSxFQUFFO1lBQzdDLE1BQU0sRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQW5FRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFPLGVBQWU7O1lBQzFCLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLEtBQUssRUFBRTtnQkFDMUMsTUFBTSxtSkFBbUosQ0FBQzthQUMzSjtZQUNELHFDQUFxQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEQsK0JBQStC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