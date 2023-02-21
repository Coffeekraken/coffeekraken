var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    let areEnvVarsInjected = false;
    let config;
    function _injectEnvVars(src, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (areEnvVarsInjected) return src;
            // areEnvVarsInjected = true;
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
            // removing some data for the frontend
            for (let key of __SSugarConfig.get('frontspec.removeForFrontend')) {
                delete frontspecJson[key];
            }
            let envJsonStr = JSON.stringify({
                // @ts-ignore
                PLATFORM: 'browser',
                ENV: __SEnv.get('env'),
                ENVIRONMENT: __SEnv.get('env'),
                SUGAR: {
                    config: browserConfig,
                    frontspec: frontspecJson,
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsV0FBZ0IsRUFBRTtJQUN2RCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztJQUNqQyxJQUFJLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUMvQixJQUFJLE1BQU0sQ0FBQztJQUVYLFNBQWUsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNqQyxzQ0FBc0M7WUFDdEMsNkJBQTZCO1lBRTdCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDaEMsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFbEQscUVBQXFFO1lBQ3JFLHdCQUF3QjtZQUN4QixLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDekQsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENB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