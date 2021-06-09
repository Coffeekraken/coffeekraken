// @ts-nocheck

/**
 * @name              simpleRepeatableValue
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the simpleRepeatableValue tag
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
function simpleRepeatableValue(data) {

    data = Array.from(data);

  data = data.map(d => {
    return d.value;
  });

  return data;
}
export default simpleRepeatableValue;
