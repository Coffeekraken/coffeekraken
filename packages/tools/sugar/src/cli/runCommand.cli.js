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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-glob", "../node/process/spawn", "@coffeekraken/s-promise", "path", "@coffeekraken/s-duration", "@coffeekraken/sugar/shared/time/formatDuration", "./interface/SRunCommandParamsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
    const spawn_1 = __importDefault(require("../node/process/spawn"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const path_1 = __importDefault(require("path"));
    const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
    const formatDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/formatDuration"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ29tbWFuZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Db21tYW5kLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNBLGtFQUEyQztJQUUzQyxrRUFBNEM7SUFDNUMsd0VBQWlEO0lBQ2pELGdEQUEwQjtJQUMxQiwwRUFBbUQ7SUFDbkQsb0dBQThFO0lBQzlFLHdHQUFrRjtJQUVsRixTQUF3QixVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUU7UUFDOUMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTtZQUNsRCxNQUFNLEtBQUssR0FBRyxvQ0FBNEIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFN0QsSUFBSSxLQUFLLEdBQWEsRUFBRSxDQUFDO1lBRXpCLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBRW5DLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztZQUV4QixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLEtBQUssR0FBYSxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUMvQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDbEIsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFLEtBQUs7aUJBQ2YsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDM0I7WUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSw4REFDSCxLQUFLLENBQUMsT0FDViw4QkFDSSxLQUFLLENBQUMsTUFDVixxQkFBcUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxF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