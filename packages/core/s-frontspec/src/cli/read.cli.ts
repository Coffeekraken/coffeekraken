// @ts-nocheck

import { __copy } from '@coffeekraken/sugar/clipboard';
import __SFrontspec from '../node/SFrontspec';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const frontspec = new __SFrontspec();
        const result = await frontspec.read(stringArgs);
        __copy(JSON.stringify(result, null, 4));
        console.log(
            '<green>[read]</green> frontspec.json copied to your clipboard',
        );
        resolve(res);
    });
};
