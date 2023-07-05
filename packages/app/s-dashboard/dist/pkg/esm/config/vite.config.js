import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __path from 'path';
export default (api) => {
    const packageJsonHighest = __packageJsonSync(process.cwd(), {
        highest: true,
    });
    let dashboardLazyProxyUrl = '', dashboardInitProxyUrl = '';
    if (packageJsonHighest.name === '@coffeekraken/coffeekraken') {
        // const dashboardLazyPath = __path.resolve(
        //     __dirname(),
        //     '../../../../src/js/lazy.ts',
        // );
        // dashboardLazyProxyUrl = `http://localhost:5173/@fs${dashboardLazyPath}`;
        const dashboardInitPath = __path.resolve(__dirname(), '../../../../src/js/init.ts');
        dashboardInitProxyUrl = `http://0.0.0.0:5173/@fs${dashboardInitPath}`;
    }
    return {
        server: {
            proxy: {
                // '/sugar/dashboard/lazy.js': {
                //     target: dashboardLazyProxyUrl,
                //     changeOrigin: true,
                //     rewrite: (path) =>
                //         path.replace('/sugar/dashboard/lazy.js', ''),
                // },
                '/sugar/dashboard/init.js': {
                    target: dashboardInitProxyUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/sugar/dashboard/init.js', ''),
                },
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ25CLE1BQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3hELE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUVILElBQUkscUJBQXFCLEdBQUcsRUFBRSxFQUMxQixxQkFBcUIsR0FBRyxFQUFFLENBQUM7SUFFL0IsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssNEJBQTRCLEVBQUU7UUFDMUQsNENBQTRDO1FBQzVDLG1CQUFtQjtRQUNuQixvQ0FBb0M7UUFDcEMsS0FBSztRQUNMLDJFQUEyRTtRQUMzRSxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ3BDLFNBQVMsRUFBRSxFQUNYLDRCQUE0QixDQUMvQixDQUFDO1FBQ0YscUJBQXFCLEdBQUcsMEJBQTBCLGlCQUFpQixFQUFFLENBQUM7S0FDekU7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osS0FBSyxFQUFFO2dCQUNILGdDQUFnQztnQkFDaEMscUNBQXFDO2dCQUNyQywwQkFBMEI7Z0JBQzFCLHlCQUF5QjtnQkFDekIsd0RBQXdEO2dCQUN4RCxLQUFLO2dCQUNMLDBCQUEwQixFQUFFO29CQUN4QixNQUFNLEVBQUUscUJBQXFCO29CQUM3QixZQUFZLEVBQUUsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQztpQkFDbkQ7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9