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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7UUFDN0IsT0FBTztLQUNWO0lBRUQsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtTQUNiO1FBRUQsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBRXJCLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxJQUFJLE9BQU87b0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLFFBQVEsQ0FBQztnQkFDMUQsQ0FBQzthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxZQUFZO2dCQUNsQixXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxJQUFJLE9BQU87b0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFFBQVEsQ0FBQztnQkFDckQsQ0FBQzthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWhDRCw0QkFnQ0MifQ==