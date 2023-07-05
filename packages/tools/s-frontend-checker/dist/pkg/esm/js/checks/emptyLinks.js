/**
 * @name            emptyLinks
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * All the "<a>" tags must have an "href" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'emptyLinks',
        name: 'Empty links',
        description: 'All the links <a> tags must have an "href" attribute.',
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 1,
        check({ $context }) {
            var _a;
            const $a = Array.from((_a = $context.querySelectorAll('a:not([href]), a[href=""]')) !== null && _a !== void 0 ? _a : []);
            if ($a.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Some links does not have a proper `href` attribute',
                    example: '<a href="https://coffeekraken.io" title="Coffeekraken website">...</a>',
                    moreLink: 'https://www.w3schools.com/tags/tag_a.asp',
                    elements: $a,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ2pCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLG1DQUFJLEVBQUUsQ0FDL0QsQ0FBQztZQUVGLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO29CQUN6QyxPQUFPLEVBQ0gsb0RBQW9EO29CQUN4RCxPQUFPLEVBQ0gsd0VBQXdFO29CQUM1RSxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUUsRUFBRTtpQkFDZixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2FBQzVDLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==