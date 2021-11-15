import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import __isDirectory from '@coffeekraken/sugar/node/is/directory';
import __express from 'express';
import __SPromise from '@coffeekraken/s-promise';

export default function rootFiles(express, settings, config) {
    return new __SPromise(
        async ({ resolve, reject, emit, pipe }) => {
            const packageRoot = __packageRoot();
            const files = __fs.readdirSync(packageRoot);

            emit('log', {
                value: `<yellow>[rootFiles]</yellow> Exposing <magenta>${files.length}</magenta> root file(s)`,
            });

            files.forEach((fileName) => {
                const filePath = `${packageRoot}/${fileName}`;
                if (__isDirectory(filePath)) return;
                if (['docmap.json', 'package.json'].includes(fileName)) return;
                // emit('log', {
                //     value: `<yellow>[rootFiles]</yellow> Exposing file "<yellow>${fileName}</yellow>"`,
                // });
                express.get(
                    `/${fileName}`,
                    __express.static(packageRoot, {
                        index: fileName,
                    }),
                );
            });

            resolve(true);
        },
        {
            metas: {
                id: 'SFrontendServer',
            },
        },
    );
}
