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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../promise/SPromise", "node-ipc", "../object/deepMerge", "../is/childProcess", "../process/onProcessExit", "../network/getFreePort"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var node_ipc_1 = require("node-ipc");
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var childProcess_1 = __importDefault(require("../is/childProcess"));
    var onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
    var getFreePort_1 = __importDefault(require("../network/getFreePort"));
    /**
     * @name            SIpc
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
     *
     * @see             https://www.npmjs.com/package/node-ipc
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var __globalIpcInstance = null;
    var SIpc = /** @class */ (function () {
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
        function SIpc(settings) {
            if (settings === void 0) { settings = {}; }
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
            this._settings = deepMerge_2.default({
                id: "SIpc." + process.pid,
                silent: true
            }, settings);
            // create the new ipc instance
            this._ipcInstance = new node_ipc_1.IPC();
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
        SIpc.isServer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var globalIpcInstance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, SIpc.getGlobalIpcInstance()];
                        case 1:
                            globalIpcInstance = _a.sent();
                            return [2 /*return*/, globalIpcInstance.isServer()];
                    }
                });
            });
        };
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
        SIpc.getGlobalServerId = function () {
            if (!process.env.GLOBAL_IPC_SERVER_ID) {
                process.env.GLOBAL_IPC_SERVER_ID = "SIpc." + process.pid;
            }
            return process.env.GLOBAL_IPC_SERVER_ID;
        };
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
        SIpc.initGlobalInstance = function () {
            return SIpc.getGlobalIpcInstance();
        };
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
        SIpc.getGlobalIpcInstance = function (settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
            return new SPromise_1.default(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var globalServerId, ipcInstance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (__globalIpcInstance) {
                                return [2 /*return*/, resolve(__globalIpcInstance)];
                            }
                            globalServerId = SIpc.getGlobalServerId();
                            ipcInstance = new SIpc(deepMerge_2.default({}, settings));
                            __globalIpcInstance = ipcInstance;
                            if (!childProcess_1.default()) return [3 /*break*/, 2];
                            return [4 /*yield*/, ipcInstance.connect(globalServerId)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, ipcInstance.start()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            resolve(ipcInstance);
                            return [2 /*return*/];
                    }
                });
            }); }, {
                id: 'SIpc'
            });
        };
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
        SIpc.trigger = function (what, arg) {
            return __awaiter(this, void 0, void 0, function () {
                var ipcInstance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, SIpc.getGlobalIpcInstance()];
                        case 1:
                            ipcInstance = _a.sent();
                            ipcInstance.trigger(what, arg);
                            return [2 /*return*/, ipcInstance];
                    }
                });
            });
        };
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
        SIpc.on = function (stacks, callback) {
            return __awaiter(this, void 0, void 0, function () {
                var ipcInstance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, SIpc.getGlobalIpcInstance()];
                        case 1:
                            ipcInstance = _a.sent();
                            ipcInstance.on(stacks, callback);
                            return [2 /*return*/, ipcInstance];
                    }
                });
            });
        };
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
        SIpc.prototype.isServer = function () {
            return this._ipcInstance.config.id === this.serverId;
        };
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
        SIpc.prototype.isClient = function () {
            return this._ipcInstance.config.id !== this.serverId;
        };
        Object.defineProperty(SIpc.prototype, "id", {
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
            get: function () {
                return this._ipcInstance.config.id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SIpc.prototype, "serverId", {
            get: function () {
                return this._serverId || this._ipcInstance.config.id;
            },
            enumerable: false,
            configurable: true
        });
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
        SIpc.prototype.start = function (params) {
            var _this = this;
            if (params === void 0) { params = null; }
            return new SPromise_1.default(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var port;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getFreePort_1.default(params && typeof params === 'object'
                                ? params.port || this._ipcInstance.config.port
                                : this._ipcInstance.config.port)];
                        case 1:
                            port = _a.sent();
                            if (!params || typeof params === 'string') {
                                this._ipcInstance.serve(function () {
                                    _this._ipcInstance.server.on('_handshake', function (processId, socket) {
                                        if (_this._socketsByProcesses[processId])
                                            return;
                                        _this._socketsByProcesses[processId] = socket;
                                    });
                                    resolve();
                                });
                            }
                            else if (typeof params === 'object') {
                                this._ipcInstance.serveNet(params.host || 'localhost', port, params.UDPType || 'upd4', function () {
                                    // this.trigger('server.ready', {});
                                    resolve();
                                });
                            }
                            this._ipcInstance.server.start();
                            onProcessExit_1.default(function () {
                                return _this.stop();
                            });
                            return [2 /*return*/];
                    }
                });
            }); }, {
                id: this.id + ".start"
            });
        };
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
        SIpc.prototype.stop = function () {
            var _this = this;
            return new SPromise_1.default(function (resolve, reject) {
                _this._ipcInstance.server.stop();
                resolve();
            }, {
                id: this.id + ".stop"
            });
        };
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
        SIpc.prototype.connect = function (params) {
            var _this = this;
            return new SPromise_1.default(function (resolve, reject) {
                if (typeof params === 'string') {
                    _this._ipcInstance.connectTo(params, function () {
                        _this._serverId = params;
                        _this._ipcInstance.of[_this.serverId].on('connect', function () {
                            // this.trigger('connected');
                            resolve();
                        });
                        _this._ipcInstance.of[_this.serverId].on('disconnect', function () {
                            // this.trigger('disconnected');
                        });
                    });
                }
                else if (typeof params === 'object' && params.id) {
                    _this._ipcInstance.connectToNet(params.id, params.host || 'localhost', params.port || 3435, function () {
                        _this._serverId = params.id;
                        _this._ipcInstance.of[_this.serverId].on('connect', function () {
                            // this.trigger('connected');
                            resolve();
                        });
                        _this._ipcInstance.of[_this.serverId].on('disconnect', function () {
                            // this.trigger('disconnected');
                        });
                    });
                }
            }, {
                id: this.id + ".connect"
            });
        };
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
        SIpc.prototype.trigger = function (what, arg, metas) {
            var _this = this;
            if (metas === void 0) { metas = {}; }
            if (this.isServer()) {
                if (this._callbacksStack[what]) {
                    this._callbacksStack[what].forEach(function (callbackFn) {
                        callbackFn(arg, false);
                    });
                }
                Object.keys(this._socketsByProcesses).forEach(function (processId) {
                    _this._ipcInstance.server.emit(_this._socketsByProcesses[processId], what, arg);
                });
            }
            else {
                this._ipcInstance.of[this.serverId].emit(what, arg);
            }
            return this;
        };
        SIpc.prototype.on = function (stacks, callback) {
            var _this = this;
            if (typeof stacks === 'string')
                stacks = stacks.split(',').map(function (l) { return l.trim(); });
            if (this.isServer()) {
                stacks.forEach(function (stack) {
                    if (!_this._callbacksStack[stack])
                        _this._callbacksStack[stack] = [];
                    _this._callbacksStack[stack].push(callback);
                    _this._ipcInstance.server.on(stack, callback);
                });
            }
            else {
                this.trigger('_handshake', process.pid);
                stacks.forEach(function (stack) {
                    _this._ipcInstance.of[_this.serverId].on(stack, callback);
                });
            }
            return this;
        };
        return SIpc;
    }());
    return SIpc;
});
