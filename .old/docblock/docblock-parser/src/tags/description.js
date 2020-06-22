/**
 * @name              description
 * @namespace         src.tags
 * @type              Function
 * 
 * Parse the description tag
 * 
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
module.exports = function description(data) {

  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }

  return data.content.join('\n');
}
