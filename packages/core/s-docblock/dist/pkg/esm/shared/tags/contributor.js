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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEIsTUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDO0lBRS9CLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNmLE1BQU0sY0FBYyxHQUNoQiw2REFBNkQsQ0FBQyxJQUFJLENBQzlELENBQUMsQ0FBQyxLQUFLLENBQ1YsQ0FBQztRQUNOLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFakMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNkLFFBQVE7Z0JBQ0osT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ25CLENBQUM7WUFDRCxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QixHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9