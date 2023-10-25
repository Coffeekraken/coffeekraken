export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }
    return {
        server: {
            port: 3001,
        },
        vite: {
            port: 3003,
        },
        coco: 'dwdwdddefefedd',
        namespaces: ['views'],
        scopes: {
            user: {
                name: 'User',
                description: 'Available only on your computer',
                get rootDir() {
                    return `${api.config.storage.package.localDir}/pages`;
                },
            },
            repo: {
                name: 'Repository',
                description: 'Available for every users of this repository',
                get rootDir() {
                    return `${api.config.storage.src.rootDir}/pages`;
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFFRCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUVyQixNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsSUFBSSxPQUFPO29CQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxRQUFRLENBQUM7Z0JBQzFELENBQUM7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsV0FBVyxFQUFFLDhDQUE4QztnQkFDM0QsSUFBSSxPQUFPO29CQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxRQUFRLENBQUM7Z0JBQ3JELENBQUM7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==