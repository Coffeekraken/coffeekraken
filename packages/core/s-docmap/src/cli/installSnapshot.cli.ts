// @ts-nocheck

import __SDocmap from '../node/SDocmap';

export default async (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const docmap = new __SDocmap();
        const result = await docmap.installSnapshot(stringArgs);
        resolve(result);
    });
};
