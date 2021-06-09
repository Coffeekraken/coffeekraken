// @ts-nocheck
/**
 * @name              contributor
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the contributor tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @contributor 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function contributor(data) {
    data = Array.from(data);
    const contributors = [];
    data.forEach(d => {
        const contributorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(d.value);
        if (!contributorNfo)
            return null;
        contributors.push({
            name: contributorNfo[1],
            email: contributorNfo[2],
            url: contributorNfo[3]
        });
    });
    return contributors;
}
export default contributor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJpYnV0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cmlidXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJO0lBRXZCLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXhCLE1BQU0sWUFBWSxHQUFVLEVBQUUsQ0FBQztJQUUvQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBRWYsTUFBTSxjQUFjLEdBQUcsNkRBQTZELENBQUMsSUFBSSxDQUNyRixDQUFDLENBQUMsS0FBSyxDQUNWLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTdCLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDZCxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QixHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7SUFFVCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sWUFBWSxDQUFDO0FBRXRCLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9