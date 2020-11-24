// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        define(["require", "exports", "../cli/completeArgsObject", "path", "../time/convert", "../time/wait", "./onProcessExit", "../promise/SPromise", "./interface/SProcessInterface", "node-notifier", "../object/deepMerge", "../path/packageRoot", "../is/childProcess", "../ipc/SIpc", "../error/SError", "../cli/buildCommandLine", "../cli/parseArgs", "child_process", "stack-trace", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var completeArgsObject_1 = __importDefault(require("../cli/completeArgsObject"));
    var path_1 = __importDefault(require("path"));
    var convert_1 = __importDefault(require("../time/convert"));
    var wait_1 = __importDefault(require("../time/wait"));
    var onProcessExit_1 = __importDefault(require("./onProcessExit"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var SProcessInterface_1 = __importDefault(require("./interface/SProcessInterface"));
    var node_notifier_1 = __importDefault(require("node-notifier"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var packageRoot_1 = __importDefault(require("../path/packageRoot"));
    var childProcess_1 = __importDefault(require("../is/childProcess"));
    var SIpc_1 = __importDefault(require("../ipc/SIpc"));
    var SError_2 = __importDefault(require("../error/SError"));
    var buildCommandLine_1 = __importDefault(require("../cli/buildCommandLine"));
    var parseArgs_1 = __importDefault(require("../cli/parseArgs"));
    var child_process_1 = __importDefault(require("child_process"));
    var stack_trace_1 = __importDefault(require("stack-trace"));
    var toString_1 = __importDefault(require("../string/toString"));
    return /** @class */ (function (_super) {
        __extends(SProcess, _super);
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SProcess(settings) {
            if (settings === void 0) { settings = {}; }
            var _this = _super.call(this, deepMerge_2.default({
                output: {},
                runAsChild: false,
                definitionObj: {},
                processPath: null,
                notifications: {
                    enable: true,
                    start: {
                        title: null,
                        message: "Process is running...",
                        icon: packageRoot_1.default(__dirname) + "/src/data/notifications/ck_start.png"
                    },
                    success: {
                        title: null,
                        message: "Process has finish successfully",
                        icon: packageRoot_1.default(__dirname) + "/src/data/notifications/ck_success.png"
                    },
                    error: {
                        title: null,
                        message: "Something went wrong...",
                        icon: packageRoot_1.default(__dirname) + "/src/data/notifications/ck_error.png"
                    }
                },
                env: __assign(__assign({}, process.env), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                        ? process.env.CHILD_PROCESS_LEVEL + 1
                        : 1, IS_CHILD_PROCESS: true })
            }, settings)) || this;
            _this._state = 'idle';
            /**
             * @name      duration
             * @type      Number
             * @get
             *
             * Access the process duration when this one is finished
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.duration = -1;
            /**
             * @name      startTime
             * @type      Number
             * @get
             *
             * Access the process startTime when this one has started
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.startTime = Date.now();
            /**
             * @name      endTime
             * @type      Number
             * @get
             *
             * Access the process endTime when this one is finished
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.endTime = -1;
            /**
             * @name      stdout
             * @type      Array<String>
             * @get
             *
             * Access the process stdout stack
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.stdout = [];
            /**
             * @name      stderr
             * @type
             * @get
             *
             * Access the process stderr stack
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.stderr = [];
            /**
             * @name        value
             * @type        Mixed
             *
             * Access the process result value
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.value = null;
            /**
             * @name        isKilling
             * @type        Boolean
             *
             * Tell is the process is in kill state or not
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.isKilling = false;
            _this._processPath = _this._settings.processPath;
            for (var _i = 0, _a = stack_trace_1.default.get(); _i < _a.length; _i++) {
                var callSite = _a[_i];
                if (callSite.getFunctionName() === _this.constructor.name) {
                    _this._processPath = callSite.getFileName();
                    break;
                }
            }
            if (!_this._processPath) {
                throw new SError_2.default("An SProcess instance MUST have a \"<yellow>processPath</yellow>\" property either populated automatically if possible, or specified in the \"<cyan>settings.processPath</cyan>\" property...");
            }
            if (!_this.constructor.interface) {
                throw new SError_2.default("An SProcess instance MUST have a static \"<yellow>interface</yellow>\" property and it seems that your \"<cyan>" + _this.constructor.name + "</cyan>\" instance does not...");
            }
            if (!_this._settings.notifications.start.title) {
                _this._settings.notifications.start.title = _this._settings.name + " (" + _this._settings.id + ")";
            }
            if (!_this._settings.notifications.success.title) {
                _this._settings.notifications.success.title = _this._settings.name + " (" + _this._settings.id + ")";
            }
            if (!_this._settings.notifications.error.title) {
                _this._settings.notifications.error.title = _this._settings.name + " (" + _this._settings.id + ")";
            }
            SProcessInterface_1.default.apply(_this);
            // add the listeners
            _this.on('resolve,reject,cancel', function (data, metas) {
                _this.value = data;
                _this.endTime = Date.now();
                _this.duration = Date.now() - _this.startTime;
                if (metas.stack === 'resolve')
                    _this.state = 'success';
                else if (metas.stack === 'reject')
                    _this.state = 'error';
                else if (metas.stack === 'cancel')
                    _this.state = 'killed';
                else
                    _this.state = 'idle';
                if (_this.state === 'success') {
                    if (!childProcess_1.default()) {
                        // log a success message
                        _this.log({
                            value: "<yellow>" + '-'.repeat(process.stdout.columns - 4) + "</yellow>\nThe <yellow>" + _this.name + "</yellow> (<cyan>" + _this.id + "</cyan>) process has finished <green>successfully</green> in <yellow>" + convert_1.default(_this.duration, convert_1.default.SECOND) + "s</yellow>\n<yellow>" + '-'.repeat(process.stdout.columns - 4) + "</yellow>"
                        });
                        if (_this._settings.notifications.enable) {
                            node_notifier_1.default.notify(_this._settings.notifications.success);
                        }
                    }
                }
                else if (_this.state === 'error') {
                    if (!childProcess_1.default()) {
                        _this.log({
                            value: "<red>" + '-'.repeat(process.stdout.columns - 4) + "</red>\n<red>Something went wrong</red> during the <yellow>" + _this.name + "</yellow> (<cyan>" + _this.id + "</cyan>) process execution"
                        });
                        if (_this._settings.notifications.enable) {
                            node_notifier_1.default.notify(_this._settings.notifications.error);
                        }
                    }
                }
                return _this.toObject();
            });
            if (childProcess_1.default()) {
                _this.on('*', function (data, metas) {
                    SIpc_1.default.trigger(process.env.GLOBAL_SIPC_TRIGGER_ID + ".trigger", {
                        stack: metas.stack,
                        value: data,
                        metas: __assign({ pid: process.pid }, metas)
                    });
                });
                return _this;
            }
            return _this;
        }
        Object.defineProperty(SProcess.prototype, "id", {
            /**
             * @name      id
             * @type      String
             * @get
             *
             * Access the process id (not the same as a node process id)
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._settings.id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SProcess.prototype, "name", {
            /**
             * @name      name
             * @type      String
             * @get
             *
             * Access the process name (not the same as a node process name)
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._settings.name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SProcess.prototype, "params", {
            /**
             * @name      params
             * @type      String
             * @get
             *
             * Access the process params
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._params;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SProcess.prototype, "state", {
            /**
             * @name      state
             * @type      String
             *
             * Access the process state like 'idle', 'running', 'killed', 'error', 'success'
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._state;
            },
            set: function (value) {
                this._setState(value);
            },
            enumerable: false,
            configurable: true
        });
        SProcess.prototype._setState = function (value) {
            if (['idle', 'running', 'killed', 'error', 'success'].indexOf(value) === -1) {
                throw new SError_2.default("Sorry but the \"<yellow>state</yellow>\" property setted to \"<magenta>" + toString_1.default(value) + "</magenta>\" of your \"<cyan>" + this.constructor.name + "</cyan>\" class can contain only one of these values: " + [
                    'idle',
                    'running',
                    'killed',
                    'error',
                    'success'
                ]
                    .map(function (i) {
                    return "\"<green>" + i + "</green>\"";
                })
                    .join(', '));
            }
            // trigger an event
            this.trigger('state', value);
            this._state = value;
        };
        /**
         * @name      toObject
         * @type      Function
         *
         * This method allows you to transform this instance into
         * a plain object that you can use whenever you want
         *
         * @return    {Object}      The object version of this instance
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SProcess.prototype.toObject = function () {
            return {
                state: this.state,
                startTime: this.startTime,
                endTime: this.endTime,
                duration: this.duration,
                stdout: this.stdout,
                stderr: this.stderr,
                value: this.value
            };
        };
        /**
         * @name      bindSPromise
         * @type      Function
         *
         * This method allows you to bind a SPromise instance to
         * this proces. That allows the SProcess instance to listen
         * for errors, end of process, etc automatically
         *
         * @param     {SPromise}      promise       An SPromise instance that you want to bind to this process
         * @return    {SProcess}                    Maintain the chainability
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SProcess.prototype.bindSPromise = function (promise) {
            var _this = this;
            if (!(promise instanceof SPromise_1.default)) {
                throw new SError_2.default("Sorry but the passed promise parameter to the \"bindSPromise\" method has to be an SPromise instance and you've passed a \"" + typeof promise + "\"");
            }
            this._promise = promise;
            SPromise_1.default.pipe(this._promise, this, {
            // exclude: ['resolve']
            });
            this._promise.on('resolve', function (data, metas) {
                _this.resolve(data);
            });
        };
        /**
         * @name      run
         * @type      Function
         * @async
         *
         * Access the process run when this one is finished
         *
         * @todo      Doc
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SProcess.prototype.run = function (paramsOrStringArgs, settings) {
            if (paramsOrStringArgs === void 0) { paramsOrStringArgs = {}; }
            if (settings === void 0) { settings = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var paramsObj, commandToRun;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            settings = deepMerge_2.default(this._settings, settings);
                            return [4 /*yield*/, wait_1.default(100)];
                        case 1:
                            _a.sent();
                            paramsObj = paramsOrStringArgs;
                            if (typeof paramsObj === 'string') {
                                paramsObj = parseArgs_1.default(paramsObj, {
                                    definitionObj: this.constructor.interface
                                        ? __assign(__assign({}, this.constructor.interface.definitionObj), { processPath: {
                                                type: 'String'
                                            } }) : null
                                });
                            }
                            else if (typeof paramsObj === 'object') {
                                paramsObj = completeArgsObject_1.default(paramsObj, {
                                    definitionObj: this.constructor.interface.definitionObj
                                });
                            }
                            // save current process params
                            this._params = Object.assign({}, paramsObj);
                            // log a start message
                            if (!childProcess_1.default()) {
                                this.log({
                                    value: "<yellow>" + '-'.repeat(process.stdout.columns - 4) + "</yellow>\nStarting the <yellow>" + this.name + "</yellow> (<cyan>" + this.id + "</cyan>) process...\n<yellow>" + '-'.repeat(process.stdout.columns - 4) + "</yellow>"
                                });
                            }
                            if (!(settings.runAsChild && !childProcess_1.default())) return [3 /*break*/, 3];
                            commandToRun = buildCommandLine_1.default("node " + path_1.default.resolve(__dirname, '../../cli/sugar.cli.js') + " process.runChild [arguments]", __assign(__assign({}, paramsObj), { processPath: this._processPath }), {
                                definitionObj: __assign(__assign({}, this.constructor.interface.definitionObj), { processPath: {
                                        type: 'String',
                                        required: true
                                    } }),
                                alias: false
                            }, {});
                            this._currentChildProcess = child_process_1.default.spawn(commandToRun, [], {
                                env: settings.env,
                                shell: true
                            });
                            onProcessExit_1.default(function () {
                                _this._currentChildProcess.kill();
                            });
                            this._currentChildProcess.on('close', function (code, signal) {
                                if (_this.stderr.length) {
                                    _this.reject(_this.stderr.join('\n'));
                                    var error = new SError_2.default(_this.stderr.join('\n'));
                                    _this.error("<yellow>Child Process</yellow>\n" + error.message);
                                }
                                else if (_this._isKilling || (!code && signal)) {
                                    _this.kill();
                                }
                                else if (code === 0 && !signal) {
                                    _this.resolve();
                                }
                                else {
                                    _this.reject();
                                }
                                // reset isKilling boolean
                                _this._isKilling = false;
                            });
                            return [4 /*yield*/, SIpc_1.default.isServer()];
                        case 2:
                            if (_a.sent()) {
                                SIpc_1.default.on(settings.env.GLOBAL_SIPC_TRIGGER_ID + ".trigger", function (data, socket) {
                                    _this.trigger(data.stack, data.value, data.metas);
                                });
                            }
                            // stdout data
                            if (this._currentChildProcess.stdout) {
                                this._currentChildProcess.stdout.on('data', function (data) {
                                    _this.log({
                                        value: data.toString()
                                    });
                                });
                            }
                            // stderr data
                            if (this._currentChildProcess.stderr) {
                                this._currentChildProcess.stderr.on('data', function (error) {
                                    _this.error({
                                        error: true,
                                        value: error.toString()
                                    });
                                });
                            }
                            if (settings.notifications.enable) {
                                node_notifier_1.default.notify(settings.notifications.start);
                            }
                            this.trigger("start", this.toObject());
                            return [2 /*return*/];
                        case 3: 
                        // run the actual process using the "process" method
                        return [2 /*return*/, this.process(paramsObj, settings)];
                    }
                });
            });
        };
        /**
         * @name      spawn
         * @type      Function
         * @async
         *
         * This method allows you to spawn a command that will be automatically binded to the
         * current SProcess instance. This mean that all the stdout and stderr will be proxied
         * as well as all the "close" events, etc...
         *
         * @param         {String}          command         The command to launch. Can contain the token [arguments] that will be replaced by the passed params object or string
         * @param         {Object|String}     [params={}]     The parameters to pass to the command
         * @param         {Object}          [settings={}]     A settings object to configure your spawn process
         *
         * @setting       {Object}          [definitionObj={}]        A definition object for the command params
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        // async spawn(command, params = {}, settings = {}) {
        //   settings = __deepMerge(
        //     {
        //       env: this._settings.env,
        //       definitionObj: null
        //     },
        //     settings
        //   );
        //   let stringParams;
        //   if (typeof params === 'string') {
        //     stringParams = params;
        //   } else if (typeof params === 'object') {
        //     stringParams = __argsToString(params, {
        //       definitionObj: settings.definitionObj
        //     });
        //   } else {
        //     throw new __SError(
        //       `Sorry but the "<yellow>params</yellow>" arguments of the "<cyan>SProcess.spawn</cyan>" method has to be either an <green>Object</green>, either a simple <green>String</green> and you've passed a <red>${typeof params}</red>...`
        //     );
        //   }
        //   // build command to run
        //   const commandToRun = command.replace('[arguments]', stringParams);
        //   const childProcess = __childProcess.spawn(commandToRun, [], {
        //     env: settings.env,
        //     shell: true
        //   });
        //   __onProcessExit(() => {
        //     childProcess.kill();
        //   });
        //   childProcess.on('close', (code, signal) => {
        //     if (this.stderr.length) {
        //       this.reject(this.stderr.join('\n'));
        //       const error = new __SError(this.stderr.join('\n'));
        //       this.error(`<yellow>Child Process</yellow>\n${error.message}`);
        //     } else if (this._isKilling || (!code && signal)) {
        //       this.kill();
        //     } else if (code === 0 && !signal) {
        //       this.resolve();
        //     } else {
        //       this.reject();
        //     }
        //     // reset isKilling boolean
        //     this._isKilling = false;
        //   });
        //   if (await __SIpc.isServer()) {
        //     __SIpc.on(
        //       `${settings.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`,
        //       (data, socket) => {
        //         this.trigger(data.stack, data.value, data.metas);
        //       }
        //     );
        //   }
        //   // stdout data
        //   if (childProcess.stdout) {
        //     childProcess.stdout.on('data', (data) => {
        //       this.log({
        //         value: data.toString()
        //       });
        //     });
        //   }
        //   // stderr data
        //   if (childProcess.stderr) {
        //     childProcess.stderr.on('data', (error) => {
        //       this.error({
        //         error: true,
        //         value: error.toString()
        //       });
        //     });
        //   }
        // }
        /**
         * @name      kill
         * @type      Function
         *
         * This method will simply kill the process and call the "cancel" method
         * on the SPromise super instance as well as on the passed "promise" instance
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SProcess.prototype.kill = function () {
            this.isKilling = true;
            // call the cancel method on the parent SPromise instance
            this.cancel();
            // cancel the passed promise
            if (this._promise && this.promise.cancel)
                this._promise.cancel();
        };
        /**
         * @name          log
         * @type          Function
         *
         * This method allows you to log a message that will be catched by the parent manager class
         *
         * @param       {String}        message           The message you want to log
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SProcess.prototype.log = function () {
            var _this = this;
            var logs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logs[_i] = arguments[_i];
            }
            logs.forEach(function (log) {
                _this.stdout.push(log.value || log.toString());
                _this.trigger('log', log);
            });
        };
        /**
         * @name          error
         * @type          Function
         *
         * This method allows you to error a message that will be catched by the parent manager class
         *
         * @param       {String}        message           The message you want to error
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SProcess.prototype.error = function () {
            var _this = this;
            var errors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                errors[_i] = arguments[_i];
            }
            errors.forEach(function (error) {
                _this.stderr.push(error.value || error.toString());
                _this.trigger('error', error);
            });
        };
        return SProcess;
    }(SPromise_1.default));
});
