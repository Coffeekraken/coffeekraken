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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFFRCxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFFckIsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsUUFBUSxDQUFDO2dCQUMxRCxDQUFDO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNELElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUSxDQUFDO2dCQUNyRCxDQUFDO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=