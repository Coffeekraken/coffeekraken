// @ts-nocheck

import __SDocmap from '../node/SDocmap';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const docmap = new __SDocmap();
        const result = await docmap.snapshot(stringArgs);
        resolve(result);
    });
};
