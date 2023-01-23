// @ts-nocheck

import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __SDocmap from '../node/SDocmap';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const docmap = new __SDocmap();
        const result = await docmap.search(stringArgs);
        __copy(JSON.stringify(result, null, 4));
        console.log(result);
        console.log(
            `<green>[search]</green> Search results copied to your clipboard`,
        );
        resolve(result);
    });
};
