import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default {
    root: '[config.storage.package.rootDir]',
    base: '/',
    mode: 'development',
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    },
    plugins: [
        __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
        // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
        __path.resolve(`${__dirname()}/../node/plugins/vuejsPlugin`),
        __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
        __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`)
    ],
    publicDir: '[config.storage.src.rootDir]',
    cacheDir: '[config.storage.package.cacheDir]/vite',
    clearScreen: false,
    optimizeDeps: {
        exclude: [
            'vue'
        ]
    },
    build: {
        lib: {
            entry: '[config.storage.src.rootDir]/js/index.ts',
            name: 'index'
        },
        outDir: '[config.storage.dist.rootDir]/js'
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
        proxy: {
            '/api/config': 'http://localhost:[config.frontendServer.port]',
        },
        disableGlobbing: false
    },
    css: {},
    rewrites: [__path.resolve(`${__dirname()}/../node/rewrites/handlebars`)]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsZUFBZTtJQUNiLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsNkJBQTZCO1NBQ3JDO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1FBQzVELGlFQUFpRTtRQUNqRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1FBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsK0JBQStCLENBQUM7UUFDN0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSxnQ0FBZ0MsQ0FBQztLQUMvRDtJQUNELFNBQVMsRUFBRSw4QkFBOEI7SUFDekMsUUFBUSxFQUFFLHdDQUF3QztJQUNsRCxXQUFXLEVBQUUsS0FBSztJQUNsQixZQUFZLEVBQUU7UUFDVixPQUFPLEVBQUU7WUFDUCxLQUFLO1NBQ047S0FDRjtJQUNILEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRTtZQUNILEtBQUssRUFBRSwwQ0FBMEM7WUFDakQsSUFBSSxFQUFFLE9BQU87U0FDZDtRQUNELE1BQU0sRUFBRSxrQ0FBa0M7S0FDM0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSw0REFBNEQ7UUFDdEUsS0FBSyxFQUFFO1lBQ0wsYUFBYSxFQUFFLCtDQUErQztTQUMvRDtRQUNELGVBQWUsRUFBRSxLQUFLO0tBQ3ZCO0lBQ0QsR0FBRyxFQUFFLEVBQUU7SUFDUCxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDLENBQUM7Q0FDekUsQ0FBQyJ9