// @ts-nocheck

import __SCarpenter from '../node/SCarpenter.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const carpenter = new __SCarpenter();
        const result = await carpenter.start(stringArgs);
        resolve(result);
    });
};
