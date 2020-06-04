const __upperFirst = require('../../string/upperFirst');

/**
 * @name              return
 * @namespace         sugar.js.docblock.tags
 * @type              Function
 *
 * Parse the return tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function returnTag(data) {
  const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  return {
    type: __upperFirst(stringArray[0].replace('{', '').replace('}', '').trim()),
    description: stringArray[1].trim()
  };
}
