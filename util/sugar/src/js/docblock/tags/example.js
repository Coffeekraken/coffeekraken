const __upperFirst = require('../../string/upperFirst');

/**
 * @name              example
 * @namespace         sugar.js.docblock.tags
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
  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }
  if (!data.content) null;
  return {
    language:
      typeof data.value === 'string' ? data.value.toLowerCase() : data.value,
    code: Array.isArray(data.content)
      ? data.content.join('\n').trim()
      : data.content
  };
}
