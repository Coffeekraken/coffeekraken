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
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import __path from 'path';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsMEJBQTBCO0FBQzFCLDJCQUEyQjtBQUMzQiwyRUFBMkU7QUFDM0UscUJBQXFCO0FBQ3JCLDJCQUEyQjtBQUMzQixhQUFhO0FBQ2IsVUFBVTtBQUNWLGVBQWU7QUFDZixJQUFJLGFBQWEsQ0FBQztBQUVsQixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFPekIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLENBQUMsV0FBd0MsRUFBRSxFQUFFLEVBQUU7SUFDMUQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtRQUNWLEtBQUssRUFBRSxLQUFLO0tBQ2YsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUksYUFBYSxFQUFFO1FBQ2YsWUFBWSxFQUFFLENBQUM7S0FDbEI7SUFFRCxTQUFTLFlBQVk7UUFDakIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDN0IsTUFBTSxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7U0FDMUQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQWUsV0FBVzs7WUFDdEIsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQztZQUVy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