/**
 * @name            author
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the author is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'author',
    name: 'Author',
    description: 'The document must contain a valid author declaration',
    level: 1,
    check({ $context }) {
        if (!$context.querySelector('head meta[name="author"]')) {
            return {
                status: 'error',
                message: 'The document is missing an author',
                example: '<meta name="author" content="Olivier Bossel">',
                moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
