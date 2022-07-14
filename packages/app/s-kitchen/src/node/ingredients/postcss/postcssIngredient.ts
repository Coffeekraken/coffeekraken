import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen';

import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __detectProjectType from '@coffeekraken/sugar/node/project/detectType';

import __pickOne from '@coffeekraken/sugar/node/fs/pickOne';

/**
 * @name        postcssIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const postcssIngredient: ISKitchenIngredient = {
    id: 'postcss',
    async add({ ask, log, emit, pipe }) {
        const packageRoot = __packageRoot();

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
            if (!res) return false;
        }

        // installing the actual plugin
        emit('log', {
            value: `<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan>...`,
        });
        try {
            await pipe(__npmInstall('@coffeekraken/s-postcss-sugar-plugin'));
        } catch (e) {
            emit('log', {
                value: `<red>[postcss]</red> Something went wrong when installing the @coffeekraken/s-postcss-sugar-plugin package. Please try to install it manually.`,
            });
        }

        // saving new config
        emit('log', {
            value: `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`,
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
            .readFileSync(`${thisPackageRoot}/src/data/postcss/index.css`)
            .toString();

        const sugarCss = __fs
            .readFileSync(`${thisPackageRoot}/src/data/postcss/sugar.css`)
            .toString();

        // detecting the package type (next, generic, etc...)

        let globalCss;

        switch (__detectProjectType().type) {
            case 'next':
                emit('log', {
                    value: '<yellow>postcss</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...',
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
                    value: '<yellow>[postcss]</yellow> <cyan>Generic</cyan> project detected. Adding sugar css files...',
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
            value: `<yellow>[postcss]</yellow> Added <green>successfully</green> in your project. Have fun!`,
        });

        return true;
    },
};
export default postcssIngredient;
