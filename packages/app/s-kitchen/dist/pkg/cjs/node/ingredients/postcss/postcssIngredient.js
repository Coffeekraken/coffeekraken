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
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
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
        var _a, _b;
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
            console.log(`<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan> and other useful ones...`);
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
            yield (0, install_1.default)(['postcss', ...plugins]);
            // saving new config
            console.log(`<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`);
            // add plugins in config
            if (Array.isArray(currentConfig.plugins)) {
                currentConfig.plugins = (0, array_1.__unique)([...currentConfig.plugins, ,]);
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
                    console.log(`<yellow>[postcss]</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...`);
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
                    console.log(`<yellow>[postcss]</yellow> <cyan>Generic</cyan> project detected. Adding sugar css files...`);
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
            console.log(`<yellow>[postcss]</yellow> Added <green>successfully</green> in your project. Have fun!`);
            return true;
        });
    },
};
exports.default = postcssIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRkFBMEQ7QUFDMUQscURBQXFEO0FBQ3JELG1GQUFnRTtBQUNoRSxtREFBNEQ7QUFDNUQsNENBQXNCO0FBR3RCLCtDQUtnQztBQUVoQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBd0I7SUFDM0MsRUFBRSxFQUFFLFNBQVM7SUFDYixXQUFXLEVBQ1AsMEhBQTBIO0lBQzlILFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7OztZQUN0QixNQUFNLFdBQVcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLENBQUM7WUFFdkMsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsQ0FBQztZQUMxRCxNQUFNLG1CQUFtQixHQUFHLElBQUEsbUJBQWMsRUFDdEMsR0FBRyxtQkFBbUIsZUFBZSxDQUN4QyxDQUFDO1lBRUYsSUFBSSxhQUFhLEdBQUc7Z0JBQ2hCLE9BQU8sRUFBRSxFQUFFO2FBQ2QsQ0FBQztZQUVGLElBQUksVUFBVSxHQUFHLElBQUEsY0FBUyxFQUN0QjtnQkFDSSxpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YscUJBQXFCO2dCQUNyQixtQkFBbUI7YUFDdEIsRUFDRDtnQkFDSSxHQUFHLEVBQUUsV0FBVzthQUNuQixDQUNKLENBQUM7WUFFRixJQUFJLGNBQWMsR0FDZCxNQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLG1DQUNoQixHQUFHLFdBQVcsSUFBSSxNQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLG1DQUFJLHFCQUFxQixFQUFFLENBQUM7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