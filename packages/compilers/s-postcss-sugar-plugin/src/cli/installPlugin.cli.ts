// @ts-nocheck
import __SCliSugarPostcssPluginInstallParamsInterface from './interface/SCliSugarPostcssPluginInstallParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
import __fs from 'fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SCliSugarPostcssPluginInstallParamsInterface.apply(
            stringArgs,
        );

        const rootPath = __packageRoot(process.cwd());

        let currentConfig = {};

        // check for existing configurations
        if (__fs.existsSync(`${rootPath}/.postcssrc.json`)) {
            currentConfig = __readJsonSync(`${rootPath}/.postcssrc.json`);
        } else if (__fs.existsSync(`${rootPath}/postcss.config.js`)) {
            currentConfig = await import(`${rootPath}/postcss.config.js`);
            __fs.renameSync(
                `${rootPath}/postcss.config.js`,
                `${rootPath}/postcss.config.old.js`,
            );
        }

        // init plugins stack if needed
        if (!currentConfig.plugins) currentConfig.plugins = [];

        // adding plugins
        const plugins = __SSugarConfig.get('postcss.plugins');
        currentConfig.plugins = __unique([
            ...plugins,
            ...currentConfig.plugins,
        ]);

        // installing plugins
        if (finalParams.install) {
            emit('log', {
                value: `Installing <cyan>${currentConfig.plugins.length}</cyan> plugins...`,
            });
            currentConfig.plugins.forEach((plugin) => {
                emit('log', {
                    value: `- <yellow>${plugin}</yellow>`,
                });
            });
            await pipe(__npmInstall(currentConfig.plugins.join(' ')));
        }

        // saving new config
        emit('log', {
            value: `Saving new configuration file under <cyan>.postcssrc.json</cyan>.`,
        });
        __writeJsonSync(`${rootPath}/.postcssrc.json`, currentConfig);

        resolve();
    });
};
