// @ts-nocheck
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
export default author;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDL0IsTUFBTSxTQUFTLEdBQUcsNkRBQTZELENBQUMsSUFBSSxDQUNoRixJQUFJLENBQUMsS0FBSyxDQUNiLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRTVCLE9BQU87UUFDSCxRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuQixHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUNwQixDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsTUFBTSxDQUFDIn0=