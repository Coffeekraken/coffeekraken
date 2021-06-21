// @ts-nocheck

/**
 * @name              description
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the description tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function description(data, blockSettings) {

  if (Array.isArray(data)) data = data[0];

  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }
  if (!data.content) return '';
  return data.content
    .map((c) => c.trim())
    .join('\n')
    .trim();
}
export default description;
