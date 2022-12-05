import __SEnv from '@coffeekraken/s-env';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __express from 'express';

export default function rootFiles(express, settings, config) {
    return new __SPromise(
        async ({ resolve, reject, emit, pipe }) => {
            const packageRoot = __packageRootDir(),
                publicDir = __SSugarConfig.get('storage.src.publicDir');
            const files = __SGlob.resolve('**/*', {
                cwd: publicDir,
            });

            if (__SEnv.is('verbose')) {
                emit('log', {
                    value: `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`,
                });
            }

            files.forEach((file) => {
                if (__SEnv.is('verbose')) {
                    emit('log', {
                        value: `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`,
                    });
                }
                express.get(
                    `/${file.relPath}`,
                    __express.static(file.dirPath, {
                        index: file.name,
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
