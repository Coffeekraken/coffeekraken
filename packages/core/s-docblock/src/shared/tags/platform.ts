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
 * @param      {Array<IPlatform>}                      An array of platform obj
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface IPlatform {
  name: string;
  description: string;
}

function param(data): IPlatform[] {
  if (!Array.isArray(data)) data = [data];

  const res = [];

  data.forEach((param) => {
    
    if (!param.value) return;

    const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());

    res.push({
      name: parts[0],
      description: parts[1] ?? ''
    });
  });
  return res;
}
export default param;
