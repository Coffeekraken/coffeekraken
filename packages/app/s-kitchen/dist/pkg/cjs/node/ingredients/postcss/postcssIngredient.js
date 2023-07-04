"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const array_1 = require("@coffeekraken/sugar/array");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
const npm_1 = require("@coffeekraken/sugar/npm");
const fs_2 = require("@coffeekraken/sugar/fs");
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
    add({ ask, context }) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = (0, path_1.__packageRootDir)();
            const sKitchenPackageRoot = (0, path_1.__packageRootDir)((0, fs_2.__dirname)());
            const sKitchenPackageJson = (0, fs_2.__readJsonSync)(`${sKitchenPackageRoot}/package.json`);
            let currentConfig = {
                plugins: [],
            };
            let configFile = (0, fs_2.__pickOneSync)([
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
                fs_1.default.writeFileSync(configFilePath, JSON.stringify({}));
            }
            switch (configFile === null || configFile === void 0 ? void 0 : configFile.extension) {
                case 'json':
                    currentConfig = (0, fs_2.__readJsonSync)(configFile.path);
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
            (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan> and other useful ones...`);
            const currentPackageJson = (0, package_1.__packageJsonSync)((0, fs_2.__dirname)());
            (0, npm_1.__addDependencies)({
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
            (_d = console.verbose) === null || _d === void 0 ? void 0 : _d.call(console, `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`);
            // add plugins in config
            if (Array.isArray(currentConfig.plugins)) {
                currentConfig.plugins = (0, array_1.__unique)([
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
                    fs_1.default.writeFileSync(configFilePath, `module.exports = ${jsonStr};`);
                    break;
                case 'json':
                default:
                    jsonStr = JSON.stringify(currentConfig, null, 4);
                    fs_1.default.writeFileSync(configFilePath, jsonStr);
                    break;
            }
            const thisPackageRoot = (0, path_1.__packageRootDir)((0, fs_2.__dirname)());
            const globalCssToAdd = fs_1.default
                .readFileSync(`${thisPackageRoot}/src/data/postcss/index.css`)
                .toString();
            const sugarCss = fs_1.default
                .readFileSync(`${thisPackageRoot}/src/data/postcss/sugar.css`)
                .toString();
            let globalCss;
            // detecting the package type (next, generic, etc...)
            switch (context.projectType.type) {
                case 'next':
                    (_e = console.verbose) === null || _e === void 0 ? void 0 : _e.call(console, `<yellow>[postcss]</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...`);
                    globalCss = fs_1.default
                        .readFileSync(`${packageRoot}/styles/globals.css`)
                        .toString();
                    if (!globalCss.includes(globalCssToAdd)) {
                        fs_1.default.writeFileSync(`${packageRoot}/styles/globals.css`, [globalCssToAdd, globalCss].join('\n\n'));
                    }
                    if (!fs_1.default.existsSync(`${packageRoot}/styles/sugar.css`)) {
                        fs_1.default.writeFileSync(`${packageRoot}/styles/sugar.css`, sugarCss);
                    }
                    break;
                default:
                    (_f = console.verbose) === null || _f === void 0 ? void 0 : _f.call(console, `<yellow>[postcss]</yellow> <cyan>Generic</cyan> project detected. Adding sugar css files...`);
                    const srcCssDir = s_sugar_config_1.default.get('storage.src.cssDir');
                    if (!fs_1.default.existsSync(`${srcCssDir}/index.css`)) {
                        (0, fs_2.__writeFileSync)(`${srcCssDir}/index.css`, '');
                    }
                    globalCss = fs_1.default
                        .readFileSync(`${srcCssDir}/index.css`)
                        .toString();
                    if (!globalCss.includes(globalCssToAdd)) {
                        fs_1.default.writeFileSync(`${srcCssDir}/index.css`, [globalCssToAdd, globalCss].join('\n\n'));
                    }
                    if (!fs_1.default.existsSync(`${srcCssDir}/sugar.css`)) {
                        fs_1.default.writeFileSync(`${srcCssDir}/sugar.css`, sugarCss);
                    }
                    break;
            }
            (_g = console.verbose) === null || _g === void 0 ? void 0 : _g.call(console, `<yellow>[postcss]</yellow> Added <green>successfully</green> in your project. Have fun!`);
            return true;
        });
    },
};
exports.default = postcssIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELHFEQUFxRDtBQUNyRCx5REFBZ0U7QUFDaEUsbURBQTREO0FBQzVELDRDQUFzQjtBQUd0QixpREFBNEQ7QUFFNUQsK0NBS2dDO0FBRWhDOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLGlCQUFpQixHQUF3QjtJQUMzQyxFQUFFLEVBQUUsU0FBUztJQUNiLFdBQVcsRUFDUCwwSEFBMEg7SUFDOUgsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTs7O1lBQ3RCLE1BQU0sV0FBVyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsQ0FBQztZQUV2QyxNQUFNLG1CQUFtQixHQUFHLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxDQUFDO1lBQzFELE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxtQkFBYyxFQUN0QyxHQUFHLG1CQUFtQixlQUFlLENBQ3hDLENBQUM7WUFFRixJQUFJLGFBQWEsR0FBRztnQkFDaEIsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDO1lBRUYsSUFBSSxVQUFVLEdBQUcsSUFBQSxrQkFBYSxFQUMxQjtnQkFDSSxpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YscUJBQXFCO2dCQUNyQixtQkFBbUI7YUFDdEIsRUFDRDtnQkFDSSxHQUFHLEVBQUUsV0FBVzthQUNuQixDQUNKLENBQUM7WUFFRixJQUFJLGNBQWMsR0FDZCxNQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLG1DQUNoQixHQUFHLFdBQVcsSUFBSSxNQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLG1DQUFJLHFCQUFxQixFQUFFLENBQUM7WUFFbEUsd0JB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