import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __path from 'path';
export default (api) => {
    const packageJsonHighest = __packageJsonSync(process.cwd(), {
        highest: true,
    });
    let dashboardLazyProxyUrl = '', dashboardInitProxyUrl = '';
    if (packageJsonHighest.name === '@coffeekraken/coffeekraken') {
        const dashboardLazyPath = __path.resolve(__dirname(), '../js/lazy.js');
        dashboardLazyProxyUrl = `http://localhost:3000/@fs${dashboardLazyPath}`;
        const dashboardInitPath = __path.resolve(__dirname(), '../js/init.js');
        dashboardInitProxyUrl = `http://localhost:3000/@fs${dashboardInitPath}`;
    }
    return {
        server: {
            proxy: {
                '/sugar/dashboard/lazy.js': {
                    target: dashboardLazyProxyUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/sugar/dashboard/lazy.js', ''),
                },
                '/sugar/dashboard/init.js': {
                    target: dashboardInitProxyUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/sugar/dashboard/init.js', ''),
                },
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ25CLE1BQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3hELE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUVILElBQUkscUJBQXFCLEdBQUcsRUFBRSxFQUMxQixxQkFBcUIsR0FBRyxFQUFFLENBQUM7SUFFL0IsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssNEJBQTRCLEVBQUU7UUFDMUQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZFLHFCQUFxQixHQUFHLDRCQUE0QixpQkFBaUIsRUFBRSxDQUFDO1FBQ3hFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN2RSxxQkFBcUIsR0FBRyw0QkFBNEIsaUJBQWlCLEVBQUUsQ0FBQztLQUMzRTtJQUVELE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUU7Z0JBQ0gsMEJBQTBCLEVBQUU7b0JBQ3hCLE1BQU0sRUFBRSxxQkFBcUI7b0JBQzdCLFlBQVksRUFBRSxJQUFJO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDO2lCQUNuRDtnQkFDRCwwQkFBMEIsRUFBRTtvQkFDeEIsTUFBTSxFQUFFLHFCQUFxQjtvQkFDN0IsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUM7aUJBQ25EO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==