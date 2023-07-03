var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClassmap from '@coffeekraken/s-classmap';
import __SEnv from '@coffeekraken/s-env';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __sanitizeJsonString } from '@coffeekraken/sugar/json';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
/**
 * @name            sVitePluginSugar
 * @namespace       node
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This plugin allows you to automate some things like injecting
 * environment variables in the js, etc...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function sVitePluginSugar(settings = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let config;
    function _injectEnvVars(src, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield __SSugarConfig.load({
                id: 'browser',
                platform: 'browser',
                env: __SEnv.get('env'),
                clean: true,
            });
            const browserConfig = yield c.instance.toObject();
            // filtering out all the "theme..." properties cause they are already
            // in the "theme" one...
            for (let [configId, value] of Object.entries(browserConfig)) {
                if (configId !== 'theme' && configId.startsWith('theme')) {
                    delete browserConfig[configId];
                }
            }
            // frontspec
            const frontspec = new __SFrontspec(), frontspecJson = frontspec.read();
            // classmap
            const classmap = new __SClassmap(), classmapJson = __SSugarConfig.get('themeClassmap.enabled')
                ? classmap.readSync()
                : null;
            // removing some data for the frontend
            for (let key of __SSugarConfig.get('frontspec.removeForFrontend')) {
                delete frontspecJson[key];
            }
            let envJsonStr = JSON.stringify({
                // @ts-ignore
                PLATFORM: 'browser',
                ENV: __SEnv.get('env'),
                SUGAR: {
                    config: browserConfig,
                },
                FRONTSPEC: frontspecJson,
                CLASSMAP: classmapJson,
                PACKAGE: __packageJsonSync(),
            });
            envJsonStr = __sanitizeJsonString(envJsonStr);
            const code = [
                `// sugar environment`,
                `
                if (!window.___isObject) {
                    window.___isObject = function (item) {
                        return (item && typeof item === 'object' && !Array.isArray(item));
                    }
                }
                if (!window.___deepMerge) {
                    window.___deepMerge = function (target, ...sources) {
                        if (!sources.length) return target;
                        var source = sources.shift();
                        if (window.___isObject(target) && window.___isObject(source)) {
                            for (const key in source) {
                            if (window.___isObject(source[key])) {
                                if (!target[key]) Object.assign(target, { [key]: {} });
                               window.___deepMerge(target[key], source[key]);
                            } else {
                                Object.assign(target, { [key]: source[key] });
                            }
                            }
                        }
                        return window.___deepMerge(target, ...sources);
                    }
                }
            `.replace('\n', ''),
                `document.env = window.___deepMerge(
                JSON.parse(\`${envJsonStr}\`),
                document.env || {}
            )`,
            ];
            return [code.join('\n'), src].join('\n');
        });
    }
    return {
        name: 's-vite-sugar-plugin',
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig;
        },
        transform(src, id) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (jsReg.test(id)) {
                    // if (
                    //     id.includes(packageRoot)
                    //     // (id === config.build.rollupOptions?.input ||
                    //     //     id === config.build.lib?.entry)
                    // ) {
                    if (!id.includes('index.ts') ||
                        id.startsWith(__SSugarConfig.get('storage.src.viewsDir'))) {
                        return {
                            code: src,
                            map: null,
                        };
                    }
                    if ((_a = config.build.rollupOptions) === null || _a === void 0 ? void 0 : _a.input) {
                        if (!config.build.lib) {
                            src = yield _injectEnvVars(src, id);
                        }
                    }
                    else {
                        // live dev environment
                        src = yield _injectEnvVars(src, id);
                    }
                    // }
                    return {
                        code: src,
                        map: null,
                    };
                }
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsV0FBZ0IsRUFBRTtJQUN2RCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztJQUNqQyxJQUFJLE1BQU0sQ0FBQztJQUVYLFNBQWUsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNqQyxNQUFNLENBQUMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLEVBQUUsRUFBRSxTQUFTO2dCQUNiLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWxELHFFQUFxRTtZQUNyRSx3QkFBd0I7WUFDeEIsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ3pELElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN0RCxP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