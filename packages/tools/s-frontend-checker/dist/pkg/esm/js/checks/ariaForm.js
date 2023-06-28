/**
 * @name            ariaForm
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if each forms have correct aria-label / arial-labelled-by
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaForm',
        name: 'Aria form',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Each forms must have an "aria-label" or an "aria-labelledby" attribute',
        level: 1,
        check({ $context }) {
            var _a;
            const $forms = Array.from((_a = $context.querySelectorAll('form:not([aria-label],[aria-labelledby])')) !== null && _a !== void 0 ? _a : []);
            if ($forms.length) {
                return {
                    status: 'warning',
                    message: 'Some forms are not aria compliant',
                    example: '<form aria-label="Register to the event">...</form>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/form.html',
                    elements: $forms,
                };
            }
            return {
                status: 'success',
                elements: $forms,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxXQUFXO1FBQ2pCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLHdFQUF3RTtRQUM1RSxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNyQixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDckIsMENBQTBDLENBQzdDLG1DQUFJLEVBQUUsQ0FDVixDQUFDO1lBQ0YsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNmLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxtQ0FBbUM7b0JBQzVDLE9BQU8sRUFDSCxxREFBcUQ7b0JBQ3pELFFBQVEsRUFDSix1RUFBdUU7b0JBQzNFLFFBQVEsRUFBRSxNQUFNO2lCQUNuQixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixRQUFRLEVBQUUsTUFBTTthQUNuQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=