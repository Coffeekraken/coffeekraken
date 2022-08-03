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
import __SPromise from '@coffeekraken/s-promise';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';
import __path from 'path';
import __spawn from '../node/process/spawn';
import __SRunCommandParamsInterface from './interface/SRunCommandParamsInterface';
export default function runCommand(stringArgs = '') {
    return new __SPromise(({ resolve, reject, emit, pipe, pipeErrors }) => __awaiter(this, void 0, void 0, function* () {
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
        emit('log', {
            value: `<yellow>[command]</yellow> Executing the command "<magenta>${props.command}</magenta>" in these <cyan>${paths.length}</cyan> folder(s):${paths.map((p) => {
                return `\n- <cyan>${__path.relative(process.cwd(), p)}</cyan>`;
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
                value: `<yellow>[command]</yellow> <cyan>${__path.relative(process.cwd(), path)}</cyan>`,
            });
            const start = Date.now();
            const command = __spawn(props.command, [], {
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
                value: `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s), <cyan>~${__formatDuration(remaining)}</cyan> remaining...`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sNEJBQTRCLE1BQU0sd0NBQXdDLENBQUM7QUFFbEYsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDOUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1FBQ2xELE1BQU0sS0FBSyxHQUFHLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RCxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7UUFFekIsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVuQyxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ2pCLEtBQUssR0FBYSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQy9DLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNsQixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUMzQjtRQUVELElB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