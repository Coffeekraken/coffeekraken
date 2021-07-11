import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default {
    root: '[config.storage.package.rootDir]',
    base: '/',
    mode: 'development',
    plugins: [
        __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
        __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
        __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
        __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`)
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
    rewrites: [__path.resolve(`${__dirname()}/../node/rewrites/handlebars`)]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxrREFBa0QsQ0FBQztBQUMzRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsZUFBZTtJQUNiLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUU7UUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1FBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsK0JBQStCLENBQUM7UUFDN0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSwrQkFBK0IsQ0FBQztRQUM3RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLGdDQUFnQyxDQUFDO0tBQy9EO0lBQ0QsU0FBUyxFQUFFLDhCQUE4QjtJQUN6QyxRQUFRLEVBQUUsd0NBQXdDO0lBQ2xELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRTtZQUNILEtBQUssRUFBRSwwQ0FBMEM7WUFDakQsSUFBSSxFQUFFLE9BQU87U0FDZDtRQUNELE1BQU0sRUFBRSxrQ0FBa0M7S0FDM0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsV0FBVyxFQUFFO1FBQ25CLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLDREQUE0RDtRQUN0RSxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsR0FBRyxFQUFFLEVBQUU7SUFDUCxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDLENBQUM7Q0FDekUsQ0FBQyJ9