import __SDuration from '@coffeekraken/s-duration';
import __SGlob from '@coffeekraken/s-glob';
import __path from 'path';
import __spawn from '../node/process/spawn.js';
import __formatDuration from '../shared/datetime/formatDuration.js';
import __SRunCommandParamsInterface from './interface/SRunCommandParamsInterface.js';

export default function runCommand(stringArgs = '') {
    return new Promise(async (resolve, reject) => {
        const props = __SRunCommandParamsInterface.apply(stringArgs);

        let paths: string[] = [];

        const duration = new __SDuration();

        let currentDuration = 0;

        if (props.directory) {
            paths = <string[]>__SGlob.resolveSync(props.directory, {
                cwd: process.cwd(),
                nodir: false,
                SFile: false,
            });
        } else {
            paths = [process.cwd()];
        }

        console.verbose?.(
            `<yellow>[command]</yellow> Executing the command "<magenta>${
                props.command
            }</magenta>" in these <cyan>${
                paths.length
            }</cyan> folder(s):${paths.map((p) => {
                return `\n- <cyan>${__path.relative(process.cwd(), p)}</cyan>`;
            })}`,
        );
        console.verbose?.(' ');

        // const manager = new SProcessManager();
        // pipe(manager);

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];

            console.verbose?.(
                `<yellow>[command]</yellow> Executing command "<yellow>${props.command}</yellow>" in folder:`,
            );
            console.verbose?.(
                `<yellow>[command]</yellow> <cyan>${__path.relative(
                    process.cwd(),
                    path,
                )}</cyan>`,
            );

            const start = Date.now();

            const command = __spawn(props.command, [], {
                cwd: path,
            });
            const result = await command;

            const end = Date.now();
            currentDuration += end - start;

            const average = currentDuration / i;
            const remaining = average * (paths.length - i);

            console.verbose?.(
                `<green>[command]</green> Command executed <green>successfully</green> in <yellow>${result.formatedDuration}</yellow>`,
            );
            console.verbose?.(
                `<green>[command]</green> <magenta>${
                    paths.length - (i + 1)
                }</magenta> folder(s), <cyan>~${__formatDuration(
                    remaining,
                )}</cyan> remaining...`,
            );
        }

        console.verbose?.(
            `<green>[success]</green> Command "<yellow>${
                props.command
            }</yellow>" executed <green>successfully</green> in <cyan>${
                paths.length
            }</cyan> folder(s) in <yellow>${
                duration.end().formatedDuration
            }</yellow>`,
        );

        resolve();
    });
}
