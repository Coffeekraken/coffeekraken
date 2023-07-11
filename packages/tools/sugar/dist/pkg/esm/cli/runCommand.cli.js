var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDuration from '@coffeekraken/s-duration';
import __SGlob from '@coffeekraken/s-glob';
import __path from 'path';
import __spawn from '../node/process/spawn.js';
import __formatDuration from '../shared/datetime/formatDuration.js';
import __SRunCommandParamsInterface from './interface/SRunCommandParamsInterface.js';
export default function runCommand(stringArgs = '') {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        const props = __SRunCommandParamsInterface.apply(stringArgs);
        let paths = [];
        const duration = new __SDuration();
        let currentDuration = 0;
        if (props.directory) {
            paths = __SGlob.resolveSync(props.directory, {
                cwd: process.cwd(),
                nodir: false,
                SFile: false,
            });
        }
        else {
            paths = [process.cwd()];
        }
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[command]</yellow> Executing the command "<magenta>${props.command}</magenta>" in these <cyan>${paths.length}</cyan> folder(s):${paths.map((p) => {
            return `\n- <cyan>${__path.relative(process.cwd(), p)}</cyan>`;
        })}`);
        (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, ' ');
        // const manager = new SProcessManager();
        // pipe(manager);
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `<yellow>[command]</yellow> Executing command "<yellow>${props.command}</yellow>" in folder:`);
            (_d = console.verbose) === null || _d === void 0 ? void 0 : _d.call(console, `<yellow>[command]</yellow> <cyan>${__path.relative(process.cwd(), path)}</cyan>`);
            const start = Date.now();
            const command = __spawn(props.command, [], {
                cwd: path,
            });
            const result = yield command;
            const end = Date.now();
            currentDuration += end - start;
            const average = currentDuration / i;
            const remaining = average * (paths.length - i);
            (_e = console.verbose) === null || _e === void 0 ? void 0 : _e.call(console, `<green>[command]</green> Command executed <green>successfully</green> in <yellow>${result.formatedDuration}</yellow>`);
            (_f = console.verbose) === null || _f === void 0 ? void 0 : _f.call(console, `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s), <cyan>~${__formatDuration(remaining)}</cyan> remaining...`);
        }
        (_g = console.verbose) === null || _g === void 0 ? void 0 : _g.call(console, `<green>[success]</green> Command "<yellow>${props.command}</yellow>" executed <green>successfully</green> in <cyan>${paths.length}</cyan> folder(s) in <yellow>${duration.end().formatedDuration}</yellow>`);
        resolve();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLE9BQU8sTUFBTSwwQkFBMEIsQ0FBQztBQUMvQyxPQUFPLGdCQUFnQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sNEJBQTRCLE1BQU0sMkNBQTJDLENBQUM7QUFFckYsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDOUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7UUFDekMsTUFBTSxLQUFLLEdBQUcsNEJBQTRCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTdELElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztRQUV6QixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztRQUV4QixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDakIsS0FBSyxHQUFhLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDbkQsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCw4REFDSSxLQUFLLENBQUMsT0FDViw4QkFDSSxLQUFLLENBQUMsTUFDVixxQkFBcUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pDLE9BQU8sYUFBYSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxFQUFFLENBQ1AsQ0FBQztRQUNGLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQUcsR0FBRyxDQUFDLENBQUM7UUFFdkIseUNBQXlDO1FBQ3pDLGlCQUFpQjtRQUVqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEIsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCx5REFBeUQsS0FBSyxDQUFDLE9BQU8sdUJBQXVCLENBQ2hHLENBQUM7WUFDRixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLG9DQUFvQyxNQUFNLENBQUMsUUFBUSxDQUMvQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsSUFBSSxDQUNQLFNBQVMsQ0FDYixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXpCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtnQkFDdkMsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDLENBQUM7WUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQztZQUU3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsZUFBZSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFFL0IsTUFBTSxPQUFPLEdBQUcsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRS9DLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsb0ZBQW9GLE1BQU0sQ0FBQyxnQkFBZ0IsV0FBVyxDQUN6SCxDQUFDO1lBQ0YsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxxQ0FDSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDekIsZ0NBQWdDLGdCQUFnQixDQUM1QyxTQUFTLENBQ1osc0JBQXNCLENBQzFCLENBQUM7U0FDTDtRQUVELE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsNkNBQ0ksS0FBSyxDQUFDLE9BQ1YsNERBQ0ksS0FBSyxDQUFDLE1BQ1YsZ0NBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXLENBQ2QsQ0FBQztRQUVGLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==