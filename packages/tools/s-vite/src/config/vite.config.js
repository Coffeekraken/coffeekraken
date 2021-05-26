import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __path from 'path';
export default {
    root: '[config.storage.rootDir]',
    base: '/',
    mode: 'development',
    plugins: [
        __path.resolve(`${__dirname}/../node/plugins/sveltePlugin`),
        __path.resolve(`${__dirname}/../node/plugins/riotjsPlugin`),
        __path.resolve(`${__dirname}/../node/plugins/postcssPlugin`),
        __path.resolve(`${__dirname}/../node/plugins/imageminPlugin`)
    ],
    publicDir: '[config.storage.srcDir]',
    cacheDir: '[config.storage.cacheDir]/vite',
    clearScreen: false,
    build: {
        lib: {
            entry: '[config.storage.srcDir]/js/index.ts',
            name: 'index'
        },
        outDir: '[config.storage.distDir]/js'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFdBQVcsTUFBTSxrREFBa0QsQ0FBQztBQUUzRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsZUFBZTtJQUNiLElBQUksRUFBRSwwQkFBMEI7SUFDaEMsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUU7UUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUywrQkFBK0IsQ0FBQztRQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUywrQkFBK0IsQ0FBQztRQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxnQ0FBZ0MsQ0FBQztRQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxpQ0FBaUMsQ0FBQztLQUM5RDtJQUNELFNBQVMsRUFBRSx5QkFBeUI7SUFDcEMsUUFBUSxFQUFFLGdDQUFnQztJQUMxQyxXQUFXLEVBQUUsS0FBSztJQUNsQixLQUFLLEVBQUU7UUFDTCxHQUFHLEVBQUU7WUFDSCxLQUFLLEVBQUUscUNBQXFDO1lBQzVDLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRCxNQUFNLEVBQUUsNkJBQTZCO0tBQ3RDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFdBQVcsRUFBRTtRQUNuQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSw0REFBNEQ7UUFDdEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELEdBQUcsRUFBRSxFQUFFO0lBQ1AsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsOEJBQThCLENBQUMsQ0FBQztDQUN2RSxDQUFDIn0=