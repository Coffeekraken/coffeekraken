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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJpYnV0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cmlidXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFFdEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEIsTUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDO0lBRS9CLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFFZixNQUFNLGNBQWMsR0FBRyw2REFBNkQsQ0FBQyxJQUFJLENBQ3JGLENBQUMsQ0FBQyxLQUFLLENBQ1YsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFN0IsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNkLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztJQUVULENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxZQUFZLENBQUM7QUFFdEIsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=