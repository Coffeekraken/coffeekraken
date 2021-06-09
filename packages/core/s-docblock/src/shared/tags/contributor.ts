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

  const contributors: any[] = [];

  data.forEach(d => {

    const contributorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(
        d.value
    );
    if (!contributorNfo) return null;

        contributors.push({
            name: contributorNfo[1],
            email: contributorNfo[2],
            url: contributorNfo[3]
        });

  });

  return contributors;

}
export default contributor;
