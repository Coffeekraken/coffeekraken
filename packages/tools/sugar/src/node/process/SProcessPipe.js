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
const stdio_1 = __importDefault(require("../stdio/stdio"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NQaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NQaXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsV0FBVztBQUNYLHdEQUFvQztBQUVwQyxtRUFBNkM7QUFDN0MsMkVBQXFEO0FBQ3JELG9FQUE4QztBQUM5Qyw2REFBdUM7QUFDdkMsMkRBQXFDO0FBR3JDLHNFQUFrRDtBQWlGbEQsTUFBTSxZQUFhLFNBQVEsdUJBQWU7SUE2QnhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsU0FBMEMsRUFDMUMsV0FBc0MsRUFBRTtRQUV4QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsU0FBUzthQUNqQjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7SUF2Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBVyxtQkFBbUI7UUFDNUIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBNkJEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRSxXQUEwQyxFQUFFO1FBQzNELE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN2RSxtQkFBbUI7WUFDbkIsTUFBTSxtQkFBbUIsR0FBMEIsQ0FDakQsbUJBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQ2hELENBQUM7WUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sdUNBQXVDLGdCQUFRLENBQ25ELElBQUksQ0FBQyxV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