// @ts-nocheck
// @shared

/**
 * @name              simpleValue
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 * @status              wip
 *
 * Parse the simpleValue tag
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
function simpleValue(data) {
  if (
    data &&
    data.value &&
    typeof data.value === 'string' &&
    data.value.trim() === ''
  ) {
    return true;
  }
  return data.value;
}
export = simpleValue;
