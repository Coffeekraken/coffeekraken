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
        categories: {
            bare: {
                name: 'Bare',
                description: 'All the components that are helpful the the page structure like layout, container, etc...',
                specsNamespaces: ['views.bare'],
            },
            sections: {
                name: 'Sections',
                description: 'All the available pre-build sections',
                specsNamespaces: ['views.sections'],
            },
            components: {
                name: 'Components',
                description: 'All the available components that you can use to create custom sections',
                specsNamespaces: ['views.components'],
            },
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFFRCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUNQLDJGQUEyRjtnQkFDL0YsZUFBZSxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ2xDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxVQUFVO2dCQUNoQixXQUFXLEVBQUUsc0NBQXNDO2dCQUNuRCxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN0QztZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsV0FBVyxFQUNQLHlFQUF5RTtnQkFDN0UsZUFBZSxFQUFFLENBQUMsa0JBQWtCLENBQUM7YUFDeEM7U0FDSjtRQUVELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxJQUFJLE9BQU87b0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLFFBQVEsQ0FBQztnQkFDMUQsQ0FBQzthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxZQUFZO2dCQUNsQixXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxJQUFJLE9BQU87b0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFFBQVEsQ0FBQztnQkFDckQsQ0FBQzthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9