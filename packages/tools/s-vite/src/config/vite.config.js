import __sugarConfig from '@coffeekraken/s-sugar-config';
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __sveltePlugin from '@sveltejs/vite-plugin-svelte';
export default {
    root: '[config.storage.rootDir]',
    base: '/',
    mode: 'development',
    plugins: [__sveltePlugin(__sugarConfig('svelte'))],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSxrREFBa0QsQ0FBQztBQUMzRSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUcxRCxlQUFlO0lBQ2IsSUFBSSxFQUFFLDBCQUEwQjtJQUNoQyxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxhQUFhO0lBQ25CLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRCxTQUFTLEVBQUUsMEJBQTBCO0lBQ3JDLFFBQVEsRUFBRSxnQ0FBZ0M7SUFDMUMsV0FBVyxFQUFFLEtBQUs7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsS0FBSyxFQUFFLHFDQUFxQztZQUM1QyxJQUFJLEVBQUUsT0FBTztTQUNkO1FBQ0QsTUFBTSxFQUFFLDZCQUE2QjtLQUN0QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxXQUFXLEVBQUU7UUFDbkIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsNERBQTREO1FBQ3RFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxHQUFHLEVBQUUsRUFBRTtJQUNQLFFBQVEsRUFBRTtRQUNSO1lBQ0UsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUNoQix1REFBdUQsRUFDdkQsWUFBWSxDQUNiLENBQUM7WUFDSixDQUFDO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==