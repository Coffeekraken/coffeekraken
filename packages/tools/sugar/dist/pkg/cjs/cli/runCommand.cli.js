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
const path_1 = __importDefault(require("path"));
const spawn_js_1 = __importDefault(require("../node/process/spawn.js"));
const formatDuration_js_1 = __importDefault(require("../shared/datetime/formatDuration.js"));
const SRunCommandParamsInterface_js_1 = __importDefault(require("./interface/SRunCommandParamsInterface.js"));
function runCommand(stringArgs = '') {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        const props = SRunCommandParamsInterface_js_1.default.apply(stringArgs);
        let paths = [];
        const duration = new s_duration_1.default();
        let currentDuration = 0;
        if (props.directory) {
            paths = s_glob_1.default.resolveSync(props.directory, {
                cwd: process.cwd(),
                nodir: false,
                SFile: false,
            });
        }
        else {
            paths = [process.cwd()];
        }
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[command]</yellow> Executing the command "<magenta>${props.command}</magenta>" in these <cyan>${paths.length}</cyan> folder(s):${paths.map((p) => {
            return `\n- <cyan>${path_1.default.relative(process.cwd(), p)}</cyan>`;
        })}`);
        (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, ' ');
        // const manager = new SProcessManager();
        // pipe(manager);
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `<yellow>[command]</yellow> Executing command "<yellow>${props.command}</yellow>" in folder:`);
            (_d = console.verbose) === null || _d === void 0 ? void 0 : _d.call(console, `<yellow>[command]</yellow> <cyan>${path_1.default.relative(process.cwd(), path)}</cyan>`);
            const start = Date.now();
            const command = (0, spawn_js_1.default)(props.command, [], {
                cwd: path,
            });
            const result = yield command;
            const end = Date.now();
            currentDuration += end - start;
            const average = currentDuration / i;
            const remaining = average * (paths.length - i);
            (_e = console.verbose) === null || _e === void 0 ? void 0 : _e.call(console, `<green>[command]</green> Command executed <green>successfully</green> in <yellow>${result.formatedDuration}</yellow>`);
            (_f = console.verbose) === null || _f === void 0 ? void 0 : _f.call(console, `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s), <cyan>~${(0, formatDuration_js_1.default)(remaining)}</cyan> remaining...`);
        }
        (_g = console.verbose) === null || _g === void 0 ? void 0 : _g.call(console, `<green>[success]</green> Command "<yellow>${props.command}</yellow>" executed <green>successfully</green> in <cyan>${paths.length}</cyan> folder(s) in <yellow>${duration.end().formatedDuration}</yellow>`);
        resolve();
    }));
}
exports.default = runCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxnREFBMEI7QUFDMUIsd0VBQStDO0FBQy9DLDZGQUFvRTtBQUNwRSw4R0FBcUY7QUFFckYsU0FBd0IsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzlDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQ3pDLE1BQU0sS0FBSyxHQUFHLHVDQUE0QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RCxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7UUFFekIsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFFbkMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNqQixLQUFLLEdBQWEsZ0JBQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDbkQsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCw4REFDSSxLQUFLLENBQUMsT0FDViw4QkFDSSxLQUFLLENBQUMsTUFDVixxQkFBcUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pDLE9BQU8sYUFBYSxjQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxFQUFFLENBQ1AsQ0FBQztRQUNGLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQUcsR0FBRyxDQUFDLENBQUM7UUFFdkIseUNBQXlDO1FBQ3pDLGlCQUFpQjtRQUVqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEIsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCx5REFBeUQsS0FBSyxDQUFDLE9BQU8sdUJBQXVCLENBQ2hHLENBQUM7WUFDRixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLG9DQUFvQyxjQUFNLENBQUMsUUFBUSxDQUMvQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsSUFBSSxDQUNQLFNBQVMsQ0FDYixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXpCLE1BQU0sT0FBTyxHQUFHLElBQUEsa0JBQU8sRUFBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtnQkFDdkMsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDLENBQUM7WUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQztZQUU3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsZUFBZSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFFL0IsTUFBTSxPQUFPLEdBQUcsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRS9DLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsb0ZBQW9GLE1BQU0sQ0FBQyxnQkFBZ0IsV0FBVyxDQUN6SCxDQUFDO1lBQ0YsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxxQ0FDSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDekIsZ0NBQWdDLElBQUEsMkJBQWdCLEVBQzVDLFNBQVMsQ0FDWixzQkFBc0IsQ0FDMUIsQ0FBQztTQUNMO1FBRUQsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCw2Q0FDSSxLQUFLLENBQUMsT0FDViw0REFDSSxLQUFLLENBQUMsTUFDVixnQ0FDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFdBQVcsQ0FDZCxDQUFDO1FBRUYsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXBGRCw2QkFvRkMifQ==