"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = contributor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUNwQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QixNQUFNLFlBQVksR0FBVSxFQUFFLENBQUM7SUFFL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2YsTUFBTSxjQUFjLEdBQUcsNkRBQTZELENBQUMsSUFBSSxDQUNyRixDQUFDLENBQUMsS0FBSyxDQUNWLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRWpDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDZCxRQUFRO2dCQUNKLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNuQixDQUFDO1lBQ0QsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDekIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=