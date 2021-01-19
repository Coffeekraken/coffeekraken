"use strict";
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
// @to-work
const class_1 = __importDefault(require("../is/class"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const typeof_1 = __importDefault(require("../value/typeof"));
const stdio_1 = __importDefault(require("./stdio"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
class SProcessPipe extends SEventEmitter_1.default {
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
    constructor(processes, settings = {}) {
        super(deepMerge_1.default({
            processPipe: {
                stdio: 'inherit'
            }
        }, settings));
        this._processes = processes;
    }
    /**
     * @name            processPipeSettings
     * @type            ISProcessPipeSettings
     * @get
     *
     * Access the process pipe settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get processPipeSettings() {
        return this._settings.processPipe;
    }
    /**
     * @name          run
     * @type          Function
     * @async
     *
     * Execute the processes pipe
     *
     * @param         {Object}        [params={}]             The initial params object to pass to the first process
     * @param         {Object}        [settings={}]           Some settings to override from the one passed in the constructor
     * @return        {SPromise}                              An SPromise instance through which you can get events piped from processes
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(params = {}, settings = {}) {
        const promise = new SPromise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // extends settings
            const processPipeSettings = (deepMerge_1.default(this.processPipeSettings, settings));
            if (!Array.isArray(this._processes)) {
                throw `Sorry but you've passed an "<yellow>${typeof_1.default(this._processes)}</yellow>" as "<cyan>SProcessManager.pipe</cyan>" argument but it needs to be an <green>Array</green>`;
            }
            // @ts-ignore
            if (!childProcess_1.default() && processPipeSettings.stdio && !this.stdio) {
                this.stdio = stdio_1.default(this, {
                    stdio: processPipeSettings.stdio
                });
            }
            // loop on each processes passed
            for (let i = 0; i < this._processes.length; i++) {
                const pro = this._processes[i];
                let processInstance, processParams = {}, processSettings = processPipeSettings.processesSettings;
                // check the type of the process
                if (class_1.default(pro)) {
                    processInstance = new pro(Object.assign(Object.assign({}, (processPipeSettings.processesSettings || {})), { stdio: false }));
                }
                else if (typeof pro === 'function') {
                    // emit('log', {
                    //   type: 'separator',
                    //   separator: '#',
                    //   value: 'Processing params'
                    // });
                    params = pro(params);
                    // emit('log', {
                    //   type: 'separator',
                    //   value: ''
                    // });
                }
                else if (typeof pro === 'object') {
                    processSettings = pro.settings || {};
                    processParams = pro.params || {};
                    if (!pro.process) {
                        emit('warn', {
                            value: `You have passed an "<yellow>Object</yellow>" as process parameter in the "<cyan>SProcessManager.pipe</cyan>" static method but you don't have specified the "<magenta>process</magenta>" property with either an SProcess instance, or directly the SProcess class you want`
                        });
                        continue;
                    }
                    if (class_1.default(pro.process)) {
                        processInstance = new pro.process(Object.assign(Object.assign({}, processSettings), { stdio: false }));
                    }
                }
                // execute the process
                // @ts-ignore
                if (processInstance) {
                    emit('log', {
                        type: 'separator',
                        value: processInstance.formattedName
                    });
                    pipe(processInstance);
                    const res = yield processInstance.run(params, processSettings);
                    emit('log', {
                        type: 'separator',
                        value: ''
                    });
                }
            }
        }));
        this.pipe(promise);
        return promise;
    }
}
// const cls: ISProcessPipeCtor = SProcessPipe;
exports.default = SProcessPipe;
//# sourceMappingURL=SProcessPipe.js.map