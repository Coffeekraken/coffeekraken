"use strict";
// @ts-nocheck
// @shared
/**
 * @name              author
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 * @status              wip
 *
 * Parse the author tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function author(data) {
    const authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(data.value);
    if (!authorNfo)
        return null;
    return {
        name: authorNfo[1],
        email: authorNfo[2],
        url: authorNfo[3]
    };
}
module.exports = author;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBUyxNQUFNLENBQUMsSUFBSTtJQUNsQixNQUFNLFNBQVMsR0FBRyw2REFBNkQsQ0FBQyxJQUFJLENBQ2xGLElBQUksQ0FBQyxLQUFLLENBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFNUIsT0FBTztRQUNMLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBQ0QsaUJBQVMsTUFBTSxDQUFDIn0=