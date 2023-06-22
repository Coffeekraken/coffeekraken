import type { ISFrontendChecker } from '../types';

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
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaTree',
        name: 'Aria tree',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'When using tree (nested ul, ol and dl), roles should appear on each levels like `tree`, `treeitem`, `group`, etc...',
        level: 1,
        check({ $context }) {
            const $trees = $context.querySelectorAll(
                ':is(ul,ol,dl,li):has(ul,ol,dl):not([role])',
            );

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
