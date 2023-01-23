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
import { __formatDuration } from '@coffeekraken/sugar/datetime';
import __path from 'path';
import __spawn from '../node/process/spawn';
import __SRunCommandParamsInterface from './interface/SRunCommandParamsInterface';
export default function runCommand(stringArgs = '') {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        const props = __SRunCommandParamsInterface.apply(stringArgs);
        let paths = [];
        const duration = new __SDuration();
        let currentDuration = 0;
        if (props.directory) {
            paths = __SGlob.resolve(props.directory, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBRWxGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzlDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQ3pDLE1BQU0sS0FBSyxHQUFHLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RCxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7UUFFekIsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVuQyxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ2pCLEtBQUssR0FBYSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQy9DLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNsQixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUMzQjtRQUVELE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsOERBQ0ksS0FBSyxDQUFDLE9BQ1YsOEJBQ0ksS0FBSyxDQUFDLE1BQ1YscUJBQXFCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqQyxPQUFPLGFBQWEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNuRSxDQUFDLENBQUMsRUFBRSxDQUNQLENBQUM7UUFDRixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLHlDQUF5QztRQUN6QyxpQkFBaUI7UUFFakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gseURBQXlELEtBQUssQ0FBQyxPQUFPLHVCQUF1QixDQUNoRyxDQUFDO1lBQ0YsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxvQ0FBb0MsTUFBTSxDQUFDLFFBQVEsQ0FDL0MsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLElBQUksQ0FDUCxTQUFTLENBQ2IsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUV6QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUU7Z0JBQ3ZDLEdBQUcsRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUM7WUFFN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLGVBQWUsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBRS9CLE1BQU0sT0FBTyxHQUFHLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDcEMsTUFBTSxTQUFTLEdBQUcsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUUvQyxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLG9GQUFvRixNQUFNLENBQUMsZ0JBQWdCLFdBQVcsQ0FDekgsQ0FBQztZQUNGLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gscUNBQ0ksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ3pCLGdDQUFnQyxnQkFBZ0IsQ0FDNUMsU0FBUyxDQUNaLHNCQUFzQixDQUMxQixDQUFDO1NBQ0w7UUFFRCxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLDZDQUNJLEtBQUssQ0FBQyxPQUNWLDREQUNJLEtBQUssQ0FBQyxNQUNWLGdDQUNJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDbkIsV0FBVyxDQUNkLENBQUM7UUFFRixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=