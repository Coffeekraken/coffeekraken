const __parse = require('@coffeekraken/sugar/js/string/parse');
const __upperFirst = require('@coffeekraken/sugar/js/string/upperFirst');

/**
 * @name              param
 * @namespace         src.tags
 * @type              Function
 * 
 * Parse the param tag
 * 
 * @param       {Object}          data        The data object parsed in the string
 * @param      {Object}                      The formated object
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
module.exports = function param(data) {

  if (!Array.isArray(data)) data = [data];

  const res = {};

  data.forEach(param => {
    if (typeof param !== 'string') return;
    const parts = param.value.split(/\s{2,20000}/).map(l => l.trim());
    let type = __upperFirst(parts[0].replace('{', '').replace('}', ''));
    const variable = parts[1];
    const description = parts[2];
    let name = variable;
    let defaultValue = undefined;
    const variableMatch = variable.match(/^\[(.*)\]$/);

    if (type.includes('|')) {
      type = type.split('|').map(l => __upperFirst(l.trim()));
    }

    if (variableMatch) {
      const variableParts = variableMatch[1].split('=');
      name = variableParts[0].trim();
      defaultValue = __parse(variableParts[1].trim());
    }

    res[name] = {
      name,
      type,
      description,
      default: defaultValue
    };

  });
  return res;
}
