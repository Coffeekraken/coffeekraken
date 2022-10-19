export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        server: {
            port: 3001,
        },
        sources: {
            components: {
                title: 'Components',
                specsNamespaces: ['components'],
            },
            sections: {
                title: 'Sections',
                specsNamespaces: ['sections'],
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxZQUFZO2dCQUNuQixlQUFlLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDbEM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLGVBQWUsRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUNoQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==