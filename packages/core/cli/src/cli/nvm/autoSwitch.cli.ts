// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __fs from 'fs';
import __os from 'os';
import __SCliNvmAutoSwitchParamsInterface from '../../node/nvm/interface/SCliNvmAutoSwitchParamsInterface';

export default (stringArgs = '') => {
    return new __SPromise(
        async ({ resolve, reject, emit, pipe }) => {
            const finalParams = __SCliNvmAutoSwitchParamsInterface.apply(
                stringArgs,
            );

            function appendToFile(filePath, text) {
                const content = __fs.readFileSync(filePath, 'utf-8').toString();

                if (content.includes('@coffeekraken.cli.nvm.autoSwitch')) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `It seems that this feature has already been installed in your <cyan>${filePath}</cyan> file...`,
                    });
                    return false;
                }

                __fs.writeFileSync(filePath, [content, text].join('\n\n'));

                return true;
            }

            if (!finalParams.install && !finalParams.uninstall) {
                emit('log', {
                    type: __SLog.TYPE_WARN,
                    value: `Please pass at least the <yellow>-i</yellow> argument to install, or the <magenta>-u</magenta> argument to uninstall...`,
                });
                return resolve();
            }

            const homeDir = __os.homedir(),
                script = __fs.readFileSync(
                    `${__dirname()}/../../../../../src/cli/nvm/nvmAutoSwitch.sh`,
                    'utf-8',
                );

            const zshPath = `${homeDir}/.zshrc`,
                bashPath = `${homeDir}/.bashrc`;

            if (finalParams.install) {
                if (
                    __fs.existsSync(zshPath) &&
                    (await emit('ask', {
                        type: 'confirm',
                        message: `A <cyan>${zshPath}</cyan> file has been found. Would you like to install this feature for <magenta>ZSH</magenta>?`,
                        default: true,
                    }))
                ) {
                    if (appendToFile(zshPath, script)) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<green>[nvmAutoSwitch]</green> The nvmAutoSwitch feature has been installed <green>successfully</green> for <magenta>ZSH</magenta>`,
                        });
                    }
                }

                if (
                    __fs.existsSync(bashPath) &&
                    (await emit('ask', {
                        type: 'confirm',
                        message: `A <cyan>${bashPath}</cyan> file has been found. Would you like to install this feature for <magenta>bash</magenta>?`,
                        default: true,
                    }))
                ) {
                    if (appendToFile(bashPath, script)) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<green>[nvmAutoSwitch]</green> The nvmAutoSwitch feature has been installed <green>successfully</green> for <magenta>bash</magenta>`,
                        });
                    }
                }
            }

            resolve();
        },
        {
            eventEmitter: {
                metas: {
                    id: 'sugar nvm.autoSwitch',
                },
            },
        },
    );
};
