/**
 * @name            title
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the title is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker) {
    return {
        id: 'title',
        name: 'Title',
        description: 'The document must contain a valid title declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            // @ts-ignore
            if (!$context.title) {
                return {
                    status: 'error',
                    message: 'The document is missing the title',
                    example: '<title>My awesome title</title>',
                    moreLink: 'https://www.w3schools.com/tags/tag_title.asp',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
