import __SPromise from '@coffeekraken/s-promise';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __SSugarCli from '@coffeekraken/cli';
import __replaceCommandTokens from '../replaceCommandTokens';

export default function interactiveKill(params) {
    return new __SPromise(
        async ({ resolve, reject, emit, pipe }) => {
            let res;

            res = await emit('ask', {
                type: 'select',
                message: 'How would you like to kill your process?',
                choices: ['by id', 'by port'],
            });

            let command;

            switch (res) {
                case 'by id':
                    res = await emit('ask', {
                        type: 'input',
                        message: 'Specify the process id you want to kill',
                        validate(...args) {
                            if (!args[0].match(/^[0-9]+$/))
                                return `Process id must be an integer`;
                            return true;
                        },
                    });

                    command = __replaceCommandTokens(
                        `sugar process.kill --id ${res}`,
                    );
                    emit('log', {
                        value: `> Running command: <yellow>${command}</yellow>`,
                    });
                    pipe(__spawn(command));
                    break;
                case 'by port':
                    res = await emit('ask', {
                        type: 'input',
                        message:
                            'Specify the port on which the process you want to kill is running',
                        validate(...args) {
                            if (!args[0].match(/^[0-9]+$/))
                                return `Process id must be an integer`;
                            return true;
                        },
                    });

                    command = __replaceCommandTokens(
                        `sugar process.kill --port ${res}`,
                    );
                    emit('log', {
                        value: `> Running command: <yellow>${command}</yellow>`,
                    });
                    pipe(__spawn(command));
                    break;
            }
        },
        {
            metas: {
                id: 'process.kill',
            },
        },
    );
}
