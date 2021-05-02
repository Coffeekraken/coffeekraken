// @ts-nocheck
/**
 * @name              author
 * @namespace           shared.tags
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
export default author;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILFNBQVMsTUFBTSxDQUFDLElBQUk7SUFDbEIsTUFBTSxTQUFTLEdBQUcsNkRBQTZELENBQUMsSUFBSSxDQUNsRixJQUFJLENBQUMsS0FBSyxDQUNYLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRTVCLE9BQU87UUFDTCxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuQixHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUNsQixDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsTUFBTSxDQUFDIn0=