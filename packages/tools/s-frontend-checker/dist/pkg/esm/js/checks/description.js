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
export default function (__SFrontendChecker) {
    return {
        id: 'description',
        name: 'Description',
        description: 'The document must contain a valid description declaration',
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 1,
        check({ $context }) {
            const $desc = $context.querySelector('head meta[name="description"]');
            // @ts-ignore
            if (!$desc) {
                return {
                    status: 'error',
                    message: 'The document is missing the description',
                    example: '<meta name="description" content="My awesome description">',
                    moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
                };
            }
            return {
                status: 'success',
                elements: $desc,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsYUFBYTtRQUNqQixJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQ1AsMkRBQTJEO1FBQy9ELFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsK0JBQStCLENBQ2xDLENBQUM7WUFDRixhQUFhO1lBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixPQUFPO29CQUNILE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSx5Q0FBeUM7b0JBQ2xELE9BQU8sRUFDSCw0REFBNEQ7b0JBQ2hFLFFBQVEsRUFBRSw2Q0FBNkM7aUJBQzFELENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==