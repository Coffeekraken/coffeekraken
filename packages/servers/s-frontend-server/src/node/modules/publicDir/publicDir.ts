import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __express from 'express';

export default function rootFiles({ express, settings, config }) {
    return new Promise(async (resolve) => {
        const packageRoot = __packageRootDir(),
            publicDir = __SSugarConfig.get('storage.src.publicDir');
        const files = __SGlob.resolve('**/*', {
            cwd: publicDir,
        });

        console.verbose?.(
            `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`,
        );

        files.forEach((file) => {
            console.verbose?.(
                `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`,
            );
            express.get(
                `/${file.relPath}`,
                __express.static(file.dirPath, {
                    index: file.name,
                }),
            );
        });

        resolve(true);
    });
}
