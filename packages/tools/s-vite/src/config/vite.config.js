import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default {
    root: '[config.storage.package.rootDir]',
    base: '/',
    mode: 'development',
    plugins: [
        __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
        // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxrREFBa0QsQ0FBQztBQUMzRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsZUFBZTtJQUNiLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUU7UUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1FBQzVELGlFQUFpRTtRQUNqRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLCtCQUErQixDQUFDO1FBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsZ0NBQWdDLENBQUM7S0FDL0Q7SUFDRCxTQUFTLEVBQUUsOEJBQThCO0lBQ3pDLFFBQVEsRUFBRSx3Q0FBd0M7SUFDbEQsV0FBVyxFQUFFLEtBQUs7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsS0FBSyxFQUFFLDBDQUEwQztZQUNqRCxJQUFJLEVBQUUsT0FBTztTQUNkO1FBQ0QsTUFBTSxFQUFFLGtDQUFrQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxXQUFXLEVBQUU7UUFDbkIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsNERBQTREO1FBQ3RFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxHQUFHLEVBQUUsRUFBRTtJQUNQLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsOEJBQThCLENBQUMsQ0FBQztDQUN6RSxDQUFDIn0=