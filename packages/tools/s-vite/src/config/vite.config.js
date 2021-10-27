var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export function preprocess(rawViteConfig, rawConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('vite.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(rawViteConfig, config);
    });
}
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
        rewrites: [
            __path.resolve(`${__dirname()}/../node/rewrites/handlebars`),
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxnQkFBZ0IsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxNQUFNLFVBQWdCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUzs7O1FBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ2hFLE9BQU8sV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Q0FDN0M7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLGtDQUFrQztRQUN4QyxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxhQUFhO1FBQ25CLE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRTtnQkFDSCxHQUFHLEVBQUUsNkJBQTZCO2FBQ3JDO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1lBQzVELGlFQUFpRTtZQUNqRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1lBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsK0JBQStCLENBQUM7WUFDN0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSxnQ0FBZ0MsQ0FBQztTQUNqRTtRQUNELFNBQVMsRUFBRSw4QkFBOEI7UUFDekMsUUFBUSxFQUFFLHdDQUF3QztRQUNsRCxXQUFXLEVBQUUsS0FBSztRQUNsQixZQUFZLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDbkI7UUFDRCxLQUFLLEVBQUU7WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsS0FBSyxFQUFFLDBDQUEwQztnQkFDakQsSUFBSSxFQUFFLE9BQU87YUFDaEI7WUFDRCxNQUFNLEVBQUUsa0NBQWtDO1NBQzdDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQ0osNERBQTREO1lBQ2hFLEtBQUssRUFBRTtnQkFDSCxhQUFhLEVBQUUsK0NBQStDO2FBQ2pFO1lBQ0QsZUFBZSxFQUFFLEtBQUs7U0FDekI7UUFDRCxHQUFHLEVBQUUsRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsOEJBQThCLENBQUM7U0FDL0Q7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9