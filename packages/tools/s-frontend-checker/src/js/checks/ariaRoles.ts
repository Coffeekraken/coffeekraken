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
        description:
            'Check if some `role` attributes are assigned to a wrong tag',
        level: 1,
        check({ $context }) {
            const $roles = Array.from(
                $context.querySelectorAll('[role]') ?? [],
            );

            // prepare the key=>pair tag based stack
            const ariaEntries = elementRoles.entries(),
                rolesByElements = {};
            ariaEntries.forEach((entry) => {
                const name = entry[0].name;
                rolesByElements[name] = entry[1];
            });

            // @ts-ignore
            for (let [idx, $role] of $roles.entries()) {
                const role = $role.getAttribute('role'),
                    tag = $role.tagName.toLowerCase();

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
