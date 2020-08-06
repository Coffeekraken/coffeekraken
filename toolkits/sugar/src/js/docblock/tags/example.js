const __upperFirst = require('../../string/upperFirst');

/**
 * @name              example
 * @namespace           js.docblock.tags
 * @type              Function
 *
 * Parse the example tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @example      {Object}                      The formated object
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function example(data) {
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
          : item.content.replace(/\\@/, '@')
      };
    })
    .filter((item) => item !== null);
  return data;
}
