import __SDuration from '@coffeekraken/s-duration';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';

export default async function ({ root, sharedData, settings, cacheDir }) {
    const duration = new __SDuration();

    const css = root.toString();

    const cacheMatches = [
        ...css.matchAll(
            /\/\*\sSCACHE:([a-zA-Z0-9_=-]+)\s\*\/([\s\S]*)\/\*\sSENDCACHE:[a-zA-Z0-9_=-]+\s\*\//g,
        ),
    ];

    cacheMatches.forEach((match) => {
        const cacheId = match[1],
            cacheContent = match[2],
            humanId = cacheId.split('=')[3];

        console.log(
            `<yellow>[cache]</yellow> Saving cache "<cyan>${
                humanId ?? cacheId
            }</cyan>"`,
        );

        console.log('CACHE', cacheDir, cacheId);

        __writeFileSync(`${cacheDir}/${cacheId}.css`, cacheContent);
    });

    if (cacheMatches.length) {
        console.log(
            `<green>[cache]</green> Cache generated <green>successfully</green> in <cyan>${
                duration.end().formatedDuration
            }</cyan>`,
        );
    }
}
