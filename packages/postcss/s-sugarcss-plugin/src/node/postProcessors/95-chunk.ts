import __SDuration from '@coffeekraken/s-duration';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { minify as __minify } from 'csso';

export default async function ({ root, sharedData, settings, cacheDir }) {
    const duration = new __SDuration();
    // check if active in settings
    if (!settings.chunks) {
        return;
    }
    const css = root.toString();
    const chunkMatches = [
        ...css.matchAll(
            /\/\*\!\sSCHUNK:([a-zA-Z0-9_\/\.-]+)\s\*\/(((?!\/\*\!\sSENDCHUNK:)[\s\S])*)/g,
        ),
    ];
    chunkMatches.forEach((match) => {
        let chunkId = match[1],
            chunkContent = match[2];
        // generate the output path
        // if a / or a . is found in the chunkId, use as a path and will be stored in the "partials" folder,
        // otherwise if it's just an "id" like "welcome", save it into the "partials" folder
        let finalChunkPath = chunkId;
        if (!finalChunkPath.match(/\//)) {
            finalChunkPath = `chunks/${finalChunkPath}`;
        }
        if (!finalChunkPath.match(/\.css$/)) {
            finalChunkPath += '.css';
        }
        console.verbose?.(
            `<yellow>[chunk]</yellow> Saving "<cyan>${finalChunkPath}</cyan>" chunk`,
        );
        chunkContent = __minify(chunkContent).css;
        __writeFileSync(`${settings.outDir}/${finalChunkPath}`, chunkContent);
    });
    if (chunkMatches.length) {
        console.verbose?.(
            `<yellow>[chunk]</yellow> Purging chunked css from main one...`,
        );
        // removing all partialed css
        let inChunk = false;
        root.nodes = root.nodes.filter((node) => {
            if (node.type === 'comment' && node.text.trim().match(/SCHUNK:/)) {
                inChunk = true;
                return false;
            } else if (
                node.type === 'comment' &&
                node.text.trim().match(/SENDCHUNK:/)
            ) {
                inChunk = false;
                return false;
            } else if (inChunk) {
                return false;
            }
            return true;
        });
    }
    if (chunkMatches.length) {
        console.verbose?.(
            `<green>[chunk]</green> Chubks saved <green>successfully</green> in <cyan>${
                duration.end().formatedDuration
            }</cyan>`,
        );
    }
}
