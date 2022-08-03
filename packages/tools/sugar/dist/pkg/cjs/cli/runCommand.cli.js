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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const formatDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/formatDuration"));
const path_1 = __importDefault(require("path"));
const spawn_1 = __importDefault(require("../node/process/spawn"));
const SRunCommandParamsInterface_1 = __importDefault(require("./interface/SRunCommandParamsInterface"));
function runCommand(stringArgs = '') {
    return new s_promise_1.default(({ resolve, reject, emit, pipe, pipeErrors }) => __awaiter(this, void 0, void 0, function* () {
        const props = SRunCommandParamsInterface_1.default.apply(stringArgs);
        let paths = [];
        const duration = new s_duration_1.default();
        let currentDuration = 0;
        if (props.directory) {
            paths = s_glob_1.default.resolve(props.directory, {
                cwd: process.cwd(),
                nodir: false,
                SFile: false,
            });
        }
        else {
            paths = [process.cwd()];
        }
        emit('log', {
            value: `<yellow>[command]</yellow> Executing the command "<magenta>${props.command}</magenta>" in these <cyan>${paths.length}</cyan> folder(s):${paths.map((p) => {
                return `\n- <cyan>${path_1.default.relative(process.cwd(), p)}</cyan>`;
            })}`,
        });
        emit('log', {
            value: ' ',
        });
        // const manager = new SProcessManager();
        // pipe(manager);
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            emit('log', {
                value: `<yellow>[command]</yellow> Executing command "<yellow>${props.command}</yellow>" in folder:`,
            });
            emit('log', {
                value: `<yellow>[command]</yellow> <cyan>${path_1.default.relative(process.cwd(), path)}</cyan>`,
            });
            const start = Date.now();
            const command = (0, spawn_1.default)(props.command, [], {
                cwd: path,
            });
            if (props.verbose)
                pipe(command);
            else
                pipeErrors(command);
            const result = yield command;
            const end = Date.now();
            currentDuration += end - start;
            const average = currentDuration / i;
            const remaining = average * (paths.length - i);
            emit('log', {
                value: `<green>[command]</green> Command executed <green>successfully</green> in <yellow>${result.formatedDuration}</yellow>`,
            });
            emit('log', {
                value: `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s), <cyan>~${(0, formatDuration_1.default)(remaining)}</cyan> remaining...`,
            });
            emit('log', {
                value: ' ',
            });
        }
        emit('log', {
            value: `<green>[success]</green> Command "<yellow>${props.command}</yellow>" executed <green>successfully</green> in <cyan>${paths.length}</cyan> folder(s) in <yellow>${duration.end().formatedDuration}</yellow>`,
        });
        resolve();
    }));
}
exports.default = runCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyx3RUFBaUQ7QUFDakQsb0dBQThFO0FBQzlFLGdEQUEwQjtBQUMxQixrRUFBNEM7QUFDNUMsd0dBQWtGO0FBRWxGLFNBQXdCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUM5QyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1FBQ2xELE1BQU0sS0FBSyxHQUFHLG9DQUE0QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RCxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7UUFFekIsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFFbkMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNqQixLQUFLLEdBQWEsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDL0MsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSw4REFDSCxLQUFLLENBQUMsT0FDViw4QkFDSSxLQUFLLENBQUMsTUFDVixxQkFBcUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLGFBQWEsY0FBTSxDQUFDLFFBQVEsQ0FDL0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLENBQUMsQ0FDSixTQUFTLENBQUM7WUFDZixDQUFDLENBQUMsRUFBRTtTQUNQLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILHlDQUF5QztRQUN6QyxpQkFBaUI7UUFFakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHlEQUF5RCxLQUFLLENBQUMsT0FBTyx1QkFBdUI7YUFDdkcsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsb0NBQW9DLGNBQU0sQ0FBQyxRQUFRLENBQ3RELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixJQUFJLENBQ1AsU0FBUzthQUNiLENBQUMsQ0FBQztZQUVILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUV6QixNQUFNLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtnQkFDdkMsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDLENBQUM7WUFDSCxJQUFJLEtBQUssQ0FBQyxPQUFPO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Z0JBQzVCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQztZQUU3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsZUFBZSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFFL0IsTUFBTSxPQUFPLEdBQUcsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRS9DLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLG9GQUFvRixNQUFNLENBQUMsZ0JBQWdCLFdBQVc7YUFDaEksQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUscUNBQ0gsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ3pCLGdDQUFnQyxJQUFBLHdCQUFnQixFQUM1QyxTQUFTLENBQ1osc0JBQXNCO2FBQzFCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLEdBQUc7YUFDYixDQUFDLENBQUM7U0FDTjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsNkNBQ0gsS0FBSyxDQUFDLE9BQ1YsNERBQ0ksS0FBSyxDQUFDLE1BQ1YsZ0NBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FDSixDQUFDO0FBQ04sQ0FBQztBQWhHRCw2QkFnR0MifQ==