// @ts-nocheck

import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';

/**
 * @name              todo
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the todo tag
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

export interface ITodo {
    priority: 'low' | 'normal' | 'high';
    description: string;
}

function todo(data, blockSettings): ITodo[] {
    if (!Array.isArray(data)) data = [data];

    const res = [];

    data.forEach((todo) => {
        if (!todo.value) return;

        const parts = todo.value.split(/\s{2,20000}/).map((l) => l.trim());

        const priority = parts[1] ?? 'normal',
            description = new String(parts[0] ?? '');
        description.render = true;

        res.push({
            priority,
            description,
        });
    });
    return res;
}
export default todo;
