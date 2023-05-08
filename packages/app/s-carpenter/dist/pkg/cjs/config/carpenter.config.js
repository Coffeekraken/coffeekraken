"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7UUFDN0IsT0FBTztLQUNWO0lBRUQsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtTQUNiO1FBRUQsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFDUCwyRkFBMkY7Z0JBQy9GLGVBQWUsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUNsQztZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDdEM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFDUCx5RUFBeUU7Z0JBQzdFLGVBQWUsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQ3hDO1NBQ0o7UUFFRCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsSUFBSSxPQUFPO29CQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxRQUFRLENBQUM7Z0JBQzFELENBQUM7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsV0FBVyxFQUFFLDhDQUE4QztnQkFDM0QsSUFBSSxPQUFPO29CQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxRQUFRLENBQUM7Z0JBQ3JELENBQUM7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFsREQsNEJBa0RDIn0=