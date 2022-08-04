import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SPageTransitionFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SPageTransitionFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPageTransitionFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            patchBody: {
                description: 'Specify if you want to patch the body tag with the new page body tag',
                type: 'Boolean',
                default: true,
            },
            scrollTop: {
                description: 'Specify if you want to scroll to the top of the updated element after a transition',
                type: 'Boolean',
                default: true,
            },
            before: {
                description: 'Specify a function to run before the transition',
                type: 'Function',
            },
            after: {
                description: 'Specify a function to run after the transition',
                type: 'Function',
            },
            autoStyle: {
                description: 'Specify if you want to automatically add classes like "s-tc:error" on the broken links (only the "a" tags)',
                type: 'Boolean',
                default: true,
            },
            injectBrokenLinkIcon: {
                description: 'Specify if you want to inject the "error" icon on the broken links',
                type: 'Boolean',
                default: true,
            },
            brokenLinkIcon: {
                description: 'Specify the icon you want to inject on the broken links',
                type: 'String',
                default: '<i class="s-icon:link-broken-solid" alt="Broken link"></i>',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sK0JBQWdDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCw0R0FBNEc7Z0JBQ2hILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ2xCLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFDSCw0REFBNEQ7YUFDbkU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=