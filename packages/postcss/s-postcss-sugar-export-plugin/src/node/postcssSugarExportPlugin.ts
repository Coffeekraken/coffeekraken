// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';

const mixinsStack = {},
    functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
        include: {
            ctime: true,
        },
    }),
    rootDir;
let loadedPromise;

const _cacheObjById = {};

export interface IPostcssSugarPluginSettings {
    outDir: string;
    target?: 'development' | 'production' | 'vite';
}

let _configLoaded = false;

const plugin = (settings: IPostcssSugarPluginSettings = {}) => {
    settings = __deepMerge(
        {
            outDir: '',
            cache: false,
        },
        settings,
    );

    if (_configLoaded) {
        updateConfig();
    }

    function updateConfig() {
        settings = __deepMerge(settings, {
            outDir: __SSugarConfig.get('postcssSugarPlugin.outDir'),
        });
    }

    async function _loadConfig() {
        await __SSugarConfig.load();
        _configLoaded = true;

        // update config
        updateConfig();

        return true;
    }

    function _load() {
        if (loadedPromise) return loadedPromise;
        loadedPromise = new Promise(async (resolve, reject) => {
            // load config
            await _loadConfig();

            resolve(true);
        });
        return loadedPromise;
    }

    async function processExports(filePath) {
        if (filePath.match(/\.dev\.css/)) {
            console.log(
                `<yellow>[export]</yellow> File "<cyan>${__path.relative(
                    settings.outDir,
                    filePath,
                )}</cyan>" will not be processed as it is a <magenta>dev</magenta> file...`,
            );
            return;
        }

        let css = __fs.readFileSync(filePath).toString();

        const exportMatches = [
            ...css.matchAll(
                /\/\*\!\sSEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\/([\s\S]*)\/\*\!\sSENDEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\//g,
            ),
        ];

        exportMatches.forEach((match) => {
            const exportPath = match[1],
                exportContent = match[2];

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

            console.log(
                `<yellow>[export]</yellow> Exporting "<cyan>${finalExportPath}</cyan>"`,
            );

            __writeFileSync(
                `${settings.outDir}/${finalExportPath}`,
                exportContent,
            );
        });

        if (exportMatches.length) {
            console.log(
                `<yellow>[export]</yellow> Purging exported css from main css...`,
            );

            exportMatches.forEach((match) => {
                const exportPath = match[1],
                    exportContent = match[2];
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
    }

    return {
        postcssPlugin: 'sugar-export',
        async Once(root) {
            __SBench.start('postcssSugarExportPlugin');
            await _load();
        },
        async OnceExit(root) {
            console.log('EEEEEEE', root.toString());
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
