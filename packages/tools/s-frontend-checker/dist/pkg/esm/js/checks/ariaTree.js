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
            const $trees = $context.querySelectorAll(':is(ul,ol,dl,li):has(ul,ol,dl):not([role])');
            if ($trees) {
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
                    action: {
                        label: () => `Log them (${$trees.length})`,
                        handler: () => console.log($trees),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxXQUFXO1FBQ2pCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLHFIQUFxSDtRQUN6SCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDcEMsNENBQTRDLENBQy9DLENBQUM7WUFFRixJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsK0NBQStDO29CQUN4RCxPQUFPLEVBQUU7Ozs7Ozs7O01BUXZCO29CQUNjLFFBQVEsRUFBRSxpREFBaUQ7b0JBQzNELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxNQUFNLENBQUMsTUFBTSxHQUFHO3dCQUMxQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7cUJBQ3JDO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9