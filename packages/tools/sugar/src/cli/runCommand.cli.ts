import __SInterface from '@coffeekraken/s-interface';
import __SGlob from '@coffeekraken/s-glob';
import __SProcess, { SProcessManager } from '@coffeekraken/s-process';
import __spawn from '../node/process/spawn';
import __SPromise from '@coffeekraken/s-promise';
import __path from 'path';

export class SRunCommandInterface extends __SInterface {
    static definition = {
        directory: {
            type: 'String',
            description:
                'Specify where you want to execute this command. Can be a glob to execute command into multiple directories at once',
            alias: 'd',
        },
        command: {
            type: 'String',
            description: 'Specify the command you want to execute',
            alias: 'c',
        },
    };
}

export default function runCommand(stringArgs = '') {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const props = SRunCommandInterface.apply(stringArgs);

        let paths: string[] = [];

        if (props.directory) {
            paths = <string[]>__SGlob.resolve(props.directory, {
                cwd: process.cwd(),
                SFile: false,
            });
        } else {
            paths = [process.cwd()];
        }

        emit('log', {
            value: `<yellow>[command]</yellow> Executing the command "<magenta>${
                props.command
            }</magenta>" in these folder(s):${paths.map((p) => {
                return `\n- <cyan>${__path.relative(process.cwd(), p)}</cyan>`;
            })}`,
        });

        const manager = new SProcessManager();
        pipe(manager);

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];

            const pro = await __SProcess.from(() => {
                const command = __spawn(props.command, [], {
                    cwd: path,
                });
                return command;
            });

            const proId = path.split('/').slice(-1)[0];

            manager.attachProcess(proId, pro);
            manager.run(proId);
        }
    });
}
