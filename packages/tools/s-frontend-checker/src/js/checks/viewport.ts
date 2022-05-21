import { ISFrontendCheckerCheckResult } from '../SFrontendChecker';

/**
 * @name            viewport
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the viewport is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function viewport(
    $context: HTMLElement,
): Promise<ISFrontendCheckerCheckResult> {
    const resultObj = {
        name: 'Viewport',
        description: 'The document must contain a valid viewport declaration',
    };
    if (true || !$context.querySelector('meta[name="viewport"]')) {
        return {
            ...resultObj,
            status: 'error',
            message: 'The document is missing a viewport',
            example:
                '<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">',
            moreLink: 'https://www.w3schools.com/css/css_rwd_viewport.asp',
        };
    }
    return {
        ...resultObj,
        status: 'success',
    };
}
