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
import __formatEstimation from '@coffeekraken/sugar/shared/time/formatEstimation';
export class SRunCommandInterface extends __SInterface {
    static get _definition() {
        return {
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
    }
}
export default function runCommand(stringArgs = '') {
    return new __SPromise(({ resolve, reject, emit, pipe, pipeErrors }) => __awaiter(this, void 0, void 0, function* () {
        const props = SRunCommandInterface.apply(stringArgs);
        let paths = [];
        const duration = new __SDuration();
        let currentDuration = 0;
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
                value: `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s), <cyan>~${__formatEstimation(remaining)}</cyan> remaining...`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ29tbWFuZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Db21tYW5kLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxPQUFPLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxrQkFBa0IsTUFBTSxrREFBa0QsQ0FBQztBQUVsRixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTtJQUNsRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLG9IQUFvSDtnQkFDeEgsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzlDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTtRQUNsRCxNQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxL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