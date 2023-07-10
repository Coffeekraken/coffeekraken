import { __writeFileSync } from '@coffeekraken/sugar/fs';

export default async function ({ root, sharedData, settings, cacheDir }) {
    __writeFileSync(`${settings.outDir}/index.dev.css`, root.toString());
}
