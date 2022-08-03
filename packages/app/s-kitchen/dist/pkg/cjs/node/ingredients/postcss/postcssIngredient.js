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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const pickOne_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pickOne"));
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
            const packageRoot = (0, packageRoot_1.default)();
            const sKitchenPackageRoot = (0, packageRoot_1.default)((0, dirname_1.default)());
            const sKitchenPackageJson = (0, readJsonSync_1.default)(`${sKitchenPackageRoot}/package.json`);
            let currentConfig = {};
            let configFile = (0, pickOne_1.default)([
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
                    currentConfig = (0, readJsonSync_1.default)(configFile.path);
                    break;
                case 'js':
                    // import the config
                    currentConfig = (yield Promise.resolve().then(() => __importStar(require(configFile.path)))).default;
                    break;
            }
            const pluginName = '@coffeekraken/s-postcss-sugar-plugin';
            if (!currentConfig.plugins) {
                currentConfig.plugins = {
                    [pluginName]: {},
                };
            }
            else if (Array.isArray(currentConfig.plugins) &&
                !currentConfig.plugins.contains(`${pluginName}`)) {
                currentConfig.plugins.unshift(pluginName);
            }
            else if (!currentConfig.plugins[pluginName]) {
                currentConfig.plugins = Object.assign({ [pluginName]: {} }, currentConfig.plugins);
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
                value: `<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan>...`,
            });
            const packageJson = (0, readJsonSync_1.default)(`${packageRoot}/package.json`);
            packageJson.dependencies['@coffeekraken/s-postcss-sugar-plugin'] = `^${sKitchenPackageJson.version}`;
            (0, writeJsonSync_1.default)(`${packageRoot}/package.json`, packageJson);
            // try {
            //     await pipe(__npmInstall('@coffeekraken/s-postcss-sugar-plugin'));
            // } catch (e) {
            //     emit('log', {
            //         value: `<red>[postcss]</red> Something went wrong when installing the @coffeekraken/s-postcss-sugar-plugin package. Please try to install it manually.`,
            //     });
            // }
            // saving new config
            emit('log', {
                value: `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`,
            });
            let jsonStr;
            switch (configFile === null || configFile === void 0 ? void 0 : configFile.extension) {
                case 'js':
                    jsonStr = JSON.stringify(currentConfig, null, 2);
                    fs_1.default.writeFileSync(configFilePath, `module.exports = ${jsonStr};`);
                    break;
                case 'json':
                default:
                    jsonStr = JSON.stringify(currentConfig, null, 2);
                    fs_1.default.writeFileSync(configFilePath, jsonStr);
                    break;
            }
            const thisPackageRoot = (0, packageRoot_1.default)((0, dirname_1.default)());
            const globalCssToAdd = fs_1.default
                .readFileSync(`${thisPackageRoot}/src/data/postcss/index.css`)
                .toString();
            const sugarCss = fs_1.default
                .readFileSync(`${thisPackageRoot}/src/data/postcss/sugar.css`)
                .toString();
            // detecting the package type (next, generic, etc...)
            let globalCss;
            switch (context.projectType.type) {
                case 'next':
                    emit('log', {
                        value: '<yellow>postcss</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...',
                    });
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
                    emit('log', {
                        value: '<yellow>[postcss]</yellow> <cyan>Generic</cyan> project detected. Adding sugar css files...',
                    });
                    const srcCssDir = s_sugar_config_1.default.get('storage.src.cssDir');
                    if (!fs_1.default.existsSync(`${srcCssDir}/index.css`)) {
                        (0, writeFileSync_1.default)(`${srcCssDir}/index.css`, '');
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
            emit('log', {
                value: `<yellow>[postcss]</yellow> Added <green>successfully</green> in your project. Have fun!`,
            });
            return true;
        });
    },
};
exports.default = postcssIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRkFBMEQ7QUFDMUQsa0ZBQTREO0FBQzVELDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFDeEUsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUd0Qiw4RkFBd0U7QUFFeEUsa0ZBQTREO0FBRTVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLGlCQUFpQixHQUF3QjtJQUMzQyxFQUFFLEVBQUUsU0FBUztJQUNiLFdBQVcsRUFDUCwwSEFBMEg7SUFDOUgsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTs7O1lBQ3ZDLE1BQU0sV0FBVyxHQUFHLElBQUEscUJBQWEsR0FBRSxDQUFDO1lBRXBDLE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxxQkFBYSxFQUFDLElBQUEsaUJBQVMsR0FBRSxDQUFDLENBQUM7WUFDdkQsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLHNCQUFjLEVBQ3RDLEdBQUcsbUJBQW1CLGVBQWUsQ0FDeEMsQ0FBQztZQUVGLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUV2QixJQUFJLFVBQVUsR0FBRyxJQUFBLGlCQUFTLEVBQ3RCO2dCQUNJLGlCQUFpQjtnQkFDakIsZUFBZTtnQkFDZixxQkFBcUI7Z0JBQ3JCLG1CQUFtQjthQUN0QixFQUNEO2dCQUNJLEdBQUcsRUFBRSxXQUFXO2FBQ25CLENBQ0osQ0FBQztZQUVGLElBQUksY0FBYyxHQUNkLE1BQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksbUNBQ2hCLEdBQUcsV0FBVyxJQUFJLE1BQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFB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