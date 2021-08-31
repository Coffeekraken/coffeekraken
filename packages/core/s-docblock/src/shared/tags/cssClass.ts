// @ts-nocheck

import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __idCompliant from '@coffeekraken/sugar/shared/string/idCompliant';

/**
 * @name              cssClass
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the cssClass tag
 *
 * @cssClass       {Object}          data        The data object parsed in the string
 * @cssClass       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @cssClass      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function cssClass(data, blockSettings) {
    if (!Array.isArray(data)) data = [data];

    const res = {};

    data.forEach((cssClass) => {
        if (typeof cssClass !== 'object' || !cssClass.value || typeof cssClass.value !== 'string') return;
        const parts = cssClass.value.split(/\s{2,20000}/).map((l) => l.trim());
        let className = parts?.[0];
        const name = __idCompliant(className, {});
        const description = parts && parts[1] ? parts[1] : null;

        res[name] = {
            name: parts[0],
            description,
        };
        if (cssClass.content) res[name].content = cssClass.content.join('\n');
    });
    return res;
}
export default cssClass;
