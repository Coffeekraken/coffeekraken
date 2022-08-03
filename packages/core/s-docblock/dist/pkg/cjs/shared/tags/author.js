"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              author
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the author tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function author(data, blockSettings) {
    const authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(data.value);
    if (!authorNfo)
        return null;
    return {
        toString() {
            return data.value;
        },
        name: authorNfo[1],
        email: authorNfo[2],
        url: authorNfo[3],
    };
}
exports.default = author;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUMvQixNQUFNLFNBQVMsR0FBRyw2REFBNkQsQ0FBQyxJQUFJLENBQ2hGLElBQUksQ0FBQyxLQUFLLENBQ2IsQ0FBQztJQUNGLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFNUIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQ3BCLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=