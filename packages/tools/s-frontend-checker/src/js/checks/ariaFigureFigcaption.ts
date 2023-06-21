/**
 * @name            ariaFigureFigcaption
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that each <figure> tags have a proper <figcaption> into it
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaFigureFigcaption',
        name: 'Aria figure figcaption',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'Each `<figure>` elements should have a proper `<figcaption>` into it',
        level: 1,
        check({ $context }) {
            const $figures = Array.from(
                $context.querySelectorAll('figure:not(:has(> figcaption))') ??
                    [],
            );
            if ($figures.length) {
                return {
                    status: 'warning',
                    message:
                        'Your `<figure>` tags should have a proper `<figcaption>` into it',
                    example:
                        '<figure>\n...\n<figcaption>My cool form</figcaption>\n</figure>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    action: {
                        label: () => `Log them (${$figures.length})`,
                        handler: () => console.log($figures),
                    },
                };
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$figures.length})`,
                    handler: () => console.log($figures),
                },
            };
        },
    };
}
