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
export default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILFNBQVMsWUFBWSxDQUFDLEVBQUU7SUFDcEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzNDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO2FBQU07WUFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDM0M7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELGVBQWU7SUFDWCxFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSxVQUFVO0lBQ2hCLFdBQVcsRUFBRSwyQ0FBMkM7SUFDeEQsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsYUFBYTtRQUNiLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQixPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsdUNBQXVDO2dCQUNoRCxPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsU0FBUyxDQUFDLE1BQU0sR0FBRztvQkFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2lCQUN4QzthQUNKLENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==