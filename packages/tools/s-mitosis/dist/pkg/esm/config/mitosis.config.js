var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SVitePostcssPlugin from '@coffeekraken/s-vite-postcss-plugin';
import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __vue from '@vitejs/plugin-vue';
export function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('mitosis.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(api.this, config);
    });
}
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        vite: {
            /**
             * @name          logLevel
             * @namespace     config.mitosis.vite
             * @type          String
             * @default      error
             *
             * Specify the log level
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            logLevel: 'error',
            get plugins() {
                return [__SVitePostcssPlugin(), __vue()];
            },
            resolve: {
                alias: {
                // vue: 'vue/dist/vue.esm-bundler.js',
                },
                dedupe: ['react', 'react-dom', 'vue'],
            },
            server: {
                /**
                 * @name            port
                 * @namespace       config.mitosis.vite.server
                 * @type            Number
                 * @default         3001
                 *
                 * Specify the mitosis server port
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                port: 3001,
                proxy: {
                    '^/$': {
                        target: 'http://127.0.0.1:8082',
                        changeOrigin: true,
                    },
                    '/dist/css/index.css': {
                        target: 'http://127.0.0.1:8082',
                        changeOrigin: true,
                    },
                    '/dist/js/index.esm.js': {
                        target: 'http://127.0.0.1:8082',
                        changeOrigin: true,
                    },
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sb0JBQW9CLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sS0FBSyxNQUFNLG9CQUFvQixDQUFDO0FBRXZDLE1BQU0sVUFBZ0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNuRSxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUN4QztBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLE9BQU87WUFFakIsSUFBSSxPQUFPO2dCQUNQLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUVELE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQUU7Z0JBQ0gsc0NBQXNDO2lCQUN6QztnQkFDRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQzthQUN4QztZQUVELE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsSUFBSTtnQkFFVixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFO3dCQUNILE1BQU0sRUFBRSx1QkFBdUI7d0JBQy9CLFlBQVksRUFBRSxJQUFJO3FCQUNyQjtvQkFDRCxxQkFBcUIsRUFBRTt3QkFDbkIsTUFBTSxFQUFFLHVCQUF1Qjt3QkFDL0IsWUFBWSxFQUFFLElBQUk7cUJBQ3JCO29CQUNELHVCQUF1QixFQUFFO3dCQUNyQixNQUFNLEVBQUUsdUJBQXVCO3dCQUMvQixZQUFZLEVBQUUsSUFBSTtxQkFDckI7aUJBQ0o7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==