"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipAddress_1 = __importDefault(require("@coffeekraken/sugar/node/network/utils/ipAddress"));
const vite_plugin_svelte_1 = __importDefault(require("@sveltejs/vite-plugin-svelte"));
const svelte_preprocess_1 = __importDefault(require("svelte-preprocess"));
exports.default = {
    root: '[config.storage.rootDir]',
    base: '/',
    mode: 'development',
    plugins: [
        vite_plugin_svelte_1.default({
            compilerOptions: {
                customElement: true,
                format: 'esm'
            },
            preprocess: svelte_preprocess_1.default()
        })
    ],
    publicDir: '[config.storage.distDir]',
    cacheDir: '[config.storage.cacheDir]/vite',
    clearScreen: false,
    server: {
        host: ipAddress_1.default(),
        port: 3000,
        hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
        proxy: {
        // '/': {
        //   target: `http://${__ipAddress()}:8888`,
        //   changeOrigin: true
        // }
        //   '/doc': {
        //     target: `http://${__ipAddress()}:8080`,
        //     changeOrigin: true
        //   }
        }
    },
    css: {}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlHQUEyRTtBQUUzRSxzRkFBMEQ7QUFDMUQsMEVBQW1EO0FBRW5ELGtCQUFlO0lBQ2IsSUFBSSxFQUFFLDBCQUEwQjtJQUNoQyxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxhQUFhO0lBQ25CLE9BQU8sRUFBRTtRQUNQLDRCQUFjLENBQUM7WUFDYixlQUFlLEVBQUU7Z0JBQ2YsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLE1BQU0sRUFBRSxLQUFLO2FBQ2Q7WUFDRCxVQUFVLEVBQUUsMkJBQWtCLEVBQUU7U0FDakMsQ0FBQztLQUNIO0lBQ0QsU0FBUyxFQUFFLDBCQUEwQjtJQUNyQyxRQUFRLEVBQUUsZ0NBQWdDO0lBQzFDLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxtQkFBVyxFQUFFO1FBQ25CLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLDREQUE0RDtRQUN0RSxLQUFLLEVBQUU7UUFDTCxTQUFTO1FBQ1QsNENBQTRDO1FBQzVDLHVCQUF1QjtRQUN2QixJQUFJO1FBQ0osY0FBYztRQUNkLDhDQUE4QztRQUM5Qyx5QkFBeUI7UUFDekIsTUFBTTtTQUNQO0tBQ0Y7SUFDRCxHQUFHLEVBQUUsRUFBRTtDQUNSLENBQUMifQ==