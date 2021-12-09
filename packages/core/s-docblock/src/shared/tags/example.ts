// @ts-nocheck

/**
 * @name              example
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the example tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @example      {Object}                      The formated object
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function example(data, blockSettings) {
    if (!Array.isArray(data)) data = [data];
    data = data
        .map((item) => {
            if (item.content && item.content[item.content.length - 1] === '') {
                item.content = item.content.slice(0, -1);
            }
            if (!item.content) return null;
            return {
                language:
                    typeof item.value === 'string'
                        ? item.value.toLowerCase()
                        : item.value,
                code: Array.isArray(item.content)
                    ? item.content.join('\n').trim().replace(/\\@/, '@')
                    : item.content.replace(/\\@/, '@'),
            };
        })
        .filter((item) => item !== null);
    return data;
}
export default example;
