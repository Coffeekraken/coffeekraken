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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7UUFDN0IsT0FBTztLQUNWO0lBRUQsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtTQUNiO1FBRUQsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFDUCwyRkFBMkY7YUFDbEc7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFdBQVcsRUFBRSxzQ0FBc0M7YUFDdEQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFDUCx5RUFBeUU7YUFDaEY7U0FDSjtRQUVELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxJQUFJLE9BQU87b0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLFFBQVEsQ0FBQztnQkFDMUQsQ0FBQzthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxZQUFZO2dCQUNsQixXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxJQUFJLE9BQU87b0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFFBQVEsQ0FBQztnQkFDckQsQ0FBQzthQUNKO1NBQ0o7UUFFRCxPQUFPLEVBQUU7WUFDTCxVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLGVBQWUsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQ3hDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxVQUFVO2dCQUNqQixlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN0QztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUExREQsNEJBMERDIn0=