import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __unique } from '@coffeekraken/sugar/array';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen';

import { __addDependencies } from '@coffeekraken/sugar/npm';

import {
    __dirname,
    __pickOneSync,
    __readJsonSync,
    __writeFileSync
} from '@coffeekraken/sugar/fs';

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
    description:
        'Add support for <yellow>postcss</yellow> and the <yellow>@coffeekraken/s-postcss-sugar-plugin</yellow> into your project',
    projectTypes: ['unknown', 'sugar', 'next'],
    async add({ ask, context }) {
        const packageRoot = __packageRootDir();

        const sKitchenPackageRoot = __packageRootDir(__dirname());
        const sKitchenPackageJson = __readJsonSync(
            `${sKitchenPackageRoot}/package.json`,
        );

        let currentConfig = {
            plugins: [],
        };

        let configFile = __pickOneSync(
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

        // ask to override if needed
        if (configFile) {
            const res = await ask({
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
        console.verbose?.(
            `<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan> and other useful ones...`,
        );

        const currentPackageJson = __packageJsonSync(__dirname());

        __addDependencies({
            '@coffeekraken/s-postcss-sugar-plugin': `^${currentPackageJson.version}`,
            postcss: '^8.4.21',
            'postcss-import': '^15.1.0',
            'postcss-nested': '^6.0.0',
            'postcss-atroot': '^0.2.3',
            'postcss-extend-rule': '^4.0.0',
            'postcss-property-lookup': '^3.0.0',
            autoprefixer: '^10.4.13',
        });

        const plugins = [
            '@coffeekraken/s-postcss-sugar-plugin',
            'postcss-import',
            'postcss-nested',
            'postcss-atroot',
            'postcss-extend-rule',
            'postcss-property-lookup',
            'autoprefixer',
        ];

        // saving new config
        console.verbose?.(
            `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`,
        );

        // add plugins in config
        if (Array.isArray(currentConfig.plugins)) {
            currentConfig.plugins = __unique([
                ...currentConfig.plugins,
                ...plugins,
            ]);
        } else {
            plugins.forEach((plugin) => {
                if (currentConfig.plugins[plugin]) {
                    return;
                }
                currentConfig.plugins[plugin] = {};
            });
        }

        let jsonStr;
        switch (configFile?.extension) {
            case 'js':
                jsonStr = JSON.stringify(currentConfig, null, 4);
                __fs.writeFileSync(
                    configFilePath,
                    `module.exports = ${jsonStr};`,
                );
                break;
            case 'json':
            default:
                jsonStr = JSON.stringify(currentConfig, null, 4);
                __fs.writeFileSync(configFilePath, jsonStr);
                break;
        }
        const thisPackageRoot = __packageRootDir(__dirname());
        const globalCssToAdd = __fs
            .readFileSync(`${thisPackageRoot}/src/data/postcss/index.css`)
            .toString();

        const sugarCss = __fs
            .readFileSync(`${thisPackageRoot}/src/data/postcss/sugar.css`)
            .toString();

        let globalCss;

        // detecting the package type (next, generic, etc...)
        switch (context.projectType.type) {
            case 'next':
                console.verbose?.(
                    `<yellow>[postcss]</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...`,
                );

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
                console.verbose?.(
                    `<yellow>[postcss]</yellow> <cyan>Generic</cyan> project detected. Adding sugar css files...`,
                );

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

        console.verbose?.(
            `<yellow>[postcss]</yellow> Added <green>successfully</green> in your project. Have fun!`,
        );

        return true;
    },
};
export default postcssIngredient;
