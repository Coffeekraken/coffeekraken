// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SCliConfigCacheParamsInterface from './interface/SCliConfigCacheParamsInterface';
import { __packageCacheDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SCliConfigCacheParamsInterface.apply(stringArgs);

        const config = await __SSugarConfig.load(finalParams.id);

        const filePath = await config.instance.cache();

        // __fs.mkdirSync(finalParams.cacheDir, { recursive: true });
        // __fs.writeFileSync(
        //     `${finalParams.cacheDir}/${finalParams.id}.json`,
        //     JSON.stringify(config.instance.toJson(), null, 4),
        // );

        emit('log', {
            value: `<green>[cache]</green> The "<yellow>${finalParams.id}</yellow>" config has been cached <green>successfully</green> under <cyan>${filePath}</cyan>`,
        });

        resolve();
    });
};
