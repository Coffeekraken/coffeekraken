// @ts-nocheck

import __SSugarConfig from '../node/sugar';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const config = await __SSugarConfig.load();
        const result = await config.instance.read(stringArgs);
        console.log(result);
        resolve(result);
    });
};
