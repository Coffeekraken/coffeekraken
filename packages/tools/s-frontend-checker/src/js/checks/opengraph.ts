import __SFrontendChecker, {
    ISFrontendCheckerCheckResult,
} from '../SFrontendChecker';

/**
 * @name            opengraph
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the opengraph metas are well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default {
    id: 'opengraph',
    name: 'Open Graph Metas',
    description: 'Specifying the open graph metas is recommanded',
    level: 1,
    check({ $context }) {
        // @ts-ignore
        if (!$context.querySelector('meta[property^="og:"]')) {
            return {
                status: 'error',
                message: 'The document is missing the opengraph metas',
                example:
                    '<meta property="og:title" content="The Rock" />\n<meta property="og:type" content="video.movie" />',
                moreLink: 'https://ogp.me/',
            };
        }
        return {
            status: 'success',
        };
    },
};
