/**
 * @name            printStylesheet
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a print stylesheet is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'printStylesheet',
    name: 'Print Stylesheet',
    description:
        "It's a good practice to provide a print stylesheet for youor document",
    level: 2,
    check({ $context }) {
        if (!$context.querySelector('link[rel="stylesheet"][media="print"]')) {
            return {
                status: 'warning',
                message: null,
                example:
                    '<link rel="stylesheet" media="print" href="print.css" />',
                moreLink:
                    'https://www.sitepoint.com/css-printer-friendly-pages/',
            };
        }
        return {
            status: 'success',
        };
    },
};
