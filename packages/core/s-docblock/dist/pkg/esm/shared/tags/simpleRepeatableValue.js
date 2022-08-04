// @ts-nocheck
/**
 * @name              simpleRepeatableValue
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the simpleRepeatableValue tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function simpleRepeatableValue(data, blockSettings) {
    data = Array.from(data);
    data = data.map((d) => {
        const val = new String(d.value);
        val.render = true;
        return val;
    });
    return data;
}
export default simpleRepeatableValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUM5QyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==