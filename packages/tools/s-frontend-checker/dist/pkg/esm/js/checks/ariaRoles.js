import { elementRoles } from 'aria-query';
/**
 * @name            ariaRoles
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all role attributes are on the good tags
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaRoles',
        name: 'Aria roles',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check if some `role` attributes are assigned to a wrong tag',
        level: 1,
        check({ $context }) {
            var _a;
            const $roles = Array.from((_a = $context.querySelectorAll('[role]')) !== null && _a !== void 0 ? _a : []);
            // prepare the key=>pair tag based stack
            const ariaEntries = elementRoles.entries(), rolesByElements = {};
            ariaEntries.forEach((entry) => {
                const name = entry[0].name;
                rolesByElements[name] = entry[1];
            });
            // @ts-ignore
            for (let [idx, $role] of $roles.entries()) {
                const role = $role.getAttribute('role'), tag = $role.tagName.toLowerCase();
                if (!rolesByElements[tag]) {
                    return {
                        status: 'warning',
                        message: `The \`<${tag}>\` does not accept any \`role\``,
                        example: null,
                        moreLink: null,
                        action: {
                            label: () => `Log it`,
                            handler: () => console.log($role),
                        },
                    };
                }
                if (!rolesByElements[tag].includes(role)) {
                    return {
                        status: 'warning',
                        message: `The role \`${role}\` role cannot be placed on the \`<${tag}>\` tag`,
                        example: null,
                        moreLink: null,
                        action: {
                            label: () => `Log it`,
                            handler: () => console.log($role),
                        },
                    };
                }
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxrQkFBcUM7SUFDMUQsT0FBTztRQUNILEVBQUUsRUFBRSxXQUFXO1FBQ2YsSUFBSSxFQUFFLFlBQVk7UUFDbEIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AsNkRBQTZEO1FBQ2pFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3JCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFLENBQzVDLENBQUM7WUFFRix3Q0FBd0M7WUFDeEMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUN0QyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDM0IsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztZQUVILGFBQWE7WUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN2QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUNuQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDdkIsT0FBTzt3QkFDSCxNQUFNLEVBQUUsU0FBUzt3QkFDakIsT0FBTyxFQUFFLFVBQVUsR0FBRyxrQ0FBa0M7d0JBQ3hELE9BQU8sRUFBRSxJQUFJO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE1BQU0sRUFBRTs0QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUTs0QkFDckIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO3lCQUNwQztxQkFDSixDQUFDO2lCQUNMO2dCQUVELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0QyxPQUFPO3dCQUNILE1BQU0sRUFBRSxTQUFTO3dCQUNqQixPQUFPLEVBQUUsY0FBYyxJQUFJLHNDQUFzQyxHQUFHLFNBQVM7d0JBQzdFLE9BQU8sRUFBRSxJQUFJO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE1BQU0sRUFBRTs0QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUTs0QkFDckIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO3lCQUNwQztxQkFDSixDQUFDO2lCQUNMO2FBQ0o7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==