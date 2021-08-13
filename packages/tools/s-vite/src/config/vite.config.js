import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return {};
    return {
        root: '[config.storage.package.rootDir]',
        base: '/',
        mode: 'development',
        resolve: {
            alias: {
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        plugins: [
            __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
            __path.resolve(`${__dirname()}/../node/plugins/vuejsPlugin`),
            __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
            __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`),
        ],
        publicDir: '[config.storage.src.rootDir]',
        cacheDir: '[config.storage.package.cacheDir]/vite',
        clearScreen: false,
        optimizeDeps: {
            exclude: ['vue'],
        },
        build: {
            lib: {
                entry: '[config.storage.src.rootDir]/js/index.ts',
                name: 'index',
            },
            outDir: '[config.storage.dist.rootDir]/js',
        },
        server: {
            host: '127.0.0.1',
            port: 3000,
            hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
            proxy: {
                '/api/config': 'http://localhost:[config.frontendServer.port]',
            },
            disableGlobbing: false,
        },
        css: {},
        rewrites: [__path.resolve(`${__dirname()}/../node/rewrites/handlebars`)],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3ZDLE9BQU87UUFDSCxJQUFJLEVBQUUsa0NBQWtDO1FBQ3hDLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLGFBQWE7UUFDbkIsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFO2dCQUNILEdBQUcsRUFBRSw2QkFBNkI7YUFDckM7U0FDSjtRQUNELE9BQU8sRUFBRTtZQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsOEJBQThCLENBQUM7WUFDNUQsaUVBQWlFO1lBQ2pFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsOEJBQThCLENBQUM7WUFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSwrQkFBK0IsQ0FBQztZQUM3RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLGdDQUFnQyxDQUFDO1NBQ2pFO1FBQ0QsU0FBUyxFQUFFLDhCQUE4QjtRQUN6QyxRQUFRLEVBQUUsd0NBQXdDO1FBQ2xELFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFlBQVksRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNuQjtRQUNELEtBQUssRUFBRTtZQUNILEdBQUcsRUFBRTtnQkFDRCxLQUFLLEVBQUUsMENBQTBDO2dCQUNqRCxJQUFJLEVBQUUsT0FBTzthQUNoQjtZQUNELE1BQU0sRUFBRSxrQ0FBa0M7U0FDN0M7UUFDRCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSw0REFBNEQ7WUFDdEUsS0FBSyxFQUFFO2dCQUNILGFBQWEsRUFBRSwrQ0FBK0M7YUFDakU7WUFDRCxlQUFlLEVBQUUsS0FBSztTQUN6QjtRQUNELEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0tBQzNFLENBQUM7QUFDTixDQUFDIn0=