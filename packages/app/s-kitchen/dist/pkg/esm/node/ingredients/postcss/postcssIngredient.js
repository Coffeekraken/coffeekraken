var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
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
const postcssIngredient = {
    id: 'postcss',
    description: 'Add support for <yellow>postcss</yellow> and the <yellow>@coffeekraken/s-postcss-sugar-plugin</yellow> into your project',
    projectTypes: ['unknown', 'sugar', 'next'],
    add({ ask, log, emit, pipe, context }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = __packageRoot();
            const sKitchenPackageRoot = __packageRoot(__dirname());
            const sKitchenPackageJson = __readJsonSync(`${sKitchenPackageRoot}/package.json`);
            let currentConfig = {
                plugins: [],
            };
            let configFile = __pickOne([
                '.postcssrc.json',
                '.postcssrc.js',
                'postcss.config.json',
                'postcss.config.js',
            ], {
                cwd: packageRoot,
            });
            let configFilePath = (_a = configFile === null || configFile === void 0 ? void 0 : configFile.path) !== null && _a !== void 0 ? _a : `${packageRoot}/${(_b = configFile === null || configFile === void 0 ? void 0 : configFile.name) !== null && _b !== void 0 ? _b : 'postcss.config.json'}`;
            // create file if needed
            if (!configFile) {
                __fs.writeFileSync(configFilePath, JSON.stringify({}));
            }
            switch (configFile === null || configFile === void 0 ? void 0 : configFile.extension) {
                case 'json':
                    currentConfig = __readJsonSync(configFile.path);
                    break;
                case 'js':
                    // import the config
                    currentConfig = (yield import(configFile.path)).default;
                    break;
            }
            // ask to override if needed
            if (configFile) {
                const res = yield emit('ask', {
                    type: 'confirm',
                    message: `Do you want to override the current config file with these new config ?\n\n${JSON.stringify(currentConfig, null, 2)}`,
                    default: true,
                });
                if (!res)
                    return false;
            }
            // installing the actual plugin
            emit('log', {
                value: `<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan> and other useful ones...`,
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
            // install dependencies
            yield __npmInstall(['postcss', ...plugins]);
            // saving new config
            emit('log', {
                value: `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`,
            });
            // add plugins in config
            if (Array.isArray(currentConfig.plugins)) {
                currentConfig.plugins = __unique([...currentConfig.plugins, ,]);
            }
            else {
                plugins.forEach((plugin) => {
                    if (currentConfig.plugins[plugin]) {
                        return;
                    }
                    currentConfig.plugins[plugin] = {};
                });
            }
            let jsonStr;
            switch (configFile === null || configFile === void 0 ? void 0 : configFile.extension) {
                case 'js':
                    jsonStr = JSON.stringify(currentConfig, null, 4);
                    __fs.writeFileSync(configFilePath, `module.exports = ${jsonStr};`);
                    break;
                case 'json':
                default:
                    jsonStr = JSON.stringify(currentConfig, null, 4);
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
            let globalCss;
            // detecting the package type (next, generic, etc...)
            switch (context.projectType.type) {
                case 'next':
                    emit('log', {
                        value: '<yellow>[postcss]</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...',
                    });
                    globalCss = __fs
                        .readFileSync(`${packageRoot}/styles/globals.css`)
                        .toString();
                    if (!globalCss.includes(globalCssToAdd)) {
                        __fs.writeFileSync(`${packageRoot}/styles/globals.css`, [globalCssToAdd, globalCss].join('\n\n'));
                    }
                    if (!__fs.existsSync(`${packageRoot}/styles/sugar.css`)) {
                        __fs.writeFileSync(`${packageRoot}/styles/sugar.css`, sugarCss);
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
                        __fs.writeFileSync(`${srcCssDir}/index.css`, [globalCssToAdd, globalCss].join('\n\n'));
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
        });
    },
};
export default postcssIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sWUFBWSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0QixPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBd0I7SUFDM0MsRUFBRSxFQUFFLFNBQVM7SUFDYixXQUFXLEVBQ1AsMEhBQTBIO0lBQzlILFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7OztZQUN2QyxNQUFNLFdBQVcsR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUVwQyxNQUFNLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUN0QyxHQUFHLG1CQUFtQixlQUFlLENBQ3hDLENBQUM7WUFFRixJQUFJLGFBQWEsR0FBRztnQkFDaEIsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDO1lBRUYsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUN0QjtnQkFDSSxpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YscUJBQXFCO2dCQUNyQixtQkFBbUI7YUFDdEIs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