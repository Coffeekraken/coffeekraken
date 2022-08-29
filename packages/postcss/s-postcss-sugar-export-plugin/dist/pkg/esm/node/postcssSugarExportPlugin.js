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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sV0FBVyxHQUFHLEVBQUUsRUFDbEIsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN4QixJQUFJLFVBQVUsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTtJQUMvRCxPQUFPLEVBQUU7UUFDTCxLQUFLLEVBQUUsSUFBSTtLQUNkO0NBQ0osQ0FBQyxFQUNGLE9BQU8sQ0FBQztBQUNaLElBQUksYUFBYSxDQUFDO0FBRWxCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQU96QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFFMUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUF3QyxFQUFFLEVBQUUsRUFBRTtJQUMxRCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO1FBQ1YsS0FBSyxFQUFFLEtBQUs7S0FDZixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxhQUFhLEVBQUU7UUFDZixZQUFZLEVBQUUsQ0FBQztLQUNsQjtJQUVELFNBQVMsWUFBWTtRQUNqQixRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUM3QixN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