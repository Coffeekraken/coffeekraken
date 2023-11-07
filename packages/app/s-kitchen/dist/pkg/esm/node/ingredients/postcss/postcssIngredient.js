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
import { __unique } from '@coffeekraken/sugar/array';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import { __addDependencies } from '@coffeekraken/sugar/npm';
import { __dirname, __pickOneSync, __readJsonSync, __writeFileSync, } from '@coffeekraken/sugar/fs';
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
    description: 'Add support for <yellow>postcss</yellow> and the <yellow>@coffeekraken/s-sugarcss-plugin</yellow> into your project',
    projectTypes: ['unknown', 'sugar', 'next'],
    add({ ask, context }) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = __packageRootDir();
            const sKitchenPackageRoot = __packageRootDir(__dirname());
            const sKitchenPackageJson = __readJsonSync(`${sKitchenPackageRoot}/package.json`);
            let currentConfig = {
                plugins: [],
            };
            let configFile = __pickOneSync([
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
                const res = yield ask({
                    type: 'confirm',
                    message: `Do you want to override the current config file with these new config ?\n\n${JSON.stringify(currentConfig, null, 2)}`,
                    default: true,
                });
                if (!res)
                    return false;
            }
            // installing the actual plugin
            (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-sugarcss-plugin</cyan> and other useful ones...`);
            const currentPackageJson = __packageJsonSync(__dirname());
            __addDependencies({
                '@coffeekraken/s-sugarcss-plugin': `^${currentPackageJson.version}`,
                postcss: '^8.4.21',
                'postcss-import': '^15.1.0',
                'postcss-nested': '^6.0.0',
                'postcss-atroot': '^0.2.3',
                'postcss-extend-rule': '^4.0.0',
                'postcss-property-lookup': '^3.0.0',
                autoprefixer: '^10.4.13',
            });
            const plugins = [
                '@coffeekraken/s-sugarcss-plugin',
                'postcss-import',
                'postcss-nested',
                'postcss-atroot',
                'postcss-extend-rule',
                'postcss-property-lookup',
                'autoprefixer',
            ];
            // saving new config
            (_d = console.verbose) === null || _d === void 0 ? void 0 : _d.call(console, `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`);
            // add plugins in config
            if (Array.isArray(currentConfig.plugins)) {
                currentConfig.plugins = __unique([
                    ...currentConfig.plugins,
                    ...plugins,
                ]);
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
                    (_e = console.verbose) === null || _e === void 0 ? void 0 : _e.call(console, `<yellow>[postcss]</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...`);
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
                    (_f = console.verbose) === null || _f === void 0 ? void 0 : _f.call(console, `<yellow>[postcss]</yellow> <cyan>Generic</cyan> project detected. Adding sugar css files...`);
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
            (_g = console.verbose) === null || _g === void 0 ? void 0 : _g.call(console, `<yellow>[postcss]</yellow> Added <green>successfully</green> in your project. Have fun!`);
            return true;
        });
    },
};
export default postcssIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFHdEIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFNUQsT0FBTyxFQUNILFNBQVMsRUFDVCxhQUFhLEVBQ2IsY0FBYyxFQUNkLGVBQWUsR0FDbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBd0I7SUFDM0MsRUFBRSxFQUFFLFNBQVM7SUFDYixXQUFXLEVBQ1AscUhBQXFIO0lBQ3pILFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7OztZQUN0QixNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXZDLE1BQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUMxRCxNQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FDdEMsR0FBRyxtQkFBbUIsZUFBZSxDQUN4QyxDQUFDO1lBRUYsSUFBSSxhQUFhLEdBQUc7Z0JBQ2hCLE9BQU8sRUFBRSxFQUFFO2FBQ2QsQ0FBQztZQUVGLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDMUI7Z0JBQ0ksaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLHFCQUFxQjtnQkFDckIsbUJBQW1CO2FBQ3RCLEVBQ0Q7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