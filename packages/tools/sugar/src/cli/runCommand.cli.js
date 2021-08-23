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
import __SProcess, { SProcessManager } from '@coffeekraken/s-process';
import __spawn from '../node/process/spawn';
import __SPromise from '@coffeekraken/s-promise';
import __path from 'path';
export class SRunCommandInterface extends __SInterface {
}
SRunCommandInterface.definition = {
    directory: {
        type: 'String',
        description: 'Specify where you want to execute this command. Can be a glob to execute command into multiple directories at once',
        alias: 'd',
    },
    command: {
        type: 'String',
        description: 'Specify the command you want to execute',
        alias: 'c',
    },
};
export default function runCommand(stringArgs = '') {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const props = SRunCommandInterface.apply(stringArgs);
        let paths = [];
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
            value: `<yellow>[command]</yellow> Executing the command "<magenta>${props.command}</magenta>" in these folder(s):${paths.map((p) => {
                return `\n- <cyan>${__path.relative(process.cwd(), p)}</cyan>`;
            })}`,
        });
        const manager = new SProcessManager();
        pipe(manager);
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const pro = yield __SProcess.from(() => {
                const command = __spawn(props.command, [], {
                    cwd: path,
                });
                return command;
            });
            const proId = path.split('/').slice(-1)[0];
            manager.attachProcess(proId, pro);
            manager.run(proId);
        }
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ29tbWFuZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Db21tYW5kLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RFLE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTs7QUFDM0MsK0JBQVUsR0FBRztJQUNoQixTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDUCxvSEFBb0g7UUFDeEgsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHlDQUF5QztRQUN0RCxLQUFLLEVBQUUsR0FBRztLQUNiO0NBQ0osQ0FBQztBQUdOLE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzlDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXJELElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztRQUV6QixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDakIsS0FBSyxHQUFhLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDL0MsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSw4REFDSCxLQUFLLENBQUMsT0FDVixrQ0FBa0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxPQUFPLGFBQWEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNuRSxDQUFDLENBQUMsRUFBRTtTQUNQLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtvQkFDdkMsR0FBRyxFQUFFLElBQUk7aUJBQ1osQ0FBQyxDQUFDO2dCQUNILE9BQU8sT0FBTyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==