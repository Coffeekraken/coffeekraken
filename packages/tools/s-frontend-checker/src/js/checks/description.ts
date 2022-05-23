import __SFrontendChecker, {
    ISFrontendCheckerCheckResult,
} from '../SFrontendChecker';

/**
 * @name            description
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the description is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default {
    id: 'description',
    name: 'Description',
    description: 'The document must contain a valid description declaration',
    level: 1,
    check({ $context }) {
        // @ts-ignore
        if (!$context.querySelector('head meta[name="description"]')) {
            return {
                status: 'error',
                message: 'The document is missing the description',
                example:
                    '<meta name="description" content="My awesome description">',
                moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
