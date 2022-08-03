/**
 * @name            opengraph
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the opengraph metas are well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'opengraph',
    name: 'Open Graph Metas',
    description: 'Specifying the open graph metas is recommanded',
    level: 1,
    check({ $context }) {
        // @ts-ignore
        if (!$context.querySelector('meta[property^="og:"]')) {
            return {
                status: 'error',
                message: 'The document is missing the opengraph metas',
                example: '<meta property="og:title" content="The Rock" />\n<meta property="og:type" content="video.movie" />',
                moreLink: 'https://ogp.me/',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILGVBQWU7SUFDWCxFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsV0FBVyxFQUFFLGdEQUFnRDtJQUM3RCxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLGFBQWE7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1lBQ2xELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLDZDQUE2QztnQkFDdEQsT0FBTyxFQUNILG9HQUFvRztnQkFDeEcsUUFBUSxFQUFFLGlCQUFpQjthQUM5QixDQUFDO1NBQ0w7UUFDRCxPQUFPO1lBQ0gsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDIn0=