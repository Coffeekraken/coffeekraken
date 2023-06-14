/**
 * @name            uniqueIds
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if multiple ids's have the same value
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'uniqueIds',
    name: 'Unique ids',
    description: 'A document cannot host multiple elements with the same id',
    level: 0,
    check({ $context }) {
        const $sameIds = [];
        const $ids = $context.querySelectorAll('[id]');
        const ids = {};
        $ids.forEach(($id) => {
            if (ids[$id.id]) {
                if (!$sameIds.includes(ids[$id.id])) {
                    $sameIds.push(ids[$id.id]);
                }
                $sameIds.push($id);
            }
            ids[$id.id] = $id;
        });
        if ($sameIds.length) {
            return {
                status: 'error',
                message: null,
                example: '<div id="hello">...</div>\n<a id="hello">...</a>',
                moreLink: null,
                action: {
                    label: () => `Log them (${$sameIds.length})`,
                    handler: () => (_console !== null && _console !== void 0 ? _console : console).log($sameIds),
                },
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRSxZQUFZO0lBQ2xCLFdBQVcsRUFBRSwyREFBMkQ7SUFDeEUsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE1BQU0sR0FBRyxHQUFnQyxFQUFFLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjtnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTztnQkFDSCxNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsa0RBQWtEO2dCQUMzRCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsUUFBUSxDQUFDLE1BQU0sR0FBRztvQkFDNUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztpQkFDckQ7YUFDSixDQUFDO1NBQ0w7UUFDRCxPQUFPO1lBQ0gsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDIn0=