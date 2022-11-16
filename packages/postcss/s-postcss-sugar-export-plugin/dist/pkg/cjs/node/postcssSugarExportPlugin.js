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
exports.postcss = void 0;
// import __postcss from 'postcss';
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const mixinsStack = {},
//     functionsStack = {};
// let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
//         include: {
//             ctime: true,
//         },
//     }),
//     rootDir;
let loadedPromise;
const _cacheObjById = {};
let _configLoaded = false;
const plugin = (settings = {}) => {
    settings = (0, object_1.__deepMerge)({
        outDir: '',
        cache: false,
    }, settings);
    if (_configLoaded) {
        updateConfig();
    }
    function updateConfig() {
        settings = (0, object_1.__deepMerge)(settings, {
            outDir: s_sugar_config_1.default.get('postcssSugarPlugin.outDir'),
        });
    }
    function _loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            yield s_sugar_config_1.default.load();
            _configLoaded = true;
            // update config
            updateConfig();
            return true;
        });
    }
    function _load() {
        if (loadedPromise)
            return loadedPromise;
        loadedPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // load config
            yield _loadConfig();
            resolve(true);
        }));
        return loadedPromise;
    }
    function processExports(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filePath.match(/\.dev\.css/)) {
                console.log(`<yellow>[export]</yellow> File "<cyan>${path_1.default.relative(settings.outDir, filePath)}</cyan>" will not be processed as it is a <magenta>dev</magenta> file...`);
                return;
            }
            let css = fs_2.default.readFileSync(filePath).toString();
            const exportMatches = [
                ...css.matchAll(/\/\*\!\sSEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\/([\s\S]*)\/\*\!\sSENDEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\//g),
            ];
            exportMatches.forEach((match) => {
                const exportPath = match[1], exportContent = match[2];
                // generate the output path
                // if a / or a . is found in the exportPath, use as it is,
                // otherwise if it's just an "id" like "welcome", save it into the "css" subdirectory
                let finalExportPath = exportPath;
                if (!finalExportPath.match(/\//)) {
                    finalExportPath = `exported/${finalExportPath}`;
                }
                if (!finalExportPath.match(/\.css$/)) {
                    finalExportPath += '.css';
                }
                console.log(`<yellow>[export]</yellow> Exporting "<cyan>${finalExportPath}</cyan>"`);
                (0, fs_1.__writeFileSync)(`${settings.outDir}/${finalExportPath}`, exportContent);
            });
            if (exportMatches.length) {
                console.log(`<yellow>[export]</yellow> Purging exported css from main css...`);
                exportMatches.forEach((match) => {
                    const exportPath = match[1], exportContent = match[2];
                    css = css.replace(exportContent, '');
                });
                (0, fs_1.__writeFileSync)(filePath, css);
                // // removing all exported css
                // let inExport = false;
                // root.nodes = root.nodes.filter((node) => {
                //     if (node.type === 'comment' && node.text.trim().match(/SEXPORT:/)) {
                //         inExport = true;
                //         node.remove();
                //         return false;
                //     } else if (
                //         node.type === 'comment' &&
                //         node.text.trim().match(/SENDEXPORT:/)
                //     ) {
                //         inExport = false;
                //         node.remove();
                //         return false;
                //     } else if (inExport) {
                //         node.remove();
                //         return false;
                //     }
                //     return true;
                // });
            }
            return true;
        });
    }
    return {
        postcssPlugin: 'sugar-export',
        Once(root) {
            return __awaiter(this, void 0, void 0, function* () {
                yield _load();
            });
        },
        OnceExit(root) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('EEEEEEE', root.toString());
            });
        },
        // OnceExit(root): Promise<void> {
        //     return new Promise(async (resolve, reject) => {
        //     });
        // },
    };
};
plugin.postcss = true;
exports.postcss = true;
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxrRkFBMEQ7QUFDMUQsK0NBQXlEO0FBQ3pELHVEQUF5RDtBQUN6RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLDBCQUEwQjtBQUMxQiwyQkFBMkI7QUFDM0IsMkVBQTJFO0FBQzNFLHFCQUFxQjtBQUNyQiwyQkFBMkI7QUFDM0IsYUFBYTtBQUNiLFVBQVU7QUFDVixlQUFlO0FBQ2YsSUFBSSxhQUFhLENBQUM7QUFFbEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBT3pCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUUxQixNQUFNLE1BQU0sR0FBRyxDQUFDLFdBQXdDLEVBQUUsRUFBRSxFQUFFO0lBQzFELFFBQVEsR0FBRyxJQUFBLG9CQUFXLEVBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUUsS0FBSztLQUNmLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLGFBQWEsRUFBRTtRQUNmLFlBQVksRUFBRSxDQUFDO0tBQ2xCO0lBRUQsU0FBUyxZQUFZO1FBQ2pCLFFBQVEsR0FBRyxJQUFBLG9CQUFXLEVBQUMsUUFBUSxFQUFFO1lBQzdCLE1BQU0sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztTQUMxRCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBZSxXQUFXOztZQUN0QixNQUFNLHdCQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQztZQUVyQixnQkFBZ0I7WUFDaEIsWUFBWSxFQUFFLENBQUM7WUFFZixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFRCxTQUFTLEtBQUs7UUFDVixJQUFJLGFBQWE7WUFBRSxPQUFPLGFBQWEsQ0FBQztRQUN4QyxhQUFhLEdB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