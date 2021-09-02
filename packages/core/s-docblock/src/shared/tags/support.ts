// @ts-nocheck

import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';

/**
 * @name              support
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the support tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @param      {Array<IPlatform>}                      An array of platform obj
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface IPlatform {
    name: string;
    description: string;
}

function support(data, blockSettings): IPlatform[] {
    if (!Array.isArray(data)) data = [data];

    const res = [];

    data.forEach((support) => {
        if (!support.value) return;

        const parts = support.value.split(/\s{2,20000}/).map((l) => l.trim());

        res.push({
            name: parts[0],
            description: parts[1] ?? '',
        });
    });
    return res;
}
export default support;
