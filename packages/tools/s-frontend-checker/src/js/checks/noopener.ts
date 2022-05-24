import __SFrontendChecker, {
    ISFrontendCheckerCheckResult,
} from '../SFrontendChecker';

/**
 * @name            noopener
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the noopener is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default {
    id: 'noopener',
    name: 'External links (noopener)',
    description: 'Links with target="_blank" should have rel="noopener"',
    level: 3,
    check({ $context }) {
        const $externalLinks = $context.querySelectorAll(
            'a[target="_blank"]:not([rel="noopener"])',
        );

        // @ts-ignore
        if (!$context.querySelector('html')?.hasAttribute('dir')) {
            return {
                status: 'error',
                message:
                    'Some of your external links does not have rel="noopener"',
                example: '<a href="..." target="_blank" rel="noopener">',
                action: {
                    label: () => `Log them (${$externalLinks.length})`,
                    handler: () => {
                        console.log($externalLinks);
                    },
                },
                moreLink:
                    'https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener',
            };
        }
        return {
            status: 'success',
        };
    },
};
