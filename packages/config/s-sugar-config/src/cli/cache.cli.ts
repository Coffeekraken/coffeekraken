// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SCliConfigCacheParamsInterface from './interface/SCliConfigCacheParamsInterface.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SCliConfigCacheParamsInterface.apply(stringArgs);
        const config = await __SSugarConfig.load(finalParams.id);
        const filePath = await config.instance.cache();
        console.log(
            `<green>[cache]</green> The "<yellow>${finalParams.id}</yellow>" config has been cached <green>successfully</green> under <cyan>${filePath}</cyan>`,
        );
        resolve();
    });
};
