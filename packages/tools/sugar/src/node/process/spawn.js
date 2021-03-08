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
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const child_process_1 = require("child_process");
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const onProcessExit_1 = __importDefault(require("./onProcessExit"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
function spawn(command, args = [], settings = {}) {
    let childProcess;
    let serverData, isCancel = false;
    const promise = new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        settings = deepMerge_1.default({
            supportSPromise: true
        }, settings);
        const duration = new SDuration_1.default();
        let resolveValue, rejectValue;
        const stderr = [], stdout = [];
        childProcess = child_process_1.spawn(command, [], Object.assign(Object.assign({ shell: true, stdio: ['pipe', 'pipe', 'pipe', 'ipc'], cwd: settings.cwd || process.cwd() }, settings), { env: Object.assign(Object.assign(Object.assign({}, process.env), { CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
                    ? process.env.CHILD_PROCESS_LEVEL + 1
                    : 1, IS_CHILD_PROCESS: true }), (settings.env || {})) }));
        onProcessExit_1.default(() => {
            childProcess.kill();
        });
        // handle the process.send pattern
        if (settings.supportSPromise) {
            childProcess.on('message', (dataObj) => {
                if (!dataObj.value || !dataObj.metas)
                    return;
                if (dataObj.metas.event === 'resolve') {
                    resolveValue = dataObj.value;
                    childProcess.kill('SIGINT');
                }
                else if (dataObj.metas.event === 'reject') {
                    rejectValue = dataObj.value;
                    childProcess.kill('SIGINT');
                }
                else {
                    emit(dataObj.metas.event, dataObj.value, dataObj.metas);
                }
            });
        }
        // listen for errors etc...
        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                if (!data)
                    return;
                stdout.push(data.toString());
                emit('log', {
                    value: data.toString()
                });
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                if (!data)
                    return;
                stderr.push(data.toString());
                emit('error', {
                    value: data.toString()
                });
            });
        }
        let isEnded = false;
        childProcess.on('close', (code, signal) => {
            if (isEnded)
                return;
            isEnded = true;
            // build the result object
            const resultObj = Object.assign({ code,
                signal, value: resolveValue || rejectValue, stdout,
                stderr, spawn: true }, duration.end());
            // generic close event
            emit('close', resultObj);
            // handle resolve and reject
            if (resolveValue) {
                emit('close.success', resultObj);
                return resolve(resultObj);
            }
            else if (rejectValue) {
                emit('close.error', resultObj);
                return reject(resultObj);
            }
            // handle other cases
            if (stderr.length) {
                emit('close.error', resultObj);
                return reject(resultObj);
            }
            else if (!code && signal) {
                emit('close.killed', resultObj);
                return resolve(resultObj);
            }
            else if (code === 0 && !signal) {
                emit('close.success', resultObj);
                return resolve(resultObj);
            }
            else {
                emit('close.error', resultObj);
                return reject(resultObj);
            }
        });
    }));
    return promise;
}
exports.default = spawn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFHZCxvRUFBOEM7QUFDOUMsaURBQWlEO0FBQ2pELHdFQUFpRDtBQUNqRCxvRUFBOEM7QUFDOUMsa0VBQTRDO0FBa0Q1QyxTQUF3QixLQUFLLENBQzNCLE9BQWUsRUFDZixPQUFpQixFQUFFLEVBQ25CLFdBQTJCLEVBQUU7SUFFN0IsSUFBSSxZQUFZLENBQUM7SUFDakIsSUFBSSxVQUFVLEVBQ1osUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVuQixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNqRSxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxlQUFlLEVBQUUsSUFBSTtTQUN0QixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxZQUFpQixFQUFFLFdBQWdCLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxFQUNmLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFZCxZQUFZLEdBQUcscUJBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQ0FDaEMsS0FBSyxFQUFFLElBQUksRUFDWCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFDdEMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUMvQixRQUFRLEtBQ1gsR0FBRyxnREFDRSxPQUFPLENBQUMsR0FBRyxLQUNkLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO29CQUNsRCxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIs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