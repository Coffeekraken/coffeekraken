const __upperFirst = require('@coffeekraken/sugar/js/string/upperFirst');

/**
 * @name              example
 * @namespace         src.tags
 * @type              Function
 * 
 * Parse the example tag
 * 
 * @param       {Object}          data        The data object parsed in the string
 * @example      {Object}                      The formated object
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
module.exports = function example(data) {
  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }
  return {
    language: typeof data.value === 'string' ? data.value.toLowerCase() : data.value,
    code: Array.isArray(data.content) ? data.content.join('\n') : data.content
  };
}
