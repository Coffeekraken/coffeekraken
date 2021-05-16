import __sugarConfig from '@coffeekraken/s-sugar-config';
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __vitePluginSvelte from '@sveltejs/vite-plugin-svelte';
import __sVitePluginRiotjs from '@coffeekraken/s-vite-plugin-riotjs';
export default {
    root: '[config.storage.rootDir]',
    base: '/',
    mode: 'development',
    plugins: [
        __vitePluginSvelte(__sugarConfig('svelte')),
        __sVitePluginRiotjs(__sugarConfig('riotjs'))
    ],
    publicDir: '[config.storage.distDir]',
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
    rewrites: [
        {
            match: /handlebars\.js/,
            rewrite(src, id) {
                return src.replace('if (global.Symbol && context[global.Symbol.iterator])', 'if (false)');
            }
        }
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSxrREFBa0QsQ0FBQztBQUMzRSxPQUFPLGtCQUFrQixNQUFNLDhCQUE4QixDQUFDO0FBRTlELE9BQU8sbUJBQW1CLE1BQU0sb0NBQW9DLENBQUM7QUFFckUsZUFBZTtJQUNiLElBQUksRUFBRSwwQkFBMEI7SUFDaEMsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUU7UUFDUCxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsU0FBUyxFQUFFLDBCQUEwQjtJQUNyQyxRQUFRLEVBQUUsZ0NBQWdDO0lBQzFDLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRTtZQUNILEtBQUssRUFBRSxxQ0FBcUM7WUFDNUMsSUFBSSxFQUFFLE9BQU87U0FDZDtRQUNELE1BQU0sRUFBRSw2QkFBNkI7S0FDdEM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsV0FBVyxFQUFFO1FBQ25CLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLDREQUE0RDtRQUN0RSxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsR0FBRyxFQUFFLEVBQUU7SUFDUCxRQUFRLEVBQUU7UUFDUjtZQUNFLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FDaEIsdURBQXVELEVBQ3ZELFlBQVksQ0FDYixDQUFDO1lBQ0osQ0FBQztTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=