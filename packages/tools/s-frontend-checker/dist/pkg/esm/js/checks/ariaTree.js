/**
 * @name            ariaTree
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Lists should have some roles defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaTree',
        name: 'Aria tree',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'When using tree (nested ul, ol and dl), roles should appear on each levels like `tree`, `treeitem`, `group`, etc...',
        level: 1,
        check({ $context }) {
            var _a;
            const $trees = Array.from((_a = $context.querySelectorAll(':is(ul,ol,dl,li):has(ul,ol,dl):not([role])')) !== null && _a !== void 0 ? _a : []);
            if ($trees.length) {
                return {
                    status: 'warning',
                    message: 'Some trees does not have any `role` attribute',
                    example: `<ul role="tree">
    <li role="treeitem">Fruits
        <ul role="group">
        <li role="treeitem">Apples</li>
        <li role="treeitem">Bananas</li>
        <li role="treeitem">Oranges</li>
        </ul>
    </li>
</ul>`,
                    moreLink: 'https://www.w3.org/WAI/GL/wiki/Using_ARIA_trees',
                    elements: $trees,
                };
            }
            return {
                status: 'success',
                elements: $trees,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxXQUFXO1FBQ2pCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLHFIQUFxSDtRQUN6SCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNyQixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDckIsNENBQTRDLENBQy9DLG1DQUFJLEVBQUUsQ0FDVixDQUFDO1lBRUYsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNmLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSwrQ0FBK0M7b0JBQ3hELE9BQU8sRUFBRTs7Ozs7Ozs7TUFRdkI7b0JBQ2MsUUFBUSxFQUFFLGlEQUFpRDtvQkFDM0QsUUFBUSxFQUFFLE1BQU07aUJBQ25CLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFFBQVEsRUFBRSxNQUFNO2FBQ25CLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==