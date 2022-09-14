var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname, __folderHash, __writeFileSync, } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import __path from 'path';
const mixinsStack = {}, functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
let loadedPromise;
const _cacheObjById = {};
let _configLoaded = false;
const plugin = (settings = {}) => {
    settings = __deepMerge({
        outDir: '',
        cache: false,
    }, settings);
    if (_configLoaded) {
        updateConfig();
    }
    function updateConfig() {
        settings = __deepMerge(settings, {
            outDir: __SSugarConfig.get('postcssSugarPlugin.outDir'),
        });
    }
    function _loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __SSugarConfig.load();
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
                console.log(`<yellow>[export]</yellow> File "<cyan>${__path.relative(settings.outDir, filePath)}</cyan>" will not be processed as it is a <magenta>dev</magenta> file...`);
                return;
            }
            let css = __fs.readFileSync(filePath).toString();
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
                __writeFileSync(`${settings.outDir}/${finalExportPath}`, exportContent);
            });
            if (exportMatches.length) {
                console.log(`<yellow>[export]</yellow> Purging exported css from main css...`);
                exportMatches.forEach((match) => {
                    const exportPath = match[1], exportContent = match[2];
                    css = css.replace(exportContent, '');
                });
                __writeFileSync(filePath, css);
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
                __SBench.start('postcssSugarExportPlugin');
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
export const postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0lBQy9ELE9BQU8sRUFBRTtRQUNMLEtBQUssRUFBRSxJQUFJO0tBQ2Q7Q0FDSixDQUFDLEVBQ0YsT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLENBQUM7QUFFbEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBT3pCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUUxQixNQUFNLE1BQU0sR0FBRyxDQUFDLFdBQXdDLEVBQUUsRUFBRSxFQUFFO0lBQzFELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUUsS0FBSztLQUNmLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLGFBQWEsRUFBRTtRQUNmLFlBQVksRUFBRSxDQUFDO0tBQ2xCO0lBRUQsU0FBUyxZQUFZO1FBQ2pCLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQzdCLE1BQU0sRUFBRSxjQUFjLENBQUMsR0FBRyxD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