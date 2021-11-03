var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SInterface from '@coffeekraken/s-interface';
import __SGlob from '@coffeekraken/s-glob';
import __spawn from '../node/process/spawn';
import __SPromise from '@coffeekraken/s-promise';
import __path from 'path';
import __SDuration from '@coffeekraken/s-duration';
export class SRunCommandInterface extends __SInterface {
}
SRunCommandInterface.definition = {
    command: {
        type: 'String',
        description: 'Specify the command you want to execute',
        alias: 'c',
    },
    directory: {
        type: 'String',
        description: 'Specify where you want to execute this command. Can be a glob to execute command into multiple directories at once',
        alias: 'd',
    },
    verbose: {
        type: 'Boolean',
        description: 'Specify if you want each process to log or not',
        default: false,
        alias: 'v',
    },
};
export default function runCommand(stringArgs = '') {
    return new __SPromise(({ resolve, reject, emit, pipe, pipeErrors }) => __awaiter(this, void 0, void 0, function* () {
        const props = SRunCommandInterface.apply(stringArgs);
        let paths = [];
        const duration = new __SDuration();
        if (props.directory) {
            paths = __SGlob.resolve(props.directory, {
                cwd: process.cwd(),
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
            const command = __spawn(props.command, [], {
                cwd: path,
            });
            if (props.verbose)
                pipe(command);
            else
                pipeErrors(command);
            const result = yield command;
            emit('log', {
                value: `<green>[command]</green> Command executed <green>successfully</green> in <yellow>${result.formatedDuration}</yellow>`,
            });
            emit('log', {
                value: `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s) remaining...`,
            });
            emit('log', {
                value: ' ',
            });
        }
        emit('log', {
            value: `<green>[success]</green> Command "<yellow>${props.command}</yellow>" executed <green>successfully</green> in <cyan>${paths.length}</cyan> in <yellow>${duration.end().formatedDuration}</yellow>`,
        });
        resolve();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ29tbWFuZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Db21tYW5kLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFlBQVk7O0FBQzNDLCtCQUFVLEdBQUc7SUFDaEIsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUseUNBQXlDO1FBQ3RELEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDUCxvSEFBb0g7UUFDeEgsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLGdEQUFnRDtRQUM3RCxPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7Q0FDSixDQUFDO0FBR04sTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDOUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1FBQ2xELE1BQU0sS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyRCxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7UUFFekIsTUFBTSxRQUFRLEdB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