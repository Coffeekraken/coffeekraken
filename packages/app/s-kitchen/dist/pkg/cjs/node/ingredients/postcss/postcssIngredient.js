"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
            let configFile = (0, fs_2.__pickOne)([
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
                    currentConfig = (yield Promise.resolve().then(() => __importStar(require(configFile.path)))).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRkFBMEQ7QUFDMUQscURBQXFEO0FBQ3JELHlEQUFnRTtBQUNoRSxtREFBNEQ7QUFDNUQsNENBQXNCO0FBR3RCLGlEQUE0RDtBQUU1RCwrQ0FLZ0M7QUFFaEM7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0saUJBQWlCLEdBQXdCO0lBQzNDLEVBQUUsRUFBRSxTQUFTO0lBQ2IsV0FBVyxFQUNQLDBIQUEwSDtJQUM5SCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNwQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFOzs7WUFDdEIsTUFBTSxXQUFXLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxDQUFDO1lBRXZDLE1BQU0sbUJBQW1CLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLENBQUM7WUFDMUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLG1CQUFjLEVBQ3RDLEdBQUcsbUJBQW1CLGVBQWUsQ0FDeEMsQ0FBQztZQUVGLElBQUksYUFBYSxHQUFHO2dCQUNoQixPQUFPLEVBQUUsRUFBRTthQUNkLENBQUM7WUFFRixJQUFJLFVBQVUsR0FBRyxJQUFBLGNBQVMsRUFDdEI7Z0JBQ0ksaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLHFCQUFxQjtnQkFDckIsbUJBQW1CO2FBQ3RCLEVBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLFdBQVc7YUFDbkIsQ0FDSixDQUFDO1lBRUYsSUFBSSxjQUFjLEdBQ2QsTUFBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxtQ0FDaEIsR0FBRyxXQUFXLElBQUksTUFBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxtQ0FBSSxxQkFB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