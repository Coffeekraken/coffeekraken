// @ts-nocheck
/**
 * @name              contributor
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the contributor tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @contributor 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function contributor(data, blockSettings) {
    data = Array.from(data);
    const contributors = [];
    data.forEach((d) => {
        const contributorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(d.value);
        if (!contributorNfo)
            return null;
        contributors.push({
            toString() {
                return d.value;
            },
            name: contributorNfo[1],
            email: contributorNfo[2],
            url: contributorNfo[3],
        });
    });
    return contributors;
}
export default contributor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEIsTUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDO0lBRS9CLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNmLE1BQU0sY0FBYyxHQUFHLDZEQUE2RCxDQUFDLElBQUksQ0FDckYsQ0FBQyxDQUFDLEtBQUssQ0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUVqQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ2QsUUFBUTtnQkFDSixPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbkIsQ0FBQztZQUNELElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=