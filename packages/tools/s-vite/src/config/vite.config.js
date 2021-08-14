import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDcEMsT0FBTztRQUNILElBQUksRUFBRSxrQ0FBa0M7UUFDeEMsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsYUFBYTtRQUNuQixPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFLDZCQUE2QjthQUNyQztTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQztZQUM1RCxpRUFBaUU7WUFDakUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQztZQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLCtCQUErQixDQUFDO1lBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsZ0NBQWdDLENBQUM7U0FDakU7UUFDRCxTQUFTLEVBQUUsOEJBQThCO1FBQ3pDLFFBQVEsRUFBRSx3Q0FBd0M7UUFDbEQsV0FBVyxFQUFFLEtBQUs7UUFDbEIsWUFBWSxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsR0FBRyxFQUFFO2dCQUNELEtBQUssRUFBRSwwQ0FBMEM7Z0JBQ2pELElBQUksRUFBRSxPQUFPO2FBQ2hCO1lBQ0QsTUFBTSxFQUFFLGtDQUFrQztTQUM3QztRQUNELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLDREQUE0RDtZQUN0RSxLQUFLLEVBQUU7Z0JBQ0gsYUFBYSxFQUFFLCtDQUErQzthQUNqRTtZQUNELGVBQWUsRUFBRSxLQUFLO1NBQ3pCO1FBQ0QsR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDLENBQUM7S0FDM0UsQ0FBQztBQUNOLENBQUMifQ==