import __SDuration from '@coffeekraken/s-duration';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { minify as __minify } from 'csso';

export default async function ({ root, sharedData, settings, cacheDir }) {
    const duration = new __SDuration();

    // partials only for production target
    // if (!settings.partials) {
    //     // console.log(`<yellow>[partial]</yellow> Exports <red>disabled</red>`);
    //     return;
    // }

    const css = root.toString();

    const partialMatches = [
        ...css.matchAll(
            /\/\*\!\sSPARTIAL:([a-zA-Z0-9_\/\.-]+)\s\*\/(((?!\/\*\!\sSENDPARTIAL:)[\s\S])*)/g,
        ),
    ];

    partialMatches.forEach((match) => {
        let partialId = match[1],
            partialContent = match[2];

        // generate the output path
        // if a / or a . is found in the partialId, use as a path and will be stored in the "partials" folder,
        // otherwise if it's just an "id" like "welcome", save it into the "partials" folder
        let finalPartialPath = partialId;

        if (!finalPartialPath.match(/\//)) {
            finalPartialPath = `partials/${finalPartialPath}`;
        }
        if (!finalPartialPath.match(/\.css$/)) {
            finalPartialPath += '.css';
        }

        console.log(
            `<yellow>[partial]</yellow> Saving "<cyan>${finalPartialPath}</cyan>" partial`,
        );

        if (settings.target === 'production') {
            partialContent = __minify(partialContent).css;
        }

        __writeFileSync(
            `${settings.outDir}/${finalPartialPath}`,
            partialContent,
        );
    });

    if (partialMatches.length) {
        console.log(
            `<yellow>[partial]</yellow> Purging partialed css from main one...`,
        );

        // removing all partialed css
        let inPartial = false;
        root.nodes = root.nodes.filter((node) => {
            if (
                node.type === 'comment' &&
                node.text.trim().match(/SPARTIAL:/)
            ) {
                inPartial = true;
                node.remove();
                return false;
            } else if (
                node.type === 'comment' &&
                node.text.trim().match(/SENDPARTIAL:/)
            ) {
                inPartial = false;
                node.remove();
                return false;
            } else if (inPartial) {
                node.remove();
                return false;
            }
            return true;
        });
    }
    if (partialMatches.length) {
        console.log(
            `<green>[partial]</green> Partials saved <green>successfully</green> in <cyan>${
                duration.end().formatedDuration
            }</cyan>`,
        );
    }
}
