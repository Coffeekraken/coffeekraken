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
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
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
            let currentConfig = {
                plugins: [],
            };
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
            yield (0, install_1.default)(['postcss', ...plugins]);
            // saving new config
            emit('log', {
                value: `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`,
            });
            // add plugins in config
            if (Array.isArray(currentConfig.plugins)) {
                currentConfig.plugins = (0, unique_1.default)([...currentConfig.plugins, ,]);
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
            const thisPackageRoot = (0, packageRoot_1.default)((0, dirname_1.default)());
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
                    emit('log', {
                        value: '<yellow>[postcss]</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRkFBMEQ7QUFDMUQsa0ZBQTREO0FBQzVELDRGQUFzRTtBQUN0RSxtRkFBZ0U7QUFDaEUsNEZBQXNFO0FBQ3RFLHFGQUErRDtBQUMvRCw0Q0FBc0I7QUFHdEIsOEZBQXdFO0FBRXhFLGtGQUE0RDtBQUU1RDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBd0I7SUFDM0MsRUFBRSxFQUFFLFNBQVM7SUFDYixXQUFXLEVBQ1AsMEhBQTBIO0lBQzlILFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7OztZQUN2QyxNQUFNLFdBQVcsR0FBRyxJQUFBLHFCQUFhLEdBQUUsQ0FBQztZQUVwQyxNQUFNLG1CQUFtQixHQUFHLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxzQkFBYyxFQUN0QyxHQUFHLG1CQUFtQixlQUFlLENBQ3hDLENBQUM7WUFFRixJQUFJLGFBQWEsR0FBRztnQkFDaEIsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDO1lBRUYsSUFBSSxVQUFVLEdBQUcsSUFBQSxpQkFBUyxFQUN0QjtnQkFDSSxpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YscUJBQXFCO2dCQUNyQixtQkFBbUI7YUFDdEIsRUFDRDtnQkFDSSxHQUFHLEVBQUUsV0FBVzthQUNuQixDQUNKLENBQUM7WUFFRixJQUFJLGNBQWMsR0FDZCxNQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLG1DQUNoQixHQUFHLFdBQVcs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