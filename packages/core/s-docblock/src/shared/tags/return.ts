// @ts-nocheck

import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';

/**
 * @name              return
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the return tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function returnTag(data) {
  const stringArray = data.value.trim().split(/(?<=^\S+)\s/);

  let type =
      stringArray && stringArray[0]
        ? __upperFirst(stringArray[0].replace('{', '').replace('}', ''))
        : null;
  if (type && type.includes('|')) {
    type = type.split('|').map((l) => __upperFirst(l.trim()));
  } else {
    type = [type];
  }

  return {
    type,
    description: stringArray[1] ? stringArray[1].trim() : ''
  };
}
export default returnTag;
