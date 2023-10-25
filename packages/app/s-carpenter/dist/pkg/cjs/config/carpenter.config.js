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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7UUFDN0IsT0FBTztLQUNWO0lBRUQsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtTQUNiO1FBRUQsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFFckIsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsUUFBUSxDQUFDO2dCQUMxRCxDQUFDO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNELElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUSxDQUFDO2dCQUNyRCxDQUFDO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBakNELDRCQWlDQyJ9