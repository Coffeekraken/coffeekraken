// @ts-nocheck
import __SCliSugarPostcssPluginAddParamsInterface from './interface/SCliSugarPostcssPluginAddParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
import __fs from 'fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __detectProjectType from '@coffeekraken/sugar/node/project/detectType';

import __pickOne from '@coffeekraken/sugar/node/fs/pickOne';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SCliSugarPostcssPluginAddParamsInterface.apply(
            stringArgs,
        );

        const packageRoot = __packageRoot(process.cwd());

        let currentConfig = {};

        let configFile = __pickOne(
            [
                '.postcssrc.json',
                '.postcssrc.js',
                'postcss.config.json',
                'postcss.config.js',
            ],
            {
                cwd: packageRoot,
            },
        );

        let configFilePath =
            configFile?.path ??
            `${packageRoot}/${configFile?.name ?? 'postcss.config.json'}`;

        // create file if needed
        if (!configFile) {
            __fs.writeFileSync(configFilePath, JSON.stringify({}));
        }

        switch (configFile?.extension) {
            case 'json':
                currentConfig = __readJsonSync(configFile.path);
                break;
            case 'js':
                // import the config
                currentConfig = (await import(configFile.path)).default;
                break;
        }

        const pluginName = '@coffeekraken/s-postcss-sugar-plugin';
        if (!currentConfig.plugins) {
            currentConfig.plugins = {
                [pluginName]: {},
            };
        } else if (
            Array.isArray(currentConfig.plugins) &&
            !currentConfig.plugins.contains(`${pluginName}`)
        ) {
            currentConfig.plugins.unshift(pluginName);
        } else if (!currentConfig.plugins[pluginName]) {
            currentConfig.plugins = {
                [pluginName]: {},
                ...currentConfig.plugins,
            };
        }

        // ask to override if needed
        if (configFile) {
            const res = await emit('ask', {
                type: 'confirm',
                message: `Do you want to override the current config file with these new config ?\n\n${JSON.stringify(
                    currentConfig,
                    null,
                    2,
                )}`,
                default: true,
            });
            if (!res) return resolve();
        }

        // installing the actual plugin
        emit('log', {
            value: `Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan>...`,
        });
        try {
            await pipe(__npmInstall('@coffeekraken/s-postcss-sugar-plugin'));
        } catch (e) {
            emit('log', {
                value: `Something went wrong when installing the @coffeekraken/s-postcss-sugar-plugin package. Please try to install it manually.`,
            });
        }

        // saving new config
        emit('log', {
            value: `Saving new configuration file under <cyan>${configFilePath}</cyan>.`,
        });

        let jsonStr;
        switch (configFile?.extension) {
            case 'js':
                jsonStr = JSON.stringify(currentConfig, null, 2);
                __fs.writeFileSync(
                    configFilePath,
                    `module.exports = ${jsonStr};`,
                );
                break;
            case 'json':
            default:
                jsonStr = JSON.stringify(currentConfig, null, 2);
                __fs.writeFileSync(configFilePath, jsonStr);
                break;
        }
        const thisPackageRoot = __packageRoot(__dirname());
        const globalCssToAdd = __fs
            .readFileSync(`${thisPackageRoot}/src/cli/data/index.css`)
            .toString();

        const sugarCss = __fs
            .readFileSync(`${thisPackageRoot}/src/cli/data/sugar.css`)
            .toString();

        // detecting the package type (next, generic, etc...)

        let globalCss;

        switch (__detectProjectType().type) {
            case 'next':
                emit('log', {
                    value:
                        '<yellow>Nextjs</yellow> project detected. Adding sugar css files...',
                });

                globalCss = __fs
                    .readFileSync(`${packageRoot}/styles/globals.css`)
                    .toString();

                if (!globalCss.includes(globalCssToAdd)) {
                    __fs.writeFileSync(
                        `${packageRoot}/styles/globals.css`,
                        [globalCssToAdd, globalCss].join('\n\n'),
                    );
                }
                if (!__fs.existsSync(`${packageRoot}/styles/sugar.css`)) {
                    __fs.writeFileSync(
                        `${packageRoot}/styles/sugar.css`,
                        sugarCss,
                    );
                }
                break;
            default:
                emit('log', {
                    value:
                        '<yellow>Generic</yellow> project detected. Adding sugar css files...',
                });

                const srcCssDir = __SSugarConfig.get('storage.src.cssDir');

                if (!__fs.existsSync(`${srcCssDir}/index.css`)) {
                    __writeFileSync(`${srcCssDir}/index.css`, '');
                }

                globalCss = __fs
                    .readFileSync(`${srcCssDir}/index.css`)
                    .toString();

                if (!globalCss.includes(globalCssToAdd)) {
                    __fs.writeFileSync(
                        `${srcCssDir}/index.css`,
                        [globalCssToAdd, globalCss].join('\n\n'),
                    );
                }
                if (!__fs.existsSync(`${srcCssDir}/sugar.css`)) {
                    __fs.writeFileSync(`${srcCssDir}/sugar.css`, sugarCss);
                }
                break;
        }

        emit('log', {
            value: `<yellow>@coffeekraken/s-postcss-sugar-plugin</yellow> installed <green>successfully</green> in your project. Have fun!`,
        });

        resolve();
    });
};
