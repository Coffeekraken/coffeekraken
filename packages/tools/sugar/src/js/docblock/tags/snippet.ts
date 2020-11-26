// @ts-nocheck
// @shared

/**
 * @name              snippet
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 * @wip
 *
 * Parse the snippet tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @snippet      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function snippet(data) {
  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }
  return {
    language:
      typeof data.value === 'string' ? data.value.toLowerCase() : data.value,
    code: Array.isArray(data.content) ? data.content.join('\n') : data.content
  };
}
export = snippet;
