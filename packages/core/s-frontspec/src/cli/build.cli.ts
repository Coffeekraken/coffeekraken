// @ts-nocheck

import __SFrontspec from '../node/SFrontspec';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const frontspec = new __SFrontspec();
        const result = await frontspec.build(stringArgs);
        resolve(result);
    });
};
