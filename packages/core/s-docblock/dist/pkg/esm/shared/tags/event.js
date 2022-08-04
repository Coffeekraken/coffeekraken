// @ts-nocheck
/**
 * @name              eventTag
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the event tag
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
function eventTag(data, blockSettings) {
    data = Array.from(data);
    data = data.map((d) => {
        if (d && d.value && typeof d.value === 'string') {
            const parts = d.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
            let eventName = parts[0], description = new String(parts[1]);
            description.render = true;
            return {
                name: eventName,
                description,
            };
        }
    });
    return data;
}
export default eventTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDakMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUVsRSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ3BCLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMxQixPQUFPO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVc7YUFDZCxDQUFDO1NBQ0w7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9