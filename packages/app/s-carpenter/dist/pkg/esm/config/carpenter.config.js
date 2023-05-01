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
            },
            sections: {
                name: 'Sections',
                description: 'All the available pre-build sections',
            },
            components: {
                name: 'Components',
                description: 'All the available components that you can use to create custom sections',
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
        sources: {
            components: {
                title: 'Components',
                specsNamespaces: ['views.components'],
            },
            sections: {
                title: 'Sections',
                specsNamespaces: ['views.sections'],
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFFRCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUNQLDJGQUEyRjthQUNsRztZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsV0FBVyxFQUFFLHNDQUFzQzthQUN0RDtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsV0FBVyxFQUNQLHlFQUF5RTthQUNoRjtTQUNKO1FBRUQsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsUUFBUSxDQUFDO2dCQUMxRCxDQUFDO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNELElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUSxDQUFDO2dCQUNyRCxDQUFDO2FBQ0o7U0FDSjtRQUVELE9BQU8sRUFBRTtZQUNMLFVBQVUsRUFBRTtnQkFDUixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsZUFBZSxFQUFFLENBQUMsa0JBQWtCLENBQUM7YUFDeEM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQ3RDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9