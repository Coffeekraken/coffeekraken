// @ts-nocheck

import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';

/**
 * @name              param
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the param tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function param(data) {
  if (!Array.isArray(data)) data = [data];

  const res = {};

  data.forEach((param) => {
    
    if (!param.value) return;

    const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());

    res[parts[0]] = parts[1] ?? true;
  });
  return res;
}
export default param;
