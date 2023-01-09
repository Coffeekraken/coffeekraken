import __SDuration from '@coffeekraken/s-duration';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';

export default async function ({
    root,
    sharedData,
    settings,
    cacheDir,
    applyClassmap,
}) {
    const duration = new __SDuration();

    const map = applyClassmap(root);
    __fs.writeFileSync(
        `${__packageRootDir()}/classmap.json`,
        JSON.stringify(map),
    );
    console.log(
        `<green>[classmap]</green> "<cyan>classmap.json</cyan>" generated <green>successfully</green> in <cyan>${
            duration.end().formatedDuration
        }</cyan>`,
    );
}
