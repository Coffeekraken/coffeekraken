/**
 * @name            comments
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that we don't have any comments in the code
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

function findComments(el) {
    var arr = [];
    for (var i = 0; i < el.childNodes.length; i++) {
        var node = el.childNodes[i];
        if (node.nodeType === 8) {
            arr.push(node);
        } else {
            arr.push.apply(arr, findComments(node));
        }
    }
    return arr;
}

export default function (__SFrontendChecker) {
    return {
        id: 'comments',
        name: 'Comments',
        description: 'Comments are not recommanded in your code',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 3,
        check({ $context }) {
            const $comments = findComments($context);
            // @ts-ignore
            if ($comments.length) {
                return {
                    status: 'warning',
                    message: 'The document has some comment(s) left',
                    example: '<!-- comment -->',
                    action: {
                        label: () => `Log them (${$comments.length})`,
                        handler: () => console.log($comments),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
