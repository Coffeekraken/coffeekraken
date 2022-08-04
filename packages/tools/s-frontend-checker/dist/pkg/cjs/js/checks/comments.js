"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        }
        else {
            arr.push.apply(arr, findComments(node));
        }
    }
    return arr;
}
exports.default = {
    id: 'comments',
    name: 'Comments',
    description: 'Comments are not recommanded in your code',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsU0FBUyxZQUFZLENBQUMsRUFBRTtJQUNwQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEI7YUFBTTtZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzQztLQUNKO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsa0JBQWU7SUFDWCxFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSxVQUFVO0lBQ2hCLFdBQVcsRUFBRSwyQ0FBMkM7SUFDeEQsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsYUFBYTtRQUNiLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQixPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsdUNBQXVDO2dCQUNoRCxPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsU0FBUyxDQUFDLE1BQU0sR0FBRztvQkFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2lCQUN4QzthQUNKLENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==