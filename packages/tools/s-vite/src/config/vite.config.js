import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __path from 'path';
export default {
    root: '[config.storage.package.rootDir]',
    base: '/',
    mode: 'development',
    plugins: [
        __path.resolve(`${__dirname}/../node/plugins/sugarPlugin`),
        __path.resolve(`${__dirname}/../node/plugins/sveltePlugin`),
        __path.resolve(`${__dirname}/../node/plugins/riotjsPlugin`),
        __path.resolve(`${__dirname}/../node/plugins/postcssPlugin`),
        __path.resolve(`${__dirname}/../node/plugins/imageminPlugin`)
    ],
    publicDir: '[config.storage.src.rootDir]',
    cacheDir: '[config.storage.package.cacheDir]/vite',
    clearScreen: false,
    build: {
        lib: {
            entry: '[config.storage.src.rootDir]/js/index.ts',
            name: 'index'
        },
        outDir: '[config.storage.dist.rootDir]/js'
    },
    server: {
        host: __ipAddress(),
        port: 3000,
        hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
        proxy: {}
    },
    css: {},
    rewrites: [__path.resolve(`${__dirname}/../node/rewrites/handlebars`)]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxrREFBa0QsQ0FBQztBQUMzRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFHMUIsZUFBZTtJQUNiLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUU7UUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyw4QkFBOEIsQ0FBQztRQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUywrQkFBK0IsQ0FBQztRQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUywrQkFBK0IsQ0FBQztRQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxnQ0FBZ0MsQ0FBQztRQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxpQ0FBaUMsQ0FBQztLQUM5RDtJQUNELFNBQVMsRUFBRSw4QkFBOEI7SUFDekMsUUFBUSxFQUFFLHdDQUF3QztJQUNsRCxXQUFXLEVBQUUsS0FBSztJQUNsQixLQUFLLEVBQUU7UUFDTCxHQUFHLEVBQUU7WUFDSCxLQUFLLEVBQUUsMENBQTBDO1lBQ2pELElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRCxNQUFNLEVBQUUsa0NBQWtDO0tBQzNDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFdBQVcsRUFBRTtRQUNuQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSw0REFBNEQ7UUFDdEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELEdBQUcsRUFBRSxFQUFFO0lBQ1AsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsOEJBQThCLENBQUMsQ0FBQztDQUN2RSxDQUFDIn0=