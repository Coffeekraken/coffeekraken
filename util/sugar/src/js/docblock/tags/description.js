/**
 * @name              description
 * @namespace         sugar.js.docblock.tags
 * @type              Function
 *
 * Parse the description tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function description(data) {
  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }
  return data.content
    .map((c) => c.trim())
    .join('\n')
    .trim();
}
