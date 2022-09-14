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
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mixinsStack = {}, functionsStack = {};
let pluginHash = (0, fs_1.__folderHash)(path_1.default.resolve((0, fs_1.__dirname)(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
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
                s_bench_1.default.start('postcssSugarExportPlugin');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxvRUFBNkM7QUFDN0Msa0ZBQTBEO0FBQzFELCtDQUlnQztBQUNoQyx1REFBeUQ7QUFDekQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQixNQUFNLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxVQUFVLEdBQUcsSUFBQSxpQkFBWSxFQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBQSxjQUFTLEdBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTtJQUMvRCxPQUFPLEVBQUU7UUFDTCxLQUFLLEVBQUUsSUFBSTtLQUNkO0NBQ0osQ0FBQyxFQUNGLE9BQU8sQ0FBQztBQUNaLElBQUksYUFBYSxDQUFDO0FBRWxCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQU96QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFFMUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUF3QyxFQUFFLEVBQUUsRUFBRTtJQUMxRCxRQUFRLEdBQUcsSUFBQSxvQkFBVyxFQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO1FBQ1YsS0FBSyxFQUFFLEtBQUs7S0FDZixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxhQUFhLEVBQUU7UUFDZixZQUFZLEVBQUUsQ0FBQztLQUNsQjtJQUVELFNBQVMsWUFBWTtRQUNqQixRQUFRLEdBQUcsSUFBQSxvQkFBVyxFQUFDLFFBQVEsRUFBRTtZQUM3QixNQUFNLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7U0FDMUQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQWUsV0FBVzs7WUFDdEIsTUFBTSx3QkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVCLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFckIs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