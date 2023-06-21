/**
 * @name            w3c
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that our html is w3c compliant
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker) {
    return {
        id: 'w3c',
        name: 'W3C validator',
        description: 'Check that our html is w3c compliant',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 3,
        async check({ $context }) {
            // emulate form post
            const formData = new FormData();
            formData.append('out', 'json');
            formData.append(
                'content',
                $context.innerHTML ?? $context.documentElement?.innerHTML,
            );

            const response = await fetch(
                'https://validator.w3.org/nu/?out=json&level=error',
                {
                    method: 'post',
                    body: formData,
                },
            );
            const responseJson = await response.json();

            // @ts-ignore
            if (responseJson.messages.length) {
                return {
                    status: 'warning',
                    message: 'The html is not w3c compliant',
                    action: {
                        label: () =>
                            `Log issues (${responseJson.messages.length})`,
                        handler: () => console.log(responseJson.messages),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
