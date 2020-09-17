/**
 * @name              author
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 *
 * Parse the author tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function author(data) {
  const authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(
    data.value
  );
  if (!authorNfo) return null;

  return {
    name: authorNfo[1],
    email: authorNfo[2],
    website: authorNfo[3]
  };
}
