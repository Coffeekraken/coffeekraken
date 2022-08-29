import __SDuration from '@coffeekraken/s-duration';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import { minify as __minify } from 'csso';

export default async function ({ root, sharedData, settings, cacheDir }) {
    const duration = new __SDuration();

    // exports only for production target
    // if (!settings.exports) {
    //     // console.log(`<yellow>[export]</yellow> Exports <red>disabled</red>`);
    //     return;
    // }

    const css = root.toString();

    // console.log('CSS', root.toString());

    const exportMatches = [
        ...css.matchAll(
            /\/\*\!\sSEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\/([\s\S]*)\/\*\!\sSENDEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\//g,
        ),
    ];

    exportMatches.forEach((match) => {
        let exportPath = match[1],
            exportContent = match[2];

        // generate the output path
        // if a / or a . is found in the exportPath, use as it is,
        // otherwise if it's just an "id" like "welcome", save it into the "css" subdirectory
        let finalExportPath = exportPath;

        if (!finalExportPath.match(/\//)) {
            finalExportPath = `exports/${finalExportPath}`;
        }
        if (!finalExportPath.match(/\.css$/)) {
            finalExportPath += '.css';
        }

        console.log(
            `<yellow>[export]</yellow> Export "<cyan>${finalExportPath}</cyan>"`,
        );

        if (settings.target === 'production') {
            exportContent = __minify(exportContent).css;
        }

        __writeFileSync(`${settings.outDir}/${finalExportPath}`, exportContent);
    });

    if (exportMatches.length) {
        console.log(
            `<yellow>[export]</yellow> Purging exported css from main one...`,
        );

        // removing all exported css
        let inExport = false;
        root.nodes = root.nodes.filter((node) => {
            if (node.type === 'comment' && node.text.trim().match(/SEXPORT:/)) {
                inExport = true;
                node.remove();
                return false;
            } else if (
                node.type === 'comment' &&
                node.text.trim().match(/SENDEXPORT:/)
            ) {
                inExport = false;
                node.remove();
                return false;
            } else if (inExport) {
                node.remove();
                return false;
            }
            return true;
        });
    }
    if (exportMatches.length) {
        console.log(
            `<green>[export]</green> Exports saved <green>successfully</green> in <cyan>${
                duration.end().formatedDuration
            }</cyan>`,
        );
    }
}
